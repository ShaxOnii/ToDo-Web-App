const express = require("express");
const pg = require("pg");
const env = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

env.config();

const app = express();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`Welcome ${process.env.TEST}`);
});

// Static files
app.use(express.static("public"));

// Database connection
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect()
  .then(() => console.log("Połączono z bazą danych PostgreSQL"))
  .catch((err) => console.error("Błąd połączenia z bazą danych", err.stack));

// Middleware: Autenticate JWT token
const ensureAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Preferuj Bearer Token w nagłówkach
  if (!token) {
    return res.status(401).json({ error: "No authentication token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = decoded; // Dekodowany payload JWT
    next();
  });
};

// Endpointy Todos
app.get("/todos/get", ensureAuthenticated, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos WHERE user_id = $1", [
      req.user.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Błąd podczas pobierania notatek:", error);
    res.status(500).json({ error: "Nie udało się pobrać notatek" });
  }
});

// Adding new Todo
app.post("/todos/add", ensureAuthenticated, async (req, res) => {
  const { title, description } = req.body.newTodo;
  if (!title || !description) {
    return res.status(400).json({ error: "Brak wymaganych pól" });
  }
  try {
    const result = await db.query(
      "INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Błąd podczas dodawania notatki:", error);
    res.status(500).json({ error: "Nie udało się dodać notatki" });
  }
});

// Editing Todo
app.put("/todos/update/:id", ensureAuthenticated, async (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, description } = req.body;

  if (!title || !description || isNaN(todoId)) {
    return res.status(400).json({ error: "Nieprawidłowe dane wejściowe" });
  }

  try {
    const result = await db.query(
      "UPDATE todos SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description, todoId, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Notatka nie została znaleziona" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Błąd podczas aktualizacji notatki:", error);
    res.status(500).json({ error: "Nie udało się zaktualizować notatki" });
  }
});

// Deleting Todo
app.delete("/todos/delete/:id", ensureAuthenticated, async (req, res) => {
  const todoId = parseInt(req.params.id);

  if (isNaN(todoId)) {
    return res.status(400).json({ error: "Nieprawidłowe ID" });
  }

  try {
    const result = await db.query(
      "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
      [todoId, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Notatka nie została znaleziona" });
    }

    res.status(200).json({ message: "Notatka została usunięta" });
  } catch (error) {
    console.error("Błąd podczas usuwania notatki:", error);
    res.status(500).json({ error: "Nie udało się usunąć notatki" });
  }
});

// Deleting Account
app.delete("/user/delete/:id", ensureAuthenticated, async (req, res) => {
  const userId = req.params.id;
  try {
    // Usuń notatki użytkownika
    await db.query("DELETE FROM todos WHERE user_id = $1", [userId]);
    // Usuń użytkownika
    await db.query("DELETE FROM users WHERE id = $1", [userId]);

    res
      .status(200)
      .json({ message: "Użytkownik i jego notatki zostały usunięte." });
  } catch (error) {
    res.status(500).json({
      message: "Wystąpił błąd podczas usuwania użytkownika.",
      error,
    });
  }
});

// Registering new User
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Brak wymaganych pól" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );
    res
      .status(201)
      .json({ message: "Zarejestrowano pomyślnie", user: result.rows[0] });
  } catch (error) {
    console.error("Błąd podczas rejestracji:", error);
    res.status(500).json({
      error: "Couldn`t register your account. Try new Login or later.",
    });
  }
});

// Login User
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout User
app.post("/logout", (req, res) => {
  res.clearCookie("jwt").status(200).json({ message: "Logged out" });
});

// Starting Server
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

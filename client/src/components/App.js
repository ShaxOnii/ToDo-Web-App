import React, { useState, useEffect } from "react";
import ToDoList from "./todos/ToDoList";
import ToDoForm from "./todos/ToDoForm";
import LoginScreen from "./auth/LoginScreen";
import RegistrationScreen from "./auth/RegistrationScreen";
import api from "../services/axios";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import ConfirmationDialog from "./ui/ConfirmationDialog";
import { jwtDecode } from "jwt-decode";

function App() {
  const [todos, setTodos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showConfirmAccount, setShowConfirmAccount] = useState(false);
  const [showConfirmNote, setShowConfirmNote] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteToDoId, setDeleteToDoId] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      handleUpdateTodo(token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("authToken", token); // Przechowaj token
        setIsAuthenticated(true);

        // Downloading clients ToDo notes
        handleUpdateTodo(token);
        const decode = jwtDecode(token);
        setUserId(decode.id);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegistration = async (username, password) => {
    try {
      const response = await api.post("/register", { username, password });
      console.log(response.request.status);

      if (response.request.status === 201) {
        alert("Registration completed successfully. You can log in now.");
        setIsRegistering(false);
      } else {
        const error = await response.json();
        alert(`Registration Error: ${error.error || "Unknow problem."}`);
      }
    } catch (error) {
      console.error("Registration Error: ", error);
      alert("Couldn`t register your account. Try new Login or later.");
    }
  };

  const handleLogout = async () => {
    setTodos([]);
    setUserId(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  const handleDeleteUser = async (userId) => {
    setDeleteUserId(userId); // Ustaw ID użytkownika
    setShowConfirmAccount(true); // Otwórz modal
  };

  const confirmDeleteUser = async () => {
    setShowConfirmAccount(false); // Zamknij modal
    if (deleteUserId) {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authorization token");

        //tu nie przechodzi dalej
        await api.delete(`/user/delete/${deleteUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("The user and his data have been deleted.");
        setDeleteUserId(null);
        setUserId(null);
        handleLogout(); // Wylogowanie po usunięciu
      } catch (error) {
        console.error("Error while deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const cancelDeleteUser = () => {
    setDeleteUserId(null);
    setShowConfirmAccount(false);
  };

  const handleDeleteTodo = async (id) => {
    setDeleteToDoId(id);
    setShowConfirmNote(true);
  };

  const confirmDeleteTodo = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token");
      return;
    }

    try {
      const response = await api.delete(`/todos/delete/${deleteToDoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Todo deleted:", response.data);

      if (response.request.status === 200) {
        handleUpdateTodo(token);
      } else {
        console.error("Error while adding Todo Note.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    setShowConfirmNote(false);
  };

  const cancelDeleteToDo = () => {
    setDeleteToDoId(null);
    setShowConfirmNote(false);
  };

  const handleAddTodo = async (newTodo) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token");
      return;
    }

    try {
      const response = await api.post(
        "/todos/add", // Endpoint API
        { newTodo }, // Dane przesyłane do serwera
        {
          headers: { Authorization: `Bearer ${token}` }, // Nagłówek autoryzacji
        }
      );

      if (response.request.status === 201) {
        handleUpdateTodo(token);
      } else {
        console.error("Error while adding Todo Note.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleEditTodo = async (id, title, description) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token");
      return;
    }
    try {
      const response = await api.put(
        `/todos/update/${id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.request.status === 200) {
        handleUpdateTodo(token);
      } else {
        console.error("Error while updating Todo.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleUpdateTodo = async (token) => {
    const updatedTodos = await api.get("/todos/get", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(updatedTodos.data);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        isRegistering ? (
          // Registration Screen
          <>
            <Header />
            <div className="main">
              <RegistrationScreen
                onRegister={handleRegistration}
                onSwitchToLogin={() => setIsRegistering(false)}
              />
            </div>
            <Footer />
          </>
        ) : (
          // Login Screen
          <>
            <Header />
            <div className="main">
              <LoginScreen
                onLogin={handleLogin}
                onSwitchToLogin={() => setIsRegistering(true)}
              />
            </div>
            <Footer />
          </>
        )
      ) : (
        // After loging in
        <>
          <Header
            onLogout={handleLogout}
            isLoggedIn={isAuthenticated}
            handleDeleteUser={handleDeleteUser}
            userId={userId}
          />
          <div>
            <ToDoForm onAddTodo={handleAddTodo} />
            {showConfirmAccount && (
              <ConfirmationDialog
                message="Are you sure you want to delete your account? All data will be lost."
                onConfirm={confirmDeleteUser}
                onCancel={cancelDeleteUser}
              />
            )}
            <ToDoList
              todos={todos}
              onDelete={handleDeleteTodo}
              onUpdate={handleEditTodo}
            />
            {showConfirmNote && (
              <ConfirmationDialog
                message="Are you sure you want to delete this note?"
                onConfirm={() => confirmDeleteTodo(deleteToDoId)}
                onCancel={cancelDeleteToDo}
              />
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

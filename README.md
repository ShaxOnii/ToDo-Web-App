# First-Portfolio-Project: ToDo Web App

This project documentation is also available in Polish.  
You can find it in the file: [README_PL.md](README_PL.md).

If you want to check it out, go ahead and click the link below! 😀
https://shax-todo.com/

The ToDo Web App is a full-stack application designed to manage a to-do list efficiently, with user authentication implemented using JSON Web Tokens (JWT). The application is built with modern technologies to ensure a smooth user experience and secure functionality. Here's an overview of the technologies used:

## **Frontend**:

- **React.js**: The user interface is built using React, a popular JavaScript library for building dynamic and interactive web applications.

## **Backend**:

- **Node.js**: The backend server is powered by Node.js, which provides a robust environment for running JavaScript on the server side.
- **Express.js**: The server-side framework used for building the RESTful API, handling routes, and managing HTTP requests and responses.

## **Authentication**:

- **JWT (JSON Web Tokens)**: Used for implementing secure user authentication. JWT ensures that users' sessions are secure and tokens are tamper-proof, offering a scalable way to handle authentication across client and server.

## **Database**:

- **PostgreSQL**: The app uses PostgreSQL, a powerful open-source relational database, to securely store user credentials and to-do list items.

## **Key Freatures**:

- **User Authentication**: Registration and login functionality with hashed passwords and secure JWT-based sessions.

- **CRUD Operations**: Allows users to create, read, update, and delete to-do list items.

- **PostgreSQL Integration**: Stores and retrieves data efficiently using structured queries.

- **Modular Design**: Separation of concerns between the frontend (React) and backend (Node.js/Express).

## **Requirements**

Before you start, make sure you have installed:

- [Node.js](https://nodejs.org/) LTS version (recommended: version 16 or newer)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ShaxOnii/ToDo-Web-App.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd ToDo-Web-App
   ```

3. **Install dependencies for both backend and frontend**:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

## **Configuration**

1. **Create a .env file in the project's root directory**:

Copy the .env.example template or create the file manually.

    cp .env.example .env

2. **Fill the .env file with your environment variables**:

**Example .env file content:**:

```bash
# Database settings

PG_USER="Username"
PG_HOST="localhost"
PG_DATABASE="Datebase_name"
PG_PASSWORD="password"
PG_PORT="5000"

# Security settings

SALT_ROUNDS="10"
JWT_SECRET="dev-jwt-secret"
```

- **PG_USER**: Database username
- **PG_HOST**: Database host
- **PG_DATABASE**: Name of the database to store your data
- **PG_PASSWORD**: Database password
- **PORT**: Port for the backend application (default: 5000)
- **SALT_ROUNDS**: Number of salt rounds for hashing passwords
- **JWT_SECRET**: Secret key for signing JWT tokens

## **Running the Application**

1. **Start both backend and frontend**:

In the root directory of the project, run:

```bash
npm start
```

2. **The package.json file already contains a script to automatically run both backend and frontend simultaneously**:

```bash
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "concurrently \"npm run server\" \"npm run client\"",
"server": "node server.js",
"client": "npm run start --prefix client"
},
```

3. **Open your browser and navigate to**:

http://localhost:3000

# **Project Structure**

```bash
├── client/ # Frontend aplikacji (React)
├── server.js # Plik główny backendu (Node.js, Express)
├── .env # Plik z konfiguracją środowiska
├── package.json # Plik z zależnościami backendu
└── README.md # Dokumentacja projektu
```

---

# Autor

This project was created by ShaxOnii - Karol Śliwka.

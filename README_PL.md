# First-Project: ToDo Web App

Aplikacja ToDo Web App to pełnostackowa aplikacja zaprojektowana do efektywnego zarządzania listą zadań, z uwierzytelnianiem użytkownika realizowanym za pomocą tokenów JSON Web Tokens (JWT). Aplikacja została stworzona z wykorzystaniem nowoczesnych technologii, aby zapewnić płynne działanie i bezpieczną funkcjonalność. Oto przegląd zastosowanych technologii:

## **Frontend**:

- **React.js**: Interfejs użytkownika został zbudowany przy użyciu Reacta, popularnej biblioteki JavaScript do tworzenia dynamicznych i interaktywnych aplikacji webowych.

## **Backend**:

- **Node.js**: Backend serwera działa w oparciu o Node.js, co zapewnia solidne środowisko do uruchamiania JavaScriptu po stronie serwera.

- **Express.js**: Framework po stronie serwera, używany do budowy RESTful API, obsługi tras oraz zarządzania żądaniami i odpowiedziami HTTP.

## **Uwierzytelnianie**:

- **JWT (JSON Web Tokens)**: Wykorzystywane do bezpiecznego uwierzytelniania użytkowników. JWT zapewnia bezpieczeństwo sesji użytkowników, a tokeny są odporne na manipulacje, co oferuje skalowalne rozwiązanie do obsługi uwierzytelniania między klientem a serwerem.

## **Baza Danych**:

- **PostgreSQL**: Aplikacja wykorzystuje PostgreSQL, potężną otwartoźródłową relacyjną bazę danych, do bezpiecznego przechowywania danych użytkowników oraz elementów listy zadań.

## **Key Freatures**:

- **Uwierzytelnianie użytkowników**: Funkcje rejestracji i logowania z wykorzystaniem hashowanych haseł oraz bezpiecznych sesji opartych na JWT.

- **Operacje CRUD**: Umożliwia użytkownikom tworzenie, odczyt, edycję i usuwanie elementów listy zadań.

- **Integracja z PostgreSQL**: Bezpieczne przechowywanie i szybkie pobieranie danych przy użyciu zapytań strukturalnych.

- **Modularna architektura**: Podział obowiązków między frontend (React) i backend (Node.js/Express), co ułatwia rozwój i zarządzanie aplikacją.

## **Wymagania**

Przed rozpoczęciem upewnij się, że masz zainstalowane:

- [Node.js](https://nodejs.org/) w wersji LTS (rekomendowana wersja 16 lub nowsza)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## **Instalacja**

1. **Sklonuj repozytorium**:

   ```bash
   git clone https://github.com/ShaxOnii/ToDo-Web-App.git
   ```

2. **Przejdź do katalogu projektu**:

   ```bash
   cd ToDo-Web-App
   ```

3. **Zainstaluj zależności dla backendu i frontendu**:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

## **Konfiguracja**

1. **Utwórz plik .env w katalogu głównym projektu**:

Skopiuj szablon pliku .env.example lub utwórz plik ręcznie.

    cp .env.example .env

2. **Wypełnij plik .env swoimi zmiennymi środowiskowymi**:

**Oto przykład zawartości .env**:

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

- **PG_USER**: Nazwa użytkownika bazy danych
- **PG_HOST**: Nazwa hosta
- **PG_DATABASE**: Nazwa bazy danych, która będzie przechowywała twoje informacje
- **PG_PASSWORD**: Hasło do bazy danych
- **PORT**: Port, na którym działa aplikacja backendowa (domyślnie: 5000)
- **SALT_ROUNDS**: Ilość dodawanych dodatkowych znaków do hasła przed hashowaniem
- **JWT_SECRET**: Sekret do podpisywania tokenów JWT.

## **Uruchamianie aplikacji**

1. **Uruchom backend oraz frontend**:

W głównym katalogu projektu:

```bash
npm start
```

2. **W pliku packege.json jest już zawarty scrypt który automatycznie uruchamia jednocześnie Backend oraz Frontend aplikacji**:

```bash
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "concurrently \"npm run server\" \"npm run client\"",
"server": "node server.js",
"client": "npm run start --prefix client"
},
```

3. **Otwórz przeglądarkę i przejdź pod adres**:

http://localhost:3000

# **Struktura projektu**

```bash
├── client/ # Frontend aplikacji (React)
├── server.js # Plik główny backendu (Node.js, Express)
├── .env # Plik z konfiguracją środowiska
├── package.json # Plik z zależnościami backendu
└── README.md # Dokumentacja projektu
```

---

# Autor

Projekt został stworzony przez ShaxOnii - Karol Śliwka.

# Toothalie: Dental Clinic Management System

Toothalie is a comprehensive, full-stack web application designed to streamline the management of a dental clinic. It provides a robust platform for patients, dentists, and administrators to manage appointments, schedules, services, and more. The project is built with a modern tech stack, featuring a Symfony backend and a React frontend.

## Tech Stack

- **Backend:**
  - PHP 8.2+
  - Symfony 7.3+
  - Doctrine ORM
  - MySQL 8.0
  - [LexikJWTAuthenticationBundle](https://github.com/lexik/LexikJWTAuthenticationBundle) for secure authentication
  - [NelmioCorsBundle](https://github.com/nelmio/NelmioCorsBundle) for handling Cross-Origin Resource Sharing

- **Frontend:**
  - [React 19](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/) for fast development and builds
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Radix UI](https://www.radix-ui.com/) for accessible UI components
  - [TanStack Table](https://tanstack.com/table) for powerful data tables
  - [Recharts](https://recharts.org/) for charting
  - [React Router](https://reactrouter.com/) for navigation

- **Containerization & Tooling:**
  - [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) for consistent development environments
  - [pnpm](https://pnpm.io/) for frontend package management
  - [Composer](https://getcomposer.org/) for backend package management

## Key Features

- **Role-Based Access Control (RBAC):** Separate interfaces and permissions for Patients, Dentists, and Admins.
- **Appointment Management:**
  - Patients can book, edit, and cancel appointments.
  - Emergency booking functionality.
  - Dentists can approve or reject appointment requests.
  - Detailed appointment history and logging.
- **Schedule Management:** Dentists can set and manage their availability.
- **Service Management:** Admins can define service types (e.g., general, specialized) and the specific services offered. Dentists can be associated with services.
- **Admin Dashboard:** A central place for administrators to manage users, services, appointments, and other core entities of the application.
- **Secure Authentication:** Uses JSON Web Tokens (JWT) for stateless and secure API authentication.

## Database Schema

The application relies on a relational database to manage its data. The core entities include:

- `user`: Stores user information (patients, dentists, admins), credentials, and roles.
- `appointment`: Contains all details about a patient's appointment, including date, patient, dentist, status, and service.
- `schedule`: Defines the weekly availability time slots for dentists.
- `service`: A list of all dental services offered.
- `service_type`: Categories for services (e.g., "Consultation", "Surgery").
- `dentist_service`: Links dentists to the specific services they provide.
- `role`: Defines user roles (e.g., `ROLE_PATIENT`, `ROLE_DENTIST`, `ROLE_ADMIN`).
- `reminder`: Stores reminders for upcoming appointments.

## Getting Started

Follow these instructions to get the project running on your local machine for development and testing purposes.

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (which includes npm)
- [pnpm](https://pnpm.io/installation)
- [Composer](https://getcomposer.org/download)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd Toothalie_Project
    ```

2.  **Backend Setup:**
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Create a local environment file from the example.
      ```bash
      cp .env .env.local
      ```
    - In `.env.local`, configure your database connection and other environment-specific variables. The `docker-compose.yaml` file is pre-configured to work with the `.env` file in the `backend` directory.
    - Install PHP dependencies:
      ```bash
      composer install
      ```

3.  **Frontend Setup:**
    - Navigate to the frontend directory:
      ```bash
      cd ../frontend
      ```
    - Install Node.js dependencies:
      ```bash
      pnpm install
      ```

4.  **Launch the Environment:**
    - From the project root, start the Docker containers for the database and phpMyAdmin.
      ```bash
      docker-compose --env-file ./backend/.env up -d
      ```
    - This command will:
      - Start a MySQL database server on port `3307`.
      - Start a phpMyAdmin instance on port `8080` for easy database management.

5.  **Run Database Migrations:**
    - Go to the backend directory and run the Doctrine migrations to set up your database schema.
      ```bash
      cd backend
      php bin/console doctrine:migrations:migrate
      ```

6.  **Run the Application:**
    - From the project root, use the `concurrently` script to start both the frontend and backend servers with a single command:
      ```bash
      pnpm toothalie
      ```
    - This will:
      - Start the **React (Vite)** development server, typically on `http://localhost:5173`.
      - Start the **Symfony** backend server, typically on `http://127.0.0.1:8000`.

You should now be able to access the application in your browser!

## Project Structure

The project is organized into two main parts in a monorepo-like structure:

-   `frontend/`: Contains the React application.
    -   `src/API/`: Functions for making API calls to the backend.
    -   `src/Pages/`: Top-level page components.
    -   `src/components/`: Reusable UI components.
    -   `src/lib/`: Utilities and helper functions.
-   `backend/`: Contains the Symfony PHP application.
    -   `src/Controller/`: Handles incoming HTTP requests.
    -   `src/Entity/`: Doctrine ORM classes that map to database tables.
    -   `src/Repository/`: Contains custom database query logic.
    -   `config/`: Application configuration, including routes, security, and services.
    -   `migrations/`: Database migration files.

## Useful Scripts

-   `pnpm toothalie`: (Run from root) Starts both frontend and backend servers.
-   `cd frontend && pnpm dev`: Starts the Vite dev server for the frontend.
-   `cd frontend && pnpm build`: Builds the frontend for production.
-   `cd backend && symfony server:start`: Starts the Symfony dev server.
-   `cd backend && php bin/console make:entity`: Creates a new Doctrine entity.
-   `cd backend && php bin/console doctrine:migrations:diff`: Generates a new migration from entity changes.
-   `cd backend && php bin/console doctrine:migrations:migrate`: Applies pending migrations to the database.

## API Authentication

The API uses JWT for authentication, following this flow:

1.  **Login**: The frontend sends a `POST` request to `/api/login-auth` with the user's credentials.
2.  **Token Generation**: If successful, the Symfony backend generates a JWT and returns it to the client.
3.  **Token Storage**: The frontend stores this token in `localStorage`.
4.  **Authenticated Requests**: For all subsequent requests to protected API endpoints (e.g., `/api/auth/me`), the frontend includes the JWT in the `Authorization: Bearer <token>` header.
5.  **Token Validation**: The backend validates the token on every protected request to authorize the user.

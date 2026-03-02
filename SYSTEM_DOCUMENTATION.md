# Toothalie System Documentation

> **Last Updated:** February 5, 2026  
> **Version:** 1.0  
> **Target Audience:** Future developers and maintainers

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Authentication System](#authentication-system)
4. [Backend Structure](#backend-structure)
5. [Frontend Structure](#frontend-structure)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Key Processes](#key-processes)
9. [Development Workflow](#development-workflow)

---

## System Overview

Toothalie is a full-stack dental clinic management system built with:

- **Backend:** Symfony 7.3+ (PHP 8.2+) with Doctrine ORM
- **Frontend:** React 19 with TypeScript, Vite, and Tailwind CSS
- **Database:** MySQL 8.0
- **Authentication:** JWT (JSON Web Tokens) via LexikJWTAuthenticationBundle
- **Architecture:** RESTful API with role-based access control (RBAC)

### Core Features

- **Multi-role system:** Patient, Dentist, and Admin roles
- **Appointment management:** Booking, editing, cancellation, and approval workflows
- **Schedule management:** Dentist availability tracking
- **Service management:** Dental services categorized by type
- **Activity logging:** Comprehensive audit trail
- **Reminder system:** Appointment notifications

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  React 19 + TypeScript + Vite + Tailwind CSS               │
│  - React Router for navigation                              │
│  - Protected routes with role-based access                  │
│  - API service layer for backend communication              │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ HTTP/HTTPS (REST API)
                   │ JWT Bearer Token Authentication
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                         Backend                             │
│  Symfony 7.3 + Doctrine ORM                                │
│  - Attribute-based routing                                  │
│  - JWT authentication & authorization                       │
│  - Role-based access control (RBAC)                         │
│  - CORS enabled via NelmioCorsBundle                        │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ Doctrine ORM
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                      MySQL Database                         │
│  - User management (patients, dentists, admins)            │
│  - Appointments, schedules, services                        │
│  - Activity logs and reminders                              │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
Toothalie_Project/
├── backend/                    # Symfony backend
│   ├── config/                 # Configuration files
│   │   ├── packages/          # Bundle configurations
│   │   │   ├── security.yaml  # Security & authentication config
│   │   │   └── lexik_jwt_authentication.yaml
│   │   └── routes.yaml        # Route configuration
│   ├── migrations/            # Database migrations
│   ├── public/                # Public web directory
│   ├── src/
│   │   ├── Controller/        # HTTP request handlers
│   │   │   └── API/
│   │   │       ├── Auth/                    # Authentication endpoints
│   │   │       └── Authenticated/           # Protected endpoints
│   │   │           ├── Admin/               # Admin-only endpoints
│   │   │           ├── Dentist/             # Dentist-specific endpoints
│   │   │           └── Patient/             # Patient-specific endpoints
│   │   ├── Entity/            # Doctrine ORM entities (database models)
│   │   ├── Repository/        # Custom database queries
│   │   ├── Service/           # Business logic services
│   │   ├── Enum/              # Enumeration classes
│   │   └── EventSubscriber/   # Event listeners
│   └── vendor/                # PHP dependencies
│
├── frontend/                  # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── API/               # Backend API service layer
│   │   │   ├── AuthenticateUser.ts
│   │   │   ├── LoginAuth.ts
│   │   │   └── Authenticated/
│   │   │       ├── admin/               # Admin API calls
│   │   │       ├── appointment/         # Appointment API calls
│   │   │       └── Dentist/             # Dentist API calls
│   │   ├── Pages/             # Page components
│   │   │   ├── Auth/                    # Login, Register pages
│   │   │   ├── Authenticated/           # Protected pages
│   │   │   │   ├── Panes/
│   │   │   │   │   ├── Admin/           # Admin dashboard panes
│   │   │   │   │   ├── DentistPane/     # Dentist dashboard panes
│   │   │   │   │   └── PatientPane/     # Patient dashboard panes
│   │   │   │   └── UserDashboard.tsx    # Main dashboard
│   │   │   └── LandingPageSection/      # Landing page components
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ProtectedRoute.tsx       # Route protection HOC
│   │   │   └── app-sidebar.tsx          # Dashboard sidebar
│   │   ├── lib/               # Utility functions
│   │   ├── hooks/             # Custom React hooks
│   │   ├── Classes/           # TypeScript classes/types
│   │   └── App.tsx            # Main app component with routes
│   └── node_modules/          # Node dependencies
│
└── docker-compose.yaml        # Docker configuration for MySQL & phpMyAdmin
```

---

## Authentication System

### JWT-Based Authentication Flow

Toothalie uses **stateless JWT authentication** for secure API access. The authentication flow consists of two main phases:

#### 1. Login Flow (Obtaining the Token)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Enter credentials (username, password)
    Frontend->>Backend: POST /api/login-auth
    Backend->>Database: Query user by username
    Database-->>Backend: Return user data
    Backend->>Backend: Verify password hash
    Backend->>Database: Fetch user roles
    Database-->>Backend: Return roles
    Backend->>Backend: Generate JWT token (1 hour TTL)
    Backend-->>Frontend: Return JWT token
    Frontend->>Frontend: Store token in localStorage
    Frontend-->>User: Redirect to dashboard
```

**Implementation Details:**

- **Frontend:** [`frontend/src/API/LoginAuth.ts`](file:///c:/College_/Projects/Toothalie_Project/frontend/src/API/LoginAuth.ts)
  - Sends POST request to `/api/login-auth`
  - Payload: `{ username: string, password: string }`

- **Backend:** [`backend/src/Controller/API/Auth/LoginAuth.php`](file:///c:/College_/Projects/Toothalie_Project/backend/src/Controller/API/Auth/LoginAuth.php)
  - Validates credentials against database
  - Uses Symfony's `UserPasswordHasherInterface` for password verification
  - Fetches user roles from `role` and `user_role` tables
  - Generates JWT using `JWTTokenManagerInterface`
  - Returns: `{ token: string }`

- **Security Configuration:** [`backend/config/packages/security.yaml`](file:///c:/College_/Projects/Toothalie_Project/backend/config/packages/security.yaml)
  - `login` firewall handles `/api/login-auth` pattern
  - Uses `json_login` authenticator
  - Success/failure handlers from LexikJWTAuthenticationBundle

#### 2. Authenticated Request Flow (Using the Token)

```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant JWT Validator

    Frontend->>Frontend: Retrieve token from localStorage
    Frontend->>Backend: GET /api/auth/me<br/>Header: Authorization: Bearer <token>
    Backend->>JWT Validator: Validate token signature & expiration
    JWT Validator-->>Backend: Token valid
    Backend->>Backend: Extract user from token
    Backend-->>Frontend: Return user data (email, roles)
    Frontend->>Frontend: Update UI based on roles
```

**Implementation Details:**

- **Frontend:** [`frontend/src/API/AuthenticateUser.ts`](file:///c:/College_/Projects/Toothalie_Project/frontend/src/API/AuthenticateUser.ts)
  - Sends GET request to `/api/auth/me`
  - Includes `Authorization: Bearer <token>` header
  - Returns: `{ status: "ok", user: { email, roles } }`

- **Backend:** [`backend/src/Controller/API/Auth/MeController.php`](file:///c:/College_/Projects/Toothalie_Project/backend/src/Controller/API/Auth/MeController.php)
  - Protected by `api` firewall with JWT authentication
  - Uses Symfony's `Security` service to get authenticated user
  - Returns user identifier and roles

### Token Configuration

- **Location:** [`backend/config/packages/lexik_jwt_authentication.yaml`](file:///c:/College_/Projects/Toothalie_Project/backend/config/packages/lexik_jwt_authentication.yaml)
- **Token TTL:** 3600 seconds (1 hour)
- **Keys:** 
  - Private key: `config/jwt/private.pem`
  - Public key: `config/jwt/public.pem`

### Access Control Rules

Defined in [`backend/config/packages/security.yaml`](file:///c:/College_/Projects/Toothalie_Project/backend/config/packages/security.yaml):

```yaml
access_control:
    # Public access
    - { path: ^/api/register, roles: PUBLIC_ACCESS }
    
    # Authenticated users only
    - { path: ^/api/auth/me, roles: IS_AUTHENTICATED_FULLY }
    - { path: ^/api/auth-user-info, roles: IS_AUTHENTICATED_FULLY }
    - { path: ^/api, roles: IS_AUTHENTICATED_FULLY }
    
    # Admin-only endpoints
    - { path: ^/api/admin, roles: ROLE_ADMIN }
```

### Frontend Route Protection

**Protected Route Component:** [`frontend/src/components/ProtectedRoute.tsx`](file:///c:/College_/Projects/Toothalie_Project/frontend/src/components/ProtectedRoute.tsx)

**How it works:**

1. Checks `localStorage` for `userInfo` object containing JWT token
2. Calls `/api/auth/me` to validate token and get user roles
3. Compares user roles against `allowedRoles` prop
4. Redirects to `/login` if not authenticated
5. Redirects to `/unauthorized` if authenticated but lacking required role

**Usage Example:**

```tsx
<Route path='/user' element={
  <ProtectedRoute allowedRoles={["ROLE_PATIENT", "ROLE_DENTIST"]}>
    <UserDashboard />
  </ProtectedRoute>
} />
```

---

## Backend Structure

### Routing System

Symfony uses **attribute-based routing** where routes are defined directly in controller classes using PHP attributes.

**Configuration:** [`backend/config/routes.yaml`](file:///c:/College_/Projects/Toothalie_Project/backend/config/routes.yaml)

```yaml
controllers:
    resource:
        path: ../src/Controller/
        namespace: App\Controller
    type: attribute
```

**Example Controller:**

```php
#[Route("/api/auth/me", name: "auth_me", methods: ['GET'])]
public function getMe(Security $security): JsonResponse
{
    $user = $security->getUser();
    return new JsonResponse([
        'status' => 'ok',
        'email' => $user->getUserIdentifier(),
        'roles' => $user->getRoles(),
    ]);
}
```

### Controller Organization

Controllers are organized by authentication level and user role:

#### 1. **Public Controllers** (`src/Controller/API/Auth/`)

- `LoginAuth.php` - User login
- `RegUser.php` - User registration
- `Logout.php` - User logout

#### 2. **Authenticated Controllers** (`src/Controller/API/Authenticated/`)

**Common endpoints (all authenticated users):**
- `AuthUserInfo.php` - Get authenticated user information
- `ChangePass.php` - Change password
- `GetDentists.php` - List all dentists
- `GetServices.php` - List all services
- `GetRoles.php` - List all roles
- `GetHistory.php` - Get appointment history
- `GetUserInfo.php` - Get user profile information

**Patient-specific** (`Authenticated/Patient/`):
- `SubmitAppointment.php` - Create new appointment
- `UpdateAppointment.php` - Edit appointment
- `DeleteAppointmentAPI.php` - Cancel appointment
- `AppointmentDetails.php` - View appointment details
- `SpecifiedAppointment.php` - Get specific appointment

**Dentist-specific** (`Authenticated/Dentist/`):
- `UpdateAppointment.php` - Approve/reject appointments
- `AppointmentDetails.php` - View appointment details
- `EditSettings.php` - Update dentist settings
- `Reminder.php` - Manage reminders

**Admin-only** (`Authenticated/Admin/`):
- `AppUser.php` - Manage users (CRUD)
- `Appointment.php` - Manage all appointments
- `Schedule.php` - Manage dentist schedules
- `AdminServiceController.php` - Manage services
- `AdminServiceTypeController.php` - Manage service types
- `DentistService.php` - Assign services to dentists
- `AdminRoleController.php` - Manage roles
- `ActivityLogs.php` - View system activity logs
- `Reminder.php` - Manage reminders
- `AdminAppointmentTypeController.php` - Manage appointment types

### Entity Layer (Database Models)

Located in `backend/src/Entity/`, these Doctrine ORM classes map to database tables:

| Entity | Description | Key Relationships |
|--------|-------------|-------------------|
| `User.php` | Users (patients, dentists, admins) | ManyToMany with `UserRole`, OneToMany with `DentistService` |
| `Appointment.php` | Appointment records | ManyToOne with `User` (patient & dentist), `Schedule`, `Service`, `AppointmentType` |
| `Schedule.php` | Dentist availability slots | ManyToOne with `User` (dentist), OneToMany with `Appointment` |
| `Service.php` | Dental services offered | ManyToOne with `ServiceType`, OneToMany with `Appointment` |
| `ServiceType.php` | Service categories | OneToMany with `Service` |
| `DentistService.php` | Links dentists to services | ManyToOne with `User` and `Service` |
| `Role.php` | User roles | ManyToMany with `User` via `UserRole` |
| `UserRole.php` | User-role junction table | ManyToMany with `User` and `Role` |
| `AppointmentType.php` | Types of appointments | OneToMany with `Appointment` |
| `Reminder.php` | Appointment reminders | ManyToOne with `Appointment` |
| `ActivityLog.php` | System activity audit trail | - |
| `AppointmentLogs.php` | Appointment-specific logs | - |

### Repository Layer

Located in `backend/src/Repository/`, repositories contain custom database queries beyond basic CRUD operations.

**Example:** `UserRepository.php` might contain methods like:
- `findActiveUsers()`
- `findDentistsByService($serviceId)`
- `findPatientsByDentist($dentistId)`

---

## Frontend Structure

### Routing System

**Main Router:** [`frontend/src/App.tsx`](file:///c:/College_/Projects/Toothalie_Project/frontend/src/App.tsx)

Uses React Router v6 for client-side routing:

```tsx
<Routes>
  {/* Public routes */}
  <Route path='/' element={<LandingPage />} />
  <Route path='/login' element={<LoginPage />} />
  <Route path='/register' element={<RegisterPage />} />
  <Route path='/unauthorized' element={<Unauthorized />} />
  
  {/* Protected routes */}
  <Route path='/user' element={
    <ProtectedRoute allowedRoles={["ROLE_PATIENT", "ROLE_DENTIST"]}>
      <UserDashboard />
    </ProtectedRoute>
  } />
  
  <Route path='/admin' element={
    <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
      <UserDashboard />
    </ProtectedRoute>
  } />
</Routes>
```

### Page Organization

#### 1. **Public Pages** (`src/Pages/`)

- `LandingPage.tsx` - Home page
- `Auth/LoginPage.tsx` - Login form
- `Auth/RegisterPage.tsx` - Registration form
- `ErrorRoute/Unauthorized.tsx` - 403 error page

#### 2. **Authenticated Pages** (`src/Pages/Authenticated/`)

**Main Dashboard:**
- `UserDashboard.tsx` - Role-based dashboard container
- `UserPage.tsx` - User profile page

**Dashboard Panes** (loaded dynamically based on user role):

**Patient Panes** (`Panes/PatientPane/`):
- `Patient.tsx` - Main patient dashboard
- `UpcomingAppointment.tsx` - View upcoming appointments
- `AppointmentModal.tsx` - Book new appointment
- `EditModal.tsx` - Edit existing appointment
- `ViewAppointmentModal.tsx` - View appointment details
- `DeleteAppointmentModal.tsx` - Cancel appointment

**Dentist Panes** (`Panes/DentistPane/`):
- `Dentist.tsx` - Main dentist dashboard
- `Main.tsx` - Dashboard overview
- `Appointments.tsx` - Manage appointment requests
- `History.tsx` - View appointment history
- `SettingsPane.tsx` - Dentist settings
- `SettingsService.tsx` - Manage offered services
- `Reminder.tsx` - Manage reminders

**Admin Panes** (`Panes/Admin/`):
- `MyAdmin.tsx` - Main admin dashboard
- `AppUser.tsx` - User management table
- `AppUserCreate.tsx` - Create new user
- `AppUserEditModal.tsx` - Edit user
- `Appointment.tsx` - Appointment management
- `AppointmentModal.tsx` - Appointment details
- `Schedule.tsx` - Schedule management
- `ManageService.tsx` - Service management
- `ServiceTypes.tsx` - Service type management
- `DentistService.tsx` - Dentist-service assignments
- `Roles.tsx` - Role management
- `AppointmentTypes.tsx` - Appointment type management
- `Reminder.tsx` - Reminder management
- `Logs.tsx` - Activity logs viewer

**Shared Panes** (`Panes/All/`):
- `MyProfile.tsx` - User profile editor
- `History.tsx` - Appointment history

### API Service Layer

Located in `frontend/src/API/`, this layer abstracts backend communication:

**Structure:**

```
API/
├── AuthenticateUser.ts          # Validate JWT token
├── LoginAuth.ts                 # Login request
├── RegisterAuth.ts              # Registration request
└── Authenticated/
    ├── GetDentist.ts            # Fetch dentists
    ├── GetRoles.ts              # Fetch roles
    ├── GetUserInfoAPI.ts        # Fetch user info
    ├── ChangePassword.ts        # Change password
    ├── Logout.ts                # Logout request
    ├── RegisterUser.ts          # Register new user
    ├── admin/                   # Admin API calls
    │   ├── AdminAppointment.ts
    │   ├── AdminService.ts
    │   ├── AdminUser.ts
    │   └── ... (11 files total)
    ├── appointment/             # Appointment API calls
    │   ├── GetAppointments.ts
    │   ├── CreateAppointment.ts
    │   ├── UpdateAppointment.ts
    │   └── ... (7 files total)
    └── Dentist/                 # Dentist API calls
        ├── GetAppointments.ts
        └── UpdateAppointment.ts
```

**API Call Pattern:**

```typescript
// Example: frontend/src/API/Authenticated/appointment/GetAppointments.ts
export async function getAppointments(token: string) {
  const response = await fetch('/api/appointments', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}
```

### State Management

- **Authentication State:** Stored in `localStorage` as `userInfo` object
- **Component State:** React hooks (`useState`, `useEffect`)
- **No global state library** (Redux, Zustand) currently implemented

---

## Database Schema

### Core Tables

#### `user`

Stores all users (patients, dentists, admins).

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `email` | VARCHAR(180) UNIQUE | User email |
| `username` | VARCHAR(100) UNIQUE | Username |
| `password` | VARCHAR | Hashed password |
| `first_name` | VARCHAR(50) | First name |
| `last_name` | VARCHAR(50) | Last name |
| `roles` | JSON | Array of role strings |
| `created_at` | DATETIME | Account creation timestamp |
| `disable` | BOOLEAN | Account status |

#### `appointment`

Stores appointment records.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `appointment_date` | DATETIME | Scheduled date/time |
| `patient_id` | INT (FK) | References `user.id` |
| `dentist_id` | INT (FK) | References `user.id` |
| `schedule_id` | INT (FK) | References `schedule.id` |
| `service_id` | INT (FK) | References `service.id` |
| `appointment_type_id` | INT (FK) | References `appointment_type.id` |
| `emergency` | BOOLEAN | Emergency flag |
| `status` | VARCHAR(50) | Status (pending, approved, rejected, completed) |
| `message` | VARCHAR(200) | Patient message/notes |
| `user_set_date` | VARCHAR(50) | User-preferred date |
| `deleted_on` | DATETIME | Soft delete timestamp |

#### `schedule`

Dentist availability time slots.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `dentist_id` | INT (FK) | References `user.id` |
| `day_of_week` | VARCHAR(20) | Day name (Monday, Tuesday, etc.) |
| `start_time` | TIME | Slot start time |
| `end_time` | TIME | Slot end time |
| `is_available` | BOOLEAN | Availability flag |

#### `service`

Dental services offered.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `service_name` | VARCHAR(100) | Service name |
| `description` | TEXT | Service description |
| `service_type_id` | INT (FK) | References `service_type.id` |
| `price` | DECIMAL | Service price |

#### `service_type`

Service categories (e.g., "Consultation", "Surgery").

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `type_name` | VARCHAR(100) | Type name |
| `description` | TEXT | Type description |

#### `dentist_service`

Links dentists to services they provide.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `user_id` | INT (FK) | References `user.id` (dentist) |
| `service_id` | INT (FK) | References `service.id` |

#### `role`

User roles.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `role_name` | VARCHAR(50) | Role name (ROLE_PATIENT, ROLE_DENTIST, ROLE_ADMIN) |

#### `user_role`

Junction table for user-role many-to-many relationship.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `user_id` | INT (FK) | References `user.id` |
| `role_id` | INT (FK) | References `role.id` |

#### `appointment_type`

Types of appointments (e.g., "Checkup", "Emergency").

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `type_name` | VARCHAR(100) | Type name |

#### `reminder`

Appointment reminders.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `appointment_id` | INT (FK) | References `appointment.id` |
| `reminder_date` | DATETIME | When to send reminder |
| `sent` | BOOLEAN | Whether reminder was sent |

#### `activity_log`

System-wide activity audit trail.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK) | Primary key |
| `user_id` | INT (FK) | References `user.id` |
| `action` | VARCHAR(255) | Action performed |
| `timestamp` | DATETIME | When action occurred |
| `details` | TEXT | Additional details |

### Entity Relationships Diagram

```mermaid
erDiagram
    USER ||--o{ APPOINTMENT : "patient"
    USER ||--o{ APPOINTMENT : "dentist"
    USER ||--o{ SCHEDULE : "has"
    USER ||--o{ DENTIST_SERVICE : "provides"
    USER }o--o{ ROLE : "has"
    
    APPOINTMENT }o--|| SCHEDULE : "scheduled_in"
    APPOINTMENT }o--|| SERVICE : "for"
    APPOINTMENT }o--|| APPOINTMENT_TYPE : "type"
    APPOINTMENT ||--o{ REMINDER : "has"
    
    SERVICE }o--|| SERVICE_TYPE : "categorized_as"
    SERVICE ||--o{ DENTIST_SERVICE : "offered_by"
    
    USER_ROLE }o--|| USER : "belongs_to"
    USER_ROLE }o--|| ROLE : "has"
```

---

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/login-auth` | User login | `{ username, password }` | `{ token }` |
| POST | `/api/register` | User registration | `{ email, username, password, firstName, lastName }` | `{ status, message }` |

### Authenticated Endpoints (All Roles)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/auth/me` | Validate token & get user info | ✅ |
| GET | `/api/auth-user-info` | Get detailed user info | ✅ |
| GET | `/api/get-login-user` | Get logged-in user data | ✅ |
| POST | `/api/logout` | Logout user | ✅ |
| GET | `/api/dentists` | List all dentists | ✅ |
| GET | `/api/services` | List all services | ✅ |
| GET | `/api/roles` | List all roles | ✅ |
| GET | `/api/appointment-types` | List appointment types | ✅ |
| GET | `/api/history` | Get appointment history | ✅ |
| POST | `/api/change-password` | Change user password | ✅ |

### Patient Endpoints

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| POST | `/api/patient/appointment` | Create appointment | ROLE_PATIENT |
| PUT | `/api/patient/appointment/{id}` | Update appointment | ROLE_PATIENT |
| DELETE | `/api/patient/appointment/{id}` | Cancel appointment | ROLE_PATIENT |
| GET | `/api/patient/appointment/{id}` | Get appointment details | ROLE_PATIENT |

### Dentist Endpoints

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| GET | `/api/dentist/appointments` | List dentist's appointments | ROLE_DENTIST |
| PUT | `/api/dentist/appointment/{id}` | Approve/reject appointment | ROLE_DENTIST |
| GET | `/api/dentist/appointment/{id}` | Get appointment details | ROLE_DENTIST |
| PUT | `/api/dentist/settings` | Update dentist settings | ROLE_DENTIST |
| GET | `/api/dentist/reminders` | Get reminders | ROLE_DENTIST |

### Admin Endpoints

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/users` | List all users | ROLE_ADMIN |
| POST | `/api/admin/users` | Create user | ROLE_ADMIN |
| PUT | `/api/admin/users/{id}` | Update user | ROLE_ADMIN |
| DELETE | `/api/admin/users/{id}` | Delete user | ROLE_ADMIN |
| GET | `/api/admin/appointments` | List all appointments | ROLE_ADMIN |
| GET | `/api/admin/schedules` | List all schedules | ROLE_ADMIN |
| POST | `/api/admin/schedules` | Create schedule | ROLE_ADMIN |
| PUT | `/api/admin/schedules/{id}` | Update schedule | ROLE_ADMIN |
| DELETE | `/api/admin/schedules/{id}` | Delete schedule | ROLE_ADMIN |
| GET | `/api/admin/services` | List all services | ROLE_ADMIN |
| POST | `/api/admin/services` | Create service | ROLE_ADMIN |
| PUT | `/api/admin/services/{id}` | Update service | ROLE_ADMIN |
| DELETE | `/api/admin/services/{id}` | Delete service | ROLE_ADMIN |
| GET | `/api/admin/service-types` | List service types | ROLE_ADMIN |
| POST | `/api/admin/service-types` | Create service type | ROLE_ADMIN |
| GET | `/api/admin/dentist-services` | List dentist-service mappings | ROLE_ADMIN |
| POST | `/api/admin/dentist-services` | Assign service to dentist | ROLE_ADMIN |
| GET | `/api/admin/roles` | List all roles | ROLE_ADMIN |
| GET | `/api/admin/activity-logs` | View activity logs | ROLE_ADMIN |
| GET | `/api/admin/reminders` | List all reminders | ROLE_ADMIN |

---

## Key Processes

### 1. User Registration Process

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Fill registration form
    Frontend->>Backend: POST /api/register
    Backend->>Backend: Validate input
    Backend->>Backend: Hash password
    Backend->>Database: Insert user record
    Backend->>Database: Assign default role (ROLE_PATIENT)
    Database-->>Backend: Success
    Backend-->>Frontend: { status: "success" }
    Frontend-->>User: Show success message
    Frontend->>Frontend: Redirect to login
```

### 2. Appointment Booking Process (Patient)

```mermaid
sequenceDiagram
    participant Patient
    participant Frontend
    participant Backend
    participant Database

    Patient->>Frontend: Select dentist, service, date
    Frontend->>Backend: GET /api/dentists
    Backend-->>Frontend: List of dentists
    Frontend->>Backend: GET /api/services
    Backend-->>Frontend: List of services
    Patient->>Frontend: Submit appointment request
    Frontend->>Backend: POST /api/patient/appointment
    Backend->>Database: Create appointment (status: pending)
    Backend->>Database: Log activity
    Database-->>Backend: Success
    Backend-->>Frontend: { status: "success", appointmentId }
    Frontend-->>Patient: Show confirmation
```

### 3. Appointment Approval Process (Dentist)

```mermaid
sequenceDiagram
    participant Dentist
    participant Frontend
    participant Backend
    participant Database

    Dentist->>Frontend: View pending appointments
    Frontend->>Backend: GET /api/dentist/appointments
    Backend->>Database: Fetch appointments (status: pending)
    Database-->>Backend: Appointment list
    Backend-->>Frontend: Appointment data
    Dentist->>Frontend: Approve/reject appointment
    Frontend->>Backend: PUT /api/dentist/appointment/{id}
    Backend->>Database: Update appointment status
    Backend->>Database: Log activity
    Database-->>Backend: Success
    Backend-->>Frontend: { status: "success" }
    Frontend-->>Dentist: Show confirmation
```

### 4. Schedule Management Process (Admin/Dentist)

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant Backend
    participant Database

    Admin->>Frontend: Access schedule management
    Frontend->>Backend: GET /api/admin/schedules
    Backend->>Database: Fetch all schedules
    Database-->>Backend: Schedule data
    Backend-->>Frontend: Schedule list
    Admin->>Frontend: Create/update schedule
    Frontend->>Backend: POST/PUT /api/admin/schedules
    Backend->>Database: Insert/update schedule
    Backend->>Database: Log activity
    Database-->>Backend: Success
    Backend-->>Frontend: { status: "success" }
    Frontend-->>Admin: Show confirmation
```

### 5. Token Refresh Strategy

> **Note:** Currently, the system does **not** implement automatic token refresh. Tokens expire after 1 hour, requiring users to log in again.

**Future Enhancement Recommendation:**
Implement refresh tokens to improve user experience:

1. Issue both access token (short-lived, 15 min) and refresh token (long-lived, 7 days)
2. Store refresh token in httpOnly cookie
3. When access token expires, use refresh token to obtain new access token
4. Invalidate refresh tokens on logout

---

## Development Workflow

### Environment Setup

1. **Prerequisites:**
   - Docker & Docker Compose
   - Node.js & pnpm
   - PHP 8.2+ & Composer

2. **Installation:**

   ```bash
   # Clone repository
   git clone <repository-url>
   cd Toothalie_Project

   # Backend setup
   cd backend
   composer install
   cp .env .env.local
   # Configure database credentials in .env.local

   # Frontend setup
   cd ../frontend
   pnpm install

   # Start Docker containers (MySQL + phpMyAdmin)
   cd ..
   docker-compose --env-file ./backend/.env up -d

   # Run migrations
   cd backend
   php bin/console doctrine:migrations:migrate

   # Start development servers
   cd ..
   pnpm toothalie  # Starts both frontend and backend
   ```

3. **Access:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://127.0.0.1:8000`
   - phpMyAdmin: `http://localhost:8080`
   - MySQL: `localhost:3307`

### Database Migrations

```bash
# Create new entity
cd backend
php bin/console make:entity

# Generate migration from entity changes
php bin/console doctrine:migrations:diff

# Apply migrations
php bin/console doctrine:migrations:migrate

# Rollback last migration
php bin/console doctrine:migrations:migrate prev
```

### Adding New API Endpoint

1. **Create Controller:**

   ```php
   // backend/src/Controller/API/Authenticated/MyController.php
   namespace App\Controller\API\Authenticated;

   use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
   use Symfony\Component\HttpFoundation\JsonResponse;
   use Symfony\Component\Routing\Attribute\Route;

   class MyController extends AbstractController
   {
       #[Route('/api/my-endpoint', name: 'my_endpoint', methods: ['GET'])]
       public function index(): JsonResponse
       {
           return new JsonResponse(['status' => 'ok']);
       }
   }
   ```

2. **Add Access Control (if needed):**

   Edit `backend/config/packages/security.yaml`:

   ```yaml
   access_control:
       - { path: ^/api/my-endpoint, roles: ROLE_ADMIN }
   ```

3. **Create Frontend Service:**

   ```typescript
   // frontend/src/API/Authenticated/MyService.ts
   export async function myEndpoint(token: string) {
     const response = await fetch('/api/my-endpoint', {
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       }
     });
     return await response.json();
   }
   ```

### Adding New Frontend Route

1. **Create Page Component:**

   ```tsx
   // frontend/src/Pages/MyPage.tsx
   export default function MyPage() {
     return <div>My Page</div>;
   }
   ```

2. **Add Route:**

   Edit `frontend/src/App.tsx`:

   ```tsx
   import MyPage from './Pages/MyPage';

   <Routes>
     <Route path='/my-page' element={
       <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
         <MyPage />
       </ProtectedRoute>
     } />
   </Routes>
   ```

### Debugging Tips

1. **Backend Debugging:**
   - Check Symfony logs: `backend/var/log/dev.log`
   - Use `dump()` and `dd()` functions in controllers
   - Enable Symfony profiler toolbar in development

2. **Frontend Debugging:**
   - Check browser console for errors
   - Use React DevTools extension
   - Inspect network tab for API requests/responses

3. **Database Debugging:**
   - Access phpMyAdmin at `http://localhost:8080`
   - Check query logs in MySQL
   - Use Doctrine query logger

### Common Issues

1. **CORS Errors:**
   - Ensure NelmioCorsBundle is properly configured
   - Check `backend/config/packages/nelmio_cors.yaml`

2. **JWT Token Errors:**
   - Verify JWT keys exist: `backend/config/jwt/private.pem` and `public.pem`
   - Check token expiration (1 hour TTL)
   - Ensure `Authorization: Bearer <token>` header is included

3. **Database Connection Issues:**
   - Verify Docker containers are running: `docker ps`
   - Check database credentials in `backend/.env`
   - Ensure port 3307 is not in use

---

## Security Considerations

### Current Security Measures

1. **Password Hashing:** Symfony's automatic password hashing (bcrypt/argon2)
2. **JWT Authentication:** Stateless token-based authentication
3. **CORS Protection:** Configured via NelmioCorsBundle
4. **Role-Based Access Control:** Granular permissions per endpoint
5. **Input Validation:** Symfony validation constraints on entities
6. **SQL Injection Protection:** Doctrine ORM parameterized queries

### Security Best Practices for Future Development

1. **Rate Limiting:** Implement API rate limiting to prevent brute-force attacks
2. **HTTPS Only:** Enforce HTTPS in production
3. **Token Refresh:** Implement refresh token mechanism
4. **CSRF Protection:** Add CSRF tokens for state-changing operations
5. **Input Sanitization:** Validate and sanitize all user inputs
6. **Audit Logging:** Expand activity logging for security events
7. **Password Policies:** Enforce strong password requirements
8. **Session Timeout:** Implement automatic logout after inactivity

---

## Appendix

### Technology Stack Details

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Backend Framework | Symfony | 7.3+ | PHP web application framework |
| ORM | Doctrine | 2.x | Database abstraction layer |
| Authentication | LexikJWTAuthenticationBundle | 2.x | JWT token generation/validation |
| CORS | NelmioCorsBundle | 2.x | Cross-origin resource sharing |
| Frontend Framework | React | 19 | UI library |
| Language | TypeScript | 5.x | Type-safe JavaScript |
| Build Tool | Vite | 5.x | Fast development server & bundler |
| Styling | Tailwind CSS | 3.x | Utility-first CSS framework |
| UI Components | Radix UI | Latest | Accessible component primitives |
| Routing | React Router | 6.x | Client-side routing |
| Data Tables | TanStack Table | 8.x | Headless table library |
| Charts | Recharts | 2.x | Charting library |
| Database | MySQL | 8.0 | Relational database |
| Containerization | Docker | Latest | Container platform |

### Useful Commands Reference

```bash
# Backend
cd backend
php bin/console cache:clear              # Clear cache
php bin/console debug:router             # List all routes
php bin/console doctrine:schema:validate # Validate database schema
php bin/console make:controller          # Create new controller
php bin/console make:entity              # Create/update entity
symfony server:start                     # Start Symfony dev server

# Frontend
cd frontend
pnpm dev                                 # Start dev server
pnpm build                               # Build for production
pnpm preview                             # Preview production build
pnpm lint                                # Run ESLint

# Docker
docker-compose up -d                     # Start containers
docker-compose down                      # Stop containers
docker-compose logs -f                   # View logs
docker-compose ps                        # List running containers

# Database
docker exec -it <mysql-container> mysql -u root -p  # Access MySQL CLI
```

### Environment Variables

**Backend** (`.env`):

```env
DATABASE_URL="mysql://user:password@127.0.0.1:3307/toothalie?serverVersion=8.0"
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=your_passphrase
```

**Frontend** (`.env`):

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

---

## Conclusion

This documentation provides a comprehensive overview of the Toothalie dental clinic management system. For specific implementation details, refer to the source code files linked throughout this document.

**For Questions or Contributions:**
- Review the codebase structure outlined in this document
- Follow the established patterns for new features
- Ensure all new endpoints have proper authentication and authorization
- Write migrations for all database schema changes
- Test thoroughly before deploying

**Last Updated:** February 5, 2026  
**Maintained By:** Development Team

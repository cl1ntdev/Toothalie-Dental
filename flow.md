### The Big Picture

Your application uses a common and secure method for handling user authentication called **token-based authentication**. Instead of keeping the user's session alive on the server, the server gives the client (your React app) a signed "pass" (the JWT) after a successful login. The client then shows this pass to the server for every subsequent request to prove who they are.

The flow can be broken down into two main parts:
1.  **The Login Flow**: How the user gets the token.
2.  **The Authenticated Request Flow**: How the user uses the token to access protected resources.

---

### 1. The Login Flow (Getting the Token)

This is the step-by-step process that occurs when the user fills out your login form and clicks "Login".

**Frontend (React)**
1.  **User Submits Credentials**: In your `front-e/src/components/login-form.tsx` component, the user enters their username and password. When they submit the form, the `handleLogin` function is called.

2.  **API Call**: This function calls the `LoginAuth` service located in `front-e/src/API/LoginAuth.ts`. This service makes a `POST` request to your Symfony backend at the specific endpoint `http://127.0.0.1:8000/api/login-auth`, sending the username and password in the request's JSON body.

**Backend (Symfony)**
3.  **Receiving the Request**: The backend receives the `POST` request. Your `back-e/config/packages/security.yaml` file is configured to handle this. The `login` firewall is set up to watch the `/api/login-auth` pattern.

4.  **Authentication**: The `json_login` configuration under this firewall tells Symfony to:
    *   Extract the `username` and `password` from the JSON body.
    *   Verify these credentials against the `User` entity in your database (as defined by the `app_user_provider`).

5.  **JWT Generation**: If the credentials are correct, the `success_handler` (`lexik_jwt_authentication.handler.authentication_success`) is triggered. This is part of the `LexikJWTAuthenticationBundle` you are using.
    *   Based on your `back-e/config/packages/lexik_jwt_authentication.yaml`, this bundle generates a JWT.
    *   The token is signed using a secure private key (`private.pem`).
    *   The token is set to expire in **1 hour** (`token_ttl: 3600`).

6.  **Sending the Token**: The success handler sends a JSON response back to your React application. This response contains the newly created JWT.

**Frontend (React)**
7.  **Storing the Token**: Back in `login-form.tsx`, the `handleLogin` function receives the response containing the token. It then stores this information in the browser's `localStorage` using `localStorage.setItem('userInfo', ...)`.

8.  **Navigation**: The user is then redirected to the `/user` page, now being authenticated on the client side.

---

### 2. The Authenticated Request Flow (Using the Token)

Now that the user is logged in and has a token, they can access protected parts of your application. Your code has a "remember me" feature that demonstrates this perfectly.

**Frontend (React)**
1.  **Page Load Check**: When the `login-form.tsx` component first loads, a `useEffect` hook runs. It checks `localStorage` for the `userInfo` object.

2.  **Token Found**: If a token is found, the `authenticateUser` function from `front-e/src/API/AuthenticateUser.ts` is called.

3.  **Making an Authenticated API Call**: This function sends a `GET` request to the backend endpoint `http://127.0.0.1:8000/api/auth/me`. Crucially, it adds the JWT to the request headers:
    ```
    Authorization: Bearer <your_jwt_here>
    ```

**Backend (Symfony)**
4.  **Firewall Protection**: The request arrives at the backend. The `api` firewall in `security.yaml` is configured to protect all routes under `/api`. The `jwt: ~` line tells it to use the JWT authenticator.

5.  **Token Validation**: The JWT authenticator automatically:
    *   Looks for the `Authorization: Bearer ...` header.
    *   Verifies that the token's signature is valid using the public key (`public.pem`).
    *   Checks that the token has not expired.

6.  **Granting Access**: If the token is valid, the authenticator "logs in" the user for this specific request. Your `access_control` rules in `security.yaml` allow authenticated users (`IS_AUTHENTICATED_FULLY`) to access `/api/auth/me`.

7.  **Returning User Data**: The request is allowed to proceed to the `MeController.php`. This controller uses Symfony's `Security` service to get the user object that the authenticator just identified. It then returns a JSON response with the user's email and roles.

**Frontend (React)**
8.  **Confirmation**: The `authenticateUser` function receives the successful response from the backend. It sees the `"ok"` status and navigates the user directly to the `/user` page, successfully re-authenticating them without requiring another login.

### Summary

In short, your frontend logs in to get a temporary "pass" (JWT) from the backend. It stores this pass and shows it to the backend on every subsequent request to prove its identity. Your backend is set up to issue these passes upon a correct login and to check their validity for any protected API endpoint, which is a robust and standard way to handle authentication in modern web applications.

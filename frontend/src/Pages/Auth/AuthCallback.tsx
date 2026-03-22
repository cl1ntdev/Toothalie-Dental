// src/pages/AuthCallback.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authenticateUser } from "@/API/AuthenticateUser"; 

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("Completing secure login...");

  useEffect(() => {
    const processGoogleLogin = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (token) {
        localStorage.setItem('userInfo', JSON.stringify({ token }));
        setAuthStatus("Validating token...");
        try {
          const validation = await authenticateUser(token);
          if (validation.status === 'ok') {
            localStorage.setItem('userDetails', JSON.stringify(validation.user));
            navigate('/user'); 
          } else {
            localStorage.removeItem('userInfo');
            navigate('/login?error=ValidationFailed');
          }
        } catch (err) {
          console.error("Auth Check Error:", err);
          localStorage.removeItem('userInfo');
          navigate('/login?error=ServerError');
        }
      } else if (error) {
        console.error("Google Login Failed:", error);
        navigate('/login?error=' + encodeURIComponent(error));
      } else {
        navigate('/login');
      }
    };

    processGoogleLogin();
  }, [searchParams, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-muted-foreground animate-pulse font-ceramon">
          {authStatus}
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
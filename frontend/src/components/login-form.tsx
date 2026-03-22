import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Alert from "@/components/_myComp/Alerts";

import LoginAuth from "@/API/LoginAuth" 
import { UserLoginInfoClass } from "@/Classes/UserLogin"
import { useState, useEffect } from "react"
import { authenticateUser } from "@/API/AuthenticateUser"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [userName, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [alert, setAlert] = useState({ 
       show: false, 
       type: "info", 
       title: "", 
       message: "" 
     });
 
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const errorMsg = searchParams.get("error");
    if (errorMsg) {
      setAlert({
        show: true,
        type: "error",
        title: "Login Failed",
        message: errorMsg
      });
      
      searchParams.delete("error");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);
  
  useEffect(() => {
    const checkStoredToken = async () => {
      setIsCheckingAuth(true); 
  
      const userInfoStr = localStorage.getItem('userInfo');
      
      if (!userInfoStr) {
        setIsCheckingAuth(false); 
        return;
      }
  
      let token = null;
  
      try {
        const parsedUser = JSON.parse(userInfoStr);
        token = parsedUser?.token;
      } catch (e) {
        console.error("Local Storage data corrupted, clearing... error", e);
        localStorage.removeItem('userInfo');
        setIsCheckingAuth(false);
        return;
      }
  
      if (!token) {
        setIsCheckingAuth(false);
        return;
      }
  
      try {
        const check = await authenticateUser(token);
        
        if (check.status === 'ok') {
          navigate('/user'); 
        } else {
          localStorage.removeItem('userInfo');
          setIsCheckingAuth(false); 
        }
      } catch (err) {
        console.error("Auth Check Error:", err);
        localStorage.removeItem('userInfo');
        setIsCheckingAuth(false);
      }
    };
  
    checkStoredToken();
  }, [navigate]);
  
  const handleLogin = async () => {
    try {
      setIsSubmitting(true);
      const user = new UserLoginInfoClass(userName, password)
      
      const userLoginInfo = await LoginAuth(user) 
      const token = userLoginInfo?.token || userLoginInfo?.access_token || userLoginInfo?.data?.token || null;
      
      if (userLoginInfo.code === 401 || !token) {
        setAlert({
            show: true,
            type: "error", 
            title: "Login Error",
            message: userLoginInfo.message || "Invalid username or password. Please try again."
        });
        setIsSubmitting(false);
        return; 
      }
      
      localStorage.setItem('userInfo', JSON.stringify({ token }))

      const validation = await authenticateUser(token);
      if (validation.status === 'ok') {
        localStorage.setItem('userDetails', JSON.stringify(validation.user));
        navigate(`/user`);
      } else {
        localStorage.removeItem('userInfo');
        setAlert({ 
            show: true, 
            type: 'error', 
            title: 'Authentication Failed', 
            message: 'Unable to validate credentials. Please try again.' 
        });
      }
            
    } catch (e) {
      setAlert({
          show: true,
          type: "error",
          title: "Login Error",
          message: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/connect/google';
  };
  
  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Checking credentials...</p>
      </div>
    );
  }
  
  return (
    <form className={cn("flex flex-col gap-6", className)}
     onSubmit={(e) => {
       e.preventDefault();
       handleLogin();
     }}
      {...props}>
      <div className="flex flex-col font-ceramon items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your Username and Password below 
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input 
             onChange={(e) => setUsername(e.target.value)} 
             id="username" 
             type="text" 
             placeholder="johndoe" 
             maxLength={20}
             required 
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input 
            onChange={(e) => setPassword(e.target.value)} 
            id="password" 
            type="password" 
            required 
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Login with Google
        </Button>
      </div>
      
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">Sign up</Link>
      </div>

      <Alert 
          isOpen={alert.show} 
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })} 
      />
    </form>
  )
}
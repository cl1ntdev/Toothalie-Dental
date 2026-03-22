import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { registerUser } from "@/API/Authenticated/RegisterUser"
import Alert from "@/components/_myComp/Alerts";
// Import the modal we just created
import VerifyEmailModal from "./_myComp/VerifyEmail" 

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate()
  
  // State for the alerts
  const [alert, setAlert] = useState({ 
       show: false, 
       type: "info", 
       title: "", 
       message: "" 
     });

  // State to control the Verification Modal
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  
  // State for form loading button (optional but recommended)
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    contact_no: "",
    email: "",
    password: "",
    confPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleRegister = async () => {
    if (form.password.trim() !== form.confPassword.trim()) {
      setAlert({
          show: true,
          type: "error",
          title: "Password does not match!",
          message: "Please ensure both passwords match."
      });
      return;
    }

    setIsSubmitting(true);
    const created_at = new Date().toISOString();

    try {
      const res = await registerUser(
        form.email,
        form.password,
        form.username,
        form.first_name,
        form.last_name,
        created_at
      );

      console.log("Register Response:", res);

      if (!res || res.status !== 'ok') {
        setAlert({
            show: true,
            type: "error",
            title: "Failed to Register",
            message: res?.message || "Failed to register account. Please try again later."
        });
      } else {
        // SUCCESS: Open the verification email modal!
        setIsVerifyModalOpen(true);
      }
    } catch (error) {
      setAlert({
          show: true,
          type: "error",
          title: "Registration Error",
          message: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={(e) => {
          e.preventDefault()
          handleRegister()
        }}
        {...props}
      >
        <div className="flex font-ceramon flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill out the details below to register your account
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="Enter username"
              onChange={handleChange} required />
          </div>

          <div className="flex gap-2">
            <div className="grid gap-3 w-full">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" type="text" placeholder="Enter your first name"
                onChange={handleChange} required />
            </div>

            <div className="grid gap-3 w-full">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" type="text" placeholder="Enter your last name"
                onChange={handleChange} required />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="grid gap-3 w-full">
              <Label htmlFor="contact_no">Contact Number</Label>
              <Input
                id="contact_no"
                type="text"
                placeholder="09XXXXXXXXX"
                maxLength={11}
                pattern="^09[0-9]{9}$"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-3 w-full">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com"
                onChange={handleChange} required />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={handleChange} required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="confPassword">Confirm Password</Label>
            <Input id="confPassword" type="password" onChange={handleChange} required />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">Login</Link>
        </div>
        
        <Alert 
            isOpen={alert.show} 
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert({ ...alert, show: false })} 
        />
      </form>

      {/* Put the modal outside the form so it overlays the entire screen properly */}
      <VerifyEmailModal 
        isOpen={isVerifyModalOpen} 
        onClose={() => setIsVerifyModalOpen(false)} 
      />
    </>
  )
}
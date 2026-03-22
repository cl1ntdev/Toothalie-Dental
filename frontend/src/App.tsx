
import './App.css'
import LandingPage from './Pages/LandingPage'
import { Routes, Route } from "react-router-dom";
import LoginPage from './Pages/Auth/LoginPage';
import  RegisterPage  from './Pages/Auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './Pages/Authenticated/UserDashboard';
import ToothalieAdmin from './Pages/Auth/ToothalieAdmin';
import Unauthorized from './Pages/ErrorRoute/Unauthorized';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import AuthCallback from './Pages/Auth/AuthCallback';
import Estrellanes from './Pages/Authenticated/Panes/Midterm_Requirement/Estrellanes';
function App() {

  return (
    <>
      <Routes>
        {/* <Route path='/user/:id' element={<UserPage />} /> {/* use LINK to navigate and then useParams to get the value */} 
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/contacts' element={<ContactPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/toothalieAdmin' element={<ToothalieAdmin />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/midterm-project' element={<Estrellanes />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
       
        <Route path='/user' element={
          <ProtectedRoute allowedRoles={["ROLE_PATIENT","ROLE_DENTIST"]}>
            <UserDashboard />          
          </ProtectedRoute>
        } />
        <Route path='/admin' element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <UserDashboard />          
          </ProtectedRoute>
        } />
        
       
       
        {/*<Route path='/patient/:id' element={<PatientPanel />} />
        <Route path='/dentist/:id' element={<DentistPanel />} />*/}
      </Routes>
    </>
  )
}


export default App

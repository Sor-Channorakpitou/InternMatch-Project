
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext";
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage"; 
import LoginPage from "./pages/LoginPage";
import StudentDash from "./pages/StudentDashboard";
import RecruiterDash from "./pages/RecruiterDashboard"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/StudentDash' element={<StudentDash/>}/>
                <Route path='/RecruiterDash' element={<RecruiterDash/>}/>
            </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
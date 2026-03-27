// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Menu, X, Bookmark, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout, savedJobs, applications } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO [YOU]: Add useState for mobile menu open/close — default false
  // TODO [YOU]: Add useState for scrolled (shadow on scroll) — default 
  const [isOpen, setIsOpen] = useState(false); 
  const [Scrolled, setScrolled] = useState(false);

  // TODO [YOU]: useEffect — listen to window scroll
  //   setScrolled(window.scrollY > 4)
  //   remember to remove the event listener on cleanup

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10); 
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // TODO [YOU]: call logout(), then navigate to "/"
    logout(); 
    setIsOpen(false); 
    navigate("/");
  };

  const hasAcceptedApp = applications?.some(app => app.status === "accepted"); 

   return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-all duration-300 ${
      Scrolled ? "shadow-md py-2" : "py-4"
    }`}>
      {/* MAIN CONTAINER - Starts here and wraps Logo, Desktop Links, and Auth */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* 1. Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg text-white group-hover:scale-110 transition-transform">
            <Briefcase size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Intern<span className="text-blue-600">Match</span>
          </span>
        </Link>

        {/* 2. Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${location.pathname === "/" ? "text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
          >
            Listings
          </Link>

          {user && (
            <Link 
              to="/dashboard" 
              className={`relative text-sm font-medium transition-colors ${location.pathname === "/dashboard" ? "text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
            >
              {role === "student" ? "My Dashboard" : "Recruiter Hub"}
              {hasAcceptedApp && (
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </Link>
          )}
        </div>

        {/* 3. Desktop Auth Controls */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <button 
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate("/login")}
                className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm transition-all active:scale-95"
              >
                Get Started
              </button>
            </>
          ) : (
            <div className="flex items-center gap-5">
              {role === "student" && savedJobs?.size > 0 && (
                <div className="flex items-center gap-1 text-gray-500 hover:text-blue-600 cursor-pointer">
                  <Bookmark size={18} />
                  <span className="text-sm font-bold">{savedJobs.size}</span>
                </div>
              )}
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {user.avatar || user.name?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">{user.name?.split(' ')[0]}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-[10px] uppercase tracking-wider font-bold text-gray-400 hover:text-red-500 text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Mobile Hamburger */}
        <button 
          className="md:hidden p-2 text-gray-600" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div> {/* END OF MAIN CONTAINER */}

      {/* 5. Mobile Dropdown Menu (Outside main flex container) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="p-4 space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Listings</Link>
            {user && (
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">
                {role === "student" ? "My Dashboard" : "Recruiter Hub"}
              </Link>
            )}
            <hr className="border-gray-50" />
            {!user ? (
              <button onClick={() => {navigate("/login"); setIsOpen(false);}} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">
                Sign In
              </button>
            ) : (
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-bold">
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Menu, X, Bookmark } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout, savedJobs } = useAuth();
  const navigate = useNavigate();

  // TODO [YOU]: Add useState for mobile menu open/close — default false
  // TODO [YOU]: Add useState for scrolled (shadow on scroll) — default false

  // TODO [YOU]: useEffect — listen to window scroll
  //   setScrolled(window.scrollY > 4)
  //   remember to remove the event listener on cleanup

  const handleLogout = () => {
    // TODO [YOU]: call logout(), then navigate to "/"
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-shadow ${
      // TODO [YOU]: add "shadow-md" class when scrolled is true
      ""
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* TODO [YOU]: Style logo — blue gradient background, white Briefcase icon, bold "InternMatch" text */}
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-2">
          {/* TODO [YOU]: Link to "/" — label "Listings", highlight if current route */}

          {/* TODO [YOU]: If user is logged in, show Link to "/dashboard"
              — label changes: "My Dashboard" for student, "Recruiter Hub" for recruiter
              — show a green dot badge if any application has status "accepted" */}
        </div>

        {/* Desktop auth controls */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              {/* TODO [YOU]: Ghost "Sign In" button → navigate("/login") */}
              {/* TODO [YOU]: Blue "Get Started" button → navigate("/login") */}
            </>
          ) : (
            <>
              {/* TODO [YOU]: Show saved jobs count with Bookmark icon if savedJobs.size > 0 */}

              {/* TODO [YOU]: Show user avatar circle (initials), user first name, logout button */}
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        {/* TODO [YOU]: Button toggles mobile menu open state — shows Menu or X icon */}

      </div>

      {/* Mobile dropdown menu */}
      {/* TODO [YOU]: Render mobile menu only when open
          — same links as desktop
          — close menu on any link click
          — animate with Tailwind: transition, translate, or just conditional render */}
    </nav>
  );
}

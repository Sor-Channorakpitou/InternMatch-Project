// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import {
  MOCK_STUDENT,
  MOCK_RECRUITER,
  MOCK_APPLICATIONS,
} from "../data/mockData";

// Create context
const AuthContext = createContext(null);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set([2, 7]));
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [resumeFile, setResumeFile] = useState(null);

  // Login
  const login = useCallback((selectedRole) => {
    if (selectedRole === "student") {
      setUser(MOCK_STUDENT);
      setRole("student");
    } else {
      setUser(MOCK_RECRUITER);
      setRole("recruiter");
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
  }, []);

  // Save / Unsave job
  const toggleSave = useCallback((id) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // Apply to job
  const applyToJob = useCallback(
    (internship, coverLetter = "") => {
      setApplications((prev) => {
        const alreadyApplied = prev.find(
          (a) => a.internshipId === internship.id
        );
        if (alreadyApplied) return prev;

        return [
          ...prev,
          {
            id: Date.now(),
            internshipId: internship.id,
            status: "submitted",
            appliedDate: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            company: internship.company,
            role: internship.title,
            nextStep: "Application submitted successfully",
            coverLetter,
            resumeUploaded: !!resumeFile,
          },
        ];
      });
    },
    [resumeFile]
  );

  // Update application status (for recruiter)
  const updateAppStatus = useCallback((appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        savedJobs,
        toggleSave,
        applications,
        applyToJob,
        updateAppStatus,
        resumeFile,
        setResumeFile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
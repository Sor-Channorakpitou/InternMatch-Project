import { createContext, useContext, useState } from "react";

const AuthContext = createContext(); 

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [applications, setAppication] = useState([]); 
    const [savedJobs, setSavedJobs] = useState( new Set()); 


    const login = (role) => setUser({name: "Alex Chan", role}); 
    const logout = () => setUser(null); 
    const applyToJob = (job) => 
        setAppication((prev) => [...prev, {...job, status: "submitted"}]);
    const toggleSave = (id) => 
        setSavedJobs((prev) => {
            const next = new Set(prev); 
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    return (
        <AuthContext.Provider value= {{user, login, logout, applications, applyToJob, savedJobs, toggleSave}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
# InternMatch 🎓
> A React + Tailwind CSS internship discovery & recruitment platform.

---

## 🚀 Quick Start (Create React App + Tailwind)

```bash
npx create-react-app internmatch
cd internmatch
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom lucide-react
```

### Configure Tailwind — edit `tailwind.config.js`
```js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### Add to `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then `npm start` — you're live at http://localhost:3000

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── InternshipCard.jsx
│   ├── FilterBar.jsx
│   ├── ApplyModal.jsx
│   └── StatCard.jsx
├── context/
│   └── AuthContext.jsx       ← global state (auth, applications, saved jobs)
├── data/
│   └── mockData.js           ← all mock internships & applications
├── pages/
│   ├── HomePage.jsx          ← /
│   ├── LoginPage.jsx         ← /login
│   └── DashboardPage.jsx     ← /dashboard
├── App.jsx
└── index.css
```

---

## 🧩 Key Components

### `AuthContext.jsx` — Global State
```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState(new Set());

  const login = (role) => setUser({ name: "Alex Chen", role });
  const logout = () => setUser(null);
  const applyToJob = (job) =>
    setApplications((prev) => [...prev, { ...job, status: "submitted" }]);
  const toggleSave = (id) =>
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <AuthContext.Provider value={{ user, login, logout, applications, applyToJob, savedJobs, toggleSave }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### `App.jsx` — Router Setup
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

### `HomePage.jsx` — Filterable Feed with useMemo
```jsx
import { useState, useMemo } from "react";
import { MOCK_INTERNSHIPS } from "../data/mockData";
import InternshipCard from "../components/InternshipCard";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");

  const filtered = useMemo(() =>
    MOCK_INTERNSHIPS.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchIndustry = industry === "All" || item.industry === industry;
      return matchSearch && matchIndustry;
    }),
    [search, industry]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search roles..."
        className="w-full border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((job) => <InternshipCard key={job.id} job={job} />)}
      </div>
    </div>
  );
}
```

### `InternshipCard.jsx` — Tailwind Card
```jsx
import { Bookmark, MapPin, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function InternshipCard({ job }) {
  const { user, applyToJob, toggleSave, savedJobs, applications } = useAuth();
  const isSaved = savedJobs.has(job.id);
  const applied = applications.find((a) => a.id === job.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: job.logoColor }}>
            {job.logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </div>
        {user && (
          <button onClick={() => toggleSave(job.id)} className="text-gray-400 hover:text-blue-600 transition">
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
        <span className="flex items-center gap-1"><Clock size={12} />{job.duration}</span>
        <span className="font-semibold text-green-600">{job.stipend}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((s) => (
          <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{s}</span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">{job.applicants} applicants</span>
        {user ? (
          applied ? (
            <span className="text-green-600 text-sm font-medium">✓ Applied</span>
          ) : (
            <button onClick={() => applyToJob(job)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
              Apply Now
            </button>
          )
        ) : (
          <span className="text-xs text-gray-400">Sign in to apply</span>
        )}
      </div>
    </div>
  );
}
```

### `DashboardPage.jsx` — Application Tracker
```jsx
import { useAuth } from "../context/AuthContext";

const STATUS_COLORS = {
  submitted:    "bg-blue-100 text-blue-800",
  under_review: "bg-amber-100 text-amber-800",
  accepted:     "bg-green-100 text-green-800",
};

export default function DashboardPage() {
  const { user, applications } = useAuth();

  if (!user) return (
    <div className="text-center py-20 text-gray-400">Please sign in to view your dashboard.</div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.name} 👋</h1>
      <p className="text-gray-500 mb-8">Here's your application tracker.</p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Submitted", key: "submitted", color: "bg-blue-50 text-blue-700" },
          { label: "Under Review", key: "under_review", color: "bg-amber-50 text-amber-700" },
          { label: "Accepted", key: "accepted", color: "bg-green-50 text-green-700" },
        ].map(({ label, key, color }) => (
          <div key={key} className={`${color} rounded-xl p-5 text-center`}>
            <div className="text-3xl font-bold">
              {applications.filter((a) => a.status === key).length}
            </div>
            <div className="text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Applications list */}
      <div className="space-y-3">
        {applications.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No applications yet.</p>
        ) : (
          applications.map((app, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
              <div>
                <p className="font-semibold">{app.title}</p>
                <p className="text-sm text-gray-500">{app.company}</p>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_COLORS[app.status] || ""}`}>
                {app.status.replace("_", " ")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### `Navbar.jsx` — Responsive with Tailwind
```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <Briefcase size={22} /> InternMatch
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition">Listings</Link>
          {user && <Link to="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition">Dashboard</Link>}
          {!user
            ? <Link to="/login" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign In</Link>
            : <button onClick={logout} className="text-sm text-gray-400 hover:text-red-500 transition">Sign Out</button>
          }
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
          <Link to="/" onClick={() => setOpen(false)} className="text-sm py-2">Listings</Link>
          {user && <Link to="/dashboard" onClick={() => setOpen(false)} className="text-sm py-2">Dashboard</Link>}
          {!user
            ? <Link to="/login" onClick={() => setOpen(false)} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg text-center">Sign In</Link>
            : <button onClick={() => { logout(); setOpen(false); }} className="text-sm text-red-400 py-2 text-left">Sign Out</button>
          }
        </div>
      )}
    </nav>
  );
}
```

---

## 👥 Working With Your Friend (Git Collaboration Guide)

### 1. One person creates the repo
```bash
git init
git add .
git commit -m "feat: initial InternMatch setup"
# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/internmatch.git
git push -u origin main
```

### 2. Your friend clones it
```bash
git clone https://github.com/YOUR_USERNAME/internmatch.git
cd internmatch
npm install
npm start
```

### 3. Split the work by feature branch
**You** work on listings & filtering:
```bash
git checkout -b feature/listings-page
# edit HomePage.jsx, InternshipCard.jsx, FilterBar.jsx
git add .
git commit -m "feat: add searchable listings with useMemo filter"
git push origin feature/listings-page
```

**Your friend** works on dashboard & auth:
```bash
git checkout -b feature/dashboard-auth
# edit DashboardPage.jsx, AuthContext.jsx, LoginPage.jsx
git add .
git commit -m "feat: student dashboard and auth context"
git push origin feature/dashboard-auth
```

### 4. Merge via Pull Requests on GitHub
- Both open a Pull Request on GitHub
- Review each other's code, leave comments
- Merge into `main` when approved

### 5. Stay in sync daily
```bash
git checkout main
git pull origin main              # get latest
git checkout feature/your-branch
git merge main                    # bring in your friend's updates
```

### Recommended split of responsibilities

| You | Your Friend |
|-----|-------------|
| `HomePage.jsx` | `DashboardPage.jsx` |
| `InternshipCard.jsx` | `AuthContext.jsx` |
| `FilterBar.jsx` | `LoginPage.jsx` |
| `mockData.js` | `Navbar.jsx` |
| `tailwind.config.js` | `ApplyModal.jsx` |

### Avoid merge conflicts
- Never both edit the same file at the same time
- Commit often with clear messages (`feat:`, `fix:`, `style:`)
- Pull from `main` every morning before starting work

---

## 📦 All npm packages needed

```bash
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
```

---

##  Done checklist

- [ ] `npx create-react-app internmatch`
- [ ] Tailwind installed and configured
- [ ] `react-router-dom` routes set up in `App.jsx`
- [ ] `AuthContext.jsx` wrapping the whole app
- [ ] `mockData.js` populated with internships
- [ ] `HomePage.jsx` with `useMemo` filter working
- [ ] `InternshipCard.jsx` with apply + save buttons
- [ ] `DashboardPage.jsx` showing application status
- [ ] `Navbar.jsx` responsive on mobile
- [ ] Git repo created and friend has cloned it
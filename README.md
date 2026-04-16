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
};
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
│   └── RecruiterDashboard.jsx
|    └── StudentDashboard.jsx     ← /dashboard
├── App.jsx
└── index.css
```

---

## 👥 Working With Team (Git Collaboration Guide)

### 1. One person creates the repo

```bash
git init
git add .
git commit -m "feat: initial InternMatch setup"
# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/internmatch.git
git push -u origin main
```

### 2. Your team clones it

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
git merge main
```

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


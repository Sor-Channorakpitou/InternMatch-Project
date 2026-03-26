// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Zap, Heart } from "lucide-react";

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const footerLinks = {
  "For Students": [
    { label: "Browse Internships", to: "/" },
    { label: "My Dashboard", to: "/dashboard" },
    { label: "Saved Jobs", to: "/dashboard" },
    { label: "Application Tracker", to: "/dashboard" },
  ],
  "For Recruiters": [
    { label: "Post an Internship", to: "/login" },
    { label: "Recruiter Hub", to: "/dashboard" },
    { label: "Analytics", to: "/dashboard" },
    { label: "Applicant Review", to: "/dashboard" },
  ],
  "Company": [
    { label: "About Us", to: "/" },
    { label: "Blog", to: "/" },
    { label: "Careers", to: "/" },
    { label: "Contact", to: "/" },
  ],
};

const stats = [
  { value: "10k+", label: "Students" },
  { value: "240+", label: "Listings" },
  { value: "85+", label: "Companies" },
  { value: "94%", label: "Satisfaction" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">

      {/* Top CTA strip */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-10 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Ready to launch your career?
            </h2>
            <p className="text-blue-200 text-sm">
              Join thousands of students already finding their dream internships.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-all active:scale-95 shadow-sm"
            >
              <Zap size={15} />
              Get Started Free
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 border-2 border-white/30 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-all"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg text-white group-hover:scale-110 transition-transform">
                <Briefcase size={18} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Intern<span className="text-blue-400">Match</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-5">
              The smartest way for students to find internships and for companies to discover top talent — all in one place.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-5">
              <MapPin size={13} />
              Phnom Penh, Cambodia 🇰🇭 · San Francisco, CA 🇺🇸
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: TwitterIcon,  href: "#", label: "Twitter" },
                { Icon: LinkedInIcon, href: "#", label: "LinkedIn" },
                { Icon: GitHubIcon,   href: "#", label: "GitHub" },
                { Icon: MailIcon,     href: "#", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-gray-600">
            © {currentYear} InternMatch. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1.5">
            Made with <Heart size={11} className="text-red-500 fill-red-500" /> for students everywhere
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
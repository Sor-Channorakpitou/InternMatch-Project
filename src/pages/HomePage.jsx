// src/pages/HomePage.jsx
import { useState, useMemo } from "react";
import { MOCK_INTERNSHIPS } from "../data/mockData";
import InternShipCard from "../components/InternShipCard";
import FilterBar from "../components/FilterBar";
import ApplyModal from "../components/ApplyModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Zap, Grid2X2, List } from "lucide-react";

const HomePage = () => {
  const { applyToJob, user } = useAuth();
  const navigate = useNavigate();

  // Filter state
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All Industries");
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");

  // UI state
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [applyTarget, setApplyTarget] = useState(null);
  const [toast, setToast] = useState(null);

  // useMemo filter + sort 
  const filtered = useMemo(() => {
    let filteredInternships = MOCK_INTERNSHIPS.filter(internship => {
      const searchLower = search.toLowerCase();
      const matchSearch = search === "" || 
        internship.title.toLowerCase().includes(searchLower) || 
        internship.company.toLowerCase().includes(searchLower) || 
        internship.skills.some(skill => skill.toLowerCase().includes(searchLower))|| 
        internship.industry.toLowerCase().includes(searchLower);

      const matchIndustry = industry === "All Industries" || internship.industry === industry;
      const matchLocation = location === "All Locations" || internship.location === location;
      const matchType = type === "All Types" || internship.type === type;

      return matchIndustry && matchLocation && matchSearch && matchType;
     });

     // sort by ranking
     filteredInternships.sort((a, b) => {
      switch(sortBy) {
        case "stipend":
          return b.stipendNum - a.stipendNum;
        case "applicants": 
          return a.applicants - b.applicants;
        case "recent": 
          return new Date(b.postedDate) - new Date(a.postedDate);
        default:
          return 0;
      }
     });

     return filteredInternships;
  }, [search, industry, location, type, sortBy]);

  // Helper methods
  const clearFilters = () => {
    setSearch("");
    setIndustry("All Industries");
    setLocation("All Locations");
    setType("All Types");
  };

  // showToast(msg) — sets toast to msg, clears it after 3000ms with setTimeout
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  // handleApply(internship)
  const handleApply = (internship) => {
    if (!user) {
      navigate("/login");
    } else {
      setApplyTarget(internship);
    }
  };

  // submitApplication(cv)
  const submitApplication = async (cv) => {
    await applyToJob(applyTarget, cv);
    showToast(`Successfully applied to ${applyTarget.title} at ${applyTarget.company}!`);
    setApplyTarget(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Hero section ── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">{MOCK_INTERNSHIPS.length}+ internships updated daily</span>
        </div>

        <h1 className="text-5xl font-bold mb-4">Find your perfect
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Internship Match</span>
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto mb-8">Discover thousands of internship opportunities from top companies.</p>


        <div className="flex justify-center gap-4 md:gap-12">
          {/* Companies */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {new Set(MOCK_INTERNSHIPS.map(i => i.company)).size}
            </div>
            <div className="text-sm text-gray-500">Companies</div>
          </div>
          
          {/* Remote roles */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {MOCK_INTERNSHIPS.filter(i => i.type === "Remote").length}
            </div>
            <div className="text-sm text-gray-500">Remote roles</div>
          </div>

          {/* Average stipend */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">$41/hr</div>
            <div className="text-sm text-gray-500">Avg stipend</div>
          </div>

          {/* Acceptance rate */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">14%</div>
            <div className="text-sm text-gray-500">Acceptance rate</div>
          </div>

        </div>
      </div>

      <FilterBar 
        search={search} 
        setSearch={setSearch}
        industry={industry}
        setIndustry={setIndustry}
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        count={filtered.length}
      />

      <div className="flex items-center justify-between my-5 flex-wrap gap-3">
        {/* Sort buttons */}
        <div className="flex items-center gap-2">
          {
            [

              ["recent", "Most Recent"],
              ["stipend", "Highest Pay"],
              ["applicants", "Least Competitive"] 
            
            ].map(([value, label]) => (
              <button key={value} onClick={() => setSortBy(value)} 
              className={`px-3 py-1 rounded-full text-sm ${
                sortBy === value ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
              }`}
              >
                {label}
              </button>
            ))
          }
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid" ? "bg-blue-100 text-blue-600": "bg-gray-100"
            }`}>
            <Grid2X2 className="w-4 h-4" />
          </button>

          <button onClick={() => setViewMode("list")}
          className={`p-2 rounded ${
            viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-gray-100"
          }`}>
            <List className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ── Featured banner ── */}
      {
        search === "" && industry === "All Industries" && location === "All Locations" 
        && type === "All Types" && ( 
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl mb-6">
            {
              (() => {
                const featured = MOCK_INTERNSHIPS[0];

                return (
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h2 className="text-xl font-bold">
                        {featured.title}
                      </h2>
                      <p>{featured.company}</p>
                      <p className="text-sm opacity-80">
                        {featured.stipend} Deadline: {featured.deadline}
                      </p>
                    </div>

                    <button onClick={() => handleApply(featured)}
                      className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition">
                        Apply now 
                    </button>
                  </div>
                );
              })()}
          </div>
        )}

      {/* ── Listings ── */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg mb-3">
            No internships match your filters.
          </p>
          <button onClick={clearFilters} className="text-blue-600 underline">
            Clear all filters
          </button>
        </div>
      )}

      {/* Grid version */}
      {viewMode === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((internship) => (
            <InternShipCard 
            key={internship.id} 
            internship={internship}
            view="grid"
            onApply={handleApply}
            />
          ))}
        </div>
      )}

      {/* List version */}
      { viewMode === "list" && filtered.length > 0 && (
        <div className="flex flex-col gap-3">
          {filtered.map((internship) => (
            <InternShipCard 
              key={internship.id}
              internship={internship}
              view="list"
              onApply={handleApply}
            />
          ))}
        </div>
      )}

      {/* Apply modal */}
      {applyTarget && (
        <ApplyModal 
        internship={applyTarget}
        onClose={() => setApplyTarget(null)}
        onSubmit={submitApplication} 
        />
      )}

      {/* Toast notification */}
      { toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black 
        text-white px-6 py-2 rounded-full shadow-lg transition">
          {toast}
        </div>
      )}
    </div>
  );
}

export default HomePage;

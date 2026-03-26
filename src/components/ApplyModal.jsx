// src/components/ApplyModal.jsx
import { useState, useRef } from "react";
import { X, Upload, FileText, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ApplyModal({ internship, onClose, onSubmit }) {
  const { resumeFile, setResumeFile } = useAuth();

  const [coverLetter, setCoverLetter] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert("Please upload a PDF file.");
      return;
    }
    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    onSubmit(coverLetter);
    setSubmitting(false);
    onClose();
  };

  const dropZoneClass = dragOver
    ? "border-blue-400 bg-blue-50"
    : resumeFile
    ? "border-green-400 bg-green-50"
    : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50";

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-start p-7 pb-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Apply to {internship.company}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{internship.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <hr className="my-5 border-gray-100" />

        <div className="px-7 pb-7 flex flex-col gap-5">

          {/* Resume upload zone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resume / CV <span className="text-red-500">*</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${dropZoneClass}`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              {resumeFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText size={28} className="text-green-500" />
                  <span className="text-sm font-semibold text-green-700">{resumeFile.name}</span>
                  <span className="text-xs text-green-500">Click to replace</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={28} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Drop PDF here or browse</span>
                  <span className="text-xs text-gray-400">PDF only · Max 5MB</span>
                </div>
              )}
            </div>
          </div>

          {/* Cover letter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Letter <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value.slice(0, 1000))}
              placeholder={`Tell ${internship.company} why you're a great fit…`}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-colors"
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {coverLetter.length} / 1000
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!resumeFile || submitting}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
              !resumeFile || submitting
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm active:scale-95"
            }`}
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Zap size={16} />
                Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
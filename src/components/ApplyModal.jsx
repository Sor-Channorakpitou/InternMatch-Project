// src/components/ApplyModal.jsx
import { useState, useRef } from "react";
import { X, Upload, FileText, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Props: internship (object), onClose (fn), onSubmit (fn accepts coverLetter string)
export default function ApplyModal({ internship, onClose, onSubmit }) {
  const { resumeFile, setResumeFile } = useAuth();

  // TODO [FRIEND]: useState for coverLetter — default ""
  // TODO [FRIEND]: useState for dragOver — default false
  // TODO [FRIEND]: useState for submitting — default false
  // TODO [FRIEND]: useRef for hidden file input

  // TODO [FRIEND]: handleFile(file) function
  //   — only accept PDF files (check file.type or file.name)
  //   — if valid, call setResumeFile(file)
  //   — if invalid, maybe show a small error state

  // TODO [FRIEND]: handleDrop(e) function
  //   — e.preventDefault()
  //   — setDragOver(false)
  //   — call handleFile with e.dataTransfer.files[0]

  // TODO [FRIEND]: handleSubmit async function
  //   — setSubmitting(true)
  //   — await a 900ms fake delay (simulate API)
  //   — call onSubmit(coverLetter)
  //   — setSubmitting(false)
  //   — call onClose()

  return (
    // Backdrop — close on backdrop click
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-start p-7 pb-0">
          <div>
            {/* TODO [FRIEND]: Show "Apply to {internship.company}" as h2 */}
            {/* TODO [FRIEND]: Show internship.title as subtitle */}
          </div>
          {/* TODO [FRIEND]: X button calls onClose */}
        </div>

        <hr className="my-5 border-gray-100" />

        <div className="px-7 pb-7 flex flex-col gap-5">

          {/* Resume upload zone */}
          <div>
            {/* TODO [FRIEND]: Label "Resume / CV" with required asterisk */}
            <div
              onClick={() => {/* TODO [FRIEND]: trigger fileRef.current?.click() */}}
              onDragOver={(e) => {/* TODO [FRIEND]: e.preventDefault(); setDragOver(true) */}}
              onDragLeave={() => {/* TODO [FRIEND]: setDragOver(false) */}}
              onDrop={/* TODO [FRIEND]: handleDrop */undefined}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                // TODO [FRIEND]: dragOver → blue border + blue bg
                // TODO [FRIEND]: resumeFile → green border + green bg
                // TODO [FRIEND]: default → gray border + gray bg
                ""
              }`}
            >
              {/* TODO [FRIEND]: hidden file input (ref={fileRef}, accept=".pdf") */}

              {resumeFile ? (
                <div className="flex flex-col items-center gap-2">
                  {/* TODO [FRIEND]: FileText icon in green */}
                  {/* TODO [FRIEND]: show resumeFile.name */}
                  {/* TODO [FRIEND]: "Click to replace" hint text */}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  {/* TODO [FRIEND]: Upload icon in gray */}
                  {/* TODO [FRIEND]: "Drop PDF here or browse" text */}
                  {/* TODO [FRIEND]: "PDF only · Max 5MB" hint */}
                </div>
              )}
            </div>
          </div>

          {/* Cover letter */}
          <div>
            {/* TODO [FRIEND]: Label "Cover Letter" with "(optional)" in gray */}
            {/* TODO [FRIEND]: <textarea>
                — rows={5}, value={coverLetter}, onChange updates state
                — placeholder: "Tell {internship.company} why you're a great fit…"
                — Tailwind: w-full border rounded-xl p-3 text-sm resize-y focus ring */}
            {/* TODO [FRIEND]: character count "{coverLetter.length} / 1000" right-aligned */}
          </div>

          {/* Submit button */}
          {/* TODO [FRIEND]: Button
              — disabled if no resumeFile OR submitting
              — shows spinner + "Submitting…" when submitting
              — shows Zap icon + "Submit Application" normally
              — full width, blue, rounded-xl, py-3 */}
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface Testimony {
  id: number;
  name: string;
  title: string;
  content?: string;
  testimony?: string;
  date?: string;
  created_at?: string;
  status?: string;
  email?: string;
  featured?: boolean;
}

interface TestimonyModalProps {
  testimony: Testimony;
  onClose: () => void;
}

const TestimonyModal: React.FC<TestimonyModalProps> = ({
  testimony,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-liturgical font-bold text-amber-300">
            Testimony Details
          </h3>
          <button
            onClick={onClose}
            className="text-amber-300 hover:text-amber-100 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-slate-900 font-bold text-xl">
            {testimony.name ? testimony.name.charAt(0) : ""}
          </span>
          <div>
            <h4 className="text-xl font-semibold text-amber-300">
              {testimony.name}
            </h4>
            <p className="text-amber-200/70">{testimony.email}</p>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-500/20">
          <p className="text-amber-100 leading-relaxed text-lg italic">
            &quot;
            {testimony.content || testimony.testimony}
            &quot;
          </p>
        </div>
        <div className="flex items-center justify-between text-sm text-amber-300/70 pt-4 border-t border-amber-500/20">
          <span>
            Submitted:{" "}
            {(() => {
              const d = testimony.date || testimony.created_at;
              return d ? new Date(d).toLocaleDateString() : "";
            })()}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              testimony.status === "approved"
                ? "bg-green-500/20 text-green-300"
                : testimony.status === "pending"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {testimony.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonyModal;

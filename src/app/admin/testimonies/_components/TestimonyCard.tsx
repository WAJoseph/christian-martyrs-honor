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

interface TestimonyCardProps {
  testimony: Testimony;
  onView: (testimony: Testimony) => void;
  onStatusChange: (
    id: number,
    status: "approved" | "rejected" | "pending"
  ) => void;
  onDelete: (id: number) => void;
  onFeatureToggle: (id: number) => void;
}

const TestimonyCard: React.FC<TestimonyCardProps> = ({
  testimony,
  onView,
  onStatusChange,
  onDelete,
  onFeatureToggle,
}) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25">
                <span className="text-slate-900 font-bold text-lg">
                  {testimony.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-300">
                  {testimony.name}
                </h3>
                <p className="text-sm text-amber-200/70">{testimony.email}</p>
              </div>
              {testimony.featured && (
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  ✨ Featured
                </div>
              )}
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 mb-4 border border-amber-500/20">
              <p className="text-amber-100 leading-relaxed italic">
                &quot;{testimony.content || testimony.testimony}&quot;
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-amber-300/70">
              <span>
                Submitted:{" "}
                {(() => {
                  const d = testimony.date || testimony.created_at;
                  return d ? new Date(d).toLocaleDateString() : "";
                })()}
              </span>
              <div className="flex items-center space-x-2">
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
          <div className="flex flex-col space-y-2 ml-4">
            <button
              onClick={() => onView(testimony)}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-100 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105"
            >
              View Details
            </button>
            {/* Status toggle buttons for all statuses */}
            <div className="flex flex-col space-y-1">
              {testimony.status !== "approved" && (
                <button
                  onClick={() => onStatusChange(testimony.id, "approved")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-green-100 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 mb-1 flex items-center gap-1"
                  title="Approve"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Approve
                </button>
              )}
              {testimony.status !== "rejected" && (
                <button
                  onClick={() => onStatusChange(testimony.id, "rejected")}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-red-100 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 mb-1 flex items-center gap-1"
                  title="Reject"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Reject
                </button>
              )}
              {testimony.status !== "pending" && (
                <button
                  onClick={() => onStatusChange(testimony.id, "pending")}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-yellow-100 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 mb-1 flex items-center gap-1"
                  title="Mark as Pending"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3"
                    />
                  </svg>
                  Mark as Pending
                </button>
              )}
            </div>
            {/* Delete button */}
            <button
              onClick={() => onDelete(testimony.id)}
              className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-red-700 hover:to-red-900 text-slate-100 hover:text-red-100 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 mt-2 flex items-center gap-1"
              title="Delete"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Delete
            </button>
            <button
              onClick={() => onFeatureToggle(testimony.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
                testimony.featured
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-purple-100"
                  : "bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100"
              }`}
              title={testimony.featured ? "Unfeature" : "Feature"}
            >
              {testimony.featured ? (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.505l6.9-1.002L12 2.25l3.1 6.253 6.9 1.002-5.007 4.617 1.179 6.873z"
                  />
                </svg>
              )}
              {testimony.featured ? "Unfeature" : "Feature"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonyCard;

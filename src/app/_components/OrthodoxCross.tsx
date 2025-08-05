import React from "react";

export default function OrthodoxCross({
  size = 48,
  className = "gold-text animate-float",
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.33)}
      viewBox="0 0 48 64"
      className={className}
    >
      <rect x="20" y="0" width="8" height="60" fill="currentColor" />
      <rect x="11" y="6" width="24" height="6" fill="currentColor" />
      <rect x="4" y="16" width="40" height="8" fill="currentColor" />
      <rect
        x="12"
        y="48"
        width="24"
        height="6"
        fill="currentColor"
        transform="rotate(-15 24 51)"
      />
    </svg>
  );
}

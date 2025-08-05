"use client";
import Link from "next/link";
import { useCallback } from "react";

interface ActionButtonsProps {
  martyrName: string;
}

export default function ActionButtons({ martyrName }: ActionButtonsProps) {
  const handleShare = useCallback(async () => {
    const shareData = {
      title: `${martyrName} - Orthodox Martyr`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        alert("Sharing failed. Please try again.");
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch {
        alert("Failed to copy link. Please try again.");
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  }, [martyrName]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/martyrs" passHref legacyBehavior>
        <button className="icon-frame px-6 py-3 flex-1 transition-all duration-300 hover:scale-105">
          <div className="icon-inner px-4 py-2">
            <span className="font-liturgical text-lg gold-text font-medium">
              Read More Saints
            </span>
          </div>
        </button>
      </Link>
      <button
        className="icon-frame px-6 py-3 flex-1 transition-all duration-300 hover:scale-105"
        onClick={handleShare}
        type="button"
      >
        <div className="icon-inner px-4 py-2">
          <span className="font-liturgical text-lg gold-text font-medium">
            Share Story
          </span>
        </div>
      </button>
    </div>
  );
}

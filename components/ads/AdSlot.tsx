"use client";

import { useEffect, useState } from "react";

interface AdSlotProps {
  position?: "top" | "tool-bottom" | "sidebar" | "between-content";
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  userPlan?: string;
}

export default function AdSlot({
  position = "tool-bottom",
  format = "auto",
  className = "",
  userPlan = "free",
}: AdSlotProps) {
  const [mounted, setMounted] = useState(false);
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide ads for Pro and Developer subscribers
  if (userPlan === "pro" || userPlan === "developer") {
    return null;
  }

  if (!mounted) return null;

  return (
    <div
      className={`w-full my-6 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-center transition-all ${className}`}
      data-ad-position={position}
    >
      <div className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 font-mono">
        Advertisement
      </div>
      {adsenseClientId && adsenseClientId !== "ca-pub-0000000000000000" ? (
        <ins
          className="adsbygoogle block"
          data-ad-client={adsenseClientId}
          data-ad-slot="1234567890"
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="py-6 px-4 text-xs text-gray-400 dark:text-gray-600 font-mono flex flex-col items-center justify-center gap-1">
          <span>[ AdSense Placeholder Slot — {position} ]</span>
          <span className="text-[10px] text-gray-400">Upgrade to Pro to remove ads across all developer tools</span>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";

interface LogoAvatarProps {
  logoUrl?: string | null;
  fallbackInitial: string;
  fallbackColor: string;
  className?: string;
  size?: number;
}

// Renders a real logo image when a URL is available, falling back to a colored initial
// square (matching the app's existing avatar style) if the logo fails to load or none exists.
export function LogoAvatar({ logoUrl, fallbackInitial, fallbackColor, className = "", size = 36 }: LogoAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (!logoUrl || failed) {
    return (
      <div
        className={`flex items-center justify-center font-bold text-white shrink-0 ${className}`}
        style={{ backgroundColor: fallbackColor, width: size, height: size }}
        aria-hidden="true"
      >
        {fallbackInitial}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center bg-white shrink-0 overflow-hidden ${className}`} style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoUrl}
        alt={fallbackInitial}
        className="w-full h-full object-contain p-1"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

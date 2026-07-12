"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  imgClassName?: string;
}

export function Logo({ className, imgClassName, ...props }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // logo-light.png (dark wordmark) reads on light/white backgrounds; logo-dark.png (white
  // wordmark) reads on dark backgrounds. Default to the light asset until mounted so SSR
  // and the first client paint match (avoids a hydration flash).
  const dark = mounted && resolvedTheme === 'dark';

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <img
        src={dark ? "/images/logo-dark.png" : "/images/logo-light.png"}
        alt="Citationly"
        className={cn("h-9 w-auto object-contain", imgClassName)}
      />
    </div>
  );
}

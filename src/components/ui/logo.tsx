import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  iconOnly?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ iconOnly = false, className, iconClassName, textClassName, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <img 
        src="/images/logo.jpeg" 
        alt="Citationly Logo" 
        className={cn("h-9 w-auto object-contain mix-blend-multiply dark:mix-blend-normal", iconClassName)} 
      />
    </div>
  );
}

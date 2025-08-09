import { cn } from "@/lib/utils.ts";
import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: ReactNode;
}

interface SwirlingSpinnerProps extends VariantProps<typeof loaderVariants> {
  className?: string;
}

const SwirlingSpinner = ({ size, className }: SwirlingSpinnerProps) => {
  return (
    <>
      <style>
        {`@keyframes ios-spin {
            to {
              transform: rotate(360deg);
            }
          }
        
          @keyframes ios-spin-smooth {
            0% {
              stroke-dasharray: 1, 800;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 400, 400;
              stroke-dashoffset: -200px;
            }
            100% {
              stroke-dasharray: 800, 1;
              stroke-dashoffset: -800px;
            }
          }
        
          .ios-spinner {
            transform-origin: center;
            animation: ios-spin-smooth 1.2s cubic-bezier(0.2, 0.9, 0.25, 1) infinite,
              ios-spin 1.8s linear infinite;
            animation-direction: normal;
          }`}
      </style>
      <svg
        viewBox="0 0 800 800"
        className={cn(loaderVariants({ size }), className)}
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="spinnerTitle"
      >
        <title id="spinnerTitle">Loading Spinner</title>
        <circle
          className="ios-spinner stroke-[var(--system-blue)]"
          cx="400"
          cy="400"
          fill="none"
          r="200"
          strokeWidth="50"
          strokeDasharray="700 1400"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};

export function Spinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <SwirlingSpinner size={size} className={className} />
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import * as React from "react";
import { useCallback } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const HoveredInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = useCallback(
      function handleMouseMove(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) {
        const { left, top } = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - left);
        mouseY.set(event.clientY - top);
      },
      [mouseX, mouseY]
    );
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? `${radius}px` : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--system-blue),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-ios-md p-[2px] transition-all duration-[var(--motion-medium)]"
      >
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-ios-md border-ios bg-[var(--control-bg)] px-3 py-2 text-sm text-ios-label transition-all duration-[var(--motion-short)] group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ios-muted focus-visible:ring-ios focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-[var(--font-sans)] backdrop-blur-[10px]",
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
HoveredInput.displayName = "HoveredInput";

export { HoveredInput };

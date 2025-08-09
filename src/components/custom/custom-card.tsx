import { cn } from "@/lib/utils.ts";

export const CustomCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 bg-ios-card border-ios rounded-ios-lg shadow-ios-md backdrop-blur-[10px] saturate-[150%] group hover-lift transition-all duration-[var(--motion-medium)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CustomCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-ios-label py-2 font-[var(--font-sans)]",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CustomCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-ios-muted max-w-sm leading-[1.35] font-[var(--font-sans)]",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CustomCardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[20rem] rounded-ios-lg z-40",
        className,
        showGradient &&
          "bg-[var(--secondaryBackground)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

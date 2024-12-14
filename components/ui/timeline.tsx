import * as React from "react";
import { cn } from "@/lib/utils";

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "relative space-y-4 border-l border-muted-foreground/25 pl-6",
      className
    )}
    {...props}
  />
));
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
));
TimelineItem.displayName = "TimelineItem";

const TimelineItemIndicator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "absolute left-0 flex h-3 w-3 -translate-x-1/2 items-center justify-center",
      className
    )}
    {...props}
  >
    <span className="h-2 w-2 rounded-full bg-muted-foreground" />
  </span>
));
TimelineItemIndicator.displayName = "TimelineItemIndicator";

const TimelineItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));
TimelineItemContent.displayName = "TimelineItemContent";

export { Timeline, TimelineItem, TimelineItemIndicator, TimelineItemContent };

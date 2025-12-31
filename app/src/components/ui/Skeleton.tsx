import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("animate-pulse rounded-lg bg-white/10", className)}
            {...props}
        />
    )
)

Skeleton.displayName = "Skeleton"

const SkeletonCard = () => (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
    </div>
)

const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
    <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
        ))}
    </div>
)

export { Skeleton, SkeletonCard, SkeletonTable }

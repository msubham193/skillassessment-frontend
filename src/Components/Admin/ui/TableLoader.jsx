import { Skeleton } from "@/components(shadcn)/ui/skeleton"

export default function TableLoader({ rows = 5, columns = 4 }) {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="flex border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={`header-${i}`} className="flex-1 p-2">
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>

      {/* Table Body */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex border-b">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={`cell-${rowIndex}-${colIndex}`} className="flex-1 p-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

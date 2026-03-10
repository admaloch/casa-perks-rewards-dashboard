export default function SkeletonLoader() {
  return (
    <div
      className="animate-pulse space-y-8 p-6"
      role="status"
      aria-label="Loading dashboard"
      aria-busy="true"
    >
      {/* Section 1 — Points balance */}
      <div className="h-24 w-full rounded-2xl bg-gray-200" aria-hidden="true" />

      {/* Section 2 — Transaction list */}
      <div className="space-y-4" aria-hidden="true">
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Section 3 — Gift card grid */}
      <div className="space-y-4" aria-hidden="true">
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  )
}

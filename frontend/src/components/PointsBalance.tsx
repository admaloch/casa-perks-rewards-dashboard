interface PointsBalanceProps {
  balance: number
  memberSince: string
}

function formatMemberSince(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function PointsBalance({ balance, memberSince }: PointsBalanceProps) {
  const formattedDate = formatMemberSince(memberSince)

  return (
    <div
      className="bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-2xl p-8 text-white"
      role="region"
      aria-label="Points balance summary"
    >
      <p className="text-sm font-medium opacity-80">Your Points Balance</p>
      <p
        className="text-6xl font-bold tracking-tight mt-2"
        aria-label={`${balance.toLocaleString()} points available`}
      >
        {balance.toLocaleString()}
      </p>
      <p className="text-sm opacity-70">points available</p>

      <div className="mt-6 flex justify-between items-end">
        <p
          className="text-xs opacity-60"
          aria-label={`Member since ${formattedDate}`}
        >
          Member since {formattedDate}
        </p>
        <span className="text-2xl opacity-20" aria-hidden="true">★</span>
      </div>
    </div>
  )
}

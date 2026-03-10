interface HeaderProps {
  residentName: string
  unit: string
  pointsBalance: number
  onLogout: () => void
}

export default function Header({ residentName, unit, pointsBalance, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold text-indigo-600" aria-label="CasaPerks">
            CasaPerks
          </span>
          <p className="text-sm text-gray-500">
            {residentName} · {unit}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="bg-indigo-50 text-indigo-700 font-semibold rounded-full px-4 py-1 text-sm"
            aria-label={`${pointsBalance.toLocaleString()} points available`}
          >
            {pointsBalance.toLocaleString()} pts
          </span>
          <button
            onClick={onLogout}
            aria-label="Sign out of CasaPerks"
            className="text-sm text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}

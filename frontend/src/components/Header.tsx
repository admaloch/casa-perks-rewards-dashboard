import { Home, LogOut } from 'lucide-react'

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
          <span className="text-2xl font-bold flex items-center gap-2" aria-label="CasaPerks">
            <Home size={20} strokeWidth={1.75} aria-hidden="true" className="text-brand-orange flex-shrink-0" />
            <span className="text-brand-orange">Casa</span><span className="text-brand-darkred">Perks</span>
          </span>
          <p className="text-sm text-gray-500">
            {residentName} · {unit}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="bg-brand-pink text-brand-darkred font-semibold rounded-full px-4 py-1 text-sm"
            aria-label={`${pointsBalance.toLocaleString()} points available`}
          >
            {pointsBalance.toLocaleString()} pts
          </span>
          <button
            onClick={onLogout}
            aria-label="Sign out of CasaPerks"
            className="text-sm text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 rounded"
          >
            <span className="flex items-center gap-1.5">
              <LogOut size={16} strokeWidth={2} aria-hidden="true" className="flex-shrink-0" />
              Sign out
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

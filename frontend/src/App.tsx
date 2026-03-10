import { useState } from 'react'
import { Home } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import { AuthState, GiftCard, RedeemStatus } from './types/index'
import { login, setAuthToken, clearAuthToken } from './api/client'
import useResident from './hooks/useResident'
import Header from './components/Header'
import PointsBalance from './components/PointsBalance'
import TransactionHistory from './components/TransactionHistory'
import GiftCardCatalog from './components/GiftCardCatalog'
import RedeemModal from './components/RedeemModal'
import SkeletonLoader from './components/SkeletonLoader'

// ---------------------------------------------------------------------------
// LoginScreen
// ---------------------------------------------------------------------------

interface LoginScreenProps {
  onLogin: (residentId: string) => void
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [residentId, setResidentId] = useState('resident-001')

  return (
    <div className="min-h-screen bg-brand-offwhite flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-sm w-full mx-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-brand-pink rounded-2xl flex items-center justify-center">
            <Home size={32} strokeWidth={1.5} aria-hidden="true" className="text-brand-orange flex-shrink-0" />
          </div>
        </div>
        <p className="text-4xl font-bold text-center">
          <span className="text-brand-orange">Casa</span><span className="text-brand-darkred">Perks</span>
        </p>
        <p className="text-sm text-gray-400 text-center mt-1 mb-8">Resident Rewards</p>

        <div>
          <label
            htmlFor="resident-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Resident
          </label>
          <select
            id="resident-select"
            value={residentId}
            onChange={(e) => setResidentId(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option value="resident-001">Sarah Chen (Apt 4B)</option>
            <option value="resident-002">Marcus Rivera (Apt 12A)</option>
          </select>
        </div>

        <button
          onClick={() => onLogin(residentId)}
          aria-label="Sign in as selected resident"
          className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl py-3 font-semibold mt-4 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
        >
          Sign In
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Demo app — select any resident to explore
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

const INITIAL_AUTH: AuthState = {
  token: null,
  resident: null,
  isAuthenticated: false,
}

export default function App() {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_AUTH)
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null)
  const [redeemStatus, setRedeemStatus] = useState<RedeemStatus>('idle')

  const { resident, transactions, giftCards, isLoading, error, redeem } =
    useResident(authState.resident?.id ?? null)

  const handleLogin = async (residentId: string) => {
    try {
      const response = await login(residentId)
      setAuthToken(response.token)
      setAuthState({
        token: response.token,
        resident: response.resident,
        isAuthenticated: true,
      })
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const handleLogout = () => {
    clearAuthToken()
    setAuthState(INITIAL_AUTH)
    setSelectedCard(null)
    setRedeemStatus('idle')
  }

  const handleSelectCard = (card: GiftCard) => {
    setSelectedCard(card)
    setRedeemStatus('confirming')
  }

  const handleCloseModal = () => {
    if (redeemStatus === 'loading') return
    setSelectedCard(null)
    setRedeemStatus('idle')
  }

  const handleConfirmRedeem = async () => {
    setRedeemStatus('loading')
    try {
      await redeem(selectedCard!.id)
      setRedeemStatus('success')
      toast.success(`${selectedCard!.brand} ${selectedCard!.value} redeemed!`)
    } catch (err) {
      setRedeemStatus('error')
      toast.error((err as Error).message)
    }
  }

  if (!authState.isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-offwhite p-6">
        <SkeletonLoader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={handleLogout}
            className="mt-4 text-sm text-brand-orange hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-offwhite">
      <Toaster position="top-right" />
      <Header
        residentName={resident!.name}
        unit={resident!.unit}
        pointsBalance={resident!.pointsBalance}
        onLogout={handleLogout}
      />
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <PointsBalance
          balance={resident!.pointsBalance}
          memberSince={resident!.memberSince}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionHistory transactions={transactions} />
          <GiftCardCatalog
            giftCards={giftCards}
            residentBalance={resident!.pointsBalance}
            onRedeem={handleSelectCard}
          />
        </div>
      </main>
      <RedeemModal
        card={selectedCard}
        residentBalance={resident!.pointsBalance}
        status={redeemStatus}
        onConfirm={handleConfirmRedeem}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export type TransactionType = 'earn' | 'redeem'

export interface Resident {
  id: string
  name: string
  email: string
  unit: string
  pointsBalance: number
  memberSince: string
}

export interface Transaction {
  id: string
  residentId: string
  type: TransactionType
  points: number
  description: string
  date: string
  balanceAfter: number
}

export interface GiftCard {
  id: string
  brand: string
  description: string
  pointsCost: number
  value: string
  category: string
  inStock: boolean
  logoDomain: string
  brandColor: string
}

export interface LoginRequest {
  residentId: string
}

export interface RedeemRequest {
  giftCardId: string
}

export interface LoginResponse {
  token: string
  resident: Pick<Resident, 'id' | 'name' | 'unit'>
}

export interface RedeemResponse {
  success: boolean
  newBalance: number
  transaction: Transaction
  giftCard: Pick<GiftCard, 'id' | 'brand' | 'value'>
}

export interface TransactionsResponse {
  transactions: Transaction[]
  total: number
}

export interface GiftCardsResponse {
  giftCards: GiftCard[]
}

export interface ErrorResponse {
  error: string
  required?: number
  current?: number
}

export type RedeemStatus = 'idle' | 'confirming' | 'loading' | 'success' | 'error'

export interface UseResidentReturn {
  resident: Resident | null
  transactions: Transaction[]
  giftCards: GiftCard[]
  isLoading: boolean
  error: string | null
  redeem: (giftCardId: string) => Promise<RedeemResponse>
}

export interface AuthState {
  token: string | null
  resident: Pick<Resident, 'id' | 'name' | 'unit'> | null
  isAuthenticated: boolean
}

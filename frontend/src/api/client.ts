import {
  LoginResponse,
  Resident,
  TransactionsResponse,
  GiftCardsResponse,
  RedeemResponse,
} from '../types/index'

let authToken: string | null = null

export function setAuthToken(token: string): void {
  authToken = token
}

export function clearAuthToken(): void {
  authToken = null
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (authToken !== null) {
    headers['Authorization'] = `Bearer ${authToken}`
  }

  const res = await fetch(`/api${path}`, { ...options, headers })

  if (!res.ok) {
    const { error } = await res.json() as { error: string }
    throw new Error(error)
  }

  return res.json() as Promise<T>
}

export function login(residentId: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ residentId }),
  })
}

export function getResident(residentId: string): Promise<Resident> {
  return apiFetch<Resident>(`/residents/${residentId}`)
}

export function getTransactions(residentId: string): Promise<TransactionsResponse> {
  return apiFetch<TransactionsResponse>(`/residents/${residentId}/transactions`)
}

export function getGiftCards(): Promise<GiftCardsResponse> {
  return apiFetch<GiftCardsResponse>('/gift-cards')
}

export function redeemGiftCard(residentId: string, giftCardId: string): Promise<RedeemResponse> {
  return apiFetch<RedeemResponse>(`/residents/${residentId}/redeem`, {
    method: 'POST',
    body: JSON.stringify({ giftCardId }),
  })
}

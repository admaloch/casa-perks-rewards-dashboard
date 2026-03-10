import { useState, useEffect } from 'react'
import {
  Resident,
  Transaction,
  GiftCard,
  RedeemResponse,
  UseResidentReturn,
} from '../types/index'
import { getResident, getTransactions, getGiftCards, redeemGiftCard } from '../api/client'

export default function useResident(residentId: string | null): UseResidentReturn {
  const [resident, setResident] = useState<Resident | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [giftCards, setGiftCards] = useState<GiftCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (residentId === null) return

    setIsLoading(true)
    setError(null)

    Promise.all([
      getResident(residentId),
      getTransactions(residentId),
      getGiftCards(),
    ])
      .then(([residentData, transactionsData, giftCardsData]) => {
        setResident(residentData)
        setTransactions(transactionsData.transactions)
        setGiftCards(giftCardsData.giftCards)
        setIsLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [residentId])

  const redeem = async (giftCardId: string): Promise<RedeemResponse> => {
    const response = await redeemGiftCard(residentId!, giftCardId)

    setResident((prev) =>
      prev ? { ...prev, pointsBalance: response.newBalance } : prev
    )
    setTransactions((prev) => [response.transaction, ...prev])

    return response
  }

  return { resident, transactions, giftCards, isLoading, error, redeem }
}

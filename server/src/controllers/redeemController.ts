import { RequestHandler } from 'express'
import { Transaction, RedeemResponse } from '../types/index'
import { findResidentById, deductPoints } from '../models/residents'
import { findGiftCardById } from '../models/giftCards'
import { addTransaction, generateTransactionId } from '../models/transactions'

export const redeem: RequestHandler = (req, res) => {
  const { id } = req.params

  // Step 1 — ownership check
  if (req.user?.residentId !== id) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  // Step 2 — find resident
  const resident = findResidentById(id)
  if (!resident) {
    res.status(404).json({ error: 'Resident not found' })
    return
  }

  // Step 3 — validate body
  const { giftCardId } = req.body as { giftCardId?: unknown }
  if (!giftCardId || typeof giftCardId !== 'string') {
    res.status(400).json({ error: 'giftCardId is required' })
    return
  }

  // Step 4 — find gift card
  const giftCard = findGiftCardById(giftCardId)
  if (!giftCard) {
    res.status(400).json({ error: 'Invalid gift card ID' })
    return
  }

  // Step 5 — check stock
  if (!giftCard.inStock) {
    res.status(400).json({ error: 'This gift card is currently out of stock' })
    return
  }

  // Step 6 — check balance
  if (resident.pointsBalance < giftCard.pointsCost) {
    res.status(422).json({
      error: 'Insufficient points',
      required: giftCard.pointsCost,
      current: resident.pointsBalance,
    })
    return
  }

  // Step 7 — deduct points
  deductPoints(id, giftCard.pointsCost)

  // Step 8 — record transaction
  const newTransaction: Transaction = {
    id: generateTransactionId(),
    residentId: id,
    type: 'redeem',
    points: giftCard.pointsCost,
    description: `Redeemed: ${giftCard.brand} ${giftCard.value}`,
    date: new Date().toISOString().split('T')[0],
    balanceAfter: resident.pointsBalance,
  }

  addTransaction(newTransaction)

  // Step 9 — respond
  const response: RedeemResponse = {
    success: true,
    newBalance: resident.pointsBalance,
    transaction: newTransaction,
    giftCard: {
      id: giftCard.id,
      brand: giftCard.brand,
      value: giftCard.value,
    },
  }

  res.status(200).json(response)
}

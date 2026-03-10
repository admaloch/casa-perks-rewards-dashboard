import { RequestHandler } from 'express'
import { GiftCardsResponse } from '../types/index'
import { giftCards } from '../models/giftCards'

export const getAll: RequestHandler = (_req, res) => {
  const response: GiftCardsResponse = { giftCards: [...giftCards] }
  res.status(200).json(response)
}

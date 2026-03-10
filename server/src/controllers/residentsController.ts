import { RequestHandler } from 'express'
import { TransactionsResponse } from '../types/index'
import { residents, findResidentById } from '../models/residents'
import { getTransactionsByResidentId } from '../models/transactions'

export const getAll: RequestHandler = (_req, res) => {
  res.status(200).json({ residents })
}

export const getById: RequestHandler = (req, res) => {
  const { id } = req.params

  const resident = findResidentById(id)
  if (!resident) {
    res.status(404).json({ error: 'Resident not found' })
    return
  }

  if (req.user?.residentId !== id) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  res.status(200).json(resident)
}

export const getTransactions: RequestHandler = (req, res) => {
  const { id } = req.params

  const resident = findResidentById(id)
  if (!resident) {
    res.status(404).json({ error: 'Resident not found' })
    return
  }

  if (req.user?.residentId !== id) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  const transactions = getTransactionsByResidentId(id)

  const response: TransactionsResponse = {
    transactions,
    total: transactions.length,
  }

  res.status(200).json(response)
}

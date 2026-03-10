import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { LoginResponse } from '../types/index'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants'
import { findResidentById } from '../models/residents'

export const login: RequestHandler = (req, res) => {
  const { residentId } = req.body as { residentId?: string }

  if (!residentId) {
    res.status(400).json({ error: 'residentId is required' })
    return
  }

  const resident = findResidentById(residentId)

  if (!resident) {
    res.status(404).json({ error: 'Resident not found' })
    return
  }

  const token = jwt.sign({ residentId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })

  const response: LoginResponse = {
    token,
    resident: {
      id: resident.id,
      name: resident.name,
      unit: resident.unit,
    },
  }

  res.status(200).json(response)
}

import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JWT_SECRET } from '../config/constants'

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null

  if (!token) {
    res.status(401).json({ error: 'Authorization token required' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { residentId: string }
    req.user = { residentId: decoded.residentId }
    next()
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' })
  }
}

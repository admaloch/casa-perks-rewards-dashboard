export const PORT = process.env.PORT || 3001
export const JWT_SECRET = process.env.JWT_SECRET || 'casaperks-dev-secret'
export const JWT_EXPIRES_IN = '24h'
export const RATE_LIMIT_WINDOW_MS = 60 * 1000
export const RATE_LIMIT_MAX = 10
export const CORS_OPTIONS = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}

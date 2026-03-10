import { useState, useEffect, useRef } from 'react'
import { GiftCard, RedeemStatus } from '../types/index'

interface RedeemModalProps {
  card: GiftCard | null
  residentBalance: number
  status: RedeemStatus
  onConfirm: () => void
  onClose: () => void
}

export default function RedeemModal({
  card,
  residentBalance,
  status,
  onConfirm,
  onClose,
}: RedeemModalProps) {
  const [logoError, setLogoError] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Move focus into modal panel when opened
  useEffect(() => {
    if (card) {
      modalRef.current?.focus()
    }
  }, [card])

  // Escape key closes modal (except during loading)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'loading') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [status, onClose])

  if (!card) return null

  const handleBackdropClick = () => {
    if (status !== 'loading') onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {status === 'confirming' && (
          <>
            <h2 id="modal-title" className="text-xl font-bold text-gray-900">
              Confirm Redemption
            </h2>

            {/* Gift card summary */}
            <div className="flex items-center gap-4 my-6 p-4 bg-gray-50 rounded-xl">
              {!logoError ? (
                <img
                  src={`https://img.logo.dev/${card.logoDomain}?token=pk_free`}
                  alt={`${card.brand} logo`}
                  className="w-12 h-12 rounded-lg object-contain shrink-0"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0"
                  style={{ backgroundColor: card.brandColor }}
                >
                  {card.brand[0]}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {card.brand} {card.value}
                </p>
                <p className="text-gray-500 text-sm">
                  {card.pointsCost.toLocaleString()} points
                </p>
              </div>
            </div>

            {/* Points impact */}
            <div className="space-y-2 my-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current balance</span>
                <span>{residentBalance.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cost</span>
                <span className="text-red-500">-{card.pointsCost.toLocaleString()} pts</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-gray-900">New balance</span>
                <span className="text-brand-orange">
                  {(residentBalance - card.pointsCost).toLocaleString()} pts
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                aria-label="Cancel redemption"
                className="flex-1 border border-gray-200 rounded-xl py-3 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 bg-brand-green hover:opacity-90 text-white rounded-xl py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
              >
                Confirm Redemption
              </button>
            </div>
          </>
        )}

        {status === 'loading' && (
          <div className="text-center py-4">
            <div
              role="status"
              aria-label="Processing redemption"
              className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full mx-auto animate-spin"
            />
            <p className="text-gray-500 mt-4" aria-live="polite">
              Processing...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div aria-live="polite">
            <div
              aria-hidden="true"
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl text-green-600"
            >
              ✓
            </div>
            <p id="modal-title" className="text-xl font-bold text-gray-900 text-center mt-4">
              {card.brand} {card.value} redeemed!
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              Your new balance: {(residentBalance - card.pointsCost).toLocaleString()} pts
            </p>
            <button
              onClick={onClose}
              className="w-full bg-brand-green hover:opacity-90 text-white rounded-xl py-3 mt-6 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
            >
              Done
            </button>
          </div>
        )}

        {status === 'error' && (
          <div aria-live="polite">
            <div
              aria-hidden="true"
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-3xl text-red-500"
            >
              ✕
            </div>
            <p id="modal-title" className="text-xl font-bold text-gray-900 text-center mt-4">
              Redemption failed
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              Something went wrong. Please try again.
            </p>
            <button
              onClick={onClose}
              aria-label="Cancel redemption"
              className="w-full border border-gray-200 text-gray-600 rounded-xl py-3 mt-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

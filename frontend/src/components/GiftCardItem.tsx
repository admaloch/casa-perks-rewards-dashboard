import { useState } from 'react'
import { GiftCard } from '../types/index'

interface GiftCardItemProps {
  card: GiftCard
  residentBalance: number
  onRedeem: (card: GiftCard) => void
}

export default function GiftCardItem({ card, residentBalance, onRedeem }: GiftCardItemProps) {
  const [imgError, setImgError] = useState(false)
  const canAfford = residentBalance >= card.pointsCost && card.inStock

  return (
    <div
      role="article"
      aria-label={`${card.brand} ${card.value} gift card — ${card.pointsCost} points`}
      aria-disabled={!canAfford ? true : undefined}
      className={`relative rounded-2xl border p-4 flex flex-col gap-3 ${
        canAfford
          ? 'border-gray-200 bg-white hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer'
          : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Logo + brand */}
      <div className="flex items-center gap-3">
        {!imgError ? (
          <img
            src={`https://img.logo.dev/${card.logoDomain}?token=pk_free`}
            alt={`${card.brand} logo`}
            className="w-10 h-10 rounded-lg object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ backgroundColor: card.brandColor }}
          >
            {card.brand[0]}
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-gray-900 truncate">{card.brand}</span>
          <span className="text-xs text-gray-400 truncate">{card.description}</span>
        </div>
      </div>

      {/* Value badge */}
      <span className="bg-gray-100 text-gray-700 text-xs font-medium rounded-full px-3 py-1 w-fit">
        {card.value} Gift Card
      </span>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm font-bold text-indigo-600">
          {card.pointsCost.toLocaleString()} pts
        </span>

        {!card.inStock ? (
          <span
            role="status"
            aria-label="Out of stock"
            className="text-xs text-gray-400"
          >
            Out of Stock
          </span>
        ) : canAfford ? (
          <button
            aria-label={`Redeem ${card.brand} ${card.value} for ${card.pointsCost.toLocaleString()} points`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={(e) => {
              e.stopPropagation()
              onRedeem(card)
            }}
          >
            Redeem
          </button>
        ) : (
          <span
            aria-label={`Need ${(card.pointsCost - residentBalance).toLocaleString()} more points to redeem`}
            className="text-xs text-gray-400"
          >
            Need {(card.pointsCost - residentBalance).toLocaleString()} more pts
          </span>
        )}
      </div>
    </div>
  )
}

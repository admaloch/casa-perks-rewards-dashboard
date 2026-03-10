import { useState } from 'react'
import { GiftCard } from '../types/index'
import GiftCardItem from './GiftCardItem'

interface GiftCardCatalogProps {
  giftCards: GiftCard[]
  residentBalance: number
  onRedeem: (card: GiftCard) => void
}

const CATEGORIES = ['All', 'Shopping', 'Food & Drink', 'Travel']

export default function GiftCardCatalog({ giftCards, residentBalance, onRedeem }: GiftCardCatalogProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? giftCards
      : giftCards.filter((c) => c.category === activeCategory)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm" role="region" aria-label="Gift card catalog">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Gift Card Catalog</h2>
        <nav role="tablist" aria-label="Filter gift cards by category" className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls="gift-card-grid"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium rounded-full px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {filtered.length === 0 ? (
        <p
          className="text-gray-400 text-center py-8"
          role="status"
          aria-live="polite"
        >
          No gift cards in this category
        </p>
      ) : (
        <div
          id="gift-card-grid"
          role="tabpanel"
          aria-label={`Gift cards — ${activeCategory}`}
        >
          <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtered.map((card) => (
              <li key={card.id}>
                <GiftCardItem
                  card={card}
                  residentBalance={residentBalance}
                  onRedeem={onRedeem}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

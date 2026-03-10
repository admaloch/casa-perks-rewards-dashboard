import { useState } from 'react'
import { GiftCard } from '../types/index'
import GiftCardItem from './GiftCardItem'

interface GiftCardCatalogProps {
  giftCards: GiftCard[]
  residentBalance: number
  onRedeem: (card: GiftCard) => void
}

const CATEGORIES = ['All', 'Shopping', 'Food & Drink', 'Travel']

const categoryBg: Record<string, string> = {
  'All':          'bg-gray-100 hover:bg-gray-200',
  'Shopping':     'bg-brand-light-purple hover:bg-brand-pink',
  'Food & Drink': 'bg-brand-light-green hover:bg-brand-light-green',
  'Travel':       'bg-brand-light-blue hover:bg-brand-light-blue',
}

export default function GiftCardCatalog({ giftCards, residentBalance, onRedeem }: GiftCardCatalogProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? giftCards
      : giftCards.filter((c) => c.category === activeCategory)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm" role="region" aria-label="Gift card catalog">
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Gift Card Catalog</h2>
        <nav role="tablist" aria-label="Filter gift cards by category" className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls="gift-card-grid"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium rounded-full px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 ${
                activeCategory === cat
                  ? 'bg-brand-orange text-white'
                  : `${categoryBg[cat]} text-brand-darkred`
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
          <ul role="list" className="grid grid-cols-2 gap-4 lg:grid-cols-3">
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

import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'
import { Transaction } from '../types/index'

interface TransactionHistoryProps {
  transactions: Transaction[]
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm" role="region" aria-label="Transaction history">
      <div className="flex items-baseline mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} strokeWidth={1.75} aria-hidden="true" className="text-brand-darkred flex-shrink-0" />
          <h2 className="text-lg font-semibold text-brand-darkred">Transaction History</h2>
        </div>
        <span className="text-sm text-gray-400 ml-2">{transactions.length} records</span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {transactions.length === 0 ? (
          <p
            className="text-gray-400 text-center py-8"
            role="status"
            aria-live="polite"
          >
            No transactions yet
          </p>
        ) : (
          <ul role="list">
            {transactions.map((txn) => (
              <li
                key={txn.id}
                role="listitem"
                className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0"
                aria-label={
                  txn.type === 'earn'
                    ? `Earned ${txn.points} points — ${txn.description} on ${formatDate(txn.date)}`
                    : `Redeemed ${txn.points} points — ${txn.description} on ${formatDate(txn.date)}`
                }
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    txn.type === 'earn' ? 'bg-brand-light-green' : 'bg-red-100'
                  }`}
                >
                  {txn.type === 'earn' ? (
                    <ArrowUp size={16} strokeWidth={2} aria-hidden="true" className="text-brand-green flex-shrink-0" />
                  ) : (
                    <ArrowDown size={16} strokeWidth={2} aria-hidden="true" className="text-red-500 flex-shrink-0" />
                  )}
                  <span className="sr-only">
                    {txn.type === 'earn' ? 'Earned points' : 'Redeemed points'}
                  </span>
                </div>

                {/* Description + date */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {txn.description}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(txn.date)}</p>
                </div>

                {/* Points + balance */}
                <div className="text-right shrink-0">
                  <p
                    className={`text-sm font-semibold ${
                      txn.type === 'earn' ? 'text-brand-green' : 'text-red-500'
                    }`}
                  >
                    {txn.type === 'earn' ? '+' : '-'}
                    {txn.points} pts
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Balance: {txn.balanceAfter.toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

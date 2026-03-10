import { Transaction } from '../types/index'

export const transactions: Transaction[] = [
  {
    id: 'txn-001',
    residentId: 'resident-001',
    type: 'earn',
    points: 500,
    description: 'Rent paid on time',
    date: '2024-02-01',
    balanceAfter: 2450,
  },
  {
    id: 'txn-002',
    residentId: 'resident-001',
    type: 'earn',
    points: 100,
    description: 'Maintenance request submitted',
    date: '2024-01-28',
    balanceAfter: 1950,
  },
  {
    id: 'txn-003',
    residentId: 'resident-001',
    type: 'earn',
    points: 250,
    description: 'Lease renewal bonus',
    date: '2024-01-15',
    balanceAfter: 1850,
  },
  {
    id: 'txn-004',
    residentId: 'resident-001',
    type: 'redeem',
    points: 1000,
    description: 'Redeemed: Starbucks $10',
    date: '2024-01-10',
    balanceAfter: 1600,
  },
  {
    id: 'txn-005',
    residentId: 'resident-001',
    type: 'earn',
    points: 500,
    description: 'Rent paid on time',
    date: '2024-01-01',
    balanceAfter: 2600,
  },
  {
    id: 'txn-006',
    residentId: 'resident-001',
    type: 'earn',
    points: 250,
    description: 'Referral bonus — Apt 7C',
    date: '2023-12-20',
    balanceAfter: 2100,
  },
  {
    id: 'txn-007',
    residentId: 'resident-001',
    type: 'earn',
    points: 500,
    description: 'Rent paid on time',
    date: '2023-12-01',
    balanceAfter: 1850,
  },
  {
    id: 'txn-008',
    residentId: 'resident-001',
    type: 'redeem',
    points: 500,
    description: 'Redeemed: Amazon $10',
    date: '2023-11-18',
    balanceAfter: 1350,
  },
  {
    id: 'txn-009',
    residentId: 'resident-001',
    type: 'earn',
    points: 500,
    description: 'Rent paid on time',
    date: '2023-11-01',
    balanceAfter: 1850,
  },
  {
    id: 'txn-010',
    residentId: 'resident-001',
    type: 'earn',
    points: 100,
    description: '5-star maintenance review',
    date: '2023-10-14',
    balanceAfter: 1350,
  },
  {
    id: 'txn-011',
    residentId: 'resident-002',
    type: 'earn',
    points: 500,
    description: 'Rent paid on time',
    date: '2024-02-01',
    balanceAfter: 875,
  },
  {
    id: 'txn-012',
    residentId: 'resident-002',
    type: 'earn',
    points: 250,
    description: 'Lease renewal bonus',
    date: '2024-01-15',
    balanceAfter: 375,
  },
  {
    id: 'txn-013',
    residentId: 'resident-002',
    type: 'redeem',
    points: 300,
    description: 'Redeemed: Starbucks $5',
    date: '2024-01-08',
    balanceAfter: 125,
  },
  {
    id: 'txn-014',
    residentId: 'resident-002',
    type: 'earn',
    points: 500,
    description: 'Rent paid on time',
    date: '2024-01-01',
    balanceAfter: 425,
  },
]

export function getTransactionsByResidentId(residentId: string): Transaction[] {
  return transactions.filter((t) => t.residentId === residentId)
}

export function addTransaction(transaction: Transaction): void {
  transactions.unshift(transaction)
}

let txnCounter = transactions.length

export function generateTransactionId(): string {
  txnCounter += 1
  return `txn-${String(txnCounter).padStart(3, '0')}`
}

import { Resident } from '../types/index'

export const residents: Resident[] = [
  {
    id: 'resident-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@casaperks.com',
    unit: 'Apt 4B',
    pointsBalance: 2450,
    memberSince: '2023-06-01',
  },
  {
    id: 'resident-002',
    name: 'Marcus Rivera',
    email: 'marcus.rivera@casaperks.com',
    unit: 'Apt 12A',
    pointsBalance: 875,
    memberSince: '2024-01-15',
  },
]

export function findResidentById(id: string): Resident | undefined {
  return residents.find((r) => r.id === id)
}

export function deductPoints(id: string, points: number): void {
  const resident = findResidentById(id)
  if (resident) {
    resident.pointsBalance -= points
  }
}

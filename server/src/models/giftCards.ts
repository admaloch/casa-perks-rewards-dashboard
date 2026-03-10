import { GiftCard } from '../types/index'

export const giftCards: readonly GiftCard[] = [
  {
    id: 'gc-001',
    brand: 'Amazon',
    description: 'Amazon.com Gift Card',
    pointsCost: 500,
    value: '$10',
    category: 'Shopping',
    inStock: true,
    logoDomain: 'amazon.com',
    brandColor: '#FF9900',
  },
  {
    id: 'gc-002',
    brand: 'Amazon',
    description: 'Amazon.com Gift Card',
    pointsCost: 1000,
    value: '$25',
    category: 'Shopping',
    inStock: true,
    logoDomain: 'amazon.com',
    brandColor: '#FF9900',
  },
  {
    id: 'gc-003',
    brand: 'Starbucks',
    description: 'Starbucks Gift Card',
    pointsCost: 300,
    value: '$5',
    category: 'Food & Drink',
    inStock: true,
    logoDomain: 'starbucks.com',
    brandColor: '#00704A',
  },
  {
    id: 'gc-004',
    brand: 'DoorDash',
    description: 'DoorDash Gift Card',
    pointsCost: 750,
    value: '$15',
    category: 'Food & Drink',
    inStock: true,
    logoDomain: 'doordash.com',
    brandColor: '#FF3008',
  },
  {
    id: 'gc-005',
    brand: 'Uber',
    description: 'Uber Gift Card',
    pointsCost: 600,
    value: '$10',
    category: 'Travel',
    inStock: true,
    logoDomain: 'uber.com',
    brandColor: '#000000',
  },
  {
    id: 'gc-006',
    brand: 'Visa',
    description: 'Visa Prepaid Card',
    pointsCost: 2000,
    value: '$25',
    category: 'Travel',
    inStock: false,
    logoDomain: 'visa.com',
    brandColor: '#1A1F71',
  },
]

export function findGiftCardById(id: string): GiftCard | undefined {
  return giftCards.find((gc) => gc.id === id)
}

export function getGiftCardsByCategory(category: string): GiftCard[] {
  return giftCards.filter((gc) => gc.category === category)
}

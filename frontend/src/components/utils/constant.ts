export const FOOD_STATUS = {
  AVAILABLE: 'available',
  CLAIMED: 'claimed'
} as const

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  COST_LOW: 'cost_low',
  COST_HIGH: 'cost_high'
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12
} as const

export const VALIDATION = {
  MAX_FOOD_NAME_LENGTH: 100,
  MAX_POSTER_NAME_LENGTH: 50,
  MAX_ADDRESS_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_TOTAL_ITEMS: 1,
  MIN_COST: 0
} as const

export const STORAGE_KEYS = {
  USER_POSTS: 'userFoodPosts'
} as const
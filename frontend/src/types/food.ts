export interface FoodItem {
  _id: string;
  foodName: string;
  totalItems: number;
  cost: number;
  posterName: string;
  phoneNumber: string;
  address: string;
  description?: string;
  status: 'available' | 'claimed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateFoodRequest {
  foodName: string;
  totalItems: number;
  cost: number;
  posterName: string;
  phoneNumber: string;
  address: string;
  description?: string;
}

export interface FoodFilters {
  search?: string;
  status?: 'available' | 'claimed' | 'all';
  sortBy?: 'newest' | 'oldest' | 'cost_low' | 'cost_high';
  page?: number;
  limit?: number;
}

export interface FoodResponse {
  foods: FoodItem[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
}

export interface FoodStats {
  total: number;
  available: number;
  claimed: number;
}
import api from './api'

export const claimService = {
  async createClaim(food_item_id: string) {
    const response = await api.post('/claims', { food_item_id })
    return response.data
  },

  async completeClaim(id: string) {
    const response = await api.patch(`/claims/${id}/complete`)
    return response.data
  }
}
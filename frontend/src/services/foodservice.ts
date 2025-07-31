import { supabase } from './api'
import { Food } from '../types/food'

export const fetchFoods = async () => {
  const { data, error } = await supabase.from('foods').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const createFood = async (food: Partial<Food>) => {
  const { data, error } = await supabase.from('foods').insert(food).select().single()
  if (error) throw error
  return data
}

export const updateFood = async (id: string, updates: Partial<Food>) => {
  const { data, error } = await supabase.from('foods').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export const deleteFood = async (id: string) => {
  const { error } = await supabase.from('foods').delete().eq('id', id)
  if (error) throw error
}

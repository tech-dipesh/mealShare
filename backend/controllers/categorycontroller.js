import {supabase} from '../config/supabase.js';

export const listCategories = async (_, res, next) => {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) return next(error);
  res.json(data);
};

export const createCategory = async (req, res, next) => {
  const { name, type, icon_url } = req.body;
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, type, icon_url })
    .single();
  if (error) return next(error);
  res.status(201).json(data);
};

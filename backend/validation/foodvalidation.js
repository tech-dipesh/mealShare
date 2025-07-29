import { body, query, param } from 'express-validator';

export const createFoodValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category_id').isUUID().withMessage('Valid category_id is required'),
  body('latitude').isFloat().withMessage('Valid latitude is required'),
  body('longitude').isFloat().withMessage('Valid longitude is required'),
];

export const listFoodValidation = [
  query('lat').optional().isFloat().withMessage('lat must be a number'),
  query('lng').optional().isFloat().withMessage('lng must be a number'),
];

export const foodIdParamValidation = [
  param('id').isUUID().withMessage('Valid food id is required'),
];

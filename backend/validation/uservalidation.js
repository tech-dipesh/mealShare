import { body, param } from 'express-validator';

export const updateProfileValidation = [
  body('name').optional().isString().withMessage('Name must be text'),
  body('dietary_preference')
    .optional()
    .isIn(['veg', 'non_veg', 'both'])
    .withMessage('Preference must be veg, non_veg or both'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const userIdParamValidation = [
  param('id').optional().isUUID().withMessage('Valid user id is required'),
];

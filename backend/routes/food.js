import { Router } from 'express'
import { getAllFood, getFoodById, createFood, updateFoodStatus, deleteFood, getFoodStats } from '../controllers/foodcontroller.js'
import { body, query } from 'express-validator'

const router = Router()

router.get('/', [
    query('search').optional().trim(),
    query('status').optional().isIn(['available', 'claimed', 'all']),
    query('sortBy').optional().isIn(['newest', 'oldest', 'cost_low', 'cost_high']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1 })
], getAllFood)

router.get('/:id', getFoodById)
router.post('/', [
    body('foodName').trim().notEmpty().isLength({ max: 100 }),
    body('totalItems').isInt({ min: 1 }),
    body('cost').isFloat({ min: 0 }),
    body('posterName').trim().notEmpty().isLength({ max: 50 }),
    body('phoneNumber').trim().notEmpty().matches(/^[\+]?[1-9][\d]{0,15}$/),
    body('address').trim().notEmpty().isLength({ max: 200 }),
    body('description').optional().trim().isLength({ max: 500 })
], createFood)
router.patch('/:id/status', [
    body('status').isIn(['available', 'claimed'])
], updateFoodStatus)
router.delete('/:id', deleteFood)
router.get('/stats', getFoodStats)

export default router
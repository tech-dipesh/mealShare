import { Router } from 'express'
import { body, query, param } from 'express-validator'
import multer from 'multer'
import { auth } from '../middleware/auth.js'
import { createFood, listFood, getFood, deleteFood } from '../controllers/foodcontroller.js'
import { validate } from '../middleware/validation.js'

const upload = multer({ limits: { fileSize: 1572864 } })
const router = Router()

router.post(
  '/',
  auth,
  upload.single('image'),
  [
    body('title').notEmpty(),
    body('category_id').isUUID(),
    body('latitude').isFloat(),
    body('longitude').isFloat()
  ],
  validate,
  createFood
)

router.get('/', [ query('lat').optional().isFloat(), query('lng').optional().isFloat() ], validate, listFood)
router.get('/:id', [ param('id').isUUID() ], validate, getFood)
router.delete('/:id', auth, [ param('id').isUUID() ], validate, deleteFood)

export default router
import { Router } from 'express'
import { body, param } from 'express-validator'
import { auth } from '../middleware/auth.js'
import { getProfile, updateProfile } from '../controllers/usercontroller.js'
import { validate } from '../middleware/validation.js'

const router = Router()

router.get('/:id?', auth, getProfile)
router.patch(
  '/',
  auth,
  [ body('name').optional().isString(), body('password').optional().isLength({ min: 6 }) ],
  validate,
  updateProfile
)

export default router
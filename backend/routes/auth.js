import { Router } from 'express'
import { body } from 'express-validator'
import { register, login, verifyEmail, resetPassword } from '../controllers/authcontroller.js'
import { validate } from '../middleware/validation.js'

const router = Router()

router.post(
  '/register',
  [ body('email').isEmail(), body('password').isLength({ min: 6 }) ],
  validate,
  register
)

router.post(
  '/login',
  [ body('email').isEmail(), body('password').exists() ],
  validate,
  login
)

router.get('/verify/:token', verifyEmail)
router.post('/reset', [ body('email').isEmail() ], validate, resetPassword)

export default router

import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { createCategory, listCategories } from '../controllers/categorycontroller.js'

const router = Router()

router.post('/', auth, createCategory)
router.get('/', listCategories)

export default router

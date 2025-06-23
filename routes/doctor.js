import express from 'express'
import { authCheck } from '../middleware/auth.middleware.js'
import { getMe, updateUsernameSpecialization } from '../controllers/doctor.js'



const router = express.Router()

router.get('/me', authCheck, getMe)
router.patch('/me', authCheck, updateUsernameSpecialization)


export default router
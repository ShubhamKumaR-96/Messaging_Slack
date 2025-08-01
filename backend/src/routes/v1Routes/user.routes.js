import express from 'express'

import { signin, signup } from '../../controllers/userController.js'
import { userSignInSchema, userSignUpSchema } from '../../utils/validators/userSchema.js'
import { validate } from '../../utils/validators/zodValidator.js'

const router=express.Router()

router.post('/signup',validate(userSignUpSchema) ,signup)
router.post('/signin',validate(userSignInSchema),signin)

export default router
import express from 'express'

import userRoutes from './user.routes.js'
import workspaceRoutes from './workspace.routes.js'

const router=express.Router()

router.use('/users',userRoutes)
router.use('/workspace',workspaceRoutes)


export default router
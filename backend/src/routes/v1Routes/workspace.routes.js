import express from 'express';

import {
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceUserIsMemberOfController
} from '../../controllers/workspaceController.js';
import { isAuthenticate } from '../../middleware/authMiddleware.js';
import { workspaceZodSchema } from '../../utils/validators/WorkspaceSchema.js';
import { validate } from '../../utils/validators/zodValidator.js';

const router = express.Router();

router.post(
  '/',
  isAuthenticate,
  validate(workspaceZodSchema),
  createWorkspaceController
);
router.get('/', isAuthenticate, getWorkspaceUserIsMemberOfController);
router.delete('/:workspaceId',isAuthenticate,deleteWorkspaceController)

export default router;

import { Router } from 'express';
import * as messageController from '../controllers/message.controller.js';
const router = Router();

// Create a new message
router.post('/', messageController.createMessage);

// Get messages for a project
router.get('/:projectId', messageController.getMessages);

export default router;
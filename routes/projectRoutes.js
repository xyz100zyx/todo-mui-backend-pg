import { Router } from "express";
import ProjectController from '../controllers/projectController.js';

const router = new Router()
router.post('/:userId/create', ProjectController.create)
router.delete('/:userId/delete', ProjectController.delete);


export default router;
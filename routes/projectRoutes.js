import { Router } from "express";
import ProjectController from '../controllers/projectController.js';

const router = new Router()
router.post('/create', ProjectController.create)
router.delete('/delete', ProjectController.delete);


export default router;
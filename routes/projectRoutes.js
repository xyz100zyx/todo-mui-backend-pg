import { Router } from "express";
import ProjectController from '../controllers/projectController.js';
import authCheck from "../utils/authCheck.js";

const router = new Router()
router.post('/:userId/create', authCheck, ProjectController.create)
router.delete('/:userId/delete', authCheck, ProjectController.delete);
router.get('/:userId', authCheck, ProjectController.getAll)
export default router;
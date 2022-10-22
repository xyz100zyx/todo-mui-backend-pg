import { Router } from "express";
import TaskController from "../controllers/taskController.js";

const router = new Router()

router.post('/:projectId/create', TaskController.create);
router.post('/:projectId/delete', TaskController.delete);
router.patch('/:projectId/update', TaskController.update);

export default router;
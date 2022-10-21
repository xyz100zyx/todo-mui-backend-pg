import { Router } from "express";
import TaskController from "../controllers/taskController.js";

const router = new Router()

router.post('/:projectId/create', TaskController.create)

export default router;
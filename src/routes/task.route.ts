import { Router } from "express";
import { taskController } from "../controllers";
import validate from "../config/validate";
import taskValidation from "../validations/task.validation";
import { auth } from "../config/auth";

const router = Router();

router.post(
  "/create",
  auth,
  validate(taskValidation.createTask),
  taskController.createTask
);

router.post(
  "/",
  auth,
  validate(taskValidation.fetchTask),
  taskController.fetchTask
);

router
  .route("/:taskId")
  .patch(auth, validate(taskValidation.updateTask), taskController.updateTask)
  .get(auth, validate(taskValidation.getTask), taskController.getTaskById)
  .delete(auth, validate(taskValidation.getTask), taskController.deleteTask);

export default router;

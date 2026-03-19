import { Router } from 'express'

import * as tasksController from '../controllers/tasks.js'

const router = Router()

router
  .route('/')
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask)

router
  .route('/:taskId')
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask)

export default router

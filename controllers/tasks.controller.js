import * as taskService from '../services/task.service.js'

export const getAllTasks = async (req, res) => {
  const tasks = await taskService.getAllTasks()
  res.json(tasks)
}

export const getTaskById = async (req, res) => {
  const id = +req.params.taskId
  const task = await taskService.getTaskById(id)

  if (!task) {
    return res
      .status(404)
      .json({ message: `No task with id ${id}` })
  }
  res.json(task)
}

export const createTask = async (req, res) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  const newTask = await taskService.createTask(title)
  res.status(201).json(newTask)
}

export const updateTask = async (req, res) => {
  const id = +req.params.taskId
  const updatedTask = await taskService.updateTask(id, req.body)

  if (!updatedTask) {
    return res
      .status(404)
      .json({ message: `No task with id ${id}` })
  }

  res.json(updatedTask)
}

export const deleteTask = async (req, res) => {
  const id = +req.params.taskId
  const deletedTask = await taskService.deleteTask(id)

  if (!deletedTask) {
    return res
      .status(404)
      .json({ message: `No task with id ${id}` })
  }

  res.json(deletedTask)
}

import { readTasks, writeTasks } from '../utils/fileHandler.js'

export const getAllTasks = async (req, res) => {
  const tasks = await readTasks()
  res.json(tasks)
}

export const getTaskById = async (req, res) => {
  const id = +req.params.taskId
  const tasks = await readTasks()
  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return res
      .status(404)
      .json({ message: 'No task with id ' + req.params.taskId })
  }
  res.json(task)
}

export const createTask = async (req, res) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  const tasks = await readTasks()
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    completed: false, // Исправил: булево значение лучше чем строка 'false'
  }

  tasks.push(newTask)
  await writeTasks(tasks)
  res.status(201).json(newTask)
}

export const updateTask = async (req, res) => {
  const id = +req.params.taskId
  const tasks = await readTasks()
  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return res
      .status(404)
      .json({ message: 'No task with id ' + req.params.taskId })
  }

  if (req.body.completed !== undefined) task.completed = req.body.completed
  if (req.body.title !== undefined) task.title = req.body.title

  await writeTasks(tasks)
  res.json(task)
}

export const deleteTask = async (req, res) => {
  const id = +req.params.taskId
  const tasks = await readTasks()
  const index = tasks.findIndex((t) => t.id === id)

  if (index === -1) {
    return res
      .status(404)
      .json({ message: 'No task with id ' + req.params.taskId })
  }

  const [deletedTask] = tasks.splice(index, 1)
  await writeTasks(tasks)
  res.json(deletedTask)
}

import { readTasks, writeTasks } from '../utils/fileHandler.js'

export const getAllTasks = async () => {
  return await readTasks()
}

export const getTaskById = async (id) => {
  const tasks = await readTasks()
  return tasks.find((t) => t.id === id)
}

export const createTask = async (title) => {
  const tasks = await readTasks()

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  }

  tasks.push(newTask)
  await writeTasks(tasks)
  return newTask
}

export const updateTask = async (id, updates) => {
  const tasks = await readTasks()
  const taskIndex = tasks.findIndex((t) => t.id === id)

  if (taskIndex === -1) return null

  if (updates.completed !== undefined) tasks[taskIndex].completed = updates.completed
  if (updates.title !== undefined) tasks[taskIndex].title = updates.title

  await writeTasks(tasks)
  return tasks[taskIndex]
}

export const deleteTask = async (id) => {
  const tasks = await readTasks()
  const index = tasks.findIndex((t) => t.id === id)

  if (index === -1) return null

  const [deletedTask] = tasks.splice(index, 1)
  await writeTasks(tasks)
  return deletedTask
}
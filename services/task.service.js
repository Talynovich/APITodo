import { Task } from '../models/taskModel.js'

export const getAllTasks = async () => {
  return await Task.find()
}

export const getTaskById = async (id) => {
  return await Task.findById(id)
}

export const createTask = async (title) => {
  const task = new Task({ title })
  return await task.save()
}

export const updateTask = async (id, updates) => {
  return await Task.findByIdAndUpdate(
    id,
    {
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.completed !== undefined && { completed: updates.completed }),
    },
    { new: true }
  )
}

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id)
}

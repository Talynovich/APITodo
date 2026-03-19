import { readFile, writeFile } from 'node:fs/promises'

export const readTasks = async () => {
  try {
    const tasks = await readFile('tasks.json', { encoding: 'utf8' })
    return JSON.parse(tasks)
  } catch {
    return []
  }
}

export const writeTasks = async (tasks = []) => {
  await writeFile('tasks.json', JSON.stringify(tasks, null, 2))
}

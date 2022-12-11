import { createContext, useContext, useEffect, useState } from 'react'

interface Task {
  id: string
  title: string
  isCompleted: boolean
}

interface TasksContextData {
  tasks: Task[]
  createTask: (title: string) => void
  toggleTaskCompletion: (id: string) => void
  removeTask: (id: string) => void
}

const initialTaskContextData = {} as TasksContextData

const TasksContext = createContext<TasksContextData>(initialTaskContextData)

export function TasksProvider ({ children }) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const tasks = localStorage.getItem('@todo-app:tasks') ?? ''

    if (tasks.length > 0) {
      setTasks(JSON.parse(tasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function createTask (title: string) {
    const task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      isCompleted: false
    }

    setTasks([...tasks, task])
  }

  function toggleTaskCompletion (id: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  function removeTask (id: string) {
    const updatedTasks = tasks.filter((task) => task.id !== id)

    setTasks(updatedTasks)
  }

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, toggleTaskCompletion, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks (): TasksContextData {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }

  return context
}

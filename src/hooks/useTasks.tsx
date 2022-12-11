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
  geCompletedTasksCount: () => number
}

const emptyTaskContextData = {} as TasksContextData

const TasksContext = createContext<TasksContextData>(emptyTaskContextData)

export function TasksProvider ({ children }: any) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const localTasks = localStorage.getItem('@todo-app:tasks') ?? ''

    if (localTasks.length > 0) {
      setTasks(JSON.parse(localTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('@todo-app:tasks', JSON.stringify(tasks))
  }, [tasks])

  function createTask (title: string) {
    const task = {
      id: Math.random().toString(8),
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

  function geCompletedTasksCount () {
    return tasks.filter((task) => task.isCompleted).length
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        toggleTaskCompletion,
        removeTask,
        geCompletedTasksCount
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks (): TasksContextData {
  const context = useContext(TasksContext)

  if (context === emptyTaskContextData) {
    throw new Error('useTasks must be used within a TasksProvider')
  }

  return context
}

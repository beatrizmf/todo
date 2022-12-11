import { useState } from 'react'

import { PlusCircle } from 'phosphor-react'

import { useTasks } from '../hooks/useTasks'

import styles from './CreateTask.module.css'

export function CreateTask () {
  const [newTask, setNewTask] = useState('')

  const { createTask } = useTasks()

  function handleNewTaskChange (e: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value)
  }

  function handleCreateNewTask (e: React.FormEvent) {
    e.preventDefault()

    if (newTask.trim() === '') {
      return
    }

    createTask(newTask)

    setNewTask('')
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.createTask}>
      <input
        required
        value={newTask}
        onChange={handleNewTaskChange}
        placeholder="Add a new task"
        type="text"
      />
      <button type="submit">
        Add <PlusCircle weight="bold" size={16} />
      </button>
    </form>
  )
}

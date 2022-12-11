import { PlusCircle } from 'phosphor-react'

import styles from './CreateTask.module.css'

export function CreateTask () {
  return (
    <form className={styles.createTask}>
      <input required placeholder="Add a new task" type="text" />
      <button type="submit">
        Add <PlusCircle weight="bold" size={16} />
      </button>
    </form>
  )
}

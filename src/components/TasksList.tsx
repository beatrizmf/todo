import { useEffect } from 'react'

import { CheckCircle, Circle, Trash } from 'phosphor-react'

import { useTasks } from '../hooks/useTasks'

import styles from './TasksList.module.css'

export function TasksList () {
  const { tasks, toggleTaskCompletion, removeTask, geCompletedTasksCount } =
    useTasks()

  let completedTasksCount = geCompletedTasksCount()
  const tasksCount = tasks.length

  useEffect(() => {
    completedTasksCount = geCompletedTasksCount()
  }, [tasks])

  function handleToggleTaskCompletion (id: string) {
    toggleTaskCompletion(id)
  }

  function handleRemoveTask (id: string) {
    removeTask(id)
  }

  return (
    <div className={styles.tasksList}>
      <header>
        <p>
          Tasks created <span>{tasksCount}</span>
        </p>

        {tasksCount > 0
          ? (
            <p>
              Completed{' '}
              <span>
                {completedTasksCount} of {tasksCount}
              </span>
            </p>
            )
          : null
        }
      </header>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isCompleted
              ? (
                <CheckCircle
                  onClick={() => handleToggleTaskCompletion(task.id)}
                  weight="duotone"
                  className={styles.taskCompleted}
                  size={24}
                />)
              : (
                <Circle
                  onClick={() => handleToggleTaskCompletion(task.id)}
                  className={styles.taskNotCompleted}
                  size={24}
                />)
            }

            {task.isCompleted
              ? (<p className={styles.titleTaskCompleted}>{task.title}</p>)
              : (<p className={styles.titleNotTaskCompleted}>{task.title}</p>)
            }

            <button className={styles.deleteTaskButton}>
              <Trash size={16} onClick={() => handleRemoveTask(task.id)} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

import { useEffect } from 'react'

import { CheckCircle, Circle, Trash, ListChecks } from 'phosphor-react'

import { useTasks } from '../hooks/useTasks'

import styles from './TasksList.module.css'

export function TasksList () {
  const {
    tasks,
    toggleTaskCompletion,
    removeTask,
    geCompletedTasksCount
  } = useTasks()

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

  function List () {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <button
              title={task.isCompleted ? 'Mark not as completed' : 'Mark as completed'}
              onClick={() => handleToggleTaskCompletion(task.id)}
            >
              {task.isCompleted
                ? (<CheckCircle
                    weight="duotone"
                    className={styles.taskCompleted}
                    size={24}
                  />)
                : (<Circle className={styles.taskNotCompleted} size={24} />)
                }
              </button>

            {task.isCompleted
              ? (<p className={styles.titleTaskCompleted}>{task.title}</p>)
              : (<p className={styles.titleNotTaskCompleted}>{task.title}</p>)
            }

            <button
              title="Delete task"
              className={styles.deleteTaskButton}
            >
              <Trash
                size={16}
                onClick={() => handleRemoveTask(task.id)}
              />
            </button>
          </li>
        ))}
      </ul>
    )
  }

  function EmptyList () {
    return (
      <div className={styles.emptyList}>
        <ListChecks size={56} />
        <div>
          <p>You have no tasks registered yet</p>
          <p>Create tasks and organize your to-do items</p>
        </div>
      </div>
    )
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

      {tasksCount > 0 ? <List /> : <EmptyList />}

    </div>
  )
}

import { CheckCircle, Circle, Trash } from 'phosphor-react'

import styles from './TasksList.module.css'

const tasks = [
  {
    id: 1,
    title:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    isCompleted: true
  },
  {
    id: 2,
    title:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    isCompleted: false
  },
  {
    id: 3,
    title:
      'lorem ipsum dolor',
    isCompleted: true
  },
  {
    id: 4,
    title:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisqquod.',
    isCompleted: false
  },
  {
    id: 5,
    title:
      'lorem ipsum dolipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    isCompleted: false
  }
]

export function TasksList () {
  return (
    <div className={styles.tasksList}>
      <header>
        <p>
          Tasks created <span>5</span>
        </p>

        <p>
          Completed <span>2 of 5</span>
        </p>
      </header>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isCompleted
              ? (<CheckCircle weight="duotone" className={styles.taskCompleted} size={24} />)
              : (<Circle className={styles.taskNotCompleted} size={24} />)
            }

            {task.isCompleted
              ? (<p className={styles.titleTaskCompleted}>{task.title}</p>)
              : (<p className={styles.titleNotTaskCompleted}>{task.title}</p>)
            }

            <button className={styles.deleteTaskButton}>
              <Trash size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

import { CreateTask } from './components/CreateTask'
import { Header } from './components/Header'
import { TasksList } from './components/TasksList'

import './global.css'

import styles from './App.module.css'

function App () {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.limitedWidth}>
          <CreateTask />
          <TasksList />
        </div>
      </div>
    </div>
  )
}

export default App

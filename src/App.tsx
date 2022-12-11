import { CreateTask } from './components/CreateTask'
import { Header } from './components/Header'
import { TasksList } from './components/TasksList'
import { TasksProvider } from './hooks/useTasks'

import './global.css'

import styles from './App.module.css'

function App () {
  return (
    <TasksProvider>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.limitedWidth}>
          <CreateTask />
          <TasksList />
        </div>
      </div>
    </TasksProvider>
  )
}

export default App

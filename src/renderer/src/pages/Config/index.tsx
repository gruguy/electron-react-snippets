import { Outlet } from 'react-router-dom'
// import styles from './styles.module.scss'
export default function Config() {
  return (
    <main>
      <Outlet></Outlet>
      {/* <div className="drag"></div>
      <div className="drag"></div>
      <div className={styles.category}></div>
      <div className={styles.content}></div>
      <div className={styles.nav}></div> */}
    </main>
  )
}

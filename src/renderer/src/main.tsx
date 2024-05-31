import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@renderer/assets/global.scss'
import '@renderer/assets/tailwind.css'
import zh_CN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function Loading() {
  return <div>Loading...</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  // <App />
  <ConfigProvider locale={zh_CN}>
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </ConfigProvider>
  // </React.StrictMode>
)

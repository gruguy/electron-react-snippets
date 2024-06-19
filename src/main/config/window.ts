import { BrowserWindow, screen, shell } from 'electron'
import icon from '../../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import url from 'node:url'
import { positionWindow } from '../code/shortCut'
// import * as ipc from './ipc'

export function createWindow(id?: number): BrowserWindow {
  // const { width } = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    // useContentSize: true,
    frame: true,
    // resizable: false,
    transparent: true,
    show: false,
    hasShadow: true,
    // alwaysOnTop: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    positionWindow(mainWindow, screen)
    mainWindow.show()
  })
  let closeTimer
  mainWindow.on('blur', () => {
    if (closeTimer) {
      clearTimeout(closeTimer)
    }
    // 设置一个计时器，比如5秒后关闭窗口
    closeTimer = setTimeout(() => {
      if (BrowserWindow.getFocusedWindow() !== mainWindow) {
        mainWindow.close()
      }
    }, 5000) // 5000 毫秒 = 5 秒
  })
  mainWindow.on('focus', () => {
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
  })
  // ipc.registerIpc(mainWindow)

  mainWindow.webContents.openDevTools()

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#config/category')
  } else {
    // 生产环境需要使用loadURL 才能识别hash值
    mainWindow.loadURL(
      url.format({
        pathname: join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true,
        hash: 'config/category'
      })
    )
  }

  return mainWindow
}

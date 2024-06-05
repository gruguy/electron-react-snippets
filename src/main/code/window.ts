import { BrowserWindow, screen, shell } from 'electron'
import icon from '../../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { positionWindow } from './shortCut'
// import * as ipc from './ipc'

export function createWindow(): BrowserWindow {
  // const { width } = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 350,
    // x: width - 500,
    // y: 150,
    // useContentSize: true,
    frame: false,
    // resizable: false,
    transparent: true,
    // show: false,
    // alwaysOnTop: true,
    hasShadow: true,
    maximizable: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    // 居中screen
    positionWindow(mainWindow, screen)
    mainWindow.show()
  })
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(`
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
      }
      .shadow {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      }
    `)
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
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

import { BrowserWindow, screen, shell } from 'electron'
import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { OptionType } from './windows'
import url from 'node:url'
// import { positionWindow } from './shortCut'
// import * as ipc from './ipc'

export function createWindow(options: OptionType): BrowserWindow {
  // const { width } = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  const win = new BrowserWindow(
    Object.assign(
      {
        width: 800,
        height: 350,
        frame: false,
        transparent: true,
        hasShadow: true,
        maximizable: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      },
      options
    )
  )

  win.on('ready-to-show', () => {
    // 居中screen
    // positionWindow(win, screen)
    console.log(options.initShow)
    options.initShow && win.show()
  })
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(`
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
  // ipc.registerIpc(win)

  if (is.dev && options.openDevTools) win.webContents.openDevTools()

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + options.hash)
  } else {
    // win.loadFile(join(__dirname, '../renderer/index.html'))
    win.loadURL(
      url.format({
        pathname: join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true,
        hash: 'config/category'
      })
    )
  }

  return win
}

import { BrowserWindow } from 'electron'
import { createWindow } from './window'

let win = null as null | BrowserWindow
const createConfigWindow = () => {
  console.log(win)
  if (!win) win = createWindow()

  win.on('closed', () => (win = null))
}

export { createConfigWindow }

import { BrowserWindow } from 'electron'
import { createWindow } from './window'

let win = null as null | BrowserWindow
const createConfigWindow = (id: number) => {
  if (!win) {
    win = createWindow()
  } else {
    win.show()
  }
  console.log(win, 'windiwsssssss')

  if (id) {
    console.log(win, 'winwin')
    console.log(id, '+id!@@@@@')
    win && win.webContents.send('cid', id)
  }

  win.on('closed', () => (win = null))
}

export { createConfigWindow }

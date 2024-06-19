import { IpcMainEvent, ipcMain } from 'electron'
import { getWindowByName, getWindowByEvent } from './windows'

ipcMain.on('openWindow', (_event: IpcMainEvent, name: WindowNameType) => {
  console.log(name)
  getWindowByName(name).show()
})
ipcMain.on('closeWindow', (_event: IpcMainEvent, name: WindowNameType) => {
  // const win = BrowserWindow.fromWebContents(event.sender)

  getWindowByName(name).close()
})

// 鼠标穿透
ipcMain.on(
  'setIgnoreMouseEvents',
  (event: IpcMainEvent, ignore: boolean, options: { forward?: boolean }) => {
    const win = getWindowByEvent(event)
    win && win.setIgnoreMouseEvents(ignore, options)
  }
)

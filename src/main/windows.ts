import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  IpcMainEvent,
  IpcMainInvokeEvent,
  app
} from 'electron'
import { createWindow } from './createWindow'

export interface OptionType extends Partial<BrowserWindowConstructorOptions> {
  openDevTools?: boolean
  hash?: string
  initShow: boolean
}
export const config = {
  search: {
    id: 0,
    options: {
      initShow: false,
      openDevTools: true,
      hash: ''
    }
  },
  code: {
    id: 0,
    options: {
      initShow: false,
      openDevTools: true,
      hash: '/#config/category/contentList',
      width: 1000,
      height: 800,
      frame: true
    }
  },
  config: {
    id: 0,
    options: {
      initShow: false,
      openDevTools: true,
      hash: '/#config',
      width: 1000,
      height: 800,
      frame: true
    }
  }
} as Record<WindowNameType, { id: number; options: OptionType }>
// createWindow({})

export function getWindowByName(name: WindowNameType) {
  let win = BrowserWindow.fromId(config[name].id)
  if (!win) {
    win = createWindow(config[name].options)
    config[name].id = win.id
  }
  return win
}

export const getWindowByEvent = (e: IpcMainEvent | IpcMainInvokeEvent) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  return win
}

app.whenReady().then(() => {
  getWindowByName('search')
  getWindowByName('config')
})

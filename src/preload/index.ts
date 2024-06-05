import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { redirect } from 'react-router-dom'

// Custom APIs for renderer
const api = {
  hideWindow: () => {
    ipcRenderer.send('hideWindow')
  },
  shortCut: (type: string, shortCut: string) => {
    ipcRenderer.send('shortCut', type, shortCut)
  },
  setIgnoreMouseEvents: (ignore: boolean, options) => {
    ipcRenderer.send('setIgnoreMouseEvents', ignore, options)
  },
  openConfigWindow: (id: number) => {
    ipcRenderer.send('openConfigWindow', id)
  },
  cid: (fn) => {
    ipcRenderer.on('cid', (_event, id) => {
      // setItems(data)
      fn && fn(id)
    })
  },
  sql: async (sql: string, type: SqlActionType) => {
    return await ipcRenderer.invoke('sql', sql, type)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

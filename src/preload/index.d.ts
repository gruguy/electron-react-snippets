import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      shortCut: (type: string, shortCut: string) => void
      setIgnoreMouseEvents: (ignore: boolean, options?: { forward: boolean }) => void
      openConfigWindow: (id?: number) => void
      cid: (fn: (id: number) => void) => void
      sql: <T>(sql: string, type: SqlActionType) => Promise<T>
    }
  }
}

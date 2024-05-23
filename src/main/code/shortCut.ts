import { BrowserWindow, IpcMainEvent, app, dialog, globalShortcut, ipcMain } from 'electron'

export const registerShortCut = (win: BrowserWindow) => {
  // app.whenReady().then(() => {
  // 注册一个'CommandOrControl+Space' 快捷键监听器 这是写死的
  // const ret = globalShortcut.register('CommandOrControl+Shift+Space', () => {
  //   console.log('CommandOrControl+X is pressed')
  //   win.isVisible() ? win.hide() : win.show()
  // })
  const config = {
    search: ''
  }
  // 监听用户设置的热键并注册
  ipcMain.on('shortCut', (_event: IpcMainEvent, type: string, shortCut: string) => {
    if (config.search) {
      // 存在冲突快捷键，先卸载再注册
      globalShortcut.unregister(config.search)
      config.search = shortCut
    }
    switch (type) {
      case 'search':
        registerSearchShortCut(win, shortCut)
        break
      default:
        break
    }
  })
  function registerSearchShortCut(win: BrowserWindow, shortCut: string) {
    const ret = globalShortcut.register(shortCut, () => {
      win.isVisible() ? win.hide() : win.show()
    })
    if (!ret) {
      dialog.showErrorBox('温馨提示', '请检查是否重复注册或输入错误')
    }
  }
  // 检查快捷键是否注册成功
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
  // })

  app.on('will-quit', () => {
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+X')

    // 注销所有快捷键
    globalShortcut.unregisterAll()
  })
}

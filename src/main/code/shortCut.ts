import { BrowserWindow, IpcMainEvent, app, dialog, globalShortcut, ipcMain, screen } from 'electron'

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
      if (win.isVisible()) {
        win.hide()
      } else {
        // 窗口居中，根据鼠标在哪个分屏显示在那个分屏
        positionWindow(win, screen)

        // 显示窗口
        win.show()

        // 让窗口默认获得焦点
        win.focus()
      }
      // win.isVisible() ? win.hide() : {

      //   win.show()}
    })
    if (!ret) {
      // dialog.showErrorBox('温馨提示', '请检查是否重复注册或输入错误')
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

/**
 *  窗口居中，根据鼠标在哪个分屏显示在那个分屏
 * @param win
 * @param screen
 */
export function positionWindow(win, screen) {
  // 获取显示器的信息
  const displays = screen.getAllDisplays()

  // 获取鼠标所在的屏幕
  const mouseLocation = screen.getCursorScreenPoint()
  const currentDisplay = displays.find((display) => {
    return (
      mouseLocation.x >= display.bounds.x &&
      mouseLocation.x <= display.bounds.x + display.bounds.width &&
      mouseLocation.y >= display.bounds.y &&
      mouseLocation.y <= display.bounds.y + display.bounds.height
    )
  })

  console.log(currentDisplay, 'currentDisplaycurrentDisplay')
  const { width, height } = win.getBounds()
  // 如果找到了对应的屏幕，将BrowserWindow显示在该屏幕上
  if (currentDisplay) {
    console.log(
      currentDisplay.bounds.x + (currentDisplay.bounds.width - width) / 2,
      currentDisplay.bounds.y + (currentDisplay.bounds.height - height) / 2,
      'currentDisplaycurrentDisplay'
    )
    const showX = Math.ceil(currentDisplay.bounds.x + (currentDisplay.bounds.width - width) / 2)
    const showY = Math.ceil(currentDisplay.bounds.y + (currentDisplay.bounds.height - height) / 3)
    win.setBounds({
      x: showX,
      y: showY,
      width: win.getSize()[0],
      height: win.getSize()[1]
    })
  }
}

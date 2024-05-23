export default () => {
  const register = (type: string, shortCut: string = 'CommandOrControl+Shift+Space') => {
    window.api.shortCut(type, shortCut)
  }

  return { register }
}

import { useStore } from '@renderer/store/useStore'

export default () => {
  const setError = useStore((state) => state.setError)
  const register = async (type: string) => {
    let shortCut = 'CommandOrControl+Shift+Space'
    let configData = (await window.api.sql(
      'select * from config where id = 1',
      'findOne'
    )) as Record<string, string>
    if (configData) {
      configData = configData && JSON.parse(configData.content)
      shortCut = configData.shortCut
    }
    const isBind = (await window.api.shortCut(type, shortCut)) || setError('快捷键绑定失败')
  }

  return { register }
}

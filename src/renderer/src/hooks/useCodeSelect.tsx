import { useCallback, useEffect, useState } from 'react'
import useCode from './useCode'
import { useStore } from '@renderer/store/useStore'

export default () => {
  // const { data, setData } = useCode()
  const { data, setData, setSearch, id, setId } = useStore((state) => state)
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [id, setId] = useState(0)
  // const { id, setId } = useStore((state) => state)
  const handleKeyEvent = useCallback(
    (e: KeyboardEvent): void => {
      if (data.length == 0) return
      console.log(e.code, 'gruguy')
      // Ullamco laboris ut deserunt ut nostrud excepteur adipisicing sit incididunt.Ut esse quis cupidatat elit ea cupidatat irure veniam deserunt.
      switch (e.code) {
        case 'ArrowUp':
          {
            const index = data.findIndex((item) => item.id == id)
            setId(data[index - 1]?.id || data[data.length - 1]?.id)
          }
          break
        case 'ArrowDown':
          {
            const index = data.findIndex((item) => item.id == id)
            setId(data[index + 1]?.id || data[0]?.id)
          }
          // setCurrentIndex((pre) => (pre >= data.length - 1 ? 0 : pre + 1))
          break
        case 'Enter':
          selectItem(id)
          // {
          //   const content = data.find((item) => item.id == id)?.content
          //   if (content) navigator.clipboard.writeText(content)
          //   window.api.hideWindow()
          // }
          break
      }
    },
    [data, id]
  )

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function selectItem(id: number) {
    const content = data.find((item) => item.id == id)?.content
    if (content) await navigator.clipboard.writeText(content)
    setData([])
    setSearch('')
    return window.api.hideWindow()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent)

    // 清理事件绑定
    return () => {
      document.removeEventListener('keydown', handleKeyEvent)
    }
  }, [handleKeyEvent])

  useEffect(() => {
    setId(data[0]?.id || 0)
  }, [data])

  return {
    data,
    id,
    selectItem
  }
}

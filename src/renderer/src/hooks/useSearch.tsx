import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import useCode from './useCode'
// import { codes } from '@renderer/data'
import { useStore } from '@renderer/store/useStore'
import { apiGetAll } from '@renderer/utils'

export default () => {
  // const { setData } = useCode()
  const { setData, search, setSearch } = useStore((state) => state)
  // const {search} =
  const [codes, setCodes] = useState<ContentType[]>([])

  useEffect(() => {
    // setData(codes)
    apiGetAll('contents').then((res) => {
      setCodes(res)
    })
  }, [])
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value
    setSearch(content)
    setData(
      codes
        .filter((code) =>
          code.title.toLowerCase().includes(e.target.value.toLowerCase() || '@@@@@')
        )
        .splice(0, 4)
    )
  }

  return { search, handleSearch }
}

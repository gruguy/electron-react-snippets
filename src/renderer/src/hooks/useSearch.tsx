import { ChangeEvent, useEffect, useState } from 'react'
import useCode from './useCode'
import { codes } from '@renderer/data'
import { useStore } from '@renderer/store/useStore'

export default () => {
  // const { setData } = useCode()
  const { setData, search, setSearch } = useStore((state) => state)
  // const [search, setSearch] = useState('')
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value
    setSearch(content)
    setData(
      codes
        .filter((code) =>
          code.content.toLowerCase().includes(e.target.value.toLowerCase() || '@@@@@')
        )
        .splice(0, 4)
    )
  }

  return { search, handleSearch }
}

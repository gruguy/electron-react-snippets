import { SettingTwo } from '@icon-park/react'
import useSearch from '@renderer/hooks/useSearch'
import { Input } from 'antd'
import { useEffect, useRef } from 'react'

export default function Search(): JSX.Element {
  const { search, handleSearch } = useSearch()
  return (
    <main className="bg-slate-50 p-3 drag rounded-lg">
      <section className="bg-slate-200 p-3 rounded-lg flex items-center cursor-pointer">
        <div className="mr-2 cursor-pointer nodrag" onClick={() => window.api.openConfigWindow()}>
          <SettingTwo className="cursor-pointer" theme="outline" size="30" fill="#333" />
        </div>
        <Input
          placeholder="Hi,Coder"
          type="text"
          value={search}
          onChange={handleSearch}
          className="w-full outline-none text-2xl bg-slate-200"
          autoFocus
        />
        {/* <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="w-full outline-none text-2xl bg-slate-200"
          placeholder="Hi,Coder"
          autoFocus
        /> */}
      </section>
      <section className="text-center text-slate-500 mt-2">gruguy snippets</section>
    </main>
  )
}

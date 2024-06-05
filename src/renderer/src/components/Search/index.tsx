import { SettingTwo } from '@icon-park/react'
import useCodeSelect from '@renderer/hooks/useCodeSelect'
import useSearch from '@renderer/hooks/useSearch'
import { Input } from 'antd'
import { useCallback, useEffect } from 'react'

export default function Search(): JSX.Element {
  const { search, handleSearch } = useSearch()
  const { data } = useCodeSelect()
  // window.api.openConfigWindow()
  useEffect(() => {
    async function fetchData() {
      const res = await window.api.sql('select * from contents', 'findAll')
      console.log(res)
    }
    fetchData()
  }, [])

  const handleKeyEvent = useCallback(
    async (e: KeyboardEvent) => {
      console.log(data, '-----------')
      if (data.length) return
      if (!search.length) return
      if (e.code === 'Enter') {
        // 打开设置面板，并在未分类问价夹下创建一个内容已经填充标题未命名并选中修改的
        const id = (await window.api.sql(
          `insert into contents (title, category_id, content, file_type, created_at) values('未命名片段',0, '${search}', 0, strftime('%Y-%m-%d %H:%M:%S', 'now', '+8 hours'))`,
          'insert'
        )) as number
        window.api.openConfigWindow(id)

        // setTimeout(() => {
        //   return redirect(`/config/category/contentList/0/content/${id}`)
        // }, 300)
      }
      return ''
    },
    [search]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent)

    // 清理事件绑定
    return () => {
      document.removeEventListener('keydown', handleKeyEvent)
    }
  }, [handleKeyEvent])
  return (
    <main className="bg-slate-50 p-3 drag  rounded-lg">
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
      </section>
      <section className="text-center text-slate-500 mt-2">gruguy snippets</section>
    </main>
  )
}

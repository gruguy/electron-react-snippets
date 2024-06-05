import { useStore } from '@renderer/store/useStore'
import './styles.scss'
import useCodeSelect from '@renderer/hooks/useCodeSelect'
import useSearch from '@renderer/hooks/useSearch'
import { RocketOne } from '@icon-park/react'

export default function Result(): JSX.Element {
  // const [data, setData] = useState(codes)
  const { data, id, selectItem } = useCodeSelect()
  const { search } = useSearch()

  if (data && data.length) {
    return (
      <main className="main rounded-b-xl">
        {/* {data.length}-{currentIndex} */}
        {data.map((item) => (
          <div
            key={item.id}
            // className="text-slate-700 truncate mb-2"
            className={`item px-2 ${item.id === id ? 'active' : ''}`}
            onClick={() => selectItem(item.id)}
          >
            <span className="text-slate-400 mr-2">{item.title}</span>
          </div>
        ))}
      </main>
    )
  } else {
    // 显示加入片段按钮
    if (search && search.length > 0) {
      return (
        <main className="main  rounded-lg">
          <div className="text-slate-400 text-center">
            <div className="bg-blue-400 text-white flex flex-col items-center justify-center w-[80px] h-[80px]">
              <RocketOne theme="outline" size="24" />
              <button className="btn btn-primary">加入片段</button>
            </div>
          </div>
        </main>
      )
    } else {
      return <></>
    }
  }
}

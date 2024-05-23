import './styles.scss'
import useCodeSelect from '@renderer/hooks/useCodeSelect'

export default function Result(): JSX.Element {
  // const [data, setData] = useState(codes)
  const { data, id, selectItem } = useCodeSelect()

  {
    if (data && data.length) {
      return (
        <main className="main">
          {/* {data.length}-{currentIndex} */}
          {data.map((item) => (
            <div
              key={item.id}
              // className="text-slate-700 truncate mb-2"
              className={`item ${item.id === id ? 'active' : ''}`}
              onClick={() => selectItem(item.id)}
            >
              <span className="text-slate-400 mr-2">{item.content}</span>
            </div>
          ))}
        </main>
      )
    } else {
      return <></>
    }
  }
}

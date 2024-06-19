import { Delete } from '@icon-park/react'
import { Empty } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { NavLink, useSubmit } from 'react-router-dom'
import ContextMenu from '../ContextMenu'

export default function ConfigTitleList(data) {
  const [contents, setContents] = useState(data.contents)

  const [openMenu, setOpenMenu] = useState(false)
  const [contextData, setContextData] = useState<IContextItem[]>()
  const [x, setX] = useState<number>()
  const [y, setY] = useState<number>()
  const showContextMenu = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: IContextItem[]
  ): any => {
    const { clientX, clientY } = e
    setContextData(data)
    setX(clientX)
    setY(clientY)
    setOpenMenu(true)
  }
  document.body.addEventListener('click', (e) => {
    if (openMenu) {
      setOpenMenu(false)
    }
  })
  const submit = useSubmit()
  useEffect(() => {
    setContents(data.contents)
  }, [data.contents])
  return (
    // {contents.length ?
    <div>
      {contents.map((content) => (
        <NavLink
          to={`/config/category/contentList/${content.category_id}/content/${content.id}`}
          key={content.id}
          className={({ isActive }) => (isActive ? 'active' : '')}
          onDragStart={(e) => {
            // e.preventDefault()
            console.log('aqq')
            // 修改鼠标样式
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setData('id', String(content.id))
            e.dataTransfer.setData('cid', String(content.category_id))
          }}
          onContextMenu={(e) =>
            showContextMenu(e, [
              {
                key: 'remove',
                icon: <Delete theme="outline" size="18" strokeWidth={3} />,
                title: '删除片段',
                onClick: () => {
                  submit({ id: content.id, action: 'delete' }, { method: 'DELETE' })
                  setOpenMenu(false)
                }
              }
            ])
          }
        >
          <div className="title" title={content.title}>
            {content.title}
          </div>
          <div className="time">{dayjs(content.created_at).format('YYYY/MM/DD')}</div>
        </NavLink>
      ))}
      <ContextMenu data={contextData} x={x} y={y} show={openMenu} />
    </div>
  )
}

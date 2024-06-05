import { NavLink, Outlet, useLoaderData, useNavigate, useParams, useSubmit } from 'react-router-dom'
import './contentList.scss'
import { Component, ReactElement, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { AddThree, Delete } from '@icon-park/react'
import { Empty, Input } from 'antd'
import ContextMenu from '@renderer/components/ContextMenu'

export interface IContextItem {
  key: string
  title: string
  icon: ReactElement
  onClick?: () => void
}
export default function ContentList() {
  const contents = useLoaderData() as ContentType[]
  const navigate = useNavigate()
  // const currentCatoryId = useStore((state) => state.currentCategoryId)
  // const params = useParams()

  // const [cid, setCid] = useState(0)
  useEffect(() => {
    // console.log(contents, 'contents')
    window.api.cid((id) => {
      // setCid(id)
      navigate(`/config/category/contentList/0/content/${id}`)
    })
  }, [contents])

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
  return (
    <main className="contentList-page">
      <div className="list">
        <div className="handle-line border-b flex items-center justify-center gap-2 leading-[40px] bg-slate-100 hover:bg-slate-200 cursor-pointer">
          <input className="bg-transparent outline-none" placeholder="请输入片段名称" />
          <AddThree
            theme="outline"
            size="20"
            fill="#333"
            title="新增分类"
            onClick={() => submit({ action: 'add' }, { method: 'POST' })}
          />
        </div>
        {contents.length ? (
          contents.map((content) => (
            <NavLink
              to={`/config/category/contentList/${content.category_id}/content/${content.id}`}
              key={content.id}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onDragStart={(e) => {
                e.dataTransfer.setData('id', String(content.id))
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
          ))
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className="content">
        <Outlet />
      </div>

      <ContextMenu data={contextData} x={x} y={y} show={openMenu} />
    </main>
  )
}

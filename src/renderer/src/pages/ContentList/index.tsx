import { Outlet, useLoaderData } from 'react-router-dom'
import './contentList.scss'
import { ReactElement } from 'react'
import ConfigSearch from '@renderer/components/ConfigSearch'
import ConfigTitleList from '@renderer/components/ConfigTitleList'

export interface IContextItem {
  key: string
  title: string
  icon: ReactElement
  onClick?: () => void
}
export default function ContentList() {
  const contents = useLoaderData() as ContentType[]

  return (
    <main className="contentList-page">
      <div className="list">
        <ConfigSearch />

        <ConfigTitleList contents={contents} />
        {/* {contents.length ? (
          contents.map((content) => (
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
          ))
        ) : (
          <Empty description="暂无数据" />
        )} */}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  )
}

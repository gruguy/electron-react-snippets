import { Delete, FolderClose } from '@icon-park/react'
import { useEffect, useState } from 'react'
import { NavLink, useFetcher, useSubmit } from 'react-router-dom'
import ContextMenu from '../ContextMenu'

export default function CategoryList(data) {
  console.log(data, 'items')
  const [editingIndex, setEditingIndex] = useState(-1)
  const [items, setItems] = useState(data.items)
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

  const submit = useSubmit()
  const fetcher = useFetcher()

  document.body.addEventListener('click', (e) => {
    if (openMenu) {
      setOpenMenu(false)
    }
  })

  useEffect(() => {
    if (data.items) {
      setItems(data.items)
    }
  }, [data.items])
  return (
    <>
      {items.map((category, index) => {
        return (
          <div
            key={category.id}
            onDoubleClick={(e) => {
              e.preventDefault()
              setEditingIndex(index)
            }}
          >
            {editingIndex == index ? (
              <div className="item mx-2">
                <input
                  className="mx-2 w-[100px]"
                  value={category.name}
                  onChange={(e) => {
                    console.log(e.target.value)
                    const newItems = [...items]
                    newItems[index].name = e.target.value
                    setItems(newItems)
                  }}
                  onBlur={(e) => {
                    fetcher.submit(
                      { action: 'update', name: e.target.value, id: category.id },
                      { method: 'POST' }
                    )
                    setEditingIndex(-1)
                  }} // 失去焦点时结束编辑
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      fetcher.submit(
                        { action: 'update', name: e.currentTarget.value, id: category.id },
                        { method: 'POST' }
                      )
                      setEditingIndex(-1)
                    }
                  }}
                  autoFocus // 自动聚焦
                />
              </div>
            ) : (
              <NavLink
                to={`/config/category/contentList/${category.id}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
                data-id={category.id}
                title={category.name}
                onContextMenu={(e) => {
                  showContextMenu(e, [
                    {
                      key: 'remove',
                      icon: <Delete theme="outline" size="18" strokeWidth={3} />,
                      title: '删除片段',
                      onClick: () => {
                        submit({ id: category.id, action: 'delete' }, { method: 'DELETE' })
                        setOpenMenu(false)
                      }
                    }
                  ])
                }}
                onDragOver={(e) => {
                  // 阻止默认行为才能触发onDrop
                  e.preventDefault()
                  // console.log(e.currentTarget)
                  e.currentTarget.classList.add('drag-over')
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove('drag-over')
                }}
                onDrop={(e) => {
                  e.currentTarget.classList.remove('drag-over')
                  console.log(e.dataTransfer.getData('id'), category.id)
                  submit(
                    {
                      id: e.dataTransfer.getData('id'),
                      action: 'updateCategory',
                      cid: category.id
                    },
                    { method: 'POST' }
                  )
                }}
              >
                <FolderClose theme="outline" size="20" />

                <span className="truncate">{category.name}</span>
              </NavLink>
            )}
          </div>
        )
      })}

      {openMenu && <ContextMenu data={contextData} x={x} y={y} show={openMenu} />}
    </>
  )
}

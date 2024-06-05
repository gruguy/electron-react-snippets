import { NavLink, Outlet, redirect, useLoaderData, useNavigate, useSubmit } from 'react-router-dom'
import './category.scss'
import {
  AddThree,
  AllApplication,
  CategoryManagement,
  DatabaseConfig,
  Delete,
  FolderClose
} from '@icon-park/react'
import { useEffect, useState } from 'react'
import { Divider, Tooltip } from 'antd'
import ContextMenu from '@renderer/components/ContextMenu'

export default function Category() {
  const categories = useLoaderData() as CategoryType[]
  const navigate = useNavigate()
  const [items, setItems] = useState(categories)

  useEffect(() => {
    // 默认选中第一个
    if (categories.length) {
      navigate(`/config/category/contentList`)
    }
  }, []) //不要传入 categories 作为依赖，这样会导致 navigate 重复执行
  // 通过依赖categories 变化，更新 items
  useEffect(() => {
    setItems(categories)
  }, [categories])

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

  // useEffect(() => {
  // }, [items])

  const [editingIndex, setEditingIndex] = useState(-1)
  document.body.addEventListener('click', (e) => {
    if (openMenu) {
      setOpenMenu(false)
    }
  })
  return (
    <main className="category-page">
      <div className="categories">
        <h1 className="mt-2 px-2 opacity-90 mb-1">快捷操作</h1>
        <NavLink
          to={`/config/category/contentList`}
          end
          className={({ isActive }) => (isActive ? 'active first' : 'first')}
        >
          <AllApplication theme="outline" size="20" />
          <span>所有片段</span>
        </NavLink>
        <NavLink
          key="0"
          data-id="0"
          to={`/config/category/contentList/0`}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <CategoryManagement theme="outline" size="20" />
          <span>未分类</span>
        </NavLink>
        <Divider className="my-[8px]" />
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
                      submit(
                        { action: 'update', name: e.target.value, id: category.id },
                        { method: 'POST' }
                      )
                      setEditingIndex(-1)
                    }} // 失去焦点时结束编辑
                    autoFocus // 自动聚焦
                    onDoubleClick={(e) => e.stopPropagation()}
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
                >
                  <FolderClose theme="outline" size="20" />
                  <span className="truncate">{category.name}</span>
                </NavLink>
              )}
            </div>
          )
        })}
      </div>
      <div className="nav">
        <Tooltip title="新增分类">
          <AddThree
            theme="outline"
            size="20"
            fill="#333"
            title="新增分类"
            onClick={() => {
              submit({ action: 'add' }, { method: 'POST' })
            }}
          />
        </Tooltip>
        <Tooltip title="配置数据库">
          <DatabaseConfig theme="outline" size="20" fill="#333" title="配置数据库" />
        </Tooltip>
      </div>
      <div className="content">
        <Outlet />
      </div>
      {openMenu && <ContextMenu data={contextData} x={x} y={y} show={openMenu} />}
    </main>
  )
}

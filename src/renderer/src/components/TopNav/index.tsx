import { AllApplication, CategoryManagement } from '@icon-park/react'
import { NavLink } from 'react-router-dom'

export default function TopNav() {
  return (
    <>
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
    </>
  )
}

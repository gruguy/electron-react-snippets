import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import './category.scss'
import { useEffect, useState } from 'react'
import { Divider } from 'antd'
import FooterNav from '@renderer/components/FooterNav'
import CategoryList from '@renderer/components/categoryList'
import TopNav from '@renderer/components/TopNav'

export default function Category() {
  const categories = useLoaderData() as CategoryType[]
  const navigate = useNavigate()
  const [items, setItems] = useState(categories)

  useEffect(() => {
    // 默认选中第一个
    if (categories.length) {
      navigate(`/config/category/contentList`)
    }
    window.api.cid((id) => {
      navigate(`/config/category/contentList/0/content/${id}`)
    })
  }, []) //不要传入 categories 作为依赖，这样会导致 navigate 重复执行
  // 通过依赖categories 变化，更新 items
  useEffect(() => {
    setItems(categories)
  }, [categories])

  return (
    <main className="category-page">
      <div className="categories">
        <TopNav />

        <Divider className="my-[8px]" />
        {/* categoryList */}
        <CategoryList items={items} />
      </div>

      <FooterNav />
      <div className="content">
        <Outlet />
      </div>
    </main>
  )
}

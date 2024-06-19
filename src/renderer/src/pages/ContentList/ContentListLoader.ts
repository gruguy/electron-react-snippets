// import { redirect } from 'react-router-dom'

export default ({ params, request }) => {
  console.log('params.cid', params.cid)
  const url = new URL(request.url) // 将字符串地址转换为URL对象
  const searchWord = url.searchParams.get('searchWord')
  let sql = `select * from contents `
  if (searchWord) {
    if (params.cid) {
      sql += `where category_id=${params.cid} `
      sql += `and title like @searchWord order by created_at DESC`
    } else {
      sql += ` where title like @searchWord order by created_at DESC`
    }
    return window.api.sql(sql, 'findAll', { searchWord: `%${searchWord}%` })
  }
  if (params.cid) {
    sql += `where category_id=${params.cid} `
  }
  sql += `order by created_at DESC`
  return window.api.sql(sql, 'findAll')
  // redirect(`/config/category/contentList`)
}

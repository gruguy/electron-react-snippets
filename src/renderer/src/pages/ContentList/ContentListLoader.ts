// import { redirect } from 'react-router-dom'

export default ({ params }) => {
  console.log('params.cid', params.cid)
  if (!params.cid)
    return window.api.sql(`select * from contents  order by created_at DESC`, 'findAll')
  return window.api.sql(
    `select * from contents where category_id=${params.cid} order by created_at DESC`,
    'findAll'
  )
  // redirect(`/config/category/contentList`)
}

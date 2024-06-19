import { redirect } from 'react-router-dom'

export default async ({ request, params }) => {
  // return
  const { id } = params
  const formData = await request.formData()
  switch (formData.get('action')) {
    case 'update':
      // 修改标题和内容因为不可控内容可能会导致sql注入以及报错，所以需要使用预处理语言
      {
        if (formData.get('title')) {
          window.api.sql(`update contents set title = @title where id = @id`, 'update', {
            title: formData.get('title'),
            id: id
          })
        }
        if (formData.get('content')) {
          window.api.sql(`update contents set content = @content where id = @id`, 'update', {
            content: formData.get('content'),
            id: id
          })
        }
      }

      return {}
    // return redirect(`content/${id}`)
    case 'changeType':
      {
        window.api.sql(
          `update contents set  category_id = ${formData.get('category_id')} where id = ${id}`,
          'update'
        )
      }
      return redirect(`/config/category/contentList/${formData.get('category_id')}/content/${id}`)

    default:
      return {}
  }
}

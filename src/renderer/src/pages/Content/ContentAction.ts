import { redirect } from 'react-router-dom'

export default async ({ request, params }) => {
  // return
  const { id } = params
  const formData = await request.formData()
  console.log(formData.get('category_id'), 'formData')
  switch (formData.get('action')) {
    case 'update':
      {
        console.log(formData.get('title'), formData.get('content'), 'formData')
        if (formData.get('title')) {
          const title = formData.get('title').replaceAll("'", '"')
          window.api.sql(`update contents set title = '${title}' where id = ${id}`, 'update')
        }
        if (formData.get('content')) {
          const content = formData.get('content').replaceAll("'", '"')
          window.api.sql(`update contents set content = '${content}' where id = ${id}`, 'update')
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

import { redirect } from 'react-router-dom'

export default async ({ request, params }) => {
  const formData = await request.formData()
  switch (formData.get('action')) {
    case 'add': {
      const nid = await window.api.sql(
        `insert into categories (name, created_at) values('未命名', strftime('%Y-%m-%d %H:%M:%S', 'now', '+8 hours'))`,
        'insert'
      )
      // return {}
      return redirect(`/config/category/contentList/${nid}`)
    }

    case 'update': {
      console.log(formData.get('name') + ',' + formData.get('id'))
      await window.api.sql(
        `update categories set name = '${formData.get('name')}'  where id = ${formData.get('id')}`,
        'update'
      )
      return redirect(`/config/category/contentList/${formData.get('id')}`)
    }
    case 'delete': {
      return window.api.sql(`delete from categories where id = ${formData.get('id')}`, 'del')
    }

    default:
      return {}
  }
}

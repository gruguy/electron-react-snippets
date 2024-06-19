import { redirect } from 'react-router-dom'

export default async ({ request, params }) => {
  const formData = await request.formData()
  const cid = params.cid || 0
  switch (formData.get('action')) {
    case 'add': {
      const id = await window.api.sql(
        `insert into contents (title, category_id, content, file_type, created_at) values('未命名片段',${cid}, '', 0, strftime('%Y-%m-%d %H:%M:%S', 'now', '+8 hours'))`,
        'insert'
      )

      return redirect(`content/${id}`)
    }
    case 'delete': {
      const id = await window.api.sql(
        `delete from contents where id = ${formData.get('id')}`,
        'del'
      )
      return {}

      // return redirect(`content`)
    }

    default:
      return {}
  }
}

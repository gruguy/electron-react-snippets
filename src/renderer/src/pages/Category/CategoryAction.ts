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
      window.api.sql(`delete from categories where id = ${formData.get('id')}`, 'del')
      //  将目录下的片段cid修改为0至未分类
      window.api.sql(`update contents set category_id=0 where category_id=@category_id`, 'update', {
        category_id: formData.get('id')
      })
      return redirect('/config/category/contentList')
    }

    case 'updateCategory': {
      await window.api.sql(
        `update contents set category_id = '${formData.get('cid')}'  where id = ${formData.get('id')}`,
        'update'
      )
      return redirect(`/config/category/contentList/${formData.get('cid')}`)
    }

    default:
      return {}
  }
}

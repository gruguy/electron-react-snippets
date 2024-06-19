import { AddThree } from '@icon-park/react'
import { Form, useSubmit } from 'react-router-dom'

export default function ConfigSearch() {
  const submit = useSubmit()
  return (
    <Form>
      <div className="search-wrapper handle-line">
        <input
          name="searchWord"
          className="bg-transparent outline-none"
          placeholder="请搜索..."
          onChange={(e) => submit(e.target.form)}
        />
        <AddThree
          theme="outline"
          size="20"
          fill="#333"
          title="新增分类"
          onClick={() => submit({ action: 'add' }, { method: 'POST' })}
        />
      </div>
    </Form>
  )
}

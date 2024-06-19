import { AddThree, DatabaseConfig } from '@icon-park/react'
import { Tooltip } from 'antd'
import { Link, useSubmit } from 'react-router-dom'
export default function index() {
  const submit = useSubmit()
  return (
    <div className="nav">
      <Tooltip title="新增分类">
        <AddThree
          theme="outline"
          size="20"
          fill="#333"
          title="新增分类"
          onClick={() => {
            submit({ action: 'add' }, { method: 'POST' })
          }}
        />
      </Tooltip>
      <Link to={`/config`}>
        <Tooltip title="配置数据库">
          <DatabaseConfig theme="outline" size="20" fill="#333" title="配置数据库" />
        </Tooltip>
      </Link>
    </div>
  )
}

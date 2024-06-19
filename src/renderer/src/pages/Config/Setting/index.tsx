import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import './Setting.scss'
import { useState } from 'react'
export default function Setting() {
  const data = useLoaderData() as { shortCut: string; directory: string }
  const submit = useSubmit()
  const [keys, setKeys] = useState<string[]>([])
  return (
    <div className="setting-page">
      <Form method="POST">
        <h1>配置页面</h1>
        <section>
          <h3>快捷键设置</h3>
          <input
            type="text"
            placeholder="快捷键设置"
            name="shortCut"
            defaultValue={data.shortCut}
            onKeyUp={(e) => {
              // 先设置注册快捷键 成功后保存至数据库
              submit(e.currentTarget.form, { method: 'POST' })
              setKeys([])
            }}
            onKeyDown={(e) => {
              // console.log(e)
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
                const code = e.code.replace(/Left|Right|Key|Digit/, '')
                console.log(code)
                if (!keys.includes(code) && keys.length < 3) {
                  keys.push(code)
                  setKeys(keys)
                  console.log(keys)
                  e.currentTarget.value = keys.join('+')
                }
              }
            }}
          />
        </section>
        <section>
          <h3>数据库存放</h3>
          <input
            type="text"
            name="directory"
            placeholder="数据库存放"
            defaultValue={data.directory}
            onKeyUp={(e) => {
              submit(e.currentTarget.form, { method: 'POST' })
            }}
          />
        </section>
      </Form>
    </div>
  )
}

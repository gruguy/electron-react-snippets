import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import './content.scss'
import { useEffect, useState } from 'react'
import { debounce } from '@renderer/utils'
export default function Content() {
  interface ContentLoaderType {
    data: ContentType
    category: CategoryType[]
  }
  const { data, category } = useLoaderData() as ContentLoaderType

  const submit = useSubmit()
  const [rdata, setRdata] = useState(data)

  useEffect(() => {
    console.log(data, 'ppppppppppp')
    setRdata(data)
  }, [data])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRdata({ ...rdata, title: e.target.value })
    if (e.target.value) {
      debounce(submit({ action: 'update', title: e.target.value }, { method: 'POST' }))
    }
    // debounce(submit({ action: 'update', title: e.target.value }, { method: 'POST' }))
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRdata({ ...rdata, content: e.target.value })
    debounce(submit({ action: 'update', content: e.target.value }, { method: 'POST' }))
  }
  return (
    <main className="content-page">
      {
        <>
          {/* <Form
            method="POST"
            onChange={(event) => {
              console.log(event.target.value, 'event.currentTarget')
              submit({ action: 'update', title: event.target.value })
            }}
          > */}
          <h1>
            <input
              placeholder="请输入片段标题"
              spellCheck={false}
              type="text"
              value={rdata.title}
              onChange={handleTitleChange}
            />
          </h1>

          <h3>
            <select
              onChange={(e) =>
                submit({ action: 'changeType', category_id: e.target.value }, { method: 'POST' })
              }
            >
              <option value={0}>未分类</option>
              {category.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </h3>
          <div className="content">
            <textarea
              placeholder="请输入片段内容"
              spellCheck={false}
              value={rdata.content}
              onChange={handleContentChange}
            ></textarea>
          </div>
          {/* </Form> */}
        </>
      }
    </main>
  )
}

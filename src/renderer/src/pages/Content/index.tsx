import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import './content.scss'
import { useEffect, useRef, useState } from 'react'
import { debounce } from '@renderer/utils'
import { Input } from 'antd'
export default function Content() {
  interface ContentLoaderType {
    data: ContentType
    category: CategoryType[]
  }
  const { data, category } = useLoaderData() as ContentLoaderType

  const submit = useSubmit()
  const [rdata, setRdata] = useState(data)
  const inputRef = useRef()

  useEffect(() => {
    setRdata(data)
    inputRef!.current!.select()
  }, [])
  // useEffect(() => {
  // }, [rdata])

  let isComposition = true
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRdata({ ...rdata, title: e.target.value })
    // if (e.target.value) {
    debounce(submit({ action: 'update', title: e.target.value }, { method: 'POST' }))
    // }
    // }
    console.log(isComposition, '0000000')
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // if (!isComposition) {
    setRdata({ ...rdata, content: e.target.value })
    // if (!isComposition) {
    debounce(submit({ action: 'update', content: e.target.value }, { method: 'POST' }))
    // }
  }

  const handleTitlleComposition = (e: any) => {
    console.log(e.type)
    if (e.type === 'compositionend') {
      isComposition = false
      console.log(999)
      submit({ action: 'update', title: e.target.value }, { method: 'POST' })
    } else {
      isComposition = true
    }
  }
  const handleContentComposition = (e: any) => {
    console.log(e.type)
    if (e.type === 'compositionend') {
      isComposition = false
      console.log(999)
      submit({ action: 'update', content: e.target.value }, { method: 'POST' })
    } else {
      isComposition = true
    }
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
              ref={inputRef}
              placeholder="请输入片段标题"
              spellCheck={false}
              type="text"
              value={rdata.title}
              // onCompositionStart={handleTitlleComposition}
              // onCompositionEnd={handleTitlleComposition}
              onChange={handleTitleChange}
              autoFocus
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
              // onCompositionStart={handleContentComposition}
              // onCompositionEnd={handleContentComposition}
              onChange={handleContentChange}
            ></textarea>
          </div>
          {/* </Form> */}
        </>
      }
    </main>
  )
}

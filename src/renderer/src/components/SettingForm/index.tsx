import { useEffect, useState } from 'react'
import GModal from '../GModal'
import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { apiAdd, apiGetAll } from '@renderer/utils'
import { useStore } from '@renderer/store/useStore'

export default function SettingForm({ categories, showOpen, hideOpen }) {
  const [isOpen, setIsOpen] = useState(showOpen)
  const currentCategoryId = useStore((state) => state.currentCategoryId)
  useEffect(() => {
    setIsOpen(showOpen)
  }, [showOpen])
  const [form] = Form.useForm()
  const navigate = useNavigate()
  function submitForm(form) {
    apiAdd('categories', form).then((res) => {
      console.log(res)
      hideOpen(false)
      navigate(`/config/category/contentList/${currentCategoryId}`, { replace: true })
    })
    // window.api
    //   .sql(
    //     `INSERT INTO categories(name, created_at) VALUES('${form.name}', strftime('%Y-%m-%d %H:%M:%S', 'now', '+8 hours'))`,
    //     'insert'
    //   )
  }
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // 表单数据提交逻辑
        console.log('Received values from form: ', values)
        // 提交表单数据后，可以在这里调用API或者更新状态等操作
        // 数据库提交category新增
        submitForm(values)
        // 提交完成后，可以隐藏Modal
        setIsOpen(false)
      })
      .catch((info) => {
        console.log('Validate Failed: ', info)
      })
  }

  const handleCancel = () => {
    setIsOpen(false)
    hideOpen(false)
  }
  return (
    <GModal title="新增分类" isOpen={isOpen} handleOk={handleOk} handleCancel={handleCancel}>
      <div className="category-type-form">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: '请输入分类名!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </GModal>
  )
}

import { Form, Input, Radio, Select } from 'antd'
import GModal from '../GModal'
import MyCodeMirror from '../MyCodeMirror'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiAdd, apiGetAll } from '@renderer/utils'
import { useStore } from '@renderer/store/useStore'

export default function FileForm({ contents, showOpen, hideOpen }) {
  const [isFileOpen, setIsFileOpen] = useState(showOpen)
  const [showCommonType, setShowCommonType] = useState(1)
  const [categoryData, setCategoryData] = useState<CategoryType[]>([])
  const currentCategoryId = useStore((state) => state.currentCategoryId)
  useEffect(() => {
    // setIsFileOpen(showOpen)
  }, [])
  const [form] = Form.useForm()
  const navigate = useNavigate()
  function submitForm(form) {
    apiAdd(`contents`, form).then((res) => {
      navigate(
        `/config/category/contentList/${contents[0].category_id}/content/${contents[0].id}`,
        {
          replace: true
        }
      )
    })
  }
  const handleFileOk = () => {
    form
      .validateFields()
      .then((values) => {
        // 表单数据提交逻辑
        console.log('Received values from form: ', values)
        // 提交表单数据后，可以在这里调用API或者更新状态等操作
        // 数据库提交category新增
        submitForm(values)
        // 提交完成后，可以隐藏Modal
        setIsFileOpen(false)
      })
      .catch((info) => {
        console.log('Validate Failed: ', info)
      })
  }

  const handleCancel = () => {
    setIsFileOpen(false)
    hideOpen(false)
  }
  const onTypeChange = (e) => {
    console.log(e.target.value)
    setShowCommonType(e.target.value)
    // form.setFieldsValue({
    //   file_type: e.target.value
    // })
  }
  const getValue = (value) => {
    form.setFieldsValue({
      content: value
    })
  }
  return (
    <GModal
      isOpen={isFileOpen}
      handleOk={handleFileOk}
      handleCancel={handleCancel}
      title="新增片段"
      width={800}
    >
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
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '标题' }]}>
            <Input placeholder="搜索关键字" />
          </Form.Item>
          <Form.Item
            label="所在分组"
            name="category_id"
            rules={[{ required: true, message: '所在分组' }]}
            initialValue={currentCategoryId}
          >
            <Select placeholder="所在分组">
              {categoryData.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="文本类别"
            name="file_type"
            rules={[{ required: true, message: '文本类别' }]}
          >
            <Radio.Group onChange={onTypeChange}>
              <Radio value="1"> 文本 </Radio>
              <Radio value="2"> 代码 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="片段内容"
            name="content"
            rules={[{ required: true, message: '片段内容' }]}
          >
            {showCommonType == 1 ? (
              <Input.TextArea placeholder="请输入片段内容"></Input.TextArea>
            ) : (
              <MyCodeMirror getValue={getValue} />
            )}

            {/* <MyCodeMirror /> */}
          </Form.Item>
        </Form>
      </div>
    </GModal>
  )
}

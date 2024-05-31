import React from 'react'
import { Modal } from 'antd'
interface PropsTypes {
  title?: string
  width?: number
  isOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  children: React.ReactNode
}
const GModal = ({
  title = '新增',
  isOpen,
  handleOk,
  handleCancel,
  children,
  width = 600
}: PropsTypes) => {
  return (
    <>
      <Modal
        title={title}
        width={width}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
      >
        {children}
      </Modal>
    </>
  )
}

export default GModal

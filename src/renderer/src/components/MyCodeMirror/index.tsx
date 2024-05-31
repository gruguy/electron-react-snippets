import React, { useRef, useState } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/twilight.css'
import 'codemirror/mode/javascript/javascript'

export default function MyCodeMirror({ getValue }) {
  const codeMirrorRef = useRef(null)
  const [value, setValue] = useState()
  const onBeforeChange = (_editor, _data, value) => {
    setValue(value)
    console.log('value', value)
    getValue(value)
  }
  // onEffect(() => {
  //   if (codeMirrorRef.current) {
  //     // 获取 CodeMirror 实例
  //     const cmInstance = codeMirrorRef.current.editor

  //     // 监听变化（可选，取决于你的需求）
  //     cmInstance.on('change', (doc, change) => {
  //       onChange(cmInstance.getValue()) // 当内容改变时更新 state 或 props
  //     })

  //     // 你可以在这里添加更多 CodeMirror 的配置或事件监听
  //   }
  // }, [])
  return (
    <CodeMirror
      value={value}
      onChange={onBeforeChange}
      options={{
        mode: 'javascript',
        theme: 'twilight',
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        extraKeys: { 'Ctrl-Space': 'autocomplete' }
        // fullScreen: isFullScreen
      }}
      editorDidMount={(editor) => {
        codeMirrorRef.current = editor
      }}
    />
  )
}
function onEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.')
}

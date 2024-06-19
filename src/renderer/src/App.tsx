// import { useState } from 'react'
import { MutableRefObject, useEffect, useRef } from 'react'
import Result from './components/Result/inex'
import Search from './components/Search'
import { CodeProvider } from './context/CodeContext'
import useShortCut from './hooks/useShortCut'
import useIgnoreMouseEvents from './hooks/useIgnoreMouseEvent'

function App(): JSX.Element {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const { setIgnoreMouseEvents } = useIgnoreMouseEvents()
  useEffect(() => {
    setIgnoreMouseEvents(mainRef as MutableRefObject<HTMLDivElement>)
  }, [])

  // const { register } = useShortCut()
  // register('search')
  return (
    // <CodeProvider>
    <main className="p-3 " ref={mainRef}>
      <Search />
      <Result />
    </main>
    //</CodeProvider>
  )
}

export default App

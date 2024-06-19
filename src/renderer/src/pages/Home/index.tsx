// import { useState } from 'react'
import { MutableRefObject, useEffect, useRef } from 'react'
import Result from '@renderer/components/Result/inex'
import Search from '@renderer/components/Search'
import { CodeProvider } from '@renderer/context/CodeContext'
// import useShortCut from '@renderer/hooks/useShortCut'
import useIgnoreMouseEvents from '@renderer/hooks/useIgnoreMouseEvent'
import React from 'react'

function Home(): JSX.Element {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const { setIgnoreMouseEvents } = useIgnoreMouseEvents()
  useEffect(() => {
    setIgnoreMouseEvents(mainRef as MutableRefObject<HTMLDivElement>)
  }, [])
  // const { register } = useShortCut()
  // register('search', 'CommandOrControl+Shift+Space')
  return (
    // <CodeProvider>
    <React.StrictMode>
      <main className="p-8" ref={mainRef}>
        <div className="wrapper withShadow  rounded-lg">
          <Search />
          <Result />
        </div>
      </main>
    </React.StrictMode>
    //</CodeProvider>
  )
}

export default Home

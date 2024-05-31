import Category from '@renderer/pages/Category'
import CategoryLoader from '@renderer/pages/Category/CategoryLoader'
import Config from '@renderer/pages/Config'
import ContentList from '@renderer/pages/ContentList'
import Content from '@renderer/pages/Content'
import ContentListLoader from '@renderer/pages/ContentList/ContentListLoader'
import Home from '@renderer/pages/Home'
import { createHashRouter } from 'react-router-dom'
import ContentLoader from '@renderer/pages/Content/ContentLoader'
import CategoryAction from '@renderer/pages/Category/CategoryAction'
import ContentListAction from '@renderer/pages/ContentList/ContentListAction'
import Welcome from '@renderer/pages/Welcome'
import ContentAction from '@renderer/pages/Content/ContentAction'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/config',
    element: <Config />,
    children: [
      {
        path: 'category',
        element: <Category />,
        loader: CategoryLoader,
        action: CategoryAction,
        children: [
          {
            path: 'contentList/:cid?',
            element: <ContentList />,
            loader: ContentListLoader,
            action: ContentListAction,
            children: [
              {
                index: true,
                element: <Welcome />
              },
              {
                path: 'content/:id',
                element: <Content />,
                loader: ContentLoader,
                action: ContentAction
              }
            ]
          }
        ]
      }
    ]
  }
])

export default router

type SqlActionType = 'findAll' | 'findOne' | 'update' | 'insert' | 'del'

type CategoryType = {
  id: number
  name: string
  created_at: string
}

type ContentType = {
  id: number
  title: string
  content: string
  category_id: number
  created_at: string
}

interface IContextItem {
  key: string
  title: string
  icon: ReactElement
  onClick?: () => void
}

type WindowNameType = 'search' | 'config'

type ConfigType = {
  id: number
  content: string
}

type ConfigDataType = {
  shorCut: string
  directory: string
}

import { db } from './connection'

export const findAll = (sql: string, params: Record<string, any> | undefined) => {
  return db.prepare(sql).all(params)
}

export const findOne = (sql: string) => {
  return db.prepare(sql).get()
}
export const insert = (sql: string, params: Record<string, any> | undefined) => {
  return db.prepare(sql).run(params).lastInsertRowid
}

export const update = (sql: string, params: Record<string, any> | undefined) => {
  return db.prepare(sql).run(params).changes
}

export const del = (sql: string) => {
  return db.prepare(sql).run().changes
}

export const getConfigData = () => {
  const data = db.prepare('select * from config where id = 1').get() as ConfigType
  const content = data && JSON.parse(data.content)
  return content
}

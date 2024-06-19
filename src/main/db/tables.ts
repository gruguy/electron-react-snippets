import { db } from './connection'

db.exec(`
  create table if not exists categories(
    id INTEGER primary key autoincrement not null,
    name text not null,
    created_at text not null
  )
`)

db.exec(`
  create table if not exists contents(
    id INTEGER primary key autoincrement not null,
    title text not null,
    content text not null,
    category_id interger,
    file_type interger,
    created_at text not null
  )
`)

db.exec(`
  create table if not exists config(
    id INTEGER primary key autoincrement not null,
    content text not null
  )
`)

db.exec(`INSERT INTO config (content) VALUES('{}')`)

// db.exec(`
//    INSERT INTO contents(title, content, category_id, created_at)
//    VALUES('test', 'test', 1, datetime('now'))
// `)

export const apiGetAll = (tablename: string) => {
  return window.api.sql(`select * from ${tablename}`, 'findAll') as Promise<any>
}

export const apiGetOne = (tablename: string, id: number) => {
  return window.api.sql(`select * from ${tablename} where id = ${id}`, 'findOne')
}

export const apiAdd = (tablename: string, data) => {
  data.created_at = `strftime('%Y-%m-%d %H:%M:%S', 'now', '+8 hours')`
  const params = Object.keys(data)
  const paramsString = params.join(',')
  const values = Object.values(data)
  values.forEach((item, index) => {
    if (typeof item === 'string' && params[index] != 'created_at') {
      values[index] = `'${item}'`
    }
  })
  const valuesString = values.join(',')
  console.log(`INSERT INTO ${tablename}(${paramsString}) VALUES(${valuesString})`)
  // title, content, category_id, created_at)
  //    VALUES('test', 'test', 1, datetime('now')
  // return window.api.sql(
  //   `INSERT INTO contents(title,category_id,file_type,content,created_at) VALUES('俄而热热',1,'1','二热热热热',strftime('%Y-%m-%d %H:%M:%S', 'now', '+8 hours'))`,
  //   'insert'
  // )
  return window.api.sql(
    `INSERT INTO ${tablename}(${paramsString}) VALUES(${valuesString})`,
    'insert'
  )
}

export const apiUpdate = (tablename: string, data) => {
  let temp: string[] = []
  for (let key in data) {
    if (key != 'id') {
      temp.push(`${key} = '${data[key]}'`)
    }
  }
  const tempStr = temp.join(',')
  return window.api.sql(`UPDATE ${tablename} SET ${tempStr} WHERE id = ${data.id}`, 'update')
}

export const apiDel = (tablename: string, id: number) => {
  return window.api.sql(`DELETE FROM ${tablename} WHERE id = ${id}`, 'del')
}

export function debounce(func, wait: number = 500, immediate: boolean = true) {
  let timer: string | number | NodeJS.Timeout | undefined | null
  return function (...args) {
    // 如果存在定时器，则还处在等待期间，则清除定时器，重新开始计算时间
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate) {
      // 如果是立即执行，则第一次进入的时候，定时器为空，会立即执行一次，然后立即开启一个定时器
      // 短时间内触发第二次时，定时器是不为空的，那么就不会执行，只有等定时器走完，清除了timer，才会再次执行
      // 这样也就实现了第一次点击立即执行，后面过了指定时间，定时器为空，才会再次执行
      // 注意：需要注意参数和this绑定的处理
      if (!timer) {
        typeof func === 'function' && func.apply(this, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      // 设置定时器，定时器正常走完才会执行方法，也就是指定时间内没有再次触发，才会执行
      timer = setTimeout(() => {
        typeof func === 'function' && func.apply(this, args)
      }, wait)
    }
  }
}

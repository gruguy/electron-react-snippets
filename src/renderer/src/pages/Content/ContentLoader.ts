export default async ({ params }) => {
  const category = await window.api.sql(`select * from categories`, 'findAll')
  const data = await window.api.sql(
    `select * from contents where id=${params.id} order by created_at desc`,
    'findOne'
  )
  return { data, category }
}

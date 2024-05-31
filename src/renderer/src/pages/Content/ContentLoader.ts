export default async ({ params }) => {
  const data = await window.api.sql(`select * from contents where id=${params.id}`, 'findOne')
  const category = await window.api.sql(`select * from categories`, 'findAll')
  return { data, category }
}

const loader = () => {
  return window.api.sql('select * from categories order by created_at', 'findAll')
}

export default loader

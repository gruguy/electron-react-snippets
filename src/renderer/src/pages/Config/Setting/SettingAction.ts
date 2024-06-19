export default async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())
  const isRegister = await window.api.shortCut('search', data.shortCut)
  console.log(isRegister, 'isRegister')
  if (!isRegister) {
    return window.api.sql(`update config set content=@content where id=1`, `update`, {
      content: JSON.stringify(data)
    })
  }
  return {}
}

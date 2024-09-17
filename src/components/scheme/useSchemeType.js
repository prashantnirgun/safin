import { find } from 'boot/axios'

export default () => {
  const routeName = 'schemes'

  const getSchemeList = async (schemeType) => {
    const result = await find(routeName, {
      schemeType,
      sort: 'name',
    })
    return result.data.data
  }

  return {
    getSchemeList,
  }
}

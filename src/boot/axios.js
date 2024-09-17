import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useGlobalStore } from 'src/stores/global'
import { Notify } from 'quasar'

/*
const api = axios.create({ baseURL: 'https://api.example.com' })
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
*/

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
})
let globalStore
export default boot(({ app, store, router }) => {
  const global = useGlobalStore(store)
  globalStore = global
  //TODO: check its still send old token need to fix this
  //console.log('what is state.token', global.getToken)
  if (global.getToken) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + global.getToken
    //console.log("api->>token", global.getToken);
  } else {
    //console.log(global.getToken)
    //alert('no token found')
  }
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.response.use(
    (res) => {
      //console.log("what is response", res, typeof res.status);
      switch (res.config.method) {
        case 'post':
          break
        case 'patch':
          if (res.statusText === 'OK') {
            Notify.create({
              type: 'positive',
              message: 'Record updated successfully',
            })
          }
          break
        case 'delete':
          if (res.statusText === 'OK') {
            Notify.create({
              type: 'positive',
              message: 'Record deleted successfully',
            })
          }
          break
        default:
          break
      }

      return res
    },
    (err) => {
      //console.log('what is error', err)

      if (err.response && err.response?.status === 401) {
        //console.log('token', global.getToken)
        Notify.create({
          type: 'negative',
          message: 'Security token is expired you need to login to continue',
        })
        //goto('/sign-in')
        router.push('/login')
        throw new Error(`${err.config.url} not found`)
      }
      throw err
    }
  )
})
const find = async (routeName, argument = {}) => {
  //console.log(argument)
  const result = await api.get(routeName, { params: { ...argument } })
  //console.log("result", result);
  return result
}

const findById = async (route, id, argument) => {
  const response = await api.get(
    `${route}/${id}`,
    !argument ? {} : { params: argument }
  )
  delete response.data.updatedAt
  delete response.data.createdAt
  delete response.data.createdById
  delete response.data.updatedById
  return response
}

const post = async (route, data, config = {}) => {
  if (Object.keys(config) === 0) {
    return await api.post(route, data)
  } else {
    return await api.post(route, data, config)
  }
}

const put = async (route, data) => {
  return await api.put(route, data)
}

const patch = async (route, id, data) => {
  return await api.patch(`${route}/${id}`, data)
}

const remove = async (route, id) => {
  return await api.delete(`${route}/${id}`)
}
const updateToken = () => {
  api.defaults.headers.common['Authorization'] =
    'Bearer ' + globalStore.getToken
}

const fetcher = (...args) => api(...args)

export {
  axios,
  api,
  find,
  findById,
  post,
  put,
  patch,
  remove,
  fetcher,
  updateToken,
}

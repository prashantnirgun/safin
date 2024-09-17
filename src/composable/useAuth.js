import { useGlobalStore } from 'src/stores/global'
import { api } from 'boot/axios'
import useCommon from 'src/composable/useCommon'

const global = useGlobalStore()

export default function useAuth() {
  let token, user, response
  const { showAlert, goto } = useCommon()
  const login = async (userName, password) => {
    try {
      const url = `${process.env.API_URL}authentication`
      //console.log('login', url)
      response = await api.post(url, {
        userName,
        password,
      })
      token = response.data.accessToken
      user = response.data.user
      if (token) {
        global.setToken(token)
        global.setUser(user)
        showAlert({ type: 'positive', message: `Welcome ${user.userName}` })
      } else {
        showAlert({ type: 'positive', message: `Failed to login` })
      }
      return true
    } catch (error) {
      console.log('catch', error)
      showAlert({ type: 'negative', message: error.response.data })

      token = null
      user = null
      return false
    }
  }

  const register = async (body) => {
    await api('/api/auth/register', {
      method: 'POST',
      body: { ...body },
    })
    //return await login(email, password)
  }

  const logout = async (redirectPath = '/') => {
    global.setToken(null)
    global.setUser(null)
    showAlert({ type: 'positive', message: `Logged out successfully` })
    goto(redirectPath)
  }

  return {
    login,
    register,
    logout,
  }
}

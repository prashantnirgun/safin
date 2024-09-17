import * as axiosInstance from './DataService'
import { useGlobalStore } from 'src/stores/global'
const END_POINT = 'users'
const store = useGlobalStore()

export async function signIn(argument) {
  const result = await axiosInstance.post(`${END_POINT}/sign-in`, argument)
  return result
}

export async function loginAs(session, uuid) {
  const result = await axiosInstance.find(`${END_POINT}/${session}/account`, {
    uuid,
  })
  return result
}

export async function generateToken() {
  const url = `${store.requestURL}${store.getUUID}/${process.env.SECRETKEY}/generate-token`
  const result = await axiosInstance.post(url)
  return result
}
export async function updateToken() {
  const result = await axiosInstance.find(
    `${store.requestURL}users/${store.getUUID}/update-token`,
    {},
  )
  return result
}

export async function userExists(argument) {
  try {
    return await axiosInstance.find(`${END_POINT}/user-exists`, argument)
  } catch (error) {
    return error.response.data.type === 'NO_ROWS_FOUND' ? false : true
  }
}

export async function singUp(argument) {
  const result = await axiosInstance.post(`${END_POINT}/sign-up`, argument)
  return result
}

export async function forgotPassword(argument) {
  const result = await axiosInstance.post(`${END_POINT}/forgot-password`, {
    email: argument,
  })
  return result
}

export async function resetPassowrdCodeValidity(argument) {
  const result = await axiosInstance.find(`${END_POINT}/forgot-password`, {
    resetToken: argument,
  })
  return result
}

export async function updatePassowrd(uuid, argument) {
  return await axiosInstance.post(
    `${END_POINT}/${uuid}/update-password`,
    argument,
  )
}

export async function updateUser(session, argument) {
  return await axiosInstance.post(`${END_POINT}/${session}/update`, argument)
}

export async function resetPassowrd(id, argument) {
  return await axiosInstance.patch(
    `${END_POINT}/forgot-password/${id}`,
    argument,
  )
}

export function fetchBalance(uuid) {
  return axiosInstance.find(
    `${store.requestURL}users/${uuid}/check-balance`,
    {},
  )
}

export async function startSession(webhook) {
  return await axiosInstance.post(`${store.getUUID}/start-session`, {
    webhook,
  })
}

export async function qrcodeSession(session) {
  return await axiosInstance.find(`${session}/status-session`, {})
}

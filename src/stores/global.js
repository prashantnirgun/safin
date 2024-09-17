import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref, computed } from 'vue'
import { updateToken } from 'boot/axios'

export const useGlobalStore = defineStore('global', () => {
  //  const config = useRuntimeConfig();

  let initState = {
    isLoggedIn: false,
    user: null,
    token: null,
    currentCompany: {
      company_name: process.env.SITE_NAME,
    },
    years: [],
    branches: [],
    currentBranch: {},
    currentYear: {},
    baseId: null,
  }

  const state = ref(useLocalStorage('global', initState))

  const setToken = (payload) => {
    state.value.token = payload
    updateToken()
    //console.log('setToken', payload, state.value)
  }
  const setCompany = (payload) => {
    state.value.currentCompany = payload
  }

  const setBranches = (payload) => {
    state.value.branches = payload
  }

  const setYears = (payload) => {
    state.value.years = payload
  }

  const setCurrentBranch = (payload) => {
    state.value.currentBranch = payload
  }

  const setCurrentYear = (payload) => {
    state.value.currentYear = payload
  }

  const setUser = (payload) => {
    //console.log('whats is user payload', payload)
    state.value.user = payload
    if (payload) {
      state.value.isLoggedIn = true
    } else {
      state.value.isLoggedIn = false
    }
  }

  const setUserAttr = (payload) => {
    this.user.userAttr = payload
  }

  const isLoggedIn = computed(() => state.value.isLoggedIn)
  const getUser = computed(() => state.value.user)
  const getUserId = computed(() => state.value.user?._id || 0)
  const getCompanyName = computed(
    () => state.value.currentCompany?.company_name || process.env.SITE_NAME //"APMC"
  )
  const getUserAttr = (state) => {
    return state.user?.userAttr
  }
  const isAdmin = computed(() => {
    return (
      (state.value.user &&
        (state.value.user.user_group_name === 'Admin' ||
          state.value.user.user_group_name === 'Manager')) ||
      false
    )
  })
  const getCompanyId = computed(() => state.value.currentCompany?.id || 0)
  const getBranchId = computed(() => state.value.currentBranch?.id || 0)
  const getYearId = computed(() => state.value.currentYear?.id || 0)
  const getUserName = computed(() => state.value.user?.userName || 'Guest')
  const getToken = computed(() => state.value.token)
  const isLoggedInAs = computed(() => {
    return !!state.value.baseId
  })
  const getUserGroup = computed(() => {
    //console.log('getUserGroup', state.user ? state.user : 'Guest')
    return state.value.user && state.value.user.user_group_name
      ? state.value.user.user_group_name
      : 'Guest'
  })

  return {
    state,
    setUser,
    setUserAttr,
    isLoggedIn,
    getUser,
    getUserId,
    getToken,
    setToken,
    setCompany,
    setBranches,
    setYears,
    setCurrentBranch,
    setCurrentYear,
    getCompanyName,
    getCompanyId,
    getBranchId,
    getYearId,
    getUserName,
    getUserAttr,
    isAdmin,
    isLoggedInAs,
    getUserGroup,
  }
})

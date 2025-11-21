import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const registerUser = async (formData) => {
    try {
      const res = await axios.post('api/register', formData)
      return { success: true, data: res.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Something went wrong',
      }
    }
  }

  const loginUser = async (credentials) => {
    try {
      const res = await axios.post('api/login', credentials)

      // Save token
      token.value = res.data.token
      user.value = res.data.user

      localStorage.setItem('token', res.data.token)

      return { success: true, data: res.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Login failed',
      }
    }
  }

  const logout = async () => {
    try {
      const res = await axios.post(
        'api/logout',
        {},
        { headers: { Authorization: `Bearer ${token.value}` } },
      )
      console.log(res)
    } catch (e) {
      console.log('Logout Successful', e.response?.data)
    }
    // Remove from localStorage
    localStorage.removeItem('token')
    user.value = null
    token.value = null
    // Remove axios default Authorization header
    delete axios.defaults.headers.common['Authorization']
  }

  return {
    user,
    token,
    registerUser,
    loginUser,
    logout,
  }
})

import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const registerUser = async (formData) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register', formData)

      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response.data }
    }
  }
  const loginUser = async (credentials) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login', credentials)
      localStorage.setItem('token', res.data.token)
      return { success: true, data: res.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data,
      }
    }
  }
  return {
    registerUser,
    loginUser,
  }
})

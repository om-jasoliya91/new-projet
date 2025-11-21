import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const courses = ref([])
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
      console.log('Logout Error', e.response?.data)
    }
    // Remove from localStorage
    localStorage.removeItem('token')
    user.value = null
    token.value = null
    // Remove axios default Authorization header
    delete axios.defaults.headers.common['Authorization']
  }

  const fetchUser = async () => {
    //it is stop if already one time ajax load so not again call without relaod page
    if (user.value) {
      return
    }
    try {
      const res = await axios.get('api/user')
      console.log(res.data)
      user.value = res.data
    } catch (e) {
      console.log('Data is not Fetch', e)
    }
  }

  const fetchCourse = async () => {
    if (courses.value.length === 0) {
      try {
        const res = await axios.get('api/allCourse')
        console.log(res.data)
        courses.value = res.data.data
      } catch (e) {
        console.log('errr', e)
      }
    }
  }

  const updateUser = async (formData) => {
    try {
      const res = await axios.post('api/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      user.value = res.data // update Pinia

      return { success: true, data: res.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Update failed',
      }
    }
  }

  return {
    user,
    token,
    courses,
    registerUser,
    loginUser,
    logout,
    fetchUser,
    fetchCourse,
    updateUser,
  }
})

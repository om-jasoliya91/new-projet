import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

// ------------------ GLOBAL AXIOS SETTINGS ------------------
axios.defaults.baseURL = import.meta.env.VITE_API_URL

// This adds Authorization Bearer token automatically on every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// -----------------------------------------------------------

export const useUserStore = defineStore('userStore', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const courses = ref([])

  // REGISTER
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

  // LOGIN
  const loginUser = async (credentials) => {
    try {
      const res = await axios.post('api/login', credentials)
      Swal.fire({
        title: 'Login Successgully ',
        text: 'Welcome Back',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      })
      token.value = res.data.token
      user.value = res.data.user

      localStorage.setItem('token', res.data.token)

      return { success: true, data: res.data }
    } catch (error) {
      Swal.fire({
        title: 'Login Faild',
        text: error.response?.data?.message || 'Please Check Your Credentials',
        icon: 'error',
      })
      // return {
      //   success: false,
      //   error: error.response?.data || 'Login failed',
      // }
    }
  }

  // LOGOUT
  const logout = async () => {
    try {
      await axios.post('api/logout') // token automatically added by interceptor
    } catch (e) {
      console.log('Logout Error:', e.response?.data)
    }

    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  // FETCH LOGGED USER
  const fetchUser = async () => {
    // If user is already loaded → do NOT call API again
    if (user.value) {
      return
    }

    try {
      const res = await axios.get('api/user')
      user.value = res.data
    } catch (e) {
      console.log('User fetch failed:', e)
    }
  }

  // FETCH ALL COURSES
  const fetchCourse = async () => {
    // If already loaded → do NOT call API again
    if (courses.value.length > 0) {
      return
    }

    try {
      const res = await axios.get('api/allCourse')
      courses.value = res.data.data
    } catch (e) {
      console.log('Course fetch failed:', e)
    }
  }

  // UPDATE USER PROFILE
  const updateUser = async (formData) => {
    try {
      const res = await axios.post('api/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // Always check if API returned data
      if (res.data?.data) {
        user.value = { data: res.data.data } // Update Pinia store instantly
      }

      return {
        success: true,
        message: res.data.message ?? 'Profile updated successfully',
        data: res.data.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Update failed',
      }
    }
  }

  //Delete User Account
  const deleteAccount = async () => {
    try {
      const res = await axios.delete('api/delete-user-account')
      // clear pinia + token
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      return { success: true, data: res.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data,
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
    deleteAccount,
  }
})

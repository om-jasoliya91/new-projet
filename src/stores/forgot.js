import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useForgotStore = defineStore('forgot', () => {
  const loading = ref(false)
  const success = ref(null)
  const error = ref(null)

  const sendResetLink = async (email) => {
    loading.value = true
    success.value = null
    error.value = null

    try {
      const res = await axios.post('/api/forgot-password', { email })
      success.value = res.data.message
    } catch (err) {
      error.value = err?.response?.data?.message || 'Unable to send reset link'
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (payload) => {
    loading.value = true
    success.value = null
    error.value = null

    try {
      const res = await axios.post('/api/reset-password', payload)
      success.value = res.data.message
    } catch (err) {
      error.value = err?.response?.data?.message || 'Unable to reset password'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    success,
    error,
    sendResetLink,
    resetPassword,
  }
})

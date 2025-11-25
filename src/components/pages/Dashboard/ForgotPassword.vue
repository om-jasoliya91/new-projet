<script setup>
import { ref } from 'vue'
import { useForgotStore } from '@/stores/forgot.js'

const store = useForgotStore()
const email = ref('')

const submit = () => {
  if (!email.value) {
    store.error = 'Email is required'
    return
  }
  store.sendResetLink(email.value)
}
</script>

<template>
  <div class="forgot-box">
    <h2>Forgot Password</h2>

    <form @submit.prevent="submit">
      <label>Email Address</label>
      <input type="email" v-model="email" placeholder="Enter your email" required />

      <button type="submit" :disabled="store.loading">
        <span v-if="store.loading">Sending...</span>
        <span v-else>Send Reset Link</span>
      </button>
    </form>

    <p v-if="store.success" class="success-msg">{{ store.success }}</p>
    <p v-if="store.error" class="error-msg">{{ store.error }}</p>
    <div class="text-center">
      <router-link to="/login">Back to Login</router-link>
    </div>
  </div>
</template>

<style scoped>
.forgot-box {
  max-width: 360px;
  margin: auto;
}
input,
button {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
.success-msg {
  color: green;
  margin-top: 10px;
}
.error-msg {
  color: red;
  margin-top: 10px;
}
</style>

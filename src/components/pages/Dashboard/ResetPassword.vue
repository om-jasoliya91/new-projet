<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForgotStore } from '@/stores/forgot.js'

const route = useRoute()
const router = useRouter()
const store = useForgotStore()

const password = ref('')
const password_confirmation = ref('')

const submit = async () => {
  if (!password.value || !password_confirmation.value) {
    store.error = 'All fields are required'
    return
  }

  await store.resetPassword({
    token: route.query.token,
    email: route.query.email,
    password: password.value,
    password_confirmation: password_confirmation.value,
  })

  if (store.success) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="reset-box">
    <h2>Reset Password</h2>

    <form @submit.prevent="submit">
      <label>New Password</label>
      <input type="password" v-model="password" placeholder="Enter new password" required />

      <label>Confirm Password</label>
      <input
        type="password"
        v-model="password_confirmation"
        placeholder="Confirm new password"
        required
      />

      <button type="submit" :disabled="store.loading">
        <span v-if="store.loading">Updating...</span>
        <span v-else>Reset Password</span>
      </button>
    </form>

    <p v-if="store.success" class="success-msg">{{ store.success }}</p>
    <p v-if="store.error" class="error-msg">{{ store.error }}</p>
  </div>
</template>

<style scoped>
.reset-box {
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

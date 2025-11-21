<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// Validation Schema (YUP)
const schema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

//  useForm (connect schema)
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

// Fields
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

//Submit Handler
const submitLogin = handleSubmit(async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  }

  const result = await userStore.loginUser(credentials)

  if (result.success) {
    alert('Login Successful!')
    resetForm()
    router.push('/home') // redirect after login
  } else {
    alert(result.error?.message ?? 'Invalid credentials!')
  }
})
</script>

<template>
  <div class="container my-5" style="width: 500px">
    <h1 class="text-primary text-center">Login</h1>

    <form @submit.prevent="submitLogin">
      <!-- Email -->
      <div class="mb-3">
        <label>Email:</label>
        <input v-model="email" class="form-control" type="email" placeholder="Enter email" />
        <small class="text-danger">{{ emailError }}</small>
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label>Password:</label>
        <input
          v-model="password"
          class="form-control"
          type="password"
          placeholder="Enter password"
        />
        <small class="text-danger">{{ passwordError }}</small>
      </div>

      <button type="submit" class="btn btn-primary w-100">Login</button>
      <div class="mb-3 text-center">
        <router-link to="/">Create New Account? Register here</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped></style>

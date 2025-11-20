<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// Validation Schema
const schema = yup.object({
  name: yup.string().min(2, 'Minimum 2 characters').required('Name is Required'),
  email: yup.string().email('Invalid Email').required('Email is Required'),
  age: yup.number().required('Age is required').positive().integer(),
  city: yup.string().required('City is required'),
  address: yup.string().required('Address is required'),
  password: yup.string().min(6, 'At least 6 characters').required('Password is required'),
  profile_pic: yup
    .mixed()
    .test('required', 'File is required', (value) => value !== null)
    .test(
      'filesize',
      'File too large (max 2MB)',
      (value) => !value || value.size <= 2 * 1024 * 1024,
    ),
})
// handleSubmit is a VeeValidate helper function that runs your form validation,
//  and only executes your submit function if all fields are valid.
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

// Define fields
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: age, errorMessage: ageError } = useField('age')
const { value: city, errorMessage: cityError } = useField('city')
const { value: address, errorMessage: addressError } = useField('address')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: profile_pic, errorMessage: fileError } = useField('profile_pic')

// File handler
function handleFile(e) {
  profile_pic.value = e.target.files[0]
}

// Submit
const submitForm = handleSubmit(async () => {
  // It creates a special object used to send form data (including files)
  // to the server using axios, fetch, etc.
  const formData = new FormData()

  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('age', age.value)
  formData.append('city', city.value)
  formData.append('address', address.value)
  formData.append('password', password.value)
  formData.append('password_confirmation', password.value)
  formData.append('profile_pic', profile_pic.value)

  const result = await userStore.registerUser(formData)

  if (result.success) {
    alert('User Registered Successfully!')
    resetForm()
    router.push('/login')
  } else {
    console.log('API Validation Errors:', result.error)
    alert('Something went wrong!')
  }
})
</script>

<template>
  <div class="container my-5" style="width: 500px">
    <h1 class="text-primary text-center">Register</h1>

    <form @submit.prevent="submitForm">
      <!-- NAME -->
      <div class="mb-3">
        <label>Name:</label>
        <input v-model="name" class="form-control" type="text" />
        <small class="text-danger">{{ nameError }}</small>
      </div>

      <!-- EMAIL -->
      <div class="mb-3">
        <label>Email:</label>
        <input v-model="email" class="form-control" type="email" />
        <small class="text-danger">{{ emailError }}</small>
      </div>

      <!-- AGE -->
      <div class="mb-3">
        <label>Age:</label>
        <input v-model="age" class="form-control" type="number" />
        <small class="text-danger">{{ ageError }}</small>
      </div>

      <!-- CITY -->
      <div class="mb-3">
        <label>City:</label>
        <input v-model="city" class="form-control" type="text" />
        <small class="text-danger">{{ cityError }}</small>
      </div>

      <!-- ADDRESS -->
      <div class="mb-3">
        <label>Address:</label>
        <textarea v-model="address" class="form-control"></textarea>
        <small class="text-danger">{{ addressError }}</small>
      </div>

      <!-- PASSWORD -->
      <div class="mb-3">
        <label>Password:</label>
        <input v-model="password" class="form-control" type="password" />
        <small class="text-danger">{{ passwordError }}</small>
      </div>

      <!-- FILE -->
      <div class="mb-3">
        <label>File:</label>
        <input type="file" class="form-control" @change="handleFile" />
        <small class="text-danger">{{ fileError }}</small>
      </div>

      <!-- SUBMIT -->
      <button class="btn btn-primary w-100">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>

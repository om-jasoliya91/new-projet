<script setup>
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
const auth = useUserStore()

onMounted(() => {
  auth.fetchUser()
  // console.log(auth.fetchUser())

  // console.log(auth.fetchUser())
})
</script>
<template>
  <HeaderComponent></HeaderComponent>
  <div class="container my-5 d-flex justify-content-center">
    <div class="border-2 border-dark shadow-sm p-4 rounded" style="width: 500px">
      <h1 class="text-center text-primary mb-4">Profile Page</h1>

      <!-- Profile Image -->
      <div class="mb-3 d-flex justify-content-center">
        <img
          class="rounded-circle shadow-sm"
          v-if="auth.user?.data?.profile_pic"
          :src="auth.user?.data?.profile_pic"
          width="150"
          height="150"
          alt="Profile Picture"
          style="object-fit: cover"
        />
      </div>

      <!-- Profile Info -->
      <div class="text-center mb-2">
        <p><strong>Name:</strong> {{ auth.user?.data?.name }}</p>
      </div>

      <div class="text-center mb-2">
        <p><strong>Email:</strong> {{ auth.user?.data?.email }}</p>
      </div>

      <div class="text-center mb-2">
        <p><strong>Age:</strong> {{ auth.user?.data?.age }}</p>
      </div>

      <div class="text-center mb-2">
        <p><strong>City:</strong> {{ auth.user?.data?.city }}</p>
      </div>

      <div class="text-center mb-2">
        <p><strong>Address:</strong> {{ auth.user?.data?.address }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { onMounted } from 'vue'
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import { useUserStore } from '@/stores/userStore'
const auth = useUserStore()
onMounted(() => {
  auth.fetchCourse()
})
</script>
<template>
  <HeaderComponent></HeaderComponent>
  <div class="container">
    <h1 class="text-primary text-center">Course Page</h1>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="course in auth.courses" :key="course.id">
        <div class="card mb-4 shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title"><strong>Name:</strong> {{ course.name }}</h5>

            <h6 class="card-subtitle mb-2 text-muted"><strong>Code:</strong> {{ course.code }}</h6>

            <p class="card-text"><strong>Description:</strong> {{ course.description }}</p>

            <ul class="list-group list-group-flush my-3">
              <li class="list-group-item"><strong>Duration:</strong> {{ course.duration }}</li>

              <li class="list-group-item"><strong>Price:</strong> ₹{{ course.price }}</li>

              <li class="list-group-item">
                <strong>Status:</strong>
                <span
                  class="badge"
                  :class="course.status === 'active' ? 'bg-success' : 'bg-danger'"
                >
                  {{ course.status }}
                </span>
              </li>
            </ul>
            <div class="d-flex justify-content-center">
              <button class="btn btn-primary">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script setup>
const props = defineProps({
  courses: { type: Array, required: true },
})

const emit = defineEmits(['apply'])
</script>

<template>
  <div class="row">
    <div class="col-md-4 mb-4" v-for="course in props.courses" :key="course.id">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title"><strong>Name:</strong> {{ course.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted"><strong>Code:</strong> {{ course.code }}</h6>

          <p class="card-text"><strong>Description:</strong> {{ course.description }}</p>

          <ul class="list-group list-group-flush my-3">
            <li class="list-group-item"><strong>Duration:</strong> {{ course.duration }}</li>
            <li class="list-group-item"><strong>Price:</strong> ₹{{ course.price }}</li>
            <li class="list-group-item">
              <strong>Status:</strong>
              <span class="badge" :class="course.status === 'active' ? 'bg-success' : 'bg-danger'">
                {{ course.status }}
              </span>
            </li>
          </ul>

          <div class="d-flex justify-content-center">
            <button
              class="btn btn-primary"
              :disabled="course.is_applied || course.status === 'inactive'"
              @click="emit('apply', course.id)"
            >
              {{
                course.status === 'inactive'
                  ? 'Inactive'
                  : course.is_applied
                    ? 'Applied'
                    : 'Apply Now'
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

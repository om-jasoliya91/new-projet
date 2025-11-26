<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import Swal from 'sweetalert2'
import CoursesComponent from '@/components/course/CoursesComponent.vue'
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'

const auth = useUserStore()

onMounted(() => {
  auth.fetchCourse()
})

async function applyCourse(courseId) {
  const res = await auth.enrollCourse(courseId)

  if (res.success) {
    const course = auth.courses.find((c) => c.id === courseId)
    if (course) {
      course.is_applied = true
    }

    Swal.fire({
      icon: 'success',
      title: res.message,
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    })
  } else {
    Swal.fire({ icon: 'warning', title: res.message })
  }
}
</script>

<template>
  <HeaderComponent />
  <CoursesComponent :courses="auth.courses" @apply="applyCourse" />
  <FooterComponent />
</template>

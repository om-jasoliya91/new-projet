<script setup>
const props = defineProps({
  notifications: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['mark-read'])
</script>

<template>
  <ul v-if="props.notifications.length">
    <li
      v-for="n in props.notifications.filter((n) => n.data.status !== 'panding')"
      :key="n.id"
      class="mb-2"
    >
      <!--  notification message -->
      {{ n.data.message }}

      <!--  status badge -->
      <span
        :class="{
          'badge bg-success ms-2': n.data.status === 'accept',
          'badge bg-danger ms-2': n.data.status === 'decline' || n.data.status === 'cancel',
          'badge bg-warning ms-2': n.data.status === 'pending',
        }"
      >
        {{ n.data.status }}
      </span>

      <button class="btn btn-sm btn-outline-primary ms-2" @click="emit('mark-read', n.id)">
        Mark Read
      </button>
    </li>
  </ul>

  <p v-else class="text-muted text-center">No notifications</p>
</template>
<style scoped></style>

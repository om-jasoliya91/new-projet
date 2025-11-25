<template>
  <div class="card">
    <!-- HEADER (display only if provided) -->
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>

    <!-- MAIN / DEFAULT SLOT (display only if provided) -->
    <div v-if="$slots.default" class="card-content">
      <slot></slot>
    </div>

    <!-- FOOTER (display only if provided) -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>

    <!-- example of dynamic slot  -->
    <div class="box">
      <slot :name="activeSlot"></slot>
    </div>

    <div>
      <slot :text="message" :count="count"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'
const props = defineProps({
  activeSlot: String,
})
const message = ref('Hello from Child')
const count = ref(10)
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
  background: white;
}

.card-header,
.card-footer {
  padding: 10px;
  background: #f8f8f8;
  font-weight: bold;
}

.card-content {
  padding: 12px;
}
</style>

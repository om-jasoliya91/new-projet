<template>
  <LayoutSlot>
    <!-- Named slot using v-slot -->
    <template v-slot:header>
      <h1>Dashboard</h1>
    </template>

    <!-- Named slot using v-slot -->
    <!-- <template v-slot:main>
      <p>Welcome to dashboard</p>
    </template> -->
    <p>
      Hello, welcome to your dashboard. Here you can manage your account details, subscription, and
      more.
    </p>
    <!-- Named slot using shorthand (#) -->
    <template #footer>
      <small>© 2025 All Rights Reserved</small>
    </template>
  </LayoutSlot>

  <LayoutSlot :activeSlot="currentTab">
    <template #profile>
      <h3>User Profile</h3>
    </template>

    <template #settings>
      <h3>Settings Panel</h3>
    </template>

    <template #help>
      <h3>Help & FAQ</h3>
    </template>
    <button @click="currentTab = 'profile'">Profile</button>
    <button @click="currentTab = 'settings'">Settings</button>
    <button @click="currentTab = 'help'">Help</button>
  </LayoutSlot>
  <LayoutSlot v-slot="slotProps">
    <h2>{{ slotProps.text }}</h2>
    <p>Count value: {{ slotProps.count }}</p>
  </LayoutSlot>
</template>
<script setup>
import LayoutSlot from '../practise/LayoutSlot.vue'
import { ref } from 'vue'
const currentTab = ref('profile')
</script>

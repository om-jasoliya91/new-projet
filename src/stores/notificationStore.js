import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useNotificationStore = defineStore('notificationStore', () => {
  // ⬇ state
  const notifications = ref([])

  // ⬇ fetch all notifications (read + unread)
  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/api/notifications') // Sanctum token added automatically
      notifications.value = res.data.data
    } catch (e) {
      console.log('Notification fetch error:', e)
    }
  }

  // ⬇ mark a single notification as read
  const markAsRead = async (id) => {
    try {
      await axios.post(`/api/notifications/${id}/read`)
      notifications.value = notifications.value.filter((n) => n.id !== id)
    } catch (e) {
      console.log(' Mark as read error:', e)
    }
  }

  // ⬇ mark ALL notifications as read
  const markAll = async () => {
    try {
      await axios.post(`/api/notifications/read-all`)
      notifications.value = []
    } catch (e) {
      console.log(' Mark all notification error:', e)
    }
  }

  return {
    notifications,
    fetchNotifications,
    markAsRead,
    markAll,
  }
})

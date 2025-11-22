<script setup>
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = useUserStore()
const showEdit = ref(false)

const form = ref({
  name: '',
  email: '',
  age: '',
  city: '',
  address: '',
  profile_pic: null,
})

onMounted(async () => {
  await auth.fetchUser()

  if (auth.user?.data) {
    form.value = {
      name: auth.user.data.name,
      email: auth.user.data.email,
      age: auth.user.data.age,
      city: auth.user.data.city,
      address: auth.user.data.address,
      profile_pic: null,
    }
  }
})

function handleImage(e) {
  form.value.profile_pic = e.target.files[0]
}

async function updateProfile() {
  const fd = new FormData()
  fd.append('name', form.value.name)
  fd.append('email', form.value.email)
  fd.append('age', form.value.age)
  fd.append('city', form.value.city)
  fd.append('address', form.value.address)

  if (form.value.profile_pic) {
    fd.append('profile_pic', form.value.profile_pic)
  }

  const res = await auth.updateUser(fd)

  if (res.success) {
    // Update Pinia state – UI will refresh automatically
    auth.user = res.data

    // Toast success message
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated Successfully 🎉',
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    })

    // Close modal
    showEdit.value = false
  }
}
function handleDelete() {
  Swal.fire({
    title: 'Are you sure you want to delete your account?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'Cancel',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await auth.deleteAccount()

      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Account Deleted Successfully',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false,
        })

        router.push('/login')
      }
    }
  })
}
</script>

<template>
  <HeaderComponent />

  <div class="container my-5 d-flex justify-content-center">
    <div class="border-2 border-dark shadow-sm p-4 rounded" style="width: 500px">
      <h1 class="text-center text-primary mb-4">Profile Page</h1>
      <!-- :src="`/storage/uploads/${auth.user.data.profile_pic.split('/').pop()}`" -->
      <!-- Profile Image -->
      <div class="mb-3 d-flex justify-content-center">
        <img
          v-if="auth.user?.data?.profile_pic"
          :src="auth.user.data.profile_pic"
          class="rounded-circle"
          width="150"
          height="150"
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

      <div class="text-center mt-3">
        <button class="btn btn-primary" @click="showEdit = true">Update Profile</button>
        <button class="btn btn-danger mx-2" @click="handleDelete">Delete Account</button>
      </div>
    </div>
  </div>

  <!-- EDIT MODAL -->
  <div v-if="showEdit" class="modal-backdrop">
    <div class="modal-box shadow-lg p-4 rounded bg-white">
      <h3 class="text-center mb-3">Update Profile</h3>

      <div class="mb-2">
        <label>Name</label>
        <input class="form-control" v-model="form.name" />
      </div>

      <div class="mb-2">
        <label>Email</label>
        <input class="form-control" v-model="form.email" disabled />
      </div>

      <div class="mb-2">
        <label>Age</label>
        <input class="form-control" v-model="form.age" />
      </div>

      <div class="mb-2">
        <label>City</label>
        <input class="form-control" v-model="form.city" />
      </div>

      <div class="mb-2">
        <label>Address</label>
        <input class="form-control" v-model="form.address" />
      </div>

      <div class="mb-3">
        <label>Profile Picture</label>
        <input type="file" class="form-control" @change="handleImage" />
      </div>

      <div class="d-flex justify-content-between">
        <button class="btn btn-secondary" @click="showEdit = false">Cancel</button>
        <button class="btn btn-success" @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  width: 400px;
}
</style>

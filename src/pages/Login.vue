<template>
  <q-page padding>
   <q-form class="row justify-center" @submit.prevent="handLogin">
     <p class="col-12 text-h5 text-center">Login</p>
     <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md" >
      <q-input
        label="Email"
        v-model="form.email"
        outlined
        lazy-rules
        :rules=" [val => (val && val.length > 0) || 'Email is required']"
        type="email"
      />
      <q-input
        label="Password"
        v-model="form.password"
        outlined
        lazy-rules
        :rules=" [val => (val && val.length > 0) || 'Password is required']"
      />
      <div class="full-width q-pt-md q-gutter-y-lg">
      <q-btn
        label="Login"
        color="primary"
        class="full-width "
        outline
        rounded
        type="submit"
      />
      <div class="full-width q-gutter-y-md">
      <q-btn
        label="Register"
        color="primary"
        class="full-width"
        flat
        rounded
        :to="{ name: 'register' }"
        size="sm"
      />
      <q-btn
        label="Forgot Password"
        color="primary"
        class="full-width"
        flat
        rounded
        size="sm"
        :to="{ name: 'forgot-password' }"
      />
    </div>
    </div>
     </div>
   </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

const { login, isLoggedIn } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()
const rauter = useRouter()
const form = ref({
  email: '',
  password: ''
})

onMounted(() => {
  if (isLoggedIn) {
    rauter.push({ name: 'me' })
  }
})
const handLogin = async () => {
  try {
    await login(form.value)
    notifySuccess('Login sucessfully')
    rauter.push({ name: 'me' })
  } catch (error) {
    notifyError(error.message)
  }
}

defineOptions({
  name: 'PageLogin'
})
</script>

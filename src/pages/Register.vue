<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handRegister">
     <p class="col-12 text-h5 text-center">Register</p>
     <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md" >
      <q-input
        label="Name"
        v-model="form.name"
        outlined
        lazy-rules
        :rules=" [val => (val && val.length > 0) || 'Name is required']"
      />
      <q-input
        label="Email"
        v-model="form.email"
        outlined
        lazy-rules
        :rules=" [val => (val && val.length > 0) || 'Email is required ']"
        type="email"
      />
      <q-input
        label="Password"
        v-model="form.password"
        outlined
        lazy-rules
        :rules=" [val => (val && val.length > 6) || 'Password is required']"
      />
      <div class="full-width q-pt-md q-gutter-y-lg">
      <q-btn
        label="Register"
        color="primary"
        class="full-width "
        outline
        rounded
        type="submit"
      />
      <q-btn
        label="Back"
        color="primary"
        class="full-width "
        rounded
        flat
        :to="{ name: 'login' }"
      />
    </div>
     </div>
   </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

const router = useRouter()
const { register } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const handRegister = async () => {
  try {
    await register(form.value)
    notifySuccess('Register Sucessfull')
    router.push({
      name: 'email-confirmation',
      query: { email: form.value.email }
    })
  } catch (error) {
    notifyError(error.message)
  }
}

defineOptions({
  name: 'PageRegister'
})
</script>

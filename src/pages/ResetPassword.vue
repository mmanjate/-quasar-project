<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handPasswordReset">
     <p class="col-12 text-h5 text-center">Reset Password</p>
     <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md" >
      <q-input
        label="New Password"
        v-model="password"
        outlined
        lazy-rules
        :rules=" [val => (val && val.length > 6) || 'Password is required']"
      />
      <div class="full-width q-pt-md q-gutter-y-lg">
      <q-btn
        label="Send New Password"
        color="primary"
        class="full-width "
        outline
        rounded
        type="submit"
      />
    </div>
     </div>
   </q-form>
  </q-page>
</template>

<script setup>
import useAuthUser from 'src/composables/UseAuthUser'
import { ref } from 'vue'
import useNotify from 'src/composables/UseNotify'
import { useRouter, useRoute } from 'vue-router'

const { resetPassword } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()
const router = useRouter()
const route = useRoute()
const token = route.query.token

const password = ref('')

const handPasswordReset = async () => {
  try {
    await resetPassword(token, password.value)
    notifySuccess('new Password sent')
    router.push({ name: 'login' })
  } catch (error) {
    notifyError(error.message)
  }
}

defineOptions({
  name: 'PageResetPassword'
})
</script>

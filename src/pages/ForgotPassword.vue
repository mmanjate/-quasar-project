<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handForgotPassword">
     <p class="col-12 text-h5 text-center">Reset Password</p>
     <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md" >
      <q-input
        label="Email"
        v-model="email"
        outlined
        lazy-rules
        :rules=" [val => (val && val.length > 0) || 'Email is required ']"
        type="email"
      />
      <div class="full-width q-pt-md q-gutter-y-lg">
      <q-btn
        label="Send Reset Email"
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
import useAuthUser from 'src/composables/UseAuthUser'
import { ref } from 'vue'
import useNotify from 'src/composables/UseNotify'

const { sendPasswordRestEmail } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()

const email = ref('')

const handForgotPassword = async () => {
  try {
    await sendPasswordRestEmail(email.value)
    notifySuccess(`Password resent email sent to: ${email.value}`)
  } catch (error) {
    notifyError(error.message)
  }
}
defineOptions({
  name: 'PagePasswordReset'
})
</script>

<template>
   <q-page class="flex flex-center column q-pa-md bg-grey-1">

      <q-icon name="sports_soccer" size="72px" color="primary" class="q-mb-sm" />

      <h1 class="text-h4 text-weight-bolder q-mb-lg text-center text-grey-9 q-mt-none">
         Inicia Sessió
      </h1>

      <q-card class="login-card shadow-4 q-pa-md">
         <div class="column q-gutter-y-md">

            <q-input outlined rounded v-model="email" label="Correu electrònic" type="email" bg-color="white">
               <template v-slot:prepend>
                  <q-icon name="mail" color="primary" />
               </template>
            </q-input>

            <q-input outlined rounded v-model="password" label="Contrasenya"
               :type="isPasswordVisible ? 'text' : 'password'" bg-color="white">
               <template v-slot:prepend>
                  <q-icon name="lock" color="primary" />
               </template>
               <template v-slot:append>
                  <q-icon :name="isPasswordVisible ? 'visibility_off' : 'visibility'" class="cursor-pointer text-grey-6"
                     @click="isPasswordVisible = !isPasswordVisible" />
               </template>
            </q-input>

            <q-btn color="primary" size="lg" label="Entrar" class="full-width q-mt-md text-weight-bold" 
               rounded unelevated @click="handleLogin" />

            <q-btn flat color="primary" size="md" label="No tens compte? Registra't" to="/register"
               class="full-width" rounded />

         </div>
      </q-card>

   </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const router = useRouter()
const $q = useQuasar()

const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    console.log('Login exitoso:', response.data)

    $q.notify({
      color: 'positive',
      icon: 'check',
      message: '¡Sessió iniciada correctament!',
      position: 'top'
    })

    router.push('/llista')

  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    
    const errorMessage = error.response?.data?.statusMessage || 'Correu o contrasenya incorrectes'
    
    $q.notify({
      color: 'negative',
      icon: 'warning',
      message: errorMessage,
      position: 'top'
    })
  }
}
</script>

<style scoped>
.login-card {
    width: 100%;
    max-width: 360px;
    border-radius: 24px;
}
</style>
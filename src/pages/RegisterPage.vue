<template>
    <q-page class="flex flex-center column q-pa-md bg-grey-1">

        <q-icon name="person_add" size="72px" color="primary" class="q-mb-sm" />

        <h1 class="text-h4 text-weight-bolder q-mb-lg text-center text-grey-9 q-mt-none">
            Crea un Compte
        </h1>

        <q-card class="register-card shadow-4 q-pa-md">
            <div class="column q-gutter-y-md">

                <q-input outlined rounded v-model="name" label="Nom" type="text" bg-color="white">
                    <template v-slot:prepend>
                        <q-icon name="person" color="primary" />
                    </template>
                </q-input>

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
                        <q-icon :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer text-grey-6" @click="isPasswordVisible = !isPasswordVisible" />
                    </template>
                </q-input>

                <q-btn color="primary" size="lg" label="Registra't" class="full-width q-mt-md text-weight-bold" rounded
                    unelevated @click="handleRegister" />

                <q-btn flat color="primary" size="md" label="Ja tens compte? Entra" to="/login" class="full-width"
                    rounded />

            </div>
        </q-card>

    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()

const name = ref('')
const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)

const handleRegister = async () => {
    try {
        const response = await api.post('/auth/register', {
            name: name.value,
            email: email.value,
            password: password.value
        })

        console.log('Registre correcte:', response.data)

        $q.notify({
            color: 'positive',
            icon: 'check',
            message: 'Compte creat i sessió iniciada!',
            position: 'top'
        })

        window.location.href = '/#/llista'
        window.location.reload()

    } catch (error) {
        console.error('Error al registrar:', error)

        const errorMessage = error.response?.data?.statusMessage || 'Error al crear el compte'

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
.register-card {
    width: 100%;
    max-width: 360px;
    border-radius: 24px;
}
</style>
<template>
    <q-page class="flex flex-center column q-pa-md bg-grey-1">

        <q-icon name="edit_document" size="72px" color="primary" class="q-mb-sm" />

        <h1 class="text-h4 text-weight-bolder q-mb-lg text-center text-grey-9 q-mt-none">
            Edita Golejador
        </h1>

        <q-card class="edit-card shadow-4 q-pa-md">
            <div class="column q-gutter-y-md">

                <q-input outlined rounded v-model="form.name" label="Nom del jugador" type="text" bg-color="white">
                    <template v-slot:prepend>
                        <q-icon name="person" color="primary" />
                    </template>
                </q-input>

                <q-input outlined rounded v-model="form.team" label="Equip" type="text" bg-color="white">
                    <template v-slot:prepend>
                        <q-icon name="shield" color="primary" />
                    </template>
                </q-input>

                <q-input outlined rounded v-model.number="form.goals" label="Gols" type="number" bg-color="white">
                    <template v-slot:prepend>
                        <q-icon name="sports_soccer" color="primary" />
                    </template>
                </q-input>

                <div class="q-mt-md column q-gutter-y-sm">
                    <q-btn color="primary" size="lg" label="Actualitzar"
                        class="full-width text-weight-bold" rounded unelevated @click="handleUpdate" :loading="loading"/>

                    <q-btn flat color="negative" size="md" label="Cancel·lar" class="full-width" rounded
                        @click="goBack" />
                </div>

            </div>
        </q-card>

    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const loading = ref(false)

const form = ref({
    id: null,
    name: '',
    team: '',
    goals: 0
})

onMounted(async () => {
    const jugadorId = route.params.id
    try {
        const response = await api.get('/api/golejadors')
        const jugador = response.data.find(j => j.id == jugadorId)

        if (jugador) {
            form.value = {
                id: jugador.id,
                name: jugador.name,
                team: jugador.team,
                goals: jugador.goals
            }
        } else {
            $q.notify({ color: 'negative', message: 'No s\'ha trobat el golejador' })
            router.push('/llista')
        }
    } catch (e) {
        console.error("Error carregant dades:", e)
    }
})

const handleUpdate = async () => {
    try {
        loading.value = true
        
        await api.put('/api/golejadors', {
            name: form.value.name,
            team: form.value.team,
            goals: form.value.goals
        }, {
            params: { id: form.value.id }
        })

        $q.notify({
            color: 'positive',
            message: 'Actualitzat correctament!',
            icon: 'done',
            position: 'top'
        })

        router.push('/llista')

    } catch (e) {
        console.error('Error al actualitzar:', e)
        $q.notify({
            color: 'negative',
            message: 'Error al guardar els canvis',
            icon: 'error'
        })
    } finally {
        loading.value = false
    }
}

const goBack = () => {
    router.back()
}
</script>

<style scoped>
.edit-card {
    width: 100%;
    max-width: 360px;
    border-radius: 24px;
}
</style>
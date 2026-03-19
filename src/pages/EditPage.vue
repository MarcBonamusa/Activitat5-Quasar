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
                        class="full-width text-weight-bold" rounded unelevated @click="handleUpdate" />

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

const router = useRouter()
const route = useRoute()

const form = ref({
    id: null,
    name: '',
    team: '',
    goals: 0
})

onMounted(() => {
    const jugadorId = route.params.id

    console.log("Carregant dades del jugador amb ID:", jugadorId)

    form.value = {
        id: jugadorId,
        name: "Lamine Yamal",
        team: "Barcelona",
        goals: 10
    }
})

const handleUpdate = async () => {
    console.log('Actualitzant golejador:', form.value)
    router.push('/golejadors')
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
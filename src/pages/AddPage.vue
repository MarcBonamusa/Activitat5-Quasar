<template>
    <q-page class="flex flex-center column q-pa-md bg-grey-1">

        <q-icon name="person_add" size="72px" color="primary" class="q-mb-sm" />

        <h1 class="text-h4 text-weight-bolder q-mb-lg text-center text-grey-9 q-mt-none">
            Nou Golejador
        </h1>

        <q-card class="add-card shadow-4 q-pa-md">
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
                    <q-btn color="primary" size="lg" label="Guardar" class="full-width text-weight-bold"
                        rounded unelevated @click="handleSave" />

                    <q-btn flat color="negative" size="md" label="Cancel·lar" class="full-width" rounded
                        @click="goBack" />
                </div>

            </div>
        </q-card>

    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
    name: '',
    team: '',
    goals: 0
})

const handleSave = async () => {
    console.log('Guardant nou golejador:', form.value)
    router.push('/golejadors')
}

const goBack = () => {
    router.back()
}
</script>

<style scoped>
.add-card {
    width: 100%;
    max-width: 360px;
    border-radius: 24px;
}
</style>
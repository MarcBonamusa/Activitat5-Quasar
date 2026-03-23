<template>
    <q-page class="q-pa-md bg-grey-1 column items-center">

        <div class="text-center q-mb-lg q-mt-sm">
            <q-icon name="sports_soccer" size="64px" color="primary" class="q-mb-sm" />
            <h1 class="text-h4 text-weight-bolder text-grey-9 q-mt-none q-mb-none">
                Els meus Golejadors
            </h1>
        </div>

        <div v-if="loading" class="flex flex-center q-pa-xl">
            <q-spinner-dots color="primary" size="40px" />
        </div>

        <q-card v-for="golejador in golejadors" :key="golejador.id" class="q-mb-md">
            <q-item>
                <q-item-section>
                    <q-item-label class="text-h6">{{ golejador.name }}</q-item-label>
                    <q-item-label caption>Equip: {{ golejador.team }} | Gols: {{ golejador.goals }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <div class="row q-gutter-xs">
                        <q-btn flat round color="negative" icon="delete" @click="deleteGolejador(golejador.id)" />
                        <q-btn flat round color="primary" icon="edit" :to="`/editar/${golejador.id}`" />
                    </div>
                </q-item-section>
            </q-item>
        </q-card>

        <div v-if="!loading && golejadors.length === 0" class="text-center q-pa-md text-grey">
            No hi ha golejadors a la base de dades.
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" class="shadow-4" to="/crear" />
        </q-page-sticky>

    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const golejadors = ref([]) // Aquí guardaremos los datos de la API
const loading = ref(true)

// 1. Función para obtener los goleadores del backend (Nuxt)
const fetchGolejadors = async () => {
    try {
        loading.value = true
        // Esta petición ya enviará la cookie de sesión automáticamente
        const response = await api.get('/api/golejadors')
        golejadors.value = response.data
    } catch (error) {
        console.error('Error al carregar golejadors:', error)
        $q.notify({
            color: 'negative',
            message: 'No s\'han pogut carregar els golejadors. Estàs loguejat?',
            icon: 'report_problem'
        })
    } finally {
        loading.value = false
    }
}

// 2. Función para borrar un goleador
const deleteGolejador = async (id) => {
    $q.dialog({
        title: 'Confirmar',
        message: 'Segur que vols eliminar aquest golejador?',
        cancel: true,
        persistent: true
    }).onOk(async () => {
        try {
            await api.delete(`/api/golejadors/${id}`)
            $q.notify({
                color: 'positive',
                message: 'Golejador eliminat',
                icon: 'delete'
            })
            // Recargamos la lista después de borrar
            fetchGolejadors()
        } catch {
            $q.notify({
                color: 'negative',
                message: 'Error en eliminar',
                icon: 'error'
            })
        }
    })
}

// Ejecutamos la carga al entrar en la página
onMounted(() => {
    fetchGolejadors()
})
</script>

<style scoped>
.golejador-card {
    border-radius: 16px;
    transition: transform 0.2s ease;
}

.golejador-card:hover {
    transform: translateY(-2px);
}
</style>
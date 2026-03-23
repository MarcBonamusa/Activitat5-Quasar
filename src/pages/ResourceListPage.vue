<template>
    <q-page class="q-pa-md bg-grey-1 column items-center">

        <div class="text-center q-mb-xl q-mt-md">
            <q-avatar size="80px" font-size="52px" color="primary" text-color="white" icon="sports_soccer" class="shadow-5 q-mb-md" />
            <h1 class="text-h4 text-weight-bolder text-grey-9 q-mt-none q-mb-xs">
                Golejadors
            </h1>
            <div class="text-subtitle1 text-grey-7">Gestió de les teves estadístiques</div>
        </div>

        <div v-if="loading" class="flex flex-center q-pa-xl">
            <q-spinner-dots color="primary" size="40px" />
        </div>

        <div v-if="!loading" class="full-width" style="max-width: 500px">
            <q-card v-for="golejador in golejadors" :key="golejador.id" class="golejador-card q-mb-md shadow-2">
                <q-card-section horizontal>
                    <q-card-section class="col-8 q-pa-md">
                        <div class="text-h6 text-weight-bold text-primary">{{ golejador.name }}</div>
                        <div class="text-subtitle2 text-grey-8 row items-center q-mt-xs">
                            {{ golejador.team }}
                        </div>
                    </q-card-section>

                    <q-card-section class="col-4 flex flex-center bg-grey-2 border-left-dashed">
                        <div class="column items-center">
                            <div class="text-h5 text-weight-bolder text-grey-9">{{ golejador.goals }}</div>
                            <div class="text-caption text-uppercase text-grey-7 font-weight-medium">Gols</div>
                        </div>
                    </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right" class="q-px-md">
                    <q-btn flat dense round color="negative" icon="delete" @click="deleteGolejador(golejador.id)">
                        <q-tooltip>Eliminar</q-tooltip>
                    </q-btn>
                    <q-btn flat dense round color="primary" icon="edit" :to="`/editar/${golejador.id}`" class="q-ml-sm">
                        <q-tooltip>Editar dades</q-tooltip>
                    </q-btn>
                </q-card-actions>
            </q-card>
        </div>

        <div v-if="!loading && golejadors.length === 0" class="text-center q-pa-xl">
            <q-icon name="upcoming" size="100px" color="grey-4" />
            <div class="text-h6 text-grey-5 q-mt-md font-weight-light">Encara no tens golejadors...</div>
            <q-btn outline color="primary" label="Afegir el primer" to="/crear" class="q-mt-md" rounded />
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" class="shadow-8 hover-scale" to="/crear">
                <q-tooltip>Afegir nou jugador</q-tooltip>
            </q-btn>
        </q-page-sticky>

    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const golejadors = ref([])
const loading = ref(true)

const fetchGolejadors = async () => {
    try {
        loading.value = true
        const response = await api.get('/api/golejadors')
        golejadors.value = response.data
    } catch {
        $q.notify({
            color: 'negative',
            message: 'Error al carregar la llista',
            icon: 'report_problem'
        })
    } finally {
        loading.value = false
    }
}

const deleteGolejador = async (id) => {
    if (confirm('Segur que vols eliminar aquest golejador?')) {
        try {
            await api.delete('/api/golejadors', { params: { id } })
            $q.notify({ color: 'positive', message: 'Eliminat!', icon: 'delete' })
            fetchGolejadors()
        } catch {
            $q.notify({ color: 'negative', message: 'Error en eliminar' })
        }
    }
}

onMounted(() => fetchGolejadors())
</script>

<style scoped>
.golejador-card {
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.golejador-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1) !important;
}

.border-left-dashed {
    border-left: 2px dashed rgba(0, 0, 0, 0.05);
}

.hover-scale {
    transition: transform 0.2s ease;
}

.hover-scale:hover {
    transform: scale(1.1);
}

.golejador-card {
    animation: fadeIn 0.5s ease backwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
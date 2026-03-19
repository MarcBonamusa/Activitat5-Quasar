<template>
    <q-page class="q-pa-md bg-grey-1 column items-center">

        <div class="text-center q-mb-lg q-mt-sm">
            <q-icon name="sports_soccer" size="64px" color="primary" class="q-mb-sm" />
            <h1 class="text-h4 text-weight-bolder text-grey-9 q-mt-none q-mb-none">
                Els meus Golejadors
            </h1>
        </div>

        <div class="full-width q-gutter-y-md" style="max-width: 400px;">
            
            <q-card 
                v-for="golejador in arrayGolejadors" 
                :key="golejador.id" 
                class="golejador-card shadow-4"
            >
                <q-item class="q-pa-md">
                    
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" icon="person" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class="text-weight-bold text-subtitle1 text-grey-9">
                            {{ golejador.name }}
                        </q-item-label>
                        
                        <q-item-label caption class="text-grey-7 q-mt-xs flex items-center">
                            Equip: {{ golejador.team }}
                        </q-item-label>
                        
                        <q-item-label caption class="q-mt-xs">
                            Gols: <q-badge color="secondary" rounded class="q-ml-xs">{{ golejador.gols }}</q-badge>
                        </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <div class="row q-gutter-y-xs">
                            <q-btn flat round dense color="primary" icon="edit" to="/editar"/>
                            <q-btn flat round dense color="negative" icon="delete" />
                        </div>
                    </q-item-section>
                    
                </q-item>
            </q-card>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" class="shadow-4" to="/crear" />
        </q-page-sticky>

    </q-page>
</template>

<script setup>
const arrayGolejadors = [
    { id: 1, name: "Lamine Yamal", team: "Barcelona", gols: 15 },
    { id: 2, name: "Robert Lewandowski", team: "Barcelona", gols: 10 },
    { id: 3, name: "Raphinha", team: "Barcelona", gols: 8 }
]
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
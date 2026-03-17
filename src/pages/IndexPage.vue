<template>
  <q-page class="flex flex-center column q-pa-md">

    <q-icon name="sports_soccer" size="120px" color="primary" class="q-mb-md" />

    <h1 class="text-h3 text-weight-bolder q-mb-ml text-center text-grey-9 q-mt-none">
      Golejadors
    </h1>

    <div class="column q-gutter-y-md" style="width: 100%; max-width: 320px;">

      <q-btn color="primary" size="lg" label="Inicia Sessió" icon="login" to="/login" class="full-width shadow-2"
        rounded />

      <q-btn outline color="primary" size="lg" label="Crear Compte" icon="person_add" to="/register" class="full-width"
        rounded />

      <q-btn flat color="grey-8" label="Veure els meus golejadors" icon="arrow_forward" to="/llista"
        class="full-width q-mt-sm" />

    </div>
  </q-page>
</template>
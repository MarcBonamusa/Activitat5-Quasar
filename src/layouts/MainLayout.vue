<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Golejadors App
        </q-toolbar-title>

        <q-btn flat round icon="account_circle" to="/login" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header>
          Navegació Principal
        </q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inici</q-item-label>
            <q-item-label caption>Portada de l'app</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/llista">
          <q-item-section avatar>
            <q-icon name="sports_soccer" />
          </q-item-section> <q-item-section>
            <q-item-label>Els meus Golejadors</q-item-label>
            <q-item-label caption>Gestió del CRUD</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator q-my-md />

        <q-item clickable v-ripple to="/login">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Iniciar Sessió</q-item-label>
            <q-item-label caption>Accedir al teu compte</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/register">
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Registre</q-item-label>
            <q-item-label caption>Registrar nou usuari</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/login">
          <q-item-section avatar>
            <q-icon name="logout" color="red"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-red">Tancar Sessió</q-item-label>
            <q-item-label caption class="text-red">Tancar sessió del compte</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>Golejadors App</q-toolbar-title>

        <div v-if="user" class="row items-center q-gutter-sm">
          <q-chip icon="account_circle" color="white" text-color="primary">
            Hola, {{ user.name }}
          </q-chip>

          <q-btn flat round icon="logout" @click="handleLogout">
            <q-tooltip>Tancar Sessió</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header>Navegació Principal</q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section><q-item-label>Inici</q-item-label></q-item-section>
        </q-item>

        <template v-if="user">
          <q-item clickable v-ripple to="/llista">
            <q-item-section avatar><q-icon name="sports_soccer" /></q-item-section>
            <q-item-section>
              <q-item-label>Els meus Golejadors</q-item-label>
              <q-item-label caption>Gestió del CRUD</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator q-my-md />

          <q-item clickable v-ripple @click="handleLogout">
            <q-item-section avatar><q-icon name="logout" color="red" /></q-item-section>
            <q-item-section>
              <q-item-label class="text-red">Tancar Sessió</q-item-label>
              <q-item-label caption class="text-red">Surt del teu compte</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template v-else>
          <q-item clickable v-ripple to="/login">
            <q-item-section avatar><q-icon name="login" /></q-item-section>
            <q-item-section><q-item-label>Iniciar Sessió</q-item-label></q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/register">
            <q-item-section avatar><q-icon name="person_add" /></q-item-section>
            <q-item-section><q-item-label>Registre</q-item-label></q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const user = ref(null)

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const checkUser = async () => {
  try {
    const response = await api.get('/api/_auth/session')
    if (response.data && response.data.user) {
      user.value = response.data.user
    }
  } catch {
    user.value = null
    console.log("No hi ha sessió activa")
  }
}

const handleLogout = async () => {
  try {
    await api.post('/auth/logout')
    user.value = null
    $q.notify({
      color: 'info',
      message: 'Sessió tancada correctament',
      icon: 'logout'
    })
    
    window.location.href = '/#/login'
    window.location.reload()
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Error al tancar sessió'
    })
  }
}

onMounted(() => {
  checkUser()
})
</script>
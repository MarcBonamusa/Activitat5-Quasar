<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <q-icon name="sports_soccer" size="sm" class="q-mr-sm" />
          Golejadors App
        </q-toolbar-title>

        <div v-if="user" class="row items-center q-gutter-sm">
          <q-chip icon="account_circle" color="white" text-color="primary" class="shadow-1 text-weight-bold">
            Hola, {{ user.name }}
          </q-chip>

          <q-btn flat round icon="logout" @click="handleLogout">
            <q-tooltip>Tancar Sessió</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list class="q-pt-md">
        <q-item-label header class="text-weight-bold text-uppercase text-grey-6">
          Navegació Principal
        </q-item-label>

        <q-item clickable v-ripple to="/" exact active-class="text-primary bg-blue-1">
          <q-item-section avatar><q-icon name="home" size="md" /></q-item-section>
          <q-item-section><q-item-label class="text-weight-medium">Inici</q-item-label></q-item-section>
        </q-item>

        <template v-if="user">
          <q-item clickable v-ripple to="/llista" active-class="text-primary bg-blue-1">
            <q-item-section avatar><q-icon name="format_list_numbered" size="md" /></q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Els meus Golejadors</q-item-label>
              <q-item-label caption>El teu rànquing personal</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item clickable v-ripple @click="handleLogout" class="hover-red">
            <q-item-section avatar><q-icon name="logout" color="negative" size="md" /></q-item-section>
            <q-item-section>
              <q-item-label class="text-negative text-weight-bold">Tancar Sessió</q-item-label>
              <q-item-label caption class="text-red-4">Surt del teu compte</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template v-else>
          <q-item clickable v-ripple to="/login" active-class="text-primary bg-blue-1">
            <q-item-section avatar><q-icon name="login" size="md" /></q-item-section>
            <q-item-section><q-item-label class="text-weight-medium">Iniciar Sessió</q-item-label></q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/register" active-class="text-primary bg-blue-1">
            <q-item-section avatar><q-icon name="person_add" size="md" /></q-item-section>
            <q-item-section><q-item-label class="text-weight-medium">Registre</q-item-label></q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const user = ref(null)
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const checkUser = () => {
  const token = localStorage.getItem('mi_token_jwt')
  
  if (token) {
    const userData = localStorage.getItem('user_data')
    user.value = userData ? JSON.parse(userData) : { name: 'Crac' }
  } else {
    user.value = null
  }
}

const handleLogout = () => {
  localStorage.removeItem('mi_token_jwt')
  localStorage.removeItem('user_data')
  
  user.value = null
  
  if ($q.screen.lt.md) {
    leftDrawerOpen.value = false
  }

  $q.notify({
    color: 'positive',
    message: 'Fins aviat! Sessió tancada.',
    icon: 'waving_hand',
    position: 'top'
  })
  
  router.push('/login')
}

onMounted(() => {
  checkUser()
})

watch(() => route.path, () => {
  checkUser()
})
</script>

<style scoped>
.hover-red {
  transition: background-color 0.3s ease;
}
.hover-red:hover {
  background-color: #ffebee;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
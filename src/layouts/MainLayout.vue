<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="isLoggedIn"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-avatar class="">
          <img src="/images/logo.png" />
        </q-avatar>
        <q-toolbar-title> {{ siteName }} </q-toolbar-title>

        <q-space />
        <!-- <q-btn
          v-if="isLoggedIn"
          to="/admin/settings"
          stretch
          no-caps
          flat
          label="Settings"
          class="desktop-only"
        /> -->

        <q-btn
          v-if="!isLoggedIn"
          to="/sign-in"
          flat
          icon="fas fa-sign-in-alt"
        />

        <q-btn v-if="isLoggedIn" flat icon="account_circle">
          <q-menu auto-close transition-show="scale" transition-hide="scale">
            <q-item v-ripple clickable to="/profile">
              <q-item-section side>
                <q-avatar rounded size="48px">
                  <img :src="imageUrl" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ getUserName }}</q-item-label>
                <q-item-label caption>{{ getUserGroup }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-list style="min-width: 100px" dense>
              <q-item clickable>
                <q-item-section>Feedback</q-item-section>
              </q-item>
              <q-item> Version {{ version }} </q-item>
              <q-separator />
              <q-item clickable class="text-purple" @click="logout">
                <q-item-section>Logout</q-item-section>
                <q-icon
                  v-if="isLoggedInAs"
                  name="cached"
                  size="md"
                  color="primary"
                ></q-icon>
                <q-icon v-else name="cloud_off" size="md"></q-icon>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn v-else flat icon="login" to="/login"> </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <Sidebar-Drawer :options="roots" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
//local
import roots from 'src/config/userOption.json'

//component
import SidebarDrawer from './Sidebar.vue'

//store
import { useGlobalStore } from 'src/stores/global'
import useAuth from 'src/composable/useAuth'

defineOptions({
  name: 'MainLayout',
})

const leftDrawerOpen = ref(false)
const siteName = process.env.SITE_NAME
const global = useGlobalStore()
const version = process.env.VERSION
const { logout } = useAuth()
const { isLoggedInAs, getUserName, getUserGroup, isLoggedIn } =
  storeToRefs(global)
const imageUrl = 'images/man.png'
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-page padding>
    <div class="fixed-center">
      <div class="row justify-center">
        <img
          alt="Quasar logo"
          src="/images/logo.png"
          style="width: 200px; height: 200px"
        />
      </div>
      <div class="row">
        <h1>{{ siteName }}</h1>
      </div>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'IndexPage',
})
const siteName = process.env.SITE_NAME
</script>

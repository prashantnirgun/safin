<template>
  <q-page padding class="justify-center">
    <div>
      <User-List />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import UserList from 'src/components/user/UserList.vue'

defineOptions({
  name: 'UserPage',
})
</script>

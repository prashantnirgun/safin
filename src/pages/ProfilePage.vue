<template>
  <q-page padding class="justify-center">
    <div class="text-h4">Profile Details</div>
    <div>
      <User-Profile-Update />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import UserProfileUpdate from 'src/components/user/UserProfileUpdate.vue'

defineOptions({
  name: 'ProfilePage',
})
</script>

<template>
  <q-page padding class="justify-center">
    <div>
      <Scheme-List />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import SchemeList from 'src/components/scheme/SchemeList.vue'

defineOptions({
  name: 'SchemePage',
})
</script>

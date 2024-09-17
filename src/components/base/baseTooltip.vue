<template>
  <q-tooltip
    class="bg-cyan-4"
    content-style="font-size: 12px"
    transition-show="scale"
    transition-hide="scale"
  >
    <slot></slot>
  </q-tooltip>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseToolTip",
});
</script>

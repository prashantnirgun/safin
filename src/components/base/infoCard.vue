<template>
  <q-card class="top-card1">
    <q-card-section horizontal>
      <q-card-section
        class="q-pa-xs row justify-center items-center"
        :class="[colour]"
      >
        <slot name="left"></slot>
      </q-card-section>

      <q-card-section class="q-py-xs">
        <slot name="right"></slot>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: "InfoCard",
  props: {
    colour: {
      type: String,
      default: "bg-warning",
    },
  },
  setup(prop) {
    return { ...prop };
  },
};
</script>

<style lang="scss" scoped>
.top-card {
  width: 195px;
}
</style>

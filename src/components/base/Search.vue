<template>
  <div v-for="row in columnsList" :key="row.name" class="q-mb-sm">
    <!-- <q-card-section> -->
    <keep-alive>
      <BaseWidget :row="row" @updateExpression="updateState($event, row)" />
    </keep-alive>
    <!-- </q-card-section> -->
  </div>
  <q-card-actions>
    <q-btn class="bg-green" @click="onSubmit">Submit</q-btn>
    <q-btn
      class="bg-warning text-white"
      @click="$emit('close', { action: false })"
      >Close</q-btn
    >
  </q-card-actions>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import BaseWidget from 'components/base/Widget.vue'

export default defineComponent({
  name: 'BaseSearch',
  emits: ['close'],
  components: { BaseWidget },
  props: {
    columns: {
      type: Array,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const columnsList = ref([])
    const isUpdated = ref(false)
    onMounted(async () => {
      props.columns.map((row) => {
        const data = { ...row }
        columnsList.value.push(data)
      })
      //console.log('onmounted', props.columns, columnsList.value)
    })
    const closeM = (value, row) => {
      row.value = value
      //console.log('close ', value, row)
    }
    const updateState = (argument, row) => {
      row.condition = argument.condition
      isUpdated.value = true
      row.values = argument.values
      //console.log('condition', argument, row)
    }
    const onSubmit = () => {
      let whereCondition = []
      //console.log('onSubmit', columnsList.value, props.columns)
      emit('close', {
        action: isUpdated.value,
        columns: columnsList.value,
      })
    }
    return { columnsList, closeM, onSubmit, updateState }
  },
})
</script>

<style lang="scss" scoped></style>

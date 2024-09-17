<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="fact_check"
      label="Sort by"
      header-class="text-primary"
    >
      <VueDraggable
        ref="el"
        v-model="sortedList"
        group="people"
        @update="($event) => console.log($event)"
      >
        <q-item
          clickable
          v-ripple
          v-for="item in sortedList"
          :key="item.name"
          :class="{ filtered: item.required }"
        >
          <q-item-section avatar>
            <q-icon color="primary" name="drag_indicator" />
          </q-item-section>

          <q-item-section>
            <q-item-label
              :class="{ 'text-red text-subtitle2': item.required }"
              >{{ item.label }}</q-item-label
            >
          </q-item-section>

          <q-item-section avatar>
            <q-toggle
              v-model="item.sort.order"
              class="float-right"
              color="primary"
              keep-color
              icon-color="black"
              checked-icon="keyboard_double_arrow_up"
              unchecked-icon="keyboard_double_arrow_down"
              :label="item.sort.order === '1' ? 'Asc' : 'Desc'"
              false-value="-1"
              true-value="1"
            />
          </q-item-section>
        </q-item>
      </VueDraggable>
    </q-expansion-item>
  </q-list>

  <q-list bordered separator class="q-my-sm" dense>
    <q-expansion-item
      expand-separator
      icon="list_alt"
      label="Column List"
      header-class="text-green"
      default-opened
    >
      <VueDraggable ref="el" v-model="columnList" group="people">
        <q-item clickable v-ripple v-for="item in columnList" :key="item.name">
          <q-item-section avatar>
            <q-icon color="primary" name="drag_indicator" />
          </q-item-section>

          <q-item-section>{{ item.label }}</q-item-section>
          <q-item-section avatar>
            <q-toggle
              v-if="item.sort"
              v-model="item.sort.order"
              class="float-right"
              color="primary"
              keep-color
              icon-color="black"
              checked-icon="keyboard_double_arrow_up"
              unchecked-icon="keyboard_double_arrow_down"
              :label="item.sort.order === '1' ? 'Asc' : 'Desc'"
              false-value="-1"
              true-value="1"
            />
          </q-item-section>
        </q-item>
      </VueDraggable>
    </q-expansion-item>
  </q-list>
  <div class="row justify-end q-gutter-md">
    <q-btn label="Submit" color="primary" class="q-mr-sm" @click="onSubmit" />
    <q-btn
      label="close"
      color="negative"
      @click="$emit('close', { action: false })"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
//import draggable from 'vuedraggable'
import { VueDraggable } from 'vue-draggable-plus'
export default defineComponent({
  name: 'SortColumn',
  components: { VueDraggable },
  props: {
    columns: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const columnList = ref([])
    const sortedList = ref([])
    onMounted(() => {
      props.columns.map((row) => {
        if (row.sort && row.sort.index > 0) {
          sortedList.value.push(row)
        } else {
          columnList.value.push(row)
        }
      })
      sortedList.value.sort((a, b) => a.index - b.index)
    })

    const onSubmit = () => {
      const columns = []
      props.columns.map((row) => {
        if (row.sort) {
          const name = row.name
          const index = sortedList.value.findIndex((row) => row.name === name)
          if (index >= 0) {
            row.sort.index = index + 1
            row.sort.order = sortedList.value[index].sort.order
          } else {
            row.sort.index = 0
          }
        }
        columns.push(row)
      })
      emit('close', { action: true, columns })
    }
    return { onSubmit, columnList, sortedList }
  },
})
</script>

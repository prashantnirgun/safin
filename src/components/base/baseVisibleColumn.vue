<template>
  <q-list bordered separator dense>
    <q-expansion-item
      expand-separator
      icon="visibility"
      label="Visible columns"
      default-opened
    >
      <VueDraggable
        ref="el"
        v-model="visibleList"
        group="people"
        @update="($event) => console.log($event)"
      >
        <q-item
          clickable
          v-ripple
          v-for="item in visibleList"
          :key="item.name"
          :class="{ filtered: item.required }"
        >
          <q-item-section avatar>
            <q-icon color="primary" name="drag_indicator" />
          </q-item-section>

          <q-item-section>
            <q-item-label
              :class="{ 'text-blue text-bold text-subtitle2': item.required }"
              >{{ item.label }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </VueDraggable>
    </q-expansion-item>
  </q-list>

  <q-list bordered separator class="q-my-sm" dense>
    <q-expansion-item
      expand-separator
      icon="visibility_off"
      label="Non visible columns"
    >
      <VueDraggable ref="el" v-model="invisbleList" group="people">
        <q-item
          clickable
          v-ripple
          v-for="item in invisbleList"
          :key="item.name"
        >
          <q-item-section avatar>
            <q-icon color="primary" name="drag_indicator" />
          </q-item-section>

          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </VueDraggable>
    </q-expansion-item>
  </q-list>

  <div class="row justify-end q-gutter-md">
    <q-btn color="primary" @click="onSubmit"> Submit </q-btn>
    <q-btn @click="$emit('close', { action: false })"> close </q-btn>
  </div>
</template>

<script>
import { VueDraggable } from 'vue-draggable-plus'
import { ref, onMounted } from 'vue'
//import useForms from 'src/composable/useForm'
/**
 *   visibleColumns: ref([ 'calories', 'desc']),
 */
export default {
  name: 'VisibleColumn',
  components: { VueDraggable },
  emits: ['close'],
  props: {
    columns: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const visibleList = ref([])
    const invisbleList = ref([])
    //const { buildVisibleColumnList } = useForms()
    onMounted(() => {
      //visibleList.value = buildVisibleColumnList(props.columns)

      props.columns.map((row) => {
        if (row.display.visible) {
          visibleList.value.push(row)
        } else {
          invisbleList.value.push(row)
        }
      })
      visibleList.value.sort((a, b) => a.display.index - b.display.index)
    })
    const onSubmit = () => {
      //console.log('what is visibleList', visibleList.value, columnList.value)
      const columns = []
      //const visibleColumns = []

      visibleList.value.map((row, index) => {
        row.display.visible = true
        row.display.index = index
        columns.push(row)
      })

      invisbleList.value.map((row, index) => {
        row.display.visible = false
        row.display.index = index
        columns.push(row)
      })

      emit('close', { action: true, columns })
    }

    return {
      onSubmit,
      invisbleList,
      visibleList,
    }
  },
}
</script>

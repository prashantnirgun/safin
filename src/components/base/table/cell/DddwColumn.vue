<template>
  <div>
    {{ props.props.display_value }}
    <q-popup-edit
      v-model="column_value"
      :title="props.title"
      buttons
      @save="updateColumnHandler"
      @before-show="column_value = props.props.column_value"
      v-slot="scope"
    >
      <q-select
        v-model="scope.value"
        outlined
        dense
        :options="lists"
        emit-value
        map-options
        option-dense
        :option-value="props.props.option_value"
        :option-label="props.props.option_label"
      />
    </q-popup-edit>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useForms from 'src/composable/useForms'

const column_value = ref('')
const { updateColumnValue } = useForms()

const props = defineProps({
  props: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  lists: {
    type: Array,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  column_value.value = props.props.column_value
  //console.log('props', props.props)
})

const emit = defineEmits(['close'])

const updateColumnHandler = async (value, initialValue) => {
  await updateColumnValue(
    props.routeName,
    props.props.pk_id,
    value,
    initialValue,
    props.props.column_name
  )
  emit('close', { action: true })
}
</script>

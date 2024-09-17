<template>
  {{ column_value }}
  <q-popup-edit
    v-model="column_value"
    :title="props.title"
    buttons
    @save="updateColumnHandler"
    @before-show="column_value = props.props.column_value"
    v-slot="scope"
  >
    <q-input
      v-model="scope.value"
      dense
      autofocus
      counter
      :error="is_error"
      :error-message="error_message"
      @keyup.enter="scope.set"
    />
  </q-popup-edit>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useForms from 'src/composable/useForms'

const column_value = ref('')
const is_error = ref(false)
const error_message = ref('')
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
  routeName: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  column_value.value = props.props.column_value
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

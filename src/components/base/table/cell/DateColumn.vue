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
      outlined
      v-model="scope.value"
      dense
      mask="##-##-####"
      :rules="['isDateValid']"
      @keyup.enter="scope.set"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="scope.value" mask="DD-MM-YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </q-popup-edit>
</template>

<script setup>
import { onMounted, ref } from 'vue'

//composable
import useForms from 'src/composable/useForms'
import useCommon from 'src/composable/useCommon'

const column_value = ref('')
const is_error = ref(false)
const error_message = ref('')
const { updateColumnValue } = useForms()
const { isDateValid } = useCommon()

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
  value = value.split('-').reverse().join('-')
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

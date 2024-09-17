<template>
  <!-- <div class="text-green text-bold">{{ row.label }}</div> -->
  <div class="row q-col-gutter-xs justify-between">
    <q-select
      v-model="condition"
      outlined
      dense
      :options="whereCondition"
      label="Condition"
      class="col-6"
    />

    <q-select
      v-if="row.widget === 'ddlb'"
      v-model="modelOne"
      dense
      outlined
      :options="options"
      :label="row.label"
      emit-value
      map-options
      option-dense
      :option-value="row.valueCol"
      :option-label="row.labelCol"
      class="col-6"
    />

    <q-input
      v-if="row.widget === 'text'"
      v-model="modelOne"
      outlined
      dense
      :placeholder="row.label"
      class="col-6"
    />

    <q-input
      v-if="row.widget === 'number'"
      v-model.number="modelOne"
      type="number"
      outlined
      dense
      :placeholder="row.label"
      class="col-6"
    />

    <q-select
      v-if="row.widget === 'select'"
      v-model="modelOne"
      outlined
      dense
      :options="options"
      :options-dense="true"
      :placeholder="row.label"
      class="col-6"
    />
  </div>

  <span v-if="error !== null" class="text-red">
    {{ error }}
  </span>
</template>
<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import useForms from 'src/composable/useForms'
//import InputSelect from 'components/base/InputSelect.vue'
defineOptions({
  name: 'BaseWidget',
})

const props = defineProps({
  type: {
    type: String,
    default: null,
  },
  row: {
    type: Object,
    default: () => {},
  },
})
const emit = defineEmits(['updateExpression'])

const { booleanConditon, stringConditon, numberConditon, dateConditon } =
  useForms()
const condition = ref(
  props.row.condition ? props.row.condition : 'Select Condition'
)
const modelOne = ref(props.row.values.length ? props.row.values[0] : null)
const modelTwo = ref(props.row.values.length > 0 ? props.row.values[1] : null)
const options = ref(['Select Any'])
const error = ref(null)
watch([modelOne, modelTwo, condition], () => {
  //console.log("wtch", model);
  buildCondition()
})

onMounted(() => {
  if (props.row.options) {
    options.value = ['Select Any', ...props.row.options]
  }
})

const whereCondition = computed(() => {
  switch (props.row.widget.toLowerCase()) {
    case 'text':
      return stringConditon.value
      break
    case 'date':
      return dateConditon.value
      break
    case 'number':
      return numberConditon.value
      break
    default:
      return booleanConditon.value
      break
  }
})
const buildCondition = () => {
  let expression = {}
  error.value = null
  if (
    modelOne.value == null ||
    modelOne.value === 0 ||
    modelOne.value === '0'
  ) {
    error.value = 'Please select the value'
  } else if (condition.value !== 'Select Condition') {
    emit('updateExpression', {
      values: [modelOne.value, modelTwo.value],
      condition: condition.value,
    })
  }
}
</script>
<style lang="scss" scoped></style>

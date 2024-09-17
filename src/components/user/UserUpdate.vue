<template>
  <q-form class="" @submit="onSubmit">
    <div class="row">
      <q-input
        v-bind="nameProps"
        v-model="name"
        label="Scheme Name"
        class="col-12 q-mb-sm"
      ></q-input>
    </div>

    <div class="row">
      <q-input
        v-bind="rateOfInterestProps"
        v-model.number="rateOfInterest"
        label="Int. Rate"
        class="col-6 q-pr-xs q-pb-sm"
      ></q-input>

      <q-select
        v-model="schemeType"
        v-bind="schemeTypeProps"
        outlined
        dense
        :options="schemeTypeList"
        label="Base Type"
        class="col-6 q-pl-xs q-pb-sm"
      />
    </div>

    <div class="row">
      <q-select
        v-model="loanLedger"
        v-bind="loanLedgerProps"
        outlined
        dense
        :options="ledgerOptions"
        label="Loan Ledger"
        emit-value
        map-options
        option-dense
        option-value="_id"
        option-label="ledgerName"
        class="col-12 q-pb-sm"
      />
    </div>

    <div class="row">
      <q-select
        v-model="interestLedger"
        v-bind="interestLedgerProps"
        outlined
        dense
        :options="ledgerOptions"
        label="Intrerest Ledger"
        emit-value
        map-options
        option-dense
        option-value="_id"
        option-label="ledgerName"
        class="col-12 q-pb-none"
      />
    </div>

    <div class="row q-mt-xs justify-end q-gutter-md">
      <q-btn :disable="!meta.valid" type="submit" color="primary">
        Submit
      </q-btn>

      <q-btn @click="$emit('close', { action: false })"> close </q-btn>
    </div>
  </q-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { findById, find, post, patch } from 'boot/axios'
import { toTypedSchema } from '@vee-validate/zod'
import { useQuasar } from 'quasar'

//composable
import useGeneralLedger from '../ledger/useGeneralLedger'

//local
import { schemeTypeList } from 'src/config/optionValues'

//store
import { useGlobalStore } from 'src/stores/global'

defineOptions({
  name: 'SchemeUpdate',
})

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['close', 'open'])

const routeName = 'schemes'
const global = useGlobalStore()

const ledgerOptions = ref([])
const ledgerLists = ref([])
const $q = useQuasar()
const { getLedgerList } = useGeneralLedger()

const schema = toTypedSchema(
  z.object({
    name: z.string(),
    rateOfInterest: z.number(),
    schemeType: z.enum(['Loan', 'Deposit']).default('Loan'),
    loanLedger: z.string(),
    interestLedger: z.string(),
  })
)

const { defineField, handleSubmit, setFieldValue, errors, meta, values } =
  useForm({
    validationSchema: schema,
  })

const quasarConfig = (state) => ({
  props: {
    error: !!state.errors[0],
    'error-message': state.errors[0],
  },
})
const [name, nameProps] = defineField('name', quasarConfig)

const [rateOfInterest, rateOfInterestProps] = defineField(
  'rateOfInterest',
  quasarConfig
)
const [schemeType, schemeTypeProps] = defineField('schemeType', quasarConfig)

const [loanLedger, loanLedgerProps] = defineField('loanLedger', quasarConfig)

const [interestLedger, interestLedgerProps] = defineField(
  'interestLedger',
  quasarConfig
)

onMounted(async () => {
  $q.loading.show()
  if (props.id.length) {
    try {
      const response = await findById(routeName, props.id)

      const keys = Object.keys(response.data)
      //console.log('data', response.data)
      keys.map((column) => {
        setFieldValue(column, response.data[column])
      })
    } catch (error) {}
  }
  ledgerLists.value = await getLedgerList()
  ledgerOptions.value = ledgerLists.value
  $q.loading.hide()
})

const onSubmit = handleSubmit(async (values) => {
  try {
    if (props.id.length) {
      const result = await patch(routeName, props.id, values)
    } else {
      await post(routeName, values)
    }
    emit('close', { action: true })
  } catch (error) {
    emit('close', { action: false })
  }
})

// const groupFilter = async (val, update) => {
//   accountGroupSearch(val, update, accountGroupLists, accountGroupOptions)
// }
</script>

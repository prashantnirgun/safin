<template>
  <q-form class="" @submit="onSubmit">
    <div class="row">
      <q-input
        readonly
        v-model.number="documentId"
        label="ID"
        type="number"
        class="col-2 q-pr-xs"
      ></q-input>

      <q-select
        v-model="partyId"
        v-bind="partyIdProps"
        class="col-4 q-pr-xs q-pb-none"
        :class="[props.loanType === 'Loan' ? 'col-6' : 'col-10']"
        outlined
        dense
        :options="partyOptions"
        label="Party"
        emit-value
        map-options
        options-dense
        option-value="_id"
        option-label="ledgerName"
        use-input
        hide-selected
        fill-input
        @filter="partyFilter"
      />

      <q-select
        v-if="props.loanType === 'Loan'"
        class="col-4 q-pl-xs q-pb-none"
        v-model="brokerId"
        v-bind="brokerIdProps"
        outlined
        dense
        :options="brokerOptions"
        label="Broker"
        emit-value
        map-options
        option-dense
        option-value="_id"
        option-label="ledgerName"
        use-input
        hide-selected
        fill-input
        @filter="brokerFilter"
      />
    </div>
    <div class="row q-my-sm">
      <q-select
        v-model="loanStatus"
        v-bind="loanStatusProps"
        outlined
        dense
        :options="loanStatusList"
        label="Status"
        class="col-4 q-pb-none"
      />

      <q-select
        v-model="installmentFrequency"
        v-bind="installmentFrequencyProps"
        outlined
        dense
        :options="installmentFrequencyList"
        label="Inst"
        class="col-4 q-px-xs q-pb-none"
      />

      <q-input
        v-bind="rateOfInterestProps"
        v-model.number="rateOfInterest"
        label="Rate of Int."
        type="number"
        min="0"
        step=".01"
        readonly
        class="col-4 q-pb-none"
      ></q-input>
    </div>
    <div class="row">
      <q-select
        v-model="scheme"
        v-bind="schemeProps"
        outlined
        dense
        :options="schemeLists"
        label="Scheme"
        emit-value
        map-options
        option-dense
        option-value="_id"
        option-label="name"
        class="col-6 q-pb-sm q-pr-xs"
      />

      <q-input
        v-bind="principalAmountProps"
        v-model.number="principalAmount"
        label="Principal"
        class="col-6 q-pl-xs"
        type="number"
        input-style="text-align:right;"
        min="0"
        step=".01"
      ></q-input>
    </div>
    <div class="row">
      <q-input
        v-bind="sanctionedDateProps"
        v-model="sanctionedDate"
        outlined
        dense
        label="Sanction Date"
        mask="##-##-####"
        :rules="['isDateValid']"
        class="col-6 q-pr-xs"
        @update:model-value="hanelSanctionDate"
      >
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="sanctionedDate"
                dense
                mask="DD-MM-YYYY"
                today-btn
                @update:model-value="hanelSanctionDate"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <!-- <q-input
        v-bind="noOfInstallmentProps"
        v-model.number="noOfInstallment"
        dense
        outlined
        label="Installment"
        type="number"
        class="col-2 q-px-xs"
      ></q-input> -->

      <q-input
        v-bind="maturityDateProps"
        v-model="maturityDate"
        outlined
        dense
        label="Maturity Date"
        readonly
        class="col-6 q-pl-xs"
      />
    </div>

    <div class="row q-my-sm">
      <q-select
        v-model="bankId"
        v-bind="bankIdProps"
        outlined
        dense
        :options="bankOptions"
        label="Bank"
        emit-value
        map-options
        option-dense
        option-value="_id"
        option-label="ledgerName"
        class="col-12 q-pb-none"
        use-input
        hide-selected
        fill-input
        @filter="bankFilter"
      />
    </div>
    <div class="row q-my-sm">
      <q-input
        v-bind="tagsProps"
        v-model="tags"
        label="Tags"
        class="col-12"
      ></q-input>
    </div>
    <div class="row q-my-sm">
      <q-input
        v-bind="remarksProps"
        v-model="remarks"
        label="Remark"
        type="textarea"
        rows="4"
        cols="50"
        class="col-12"
      ></q-input>
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
import { toTypedSchema } from '@vee-validate/zod'
import moment from 'moment'
import { findById, find, post, patch } from 'boot/axios'
import { useQuasar } from 'quasar'

//composable
import useSchemeType from 'src/components/scheme/useSchemeType'
import useGeneralLedger from '../ledger/useGeneralLedger'
import useCommon from 'src/composable/useCommon'

//local
import {
  loanStatusList,
  installmentFrequencyList,
} from 'src/config/optionValues'
import { isDateValid, formatedDateTime } from 'src/services/Validation'
//store
import { useGlobalStore } from 'src/stores/global'

// defineOptions({
//   name: 'LoanUpdate',
// })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  loanType: {
    type: String,
    default: 'Loan',
  },
})
const emit = defineEmits(['close', 'open'])

const routeName = 'loans'
const global = useGlobalStore()
const partyLists = ref([])
const partyOptions = ref([])
const brokerLists = ref([])
const brokerOptions = ref([])
const bankLists = ref([])
const bankOptions = ref([])
const schemeLists = ref([])
const $q = useQuasar()
const documentId = ref(0)
//const { getLedgerList } = useledger()
const { getLedgerList, ledgerSearch } = useGeneralLedger()
const { getSchemeList } = useSchemeType()
const { showAlert } = useCommon()
const schema = toTypedSchema(
  z.object({
    partyId: z.string(),
    brokerId: z.string(),
    bankId: z.string(),
    sanctionedDate: z.string(),
    maturityDate: z.string(),
    //    maturityDate: z.string(),
    principalAmount: z.number().positive(),
    scheme: z.string(),
    rateOfInterest: z.number(),
    tags: z.string().nullable().optional(),
    remarks: z.string().nullable().optional(),
    loanStatus: z
      .enum(['Applied', 'Sanctioned', 'Outstanding', 'Paid'])
      .default('Sanctioned'),
    installmentFrequency: z
      .enum(['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'])
      .default('Quarterly'),
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
//const [partyName, partyNameProps] = defineField('partyName', quasarConfig)

const [partyId, partyIdProps] = defineField('partyId', quasarConfig)
const [brokerId, brokerIdProps] = defineField('brokerId', quasarConfig)
const [bankId, bankIdProps] = defineField('bankId', quasarConfig)
const [sanctionedDate, sanctionedDateProps] = defineField(
  'sanctionedDate',
  quasarConfig
)
const [maturityDate, maturityDateProps] = defineField(
  'maturityDate',
  quasarConfig
)
// const [noOfInstallment, noOfInstallmentProps] = defineField(
//   'noOfInstallment',
//   quasarConfig
// )

const [installmentFrequency, installmentFrequencyProps] = defineField(
  'installmentFrequency',
  quasarConfig
)

// const [maturityDate, maturityDateProps] = defineField(
//   'maturityDate',
//   quasarConfig
// )
const [tags, tagsProps] = defineField('tags', quasarConfig)
const [remarks, remarksProps] = defineField('remarks', quasarConfig)
const [loanStatus, loanStatusProps] = defineField('loanStatus', quasarConfig)
const [principalAmount, principalAmountProps] = defineField(
  'principalAmount',
  quasarConfig
)
const [scheme, schemeProps] = defineField('scheme', quasarConfig)
const [rateOfInterest, rateOfInterestProps] = defineField(
  'rateOfInterest',
  quasarConfig
)

onMounted(async () => {
  $q.loading.show()
  const partyGroupType =
    props.loanType === 'Loan' ? 'Sundry Debtors' : 'Sundry Creditors'
  schemeLists.value = await getSchemeList({ schemeType: props.loanType })
  if (props.id.length) {
    try {
      const response = await findById(routeName, props.id)

      const keys = Object.keys(response.data)
      //console.log('data', response.data)
      keys.map((column) => {
        if (column === 'sanctionedDate' || column === 'maturityDate') {
          let val = response.data[column]
          val = formatedDateTime(val, 'DD-MM-YYYY')
          response.data[column] = val
        }
        if (column === 'documentId') {
          documentId.value = response.data[column]
        } else {
          setFieldValue(column, response.data[column])
        }
      })
    } catch (error) {}
  } else {
    const scheme = schemeLists.value[0]
    setFieldValue('scheme', scheme._id)
    setFieldValue('rateOfInterest', scheme.rateOfInterest)
    setFieldValue('sanctionedDate', formatedDateTime(new Date(), 'DD-MM-YYYY'))
    setFieldValue('maturityDate', formatedDateTime(new Date(), 'DD-MM-YYYY'))
    setFieldValue('principalAmount', 0.0)
  }
  const list = await getLedgerList()

  list.map((row) => {
    if (row.accountGroupId.accountGroupName === partyGroupType) {
      partyLists.value.push(row)
    }

    if (
      row.accountGroupId.accountGroupName === 'Cash' ||
      row.accountGroupId.accountGroupName === 'Bank'
    ) {
      bankLists.value.push(row)
    }
    if (row.isBroker === 'Yes') {
      brokerLists.value.push(row)
    }
  })
  partyOptions.value = partyLists.value
  bankOptions.value = bankLists.value
  brokerOptions.value = brokerLists.value
  setFieldValue('brokerId', brokerLists.value[0]._id)
  setFieldValue('bankId', bankLists.value[0]._id)
  $q.loading.hide()
})

const onSubmit = handleSubmit(async (values) => {
  try {
    values.maturityDate = values.sanctionedDate
    values.interestPaidAmount = 0
    values.principalPaidAmount = 0
    values.interestOutstandingAmount = values.principalAmount
    values.principalOutstandingAmount = values.principalAmount
    values.maturityAmount = values.principalAmount
    values.sanctionedDate = values.sanctionedDate.split('-').reverse().join('-')
    values.maturityDate = values.maturityDate.split('-').reverse().join('-')
    if (props.id.length) {
      const result = await patch(routeName, props.id, values)
    } else {
      values.loanType = props.loanType
      values.noOfInstallment = 1
      await post(routeName, values)
    }
    emit('close', { action: true })
  } catch (error) {
    console.error(error)
    showAlert({ type: 'negative', message: error.response.data })
    //emit('close', { action: false })
  }
})

const schemeHandler = (id) => {
  const scheme = schemeLists.value.find((row) => row._id === id)
  setFieldValue('rateOfInterest', scheme.rateOfInterest)
}

const hanelSanctionDate = (value) => {
  const docDate = new Date(value.split('-').reverse().join('-'))
  let maturityDate
  // 'Monthly', 'Quarterly', 'Half Yearly', 'Yearly'
  switch (installmentFrequency.value) {
    case 'Monthly':
      maturityDate = moment(docDate)
        .add(1, 'M')
        .subtract(1, 'day')
        .format('DD-MM-YYYY')
      break
    case 'Quarterly':
      maturityDate = moment(docDate)
        .add(3, 'M')
        .subtract(1, 'day')
        .format('DD-MM-YYYY')
      break
    case 'Half Yearly':
      maturityDate = moment(docDate)
        .add(6, 'M')
        .subtract(1, 'day')
        .format('DD-MM-YYYY')
      break
    default:
      maturityDate = moment(docDate)
        .add(12, 'M')
        .subtract(1, 'day')
        .format('DD-MM-YYYY')
      break
  }
  setFieldValue('maturityDate', maturityDate)
  //console.log(maturityDate, installmentFrequency.value)
}

const partyFilter = async (val, update) => {
  ledgerSearch(val, update, partyLists, partyOptions)
}

const brokerFilter = async (val, update) => {
  ledgerSearch(val, update, brokerLists, brokerOptions)
}

const bankFilter = async (val, update) => {
  ledgerSearch(val, update, bankLists, bankOptions)
}
</script>

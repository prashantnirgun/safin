<template>
  <div class="row">
    <q-input
      v-bind="voucherDateProps"
      v-model="voucherDate"
      outlined
      dense
      label="Sanction Date"
      mask="##-##-####"
      :rules="['isDateValid']"
      class="col-6 q-pr-xs"
    >
      <template #append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="voucherDate" dense mask="DD-MM-YYYY" today-btn>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      v-bind="voucherNoProps"
      v-model.number="voucherNo"
      label="Voucher No"
      class="col-6 q-pl-xs"
      type="number"
      input-style="text-align:right;"
      min="0"
      step=".01"
    ></q-input>
  </div>
</template>

<script setup>
import { ref, onUpdated } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { findById, find, post, patch } from 'boot/axios'
import { toTypedSchema } from '@vee-validate/zod'
import { useQuasar } from 'quasar'

//local
import {
  loanStatusList,
  installmentFrequencyList,
} from 'src/config/optionValues'
import { isDateValid, formatedDateTime } from 'src/services/Validation'

//composable
import useGeneralLedger from '../ledger/useGeneralLedger'

defineOptions({
  name: 'ReceiptVoucher',
})

const routeName = 'vouchers'
const $q = useQuasar()

const { getLedgerList } = useGeneralLedger()

const schema = toTypedSchema(
  z.object({
    voucherTypeId: z.string(),
    voucherNo: z.string(),
    voucherDate: z.string().default(formatedDateTime(new Date(), 'DD-MM-YYYY')),
    narration: z.string().optional(),
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

const [voucherTypeId, voucherTypeIdProps] = defineField(
  'voucherTypeId',
  quasarConfig
)
const [voucherNo, voucherNoProps] = defineField('voucherNo', quasarConfig)
const [voucherDate, voucherDateProps] = defineField('voucherDate', quasarConfig)
const [narration, narrationProps] = defineField('narration', quasarConfig)
</script>

<style lang="scss" scoped></style>

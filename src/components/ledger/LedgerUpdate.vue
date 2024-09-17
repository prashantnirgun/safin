<template>
  <q-form class="" @submit="onSubmit">
    <div class="row">
      <q-input
        v-bind="ledgerNameProps"
        v-model="ledgerName"
        label="Ledger Name"
        class="col-12"
      ></q-input>
    </div>
    <div class="row q-my-sm">
      <q-select
        v-model="accountGroupId"
        v-bind="accountGroupIdProps"
        use-input
        hide-selected
        fill-input
        outlined
        dense
        :options="accountGroupOptions"
        label="Account Group"
        emit-value
        map-options
        options-dense
        option-value="_id"
        option-label="accountGroupName"
        class="col-6 q-pb-none q-pr-xs"
        @filter="groupFilter"
      />

      <q-select
        v-model="isBroker"
        v-bind="isBrokerProps"
        outlined
        dense
        :options="yesNoList"
        label="Is Broker"
        class="col-6 q-pb-none"
      />
    </div>

    <div class="row">
      <q-input
        v-bind="aliasProps"
        v-model="alias"
        label="alias"
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
import { findById, find, post, patch } from 'boot/axios'
import { toTypedSchema } from '@vee-validate/zod'
import { useQuasar } from 'quasar'

//composable
import useAccountGroup from 'components/accountGroup/useAccountGroup'

//local
import { yesNoList } from 'src/config/optionValues'

//store
import { useGlobalStore } from 'src/stores/global'

defineOptions({
  name: 'LedgerUpdate',
})

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['close', 'open'])

const routeName = 'ledgers'
const global = useGlobalStore()
const accountGroupLists = ref([])
const accountGroupOptions = ref([])
const $q = useQuasar()
const { getAccountGroupList, accountGroupSearch } = useAccountGroup()

const schema = toTypedSchema(
  z.object({
    // ledgerName: z.string().refine(async (e) => {
    //   return await uniqueName(e)
    // }, 'This Voucher Type is already present'),
    ledgerName: z.string(),
    accountGroupId: z.string(),
    alias: z.string().nullable().optional(),
    remarks: z.string().nullable().optional(),
    isBroker: z.enum(['Yes', 'No']).default('No'),
  })
)
/*
    const uniqueName = async (value) => {
      const queryOptions = {
        select: 'ledgerName',
        'ledgerName[$eq]': value.trim(),
        'id[$ne]': props.id,
      }
      const result = await find(routeName, queryOptions)
      return result.data.total === 0
    }
      */
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
const [ledgerName, ledgerNameProps] = defineField('ledgerName', quasarConfig)

const [accountGroupId, accountGroupIdProps] = defineField(
  'accountGroupId',
  quasarConfig
)
const [alias, aliasProps] = defineField('alias', quasarConfig)
const [remarks, remarksProps] = defineField('remarks', quasarConfig)
const [isBroker, isBrokerProps] = defineField('isBroker', quasarConfig)

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
  accountGroupLists.value = await getAccountGroupList()
  accountGroupOptions.value = accountGroupLists.value
  $q.loading.hide()
})

const onSubmit = handleSubmit(async (values) => {
  try {
    // values.branch_id = global.getBranchId
    // values.updatedById = global.getUserId
    if (props.id.length) {
      // values.createdById = global.getUserId
      const result = await patch(routeName, props.id, values)
    } else {
      await post(routeName, values)
    }
    emit('close', { action: true })
  } catch (error) {
    emit('close', { action: false })
  }
})

const groupFilter = async (val, update) => {
  accountGroupSearch(val, update, accountGroupLists, accountGroupOptions)
}
</script>

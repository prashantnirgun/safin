<template>
  <div class="row justify-center q-my-md">
    <div class="text-h4">{{ props.loanType }}</div>
    <q-space />
    <Action-Buttons
      :isSelectAll="false"
      :isSort="true"
      :isDelete="true"
      :isSearch="true"
      :isVisible="false"
      @buttonAction="doAction"
    />
  </div>
  <div class="row">
    <div class="row column col-12">
      <q-table
        v-model:selected="selected"
        v-model:pagination="pagination"
        :columns="columns"
        :rows="rows"
        row-key="_id"
        dense
        selection="single"
        @request="onRequest"
      >
        <template v-if="rows.length" #bottom-row="props">
          <q-tr>
            <td></td>
            <td
              v-for="(col, index) in props.cols"
              :key="col.name"
              :align="col.align"
              class="text-bold"
            >
              {{
                columns[index].tot > 0.0
                  ? new Intl.NumberFormat('en-IN', {
                      minimumFractionDigits: 2,
                    }).format(columns[index].tot)
                  : ''
              }}
            </td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>

  <Base-Modal
    :show="showModal.create"
    :icon="` ${props.loanType === 'Loan' ? 'real_estate_agent' : 'savings'}`"
    :title="`Add ${props.loanType} Application`"
    size="450px"
    @close="closeModal('create')"
  >
    <Loan-Update
      :id="showModal.id"
      :loanType="props.loanType"
      @close="closeModal('create', $event)"
    />
  </Base-Modal>

  <Base-Modal
    :show="showModal.search"
    icon="search"
    title="Search Loan"
    size="450px"
    @close="closeModal('search')"
  >
    <BaseSearch
      @close="closeModal('search', $event)"
      :columns="showModal.whereColumns"
    />
  </Base-Modal>

  <!-- <Base-Modal
    :show="showModal.visible"
    icon="visibility"
    title="Show / Hide Columns"
    size="450px"
    @close="closeModal('visible')"
  >
    <VisibleColumn @close="closeModal('visible', $event)" :columns="columns">
    </VisibleColumn>
  </Base-Modal> -->

  <!-- <Base-Modal
    :show="showModal.sort"
    icon="visibility"
    title="Sort Columns"
    size="450px"
    @close="closeModal('sort')"
  >
    <SortColumn @close="closeModal('sort', $event)" :columns="columns">
    </SortColumn>
  </Base-Modal> -->

  <Base-Modal
    :show="showModal.delete"
    icon="delete"
    :title="`Delete ${props.loanType} Application`"
    size="450px"
    @close="closeModal('delete')"
  >
    <div v-html="showModal.message"></div>
    <q-card-actions align="right">
      <q-btn
        color="secondary"
        label="Submit"
        @click="closeModal('delete', { action: true })"
      />
      <q-btn
        color="primary"
        label="Close"
        @click="closeModal('delete', { action: false })"
      />
    </q-card-actions>
  </Base-Modal>
</template>

<script setup>
import { defineComponent, ref, reactive, computed, onMounted, watch } from 'vue'
import { find, remove } from 'boot/axios'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

//local
import { LoanColumns, DepositColumns } from 'src/config/loanColumns.js'
import { yesNoList, loanStatusList } from 'src/config/optionValues'

//component
import ActionButtons from 'components/base/actionButtons.vue'
import BaseModal from 'components/base/baseModal.vue'
// import VisibleColumn from 'components/base/baseVisibleColumn.vue'
// import SortColumn from 'components/base/baseSortColumn.vue'
import BaseSearch from 'components/base/Search.vue'

// import GeneralLedgerName from 'components/base/table/cell/StringColumn.vue'
// import Alias from 'components/base/table/cell/StringColumn.vue'
// import AccountGroupName from 'components/base/table/cell/DddwColumn.vue'
// import IsStatutory from 'components/base/table/cell/DdlbColumn.vue'

import LoanUpdate from './LoanUpdate.vue'

//composable
import useForms from 'src/composable/useForms'
import useCommon from 'src/composable/useCommon'
import useAccountGroup from 'components/accountGroup/useAccountGroup'
import useGeneralLedger from '../ledger/useGeneralLedger'

//store
import { useGlobalStore } from 'src/stores/global'

defineOptions({
  name: 'LoanList',
})

const $q = useQuasar()
const routeName = 'loans'
const rows = ref([])
const selected = ref([])
const partyLists = ref([])
const brokerLists = ref([])
const bankLists = ref([])
const columns = ref()
const queryOptions = ref({})
const { visibleColumns, whereBuilder, sortBuilder, pagination } = useForms()
const { summaryColumns } = useCommon()
const { getAccountGroupList } = useAccountGroup()
const { getLedgerList } = useGeneralLedger()
const showModal = ref({
  create: false,
  update: false,
  delete: false,
  search: false,
  visible: false,
  sort: false,
  id: 0,
  message: null,
  whereColumns: [
    {
      name: 'loanStatus',
      label: 'Status',
      widget: 'select',
      type: 'String',
      options: loanStatusList,
      values: ['Select Any'],
      condition: 'Equal',
    },
    {
      name: 'partyId',
      label: 'Party Name',
      widget: 'ddlb',
      type: 'String',
      options: partyLists,
      valueCol: '_id',
      labelCol: 'ledgerName',
      values: ['Select Any'],
      condition: 'Equal',
    },
    {
      name: 'brokerId',
      label: 'Broker Name',
      widget: 'ddlb',
      type: 'String',
      options: brokerLists,
      valueCol: '_id',
      labelCol: 'ledgerName',
      values: ['Select Any'],
      condition: 'Equal',
    },
    {
      name: 'bankId',
      label: 'Bank Name',
      widget: 'ddlb',
      type: 'String',
      options: bankLists,
      valueCol: '_id',
      labelCol: 'ledgerName',
      values: ['Select Any'],
      condition: 'Equal',
    },
    {
      name: 'tags',
      label: 'Tags',
      widget: 'text',
      type: 'String',
      values: [],
      condition: 'Contains',
    },
    {
      name: 'principalAmount',
      label: 'Principal',
      widget: 'number',
      type: 'Number',
      values: [],
      condition: 'Equal',
    },
  ],
  currentRow: {},
})

const props = defineProps({
  loanType: {
    type: String,
    default: 'Loan',
  },
})

watch(
  () => props.loanType,
  (newValue, oldValue) => {
    // React to prop changes
    //console.log('Prop changed:', newValue)
    columns.value = props.loanType === 'Loan' ? LoanColumns : DepositColumns
    //pagination.value.page = 1
    onRequest({ pagination: pagination.value })
  }
)

onMounted(async () => {
  columns.value = props.loanType === 'Loan' ? LoanColumns : DepositColumns
  onRequest({ pagination: pagination.value })
  const list = await getLedgerList()
  const partyGroupType =
    props.loanType === 'Loan' ? 'Sundry Debtors' : 'Sundry Creditors'

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
})

const onRequest = async (prop) => {
  const { page, rowsPerPage } = prop.pagination
  selected.value = []
  $q.loading.show({ spinnerColor: 'yellow' })

  queryOptions.value.loanType = props.loanType

  if (rowsPerPage > 0) {
    queryOptions.value['limit'] = rowsPerPage
    queryOptions.value.page = page
  }
  try {
    const result = await find(routeName, queryOptions.value)
    rows.value = result.data.data

    //update pagination
    pagination.value.page = page
    pagination.value.rowsPerPage =
      rowsPerPage > 0 ? rowsPerPage : result.data.total
    pagination.value.rowsNumber = result.data.total
    summaryColumns(rows.value, columns.value)
  } catch (error) {
    console.log(error)
  } finally {
    $q.loading.hide()
  }
}
const doAction = (modalName) => {
  //console.log(modalName)
  let action = selected.value.length > 0

  switch (modalName) {
    case 'search': {
      action = true
      break
    }
    case 'create': {
      showModal.value.id = ''
      action = true
      break
    }
    case 'update': {
      if (selected.value.length) {
        showModal.value.id = selected.value[0]._id
        modalName = 'create'
      } else {
        action = false
      }
      break
    }
    case 'delete': {
      if (selected.value.length) {
        showModal.value.id = selected.value[0]._id
        showModal.value.message = `Do you want to delete Application ID : <b>${selected.value[0].documentId}</b> Party : <b>${selected.value[0].partyId.ledgerName}</b> ${props.loanType} ?`
        action = true
      } else {
        action = false
      }
      break
    }
    default:
      break
  }

  if (action) {
    showModal.value[modalName] = true
  } else {
    //console.log('now what is action', action)
    showAlert({
      message: `Please select the record first`,
      type: 'warning',
    })
  }
}

const closeModal = async (modalName, payload = { action: false }) => {
  console.log('closeModal', payload.columns, modalName)
  switch (modalName) {
    case 'search': {
      if (payload.columns) {
        showModal.value.whereColumns = [...payload.columns]
        const conditions = whereBuilder(payload.columns)

        if (conditions.length) {
          queryOptions.value = {}
          conditions.map((row) => {
            const key = Object.keys(row)[0]
            const value = Object.values(row)[0]
            queryOptions.value[key] = value
          })
          payload.action = true
        } else {
          queryOptions.value = {}
        }
      }
      break
    }
    case 'delete': {
      if (!!payload.action && showModal.value.id.length) {
        const response = await remove(routeName, showModal.value.id)
      }
      break
    }
    default:
      break
  }

  if (!!payload.action) {
    await onRequest({ pagination: pagination.value })
  }
  showModal.value[modalName] = false
}
</script>

<style lang="scss" scoped></style>

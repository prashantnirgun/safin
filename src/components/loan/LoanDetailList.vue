<template>
  <div class="row justify-center q-my-md">
    <div class="text-h4">{{ props.loanType }} Detail</div>
    <q-space />
    <!-- <Action-Buttons
      :isSelectAll="false"
      :isSort="true"
      :isDelete="true"
      :isSearch="false"
      :isVisible="false"
      @buttonAction="doAction"
    /> -->
  </div>
  <div class="row">
    <div class="row column col-12">
      <q-table
        v-model:selected="selected"
        v-model:pagination="pagination"
        :rows="rows"
        :columns="columns"
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

  <!-- <Base-Modal
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
  </Base-Modal> -->

  <!-- <Base-Modal
    :show="showModal.search"
    icon="search"
    title="Search Member"
    size="450px"
    @close="closeModal('search')"
  >
    <BaseSearch
      @close="closeModal('search', $event)"
      :columns="showModal.whereColumns"
    />
  </Base-Modal> -->

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

  <!-- <Base-Modal
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
  </Base-Modal> -->
</template>

<script setup>
import { defineComponent, ref, reactive, computed, onMounted, watch } from 'vue'
import { find, remove } from 'boot/axios'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

//local
import { LedgerColumns } from 'src/config/loanColumns.js'
import { yesNoList } from 'src/config/optionValues'

//component
//import ActionButtons from 'components/base/actionButtons.vue'
//import BaseModal from 'components/base/baseModal.vue'
// import VisibleColumn from 'components/base/baseVisibleColumn.vue'
// import SortColumn from 'components/base/baseSortColumn.vue'
// import BaseSearch from 'components/base/Search.vue'

// import GeneralLedgerName from 'components/base/table/cell/StringColumn.vue'
// import Alias from 'components/base/table/cell/StringColumn.vue'
// import AccountGroupName from 'components/base/table/cell/DddwColumn.vue'
// import IsStatutory from 'components/base/table/cell/DdlbColumn.vue'

//import LoanUpdate from './LoanUpdate.vue'

//composable
import useForms from 'src/composable/useForms'
import useCommon from 'src/composable/useCommon'
import useLoanDetail from 'src/components/loan/useLoanDetail'
import useAccountGroup from 'components/accountGroup/useAccountGroup'

//store
import { useGlobalStore } from 'src/stores/global'

defineOptions({
  name: 'LoanDetailList',
})

const $q = useQuasar()
const routeName = 'loans'
const rows = ref([])
const selected = ref([])
//const accountGroupLists = ref([])
const columns = ref(LedgerColumns)
const { visibleColumns, whereBuilder, sortBuilder, pagination } = useForms()
const { summaryColumns } = useCommon()
const { getList } = useLoanDetail()
const { getAccountGroupList } = useAccountGroup()
const showModal = ref({
  create: false,
  update: false,
  delete: false,
  search: false,
  visible: false,
  sort: false,
  id: 0,
  message: null,
  whereColumns: [],
  currentRow: {},
})

const props = defineProps({
  loanType: {
    type: String,
    default: 'Loan',
  },
})

onMounted(async () => {
  onRequest({ pagination: pagination.value })
})

const onRequest = async (prop) => {
  const { page, rowsPerPage } = prop.pagination
  selected.value = []

  $q.loading.show({ spinnerColor: 'yellow' })

  let queryOptions = {
    loanType: props.loanType,
  }

  if (rowsPerPage > 0) {
    queryOptions['limit'] = rowsPerPage
    queryOptions.page = page
  }
  const datas = getList()
  //const result = await find(routeName, queryOptions)
  const result = { data: { data: datas, total: datas.length } }
  //console.log('rows', datas, result)
  rows.value = result.data.data

  //update pagination
  pagination.value.page = page
  pagination.value.rowsPerPage =
    rowsPerPage > 0 ? rowsPerPage : result.data.total
  pagination.value.rowsNumber = result.data.total
  summaryColumns(rows.value, columns.value)
  $q.loading.hide()
}
const doAction = (modalName) => {
  //console.log(modalName)
  let action = selected.value.length > 0

  switch (modalName) {
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
        showModal.value.message = `Do you want to delete <b>${selected.value[0].partyName}</b> ${props.loanType} ?`
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
  //console.log('closeModal', payload, modalName)
  switch (modalName) {
    case 'delete': {
      if (!!payload.action && showModal.value.id.length) {
        console.log('delete')
        const response = await remove(routeName, showModal.value.id)
      } else {
        console.log('else delete', showModal.value.id)
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

<template>
  <div class="row justify-center q-my-md">
    <div class="text-h4">Ledger</div>
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
      </q-table>
    </div>
  </div>

  <Base-Modal
    :show="showModal.create"
    icon="article"
    title="Add General Ledger"
    size="450px"
    @close="closeModal('create')"
  >
    <Ledger-Update :id="showModal.id" @close="closeModal('create', $event)" />
  </Base-Modal>

  <Base-Modal
    :show="showModal.search"
    icon="search"
    title="Search Ledger"
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
    title="Delete Unit"
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { find, remove } from 'boot/axios'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

//local
import { LedgerColumns } from 'src/config/tableColumns.js'
import { yesNoList } from 'src/config/optionValues'

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

import LedgerUpdate from './LedgerUpdate.vue'

//composable
import useForms from 'src/composable/useForms'
import useCommon from 'src/composable/useCommon'
import useAccountGroup from 'components/accountGroup/useAccountGroup'

//store
import { useGlobalStore } from 'src/stores/global'

const routeName = 'ledgers'
const rows = ref([])
const selected = ref([])
const accountGroupLists = ref([])

const columns = ref(LedgerColumns)
const queryOptions = ref({})
const $q = useQuasar()
const { visibleColumns, whereBuilder, sortBuilder, pagination } = useForms()
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
  whereColumns: [
    {
      name: 'ledgerName',
      label: 'Ledger Name',
      widget: 'text',
      type: 'String',
      values: [],
      condition: 'Contains',
    },
    {
      name: 'accountGroupId',
      label: 'Account Group Name',
      widget: 'ddlb',
      type: 'String',
      options: accountGroupLists,
      valueCol: '_id',
      labelCol: 'accountGroupName',
      values: [],
      condition: 'Equal',
    },
    {
      name: 'alias',
      label: 'Alias',
      widget: 'text',
      type: 'String',
      values: [],
      condition: 'Contains',
    },
    {
      name: 'isBroker',
      label: 'Broker',
      widget: 'select',
      type: 'String',
      options: yesNoList,
      values: ['Select Any'],
      condition: 'Equal',
    },
  ],
  currentRow: {},
})

onMounted(async () => {
  onRequest({ pagination: pagination.value })
  accountGroupLists.value = await getAccountGroupList()
})

const onRequest = async (props) => {
  const { page, rowsPerPage } = props.pagination
  selected.value = []
  $q.loading.show()
  //const sortedList = sortBuilder(columns.value)

  //let queryOptions = {}

  if (rowsPerPage > 0) {
    queryOptions.value['limit'] = rowsPerPage
    queryOptions.value.page = page
  }
  //console.log('query options', queryOptions.value)
  const result = await find(routeName, queryOptions.value)
  rows.value = result.data.data
  //update pagination
  pagination.value.page = page
  pagination.value.rowsPerPage =
    rowsPerPage > 0 ? rowsPerPage : result.data.total
  pagination.value.rowsNumber = result.data.total
  $q.loading.hide()
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
        if (selected.value[0].is_Statutory === 'Yes') {
          showModal.value.message = `You can't to delete <b>${selected.value[0].ledgerName}</b> statutory ledger !`
        } else {
          showModal.value.message = `Do you want to delete <b>${selected.value[0].ledgerName}</b> ledger ?`
        }

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
      if (
        !!payload.action &&
        showModal.value.id.length &&
        selected.value[0].isStatutory === 'No'
      ) {
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

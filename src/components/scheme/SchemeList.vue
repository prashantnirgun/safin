<template>
  <div class="row justify-center q-my-md">
    <div class="text-h4">Scheme</div>
    <q-space />
    <Action-Buttons
      :isSelectAll="false"
      :isSort="true"
      :isDelete="true"
      :isSearch="false"
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
    icon="campaign"
    title="Add Scheme"
    size="450px"
    @close="closeModal('create')"
  >
    <Scheme-Update :id="showModal.id" @close="closeModal('create', $event)" />
  </Base-Modal>

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
import { SchemeColumns } from 'src/config/loanColumns.js'
import { yesNoList } from 'src/config/optionValues'

//component
import ActionButtons from 'components/base/actionButtons.vue'
import BaseModal from 'components/base/baseModal.vue'
import SchemeUpdate from './SchemeUpdate.vue'

//composable
import useForms from 'src/composable/useForms'
import useCommon from 'src/composable/useCommon'

//store
import { useGlobalStore } from 'src/stores/global'

const routeName = 'schemes'
const rows = ref([])
const selected = ref([])

const columns = ref(SchemeColumns)
const $q = useQuasar()
const { visibleColumns, whereBuilder, sortBuilder, pagination } = useForms()

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
      name: 'accountGroupName',
      label: 'Account Group Name',
      widget: 'text',
      type: 'String',
      values: [],
      condition: 'Contains',
    },
    {
      name: 'Alias',
      label: 'Alias',
      widget: 'text',
      type: 'String',
      values: [],
      condition: 'Contains',
    },
  ],
  currentRow: {},
})

onMounted(async () => {
  onRequest({ pagination: pagination.value })
})

const onRequest = async (props) => {
  const { page, rowsPerPage } = props.pagination
  selected.value = []
  $q.loading.show()
  //const sortedList = sortBuilder(columns.value)

  let queryOptions = {}

  if (rowsPerPage > 0) {
    queryOptions['limit'] = rowsPerPage
    queryOptions.page = page
  }

  const result = await find(routeName, queryOptions)
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

        showModal.value.message = `Do you want to delete <b>${selected.value[0].name}</b> ledger ?`

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

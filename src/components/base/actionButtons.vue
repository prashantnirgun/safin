<template>
  <div>
    <q-btn
      v-if="isCreate"
      round
      color="primary"
      icon="add"
      no-caps
      class="q-mr-xs"
      @click="doAction('create')"
    >
      <Tooltip>Add New Record</Tooltip>
    </q-btn>
    <q-btn
      v-if="isUpdate"
      round
      color="amber"
      icon="edit"
      no-caps
      class="q-mr-xs"
      @click="doAction('update')"
    >
      <Tooltip>Edit Selcted Record</Tooltip>
    </q-btn>
    <q-btn
      v-if="isDelete"
      round
      color="deep-orange"
      icon="delete"
      no-caps
      class="q-mr-xs"
      @click="doAction('delete')"
    >
      <Tooltip>Delete Selected Rows</Tooltip>
    </q-btn>
    <q-btn
      v-if="isExcel"
      round
      color="primary"
      icon="archive"
      no-caps
      class="q-mr-xs gt-sm"
      @click="doAction('excel')"
    >
      <Tooltip>Excel Report</Tooltip>
    </q-btn>

    <q-btn
      v-if="isSearch"
      round
      color="purple"
      icon="search"
      no-caps
      class="q-mr-xs"
      @click="doAction('search')"
    >
      <Tooltip>Search Rows</Tooltip>
    </q-btn>
    <q-btn
      v-if="isVisible"
      round
      color="positive"
      icon="visibility"
      no-caps
      class="q-mr-xs"
      @click="doAction('visible')"
    >
      <Tooltip>Show / Hide columns</Tooltip>
    </q-btn>
    <q-btn
      v-if="isSort"
      round
      color="negative"
      icon="sort"
      no-caps
      class="q-mr-xs"
      @click="doAction('sort')"
    >
      <Tooltip>Sort Rows</Tooltip>
    </q-btn>

    <q-btn
      v-if="isSelectAll"
      round
      color="info"
      icon="fullscreen"
      no-caps
      @click="doAction('selectAll')"
    >
      <Tooltip>Full Screen</Tooltip>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'
import baseTooltip from 'components/base/baseTooltip.vue'
export default defineComponent({
  name: 'ActionButtons',
  components: {
    Tooltip: baseTooltip,
  },
  props: {
    isCreate: {
      type: Boolean,
      default: true,
    },
    isUpdate: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isExcel: {
      type: Boolean,
      default: false,
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    isSort: {
      type: Boolean,
      default: false,
    },
    isSelectAll: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['buttonAction'],
  setup(prop, { emit }) {
    const doAction = (action) => {
      emit('buttonAction', action)
    }
    return { ...toRefs(prop), doAction }
  },
})
</script>

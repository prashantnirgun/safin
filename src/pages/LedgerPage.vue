<template>
  <q-page padding class="justify-center">
    <div>
      <Ledger-List />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import LedgerList from 'src/components/ledger/LedgerList.vue'
//import AddressList from 'components/admin/address/AddressList.vue'
//import BankList from 'components/admin/bank/BankList.vue'
defineOptions({
  name: 'LedgerPage',
})

const tab = ref('ledger')
const general_ledger_id = ref()

const getGeneralLedger = (id) => {
  general_ledger_id.value = id
}
</script>

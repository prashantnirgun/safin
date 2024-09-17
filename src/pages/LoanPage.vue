<template>
  <q-page padding class="justify-center">
    <div>
      <q-tabs v-model="tab" no-caps inline-label class="text-indigo">
        <q-tab name="list" icon="view_list" :label="`${loanType} List`" />
        <q-tab name="detail" icon="article" label="Detail" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="list">
          <Loan-List :loanType="loanType" />
        </q-tab-panel>
        <q-tab-panel name="detail">
          <Loan-Detail-List />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import LoanList from 'components/loan/LoanList.vue'
import LoanDetailList from 'components/loan/LoanDetailList.vue'
import useCommon from 'src/composable/useCommon'
//import AddressList from 'components/admin/address/AddressList.vue'
//import BankList from 'components/admin/bank/BankList.vue'
defineOptions({
  name: 'LoanPage',
})
const { capitalise } = useCommon()

const tab = ref('list')
const general_ledger_id = ref()

const route = useRoute()
const loanType = ref(capitalise(route.name))
onUpdated(() => {
  loanType.value = capitalise(route.name)
})

const getGeneralLedger = (id) => {
  general_ledger_id.value = id
}
</script>

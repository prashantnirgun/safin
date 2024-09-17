<template>
  <q-page padding class="justify-center">
    <div>
      <q-tabs v-model="tab" no-caps inline-label class="text-indigo">
        <q-tab name="list" icon="view_list" label="Voucher List" />
        <q-tab name="detail" icon="article" label="Detail" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="list">
          <!-- <Loan-List :loanType="loanType" /> -->
          <div>Voucher list here</div>
        </q-tab-panel>
        <q-tab-panel name="detail">
          <Voucher-Detail />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
//import LoanList from 'components/loan/LoanList.vue'
import VoucherDetail from 'components/voucher/VoucherDetail.vue'
//import useCommon from 'src/composable/useCommon'
//import AddressList from 'components/admin/address/AddressList.vue'
//import BankList from 'components/admin/bank/BankList.vue'
defineOptions({
  name: 'VoucherPage',
})

const tab = ref('list')
</script>

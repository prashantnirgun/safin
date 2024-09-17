<template>
  <div class="row justify-center q-my-md">
    <div class="text-h4">Voucher Detail</div>
    <q-space />
    <q-select
      v-model="voucherTypeId"
      outlined
      dense
      :options="voucherTypeList"
      label="Voucher Type"
      emit-value
      map-options
      option-dense
      option-value="_id"
      option-label="voucherTypeName"
      class="col-2 q-mr-xs"
    />
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
    <div class="row column col-12"></div>
    <Receipt-Voucher />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

//local
//import { yesNoList } from 'src/config/optionValues'

//component
import ActionButtons from 'components/base/actionButtons.vue'
import ReceiptVoucher from 'components/voucher/ReceiptVoucher.vue'

//composable
import useVoucherType from 'components/voucherType/useVoucherType'

defineOptions({
  name: 'VoucherDetail',
})
const voucherTypeList = ref([])
const voucherTypeId = ref()
const { getVoucherTypeList } = useVoucherType()

onMounted(async () => {
  voucherTypeList.value = await getVoucherTypeList()
  if (voucherTypeList.value.length) {
    voucherTypeId.value = voucherTypeList.value[0]._id
  }
})

const doAction = () => {}
</script>

<style lang="scss" scoped></style>

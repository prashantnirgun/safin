import { find } from 'boot/axios'
//import { useGlobalStore } from 'src/stores/global'

export default () => {
  //const global = useGlobalStore()
  const routeName = 'voucher-types'

  const getVoucherTypeList = async () => {
    const result = await find(routeName, {
      sort: 'voucherTypeName',
    })
    return result.data
  }

  return {
    getVoucherTypeList,
  }
}

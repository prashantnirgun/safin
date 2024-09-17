import { find } from 'boot/axios'
//import { useGlobalStore } from 'src/stores/global'

export default () => {
  //const global = useGlobalStore()
  const routeName = 'ledgers'

  const getLedgerList = async () => {
    const result = await find(routeName, {
      select: '_id, ledgerName, isBroker',
      sort: 'ledgerName',
      //      branch_id: global.getBranchId,
      //$paginate: false,
    })
    return result.data.data
  }

  const ledgerSearch = (val, update, list, options) => {
    if (val === '') {
      update(() => {
        options.value = list.value
      })
      return
    }

    update(() => {
      const needle = val.toLowerCase()

      options.value = list.value.filter(
        (v) => v.ledgerName.toLowerCase().indexOf(needle) > -1
      )
    })
  }

  return {
    getLedgerList,
    ledgerSearch,
  }
}

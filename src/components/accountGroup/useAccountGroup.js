import { find } from 'boot/axios'
import { useGlobalStore } from 'src/stores/global'

export default () => {
  const global = useGlobalStore()
  const routeName = 'account-groups'

  const getAccountGroupList = async () => {
    const result = await find(routeName, {
      select: '_id, accountGroupName',
      sort: 'accountGroupName',
      //      branch_id: global.getBranchId,
      //$paginate: false,
    })
    return result.data
  }

  const getLedgerList = async () => {
    const result = await find(routeName, {
      $joinRelation: '[accountGroups]',
      $select: [
        'general_ledgers.id',
        'general_ledger_name',
        'account_group_name',
        'group_type',
        'parent',
        'serial_no',
      ],
      '$sort[general_ledger_name]': 1,
      'general_ledgers.branch_id': global.getBranchId,
      $paginate: false,
    })

    return result.data
  }

  const accountGroupSearch = (val, update, list, options) => {
    if (val === '') {
      update(() => {
        options.value = list.value
      })
      return
    }

    update(() => {
      const needle = val.toLowerCase()

      options.value = list.value.filter(
        (v) => v.accountGroupName.toLowerCase().indexOf(needle) > -1
      )
    })
  }

  const uniqueGeneralLedger = async (value, id) => {
    const queryOptions = {
      'branch_id[$eq]': global.getBranchId,
      $select: ['id', 'general_legder_name'],
      'general_legder_name[$eq]': value.trim(),
      'id[$ne]': id,
    }
    const result = await find(routeName, queryOptions)
    return result.data.total === 0
  }

  return {
    getAccountGroupList,
    uniqueGeneralLedger,
    getLedgerList,
    accountGroupSearch,
  }
}

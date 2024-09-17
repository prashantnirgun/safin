import { find } from 'boot/axios'
//import { useGlobalStore } from 'src/stores/global'

export default () => {
  //const global = useGlobalStore()
  const routeName = 'ledgers'

  const getList = () => {
    const data = [
      {
        id: 1,
        voucherDate: '2024-08-08',
        ledger: 'Cash',
        narration: 'Loan issued',
        dr: 0,
        cr: 100000.0,
      },
      {
        id: 2,
        voucherDate: '2024-08-08',
        ledger: 'Interest',
        narration: 'Interest Charged',
        dr: 0,
        cr: 8000.0,
      },
      {
        id: 2,
        voucherDate: '2024-08-08',
        ledger: 'Cash',
        narration: 'Interest received',
        dr: 8000,
        cr: 0.0,
      },
      {
        id: 2,
        voucherDate: '2024-11-08',
        ledger: 'Interest',
        narration: 'Interest Charged',
        dr: 0,
        cr: 8000.0,
      },
      {
        id: 2,
        voucherDate: '2024-11-08',
        ledger: 'Cash',
        narration: 'Interest received',
        dr: 8000,
        cr: 0.0,
      },
      {
        id: 3,
        voucherDate: '2025-05-08',
        ledger: 'Cash',
        narration: 'Quarterly EMI Pricipal 6,500 + Int. 3,500',
        dr: 100000,
        cr: 0.0,
      },
    ]
    return data
  }

  return {
    getList,
  }
}

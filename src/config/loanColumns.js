import { date } from 'quasar'
import {
  formatedDateTime,
  dt2IST,
  formatNumber,
  formatCurrency,
} from 'src/services/Validation'

export const LoanColumns = [
  {
    name: 'documentId',
    required: true,
    label: 'Id',
    align: 'right',
    field: 'documentId',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'partyId',
    required: true,
    label: 'Party Name',
    align: 'left',
    field: (row) => row.partyId.ledgerName,
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'brokerId',
    required: true,
    label: 'Broker Name',
    align: 'left',
    field: (row) => row.brokerId.ledgerName,
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'sanctionedDate',
    required: true,
    label: 'Sanction',
    align: 'left',
    field: 'sanctionedDate',
    format: (val) => date.formatDate(new Date(val), 'DD-MM-YYYY'),
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  // {
  //   name: 'maturityDate',
  //   label: 'Maturity',
  //   align: 'left',
  //   field: 'maturityDate',
  //   format: (val) => date.formatDate(new Date(val), 'DD-MM-YYYY'),
  //   sortable: true,
  //   display: { visible: true, index: 2 },
  //   sort: { order: '1', index: 0 },
  // },
  {
    name: 'principalAmount',
    label: 'Principal',
    align: 'right',
    field: 'principalAmount',
    format: (value) => formatCurrency(value),
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
  {
    name: 'maturityAmount',
    label: 'Maturity Amt',
    align: 'right',
    field: 'maturityAmount',
    format: (value) => formatCurrency(value),
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
  {
    name: 'loanStatus',
    label: 'Status',
    align: 'left',
    field: 'loanStatus',
    sortable: true,
    display: { visible: true, index: 0 },
  },
]

export const DepositColumns = [
  {
    name: 'documentId',
    required: true,
    label: 'Id',
    align: 'right',
    field: 'documentId',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'partyId',
    required: true,
    label: 'Party Name',
    align: 'left',
    field: (row) => row.partyId.ledgerName,
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'sanctionedDate',
    required: true,
    label: 'Sanction',
    align: 'left',
    field: 'sanctionedDate',
    format: (val) => date.formatDate(new Date(val), 'DD-MM-YYYY'),
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'maturityDate',
    label: 'Maturity',
    align: 'left',
    field: 'maturityDate',
    format: (val) => date.formatDate(new Date(val), 'DD-MM-YYYY'),
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'principalAmount',
    label: 'Principal',
    align: 'right',
    field: 'principalAmount',
    format: (value) => formatCurrency(value),
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
  {
    name: 'maturityAmount',
    label: 'Maturity Amt',
    align: 'right',
    field: 'maturityAmount',
    format: (value) => formatCurrency(value),
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
  {
    name: 'loanStatus',
    label: 'Status',
    align: 'left',
    field: 'loanStatus',
    sortable: true,
    display: { visible: true, index: 0 },
  },
]

export const LedgerColumns = [
  {
    name: 'voucherDate',
    required: true,
    label: 'Date',
    align: 'left',
    field: 'voucherDate',
    format: (val) => date.formatDate(new Date(val), 'DD-MM-YYYY'),
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'ledger',
    required: true,
    label: 'Ledger Name',
    align: 'left',
    field: 'ledger',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'narration',
    required: true,
    label: 'Narration',
    align: 'left',
    field: 'narration',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },

  {
    name: 'dr',
    label: 'Debit Amt.',
    align: 'right',
    field: 'dr',
    format: (value) => formatCurrency(value),
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
  {
    name: 'cr',
    label: 'Credit Amt.',
    align: 'right',
    field: 'cr',
    format: (value) => formatCurrency(value),
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
]

export const ReceiptColumns = [
  {
    name: 'ledgerId',
    required: true,
    label: 'Ledger Name',
    align: 'left',
    field: 'ledgerId',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'debitCredit',
    required: true,
    label: 'Narration',
    align: 'left',
    field: 'debitCredit',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },

  {
    name: 'debit',
    label: 'Debit Amt.',
    align: 'right',
    field: 'debit',
    format: (value) => formatCurrency(value),
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
  {
    name: 'credit',
    label: 'Credit Amt.',
    align: 'right',
    field: 'credit',
    format: (value) => formatCurrency(value),
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
  {
    name: 'referenceNo',
    label: 'Credit Amt.',
    align: 'right',
    field: 'referenceNo',
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
]

export const SchemeColumns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'schemeType',
    required: true,
    label: 'Scheme Type',
    align: 'left',
    field: 'schemeType',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'rateOfInterest',
    label: 'Rate of Int.',
    align: 'right',
    field: 'rateOfInterest',
    sortable: true,
    display: { visible: true, index: 0 },
    summaryRow: { method: 'sum', decimal: 0 },
  },
  {
    name: 'loanLedger',
    required: true,
    label: 'Loan Ledger',
    align: 'left',
    field: (row) => row.loanLedger.ledgerName,
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'interestLedger',
    required: true,
    label: 'Interest Ledger',
    align: 'left',
    field: (row) => row.interestLedger.ledgerName,
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
]

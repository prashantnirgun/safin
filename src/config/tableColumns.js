export const voucherTypeColumns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    display: { visible: true, index: 0 },
    sortable: true,
    sort: { order: '-1', index: 1 },
  },
  {
    name: 'voucher_type_name',
    label: 'Voucher Type Name',
    align: 'left',
    field: 'voucher_type_name',
    required: true,
    display: { visible: true, index: 0 },
    sortable: false,
    sort: { order: '1', index: 0 },
  },
  {
    name: 'is_statutory',
    label: 'Statutory',
    align: 'left',
    field: 'is_statutory',
    sortable: false,
    display: { visible: true, index: 1 },
    sort: { order: '-1', index: 0 },
  },
  {
    name: 'starting_no',
    label: 'Starting No',
    align: 'left',
    field: 'starting_no',
    sortable: false,
    display: { visible: true, index: 1 },
    sort: { order: '-1', index: 0 },
  },
  {
    name: 'prefix',
    label: 'Prefix',
    align: 'left',
    field: 'prefix',
    sortable: false,
    display: { visible: false, index: 1 },
  },
  {
    name: 'suffix',
    label: 'Suffix',
    align: 'left',
    field: 'suffix',
    sortable: false,
    display: { visible: false, index: 1 },
  },
  {
    name: 'primary_type',
    label: 'Primary Type',
    align: 'left',
    field: 'primary_type',
    required: true,
    display: { visible: true, index: 0 },
    sortable: false,
    sort: { order: '-1', index: 0 },
  },
]

export const voucherClassColumns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    display: { visible: true, index: 0 },
    sortable: true,
    sort: { order: '-1', index: 1 },
  },
  {
    name: 'voucher_class_name',
    required: true,
    label: 'Voucher Class Name',
    align: 'left',
    field: 'voucher_class_name',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'voucher_type_name',
    required: true,
    label: 'Voucher Type',
    align: 'left',
    field: 'voucher_type_name',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'is_active',
    label: 'Active',
    align: 'left',
    field: 'is_active',
    sortable: true,
    display: { visible: true, index: 1 },
    sort: { order: '-1', index: 0 },
  },
]

export const voucherClassDetailColumns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    display: { visible: true, index: 0 },
    sortable: true,
    sort: { order: '1', index: 1 },
  },
  {
    name: 'voucher_class_name',
    required: true,
    label: 'Voucher Class',
    align: 'left',
    field: 'voucher_class_name',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'general_ledger_name',
    required: true,
    label: 'General Ledger',
    align: 'left',
    required: true,
    field: 'general_ledger_name',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'debit_credit',
    required: true,
    label: 'Debit / Credit',
    align: 'left',
    field: 'debit_credit',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'rate',
    label: 'Rate',
    align: 'left',
    field: 'rate',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'base_column',
    required: true,
    label: 'Base Column',
    align: 'left',
    field: 'base_column',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'method',
    required: true,
    label: 'Method',
    align: 'left',
    field: 'method',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'is_active',
    label: 'Active',
    align: 'left',
    field: 'is_active',
    sortable: true,
    display: { visible: true, index: 1 },
    sort: { order: '-1', index: 0 },
  },
]

export const accountReportColumns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    display: { visible: true, index: 1 },
    sortable: true,
    sort: { order: '-1', index: 1 },
  },
  {
    name: 'account_report_name',
    required: true,
    label: 'Report Name',
    align: 'left',
    field: 'account_report_name',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
]

export const accountHeadColumns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    display: { visible: true, index: 1 },
    sortable: true,
    sort: { order: '-1', index: 1 },
  },
  {
    name: 'account_head_name',
    required: true,
    label: 'Head Name',
    align: 'left',
    field: 'account_head_name',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'parent_name',
    required: true,
    label: 'Parent',
    align: 'left',
    field: 'parent_name',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'debit_credit',
    required: true,
    label: 'Side',
    align: 'left',
    field: 'debit_credit',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
]

export const accountGroupColumns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    display: { visible: true, index: 1 },
    sortable: true,
    sort: { order: '-1', index: 1 },
  },
  {
    name: 'account_group_name',
    required: true,
    label: 'Group Name',
    align: 'left',
    field: 'account_group_name',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'account_head_name',
    required: true,
    label: 'Head Name',
    align: 'left',
    field: 'account_head_name',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'is_statutory',
    label: 'Statutory',
    align: 'left',
    field: 'is_statutory',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'serial_no',
    label: 'Display Position',
    align: 'right',
    field: 'serial_no',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 0 },
  },
]

export const LedgerColumns = [
  {
    name: 'ledgerName',
    required: true,
    label: 'Ledger Name',
    align: 'left',
    field: 'ledgerName',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'accountGroupId',
    required: true,
    label: 'Group Name',
    align: 'left',
    field: (row) => row.accountGroupId.accountGroupName,
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'alias',
    label: 'Alias',
    align: 'left',
    field: (row) => row.alias,
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'isBroker',
    label: 'Broker',
    align: 'left',
    field: 'isBroker',
    sortable: true,
    display: { visible: true, index: 0 },
  },
]

export const addressColumns = [
  {
    name: 'address_type',
    required: true,
    label: 'Place Name',
    align: 'left',
    field: 'address_type',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 2 },
  },
  {
    name: 'contact_name',
    required: true,
    label: 'Contact Name',
    align: 'left',
    field: 'contact_name',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'contact_no',
    label: 'Contact No',
    align: 'left',
    field: 'contact_no',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'is_default',
    label: 'Default',
    align: 'left',
    field: 'is_default',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 1 },
  },
]

export const bankColumns = [
  {
    name: 'bank_name',
    required: true,
    label: 'Bank Name',
    align: 'left',
    field: 'bank_name',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 2 },
  },
  {
    name: 'account_no',
    required: true,
    label: 'Account No',
    align: 'left',
    field: 'account_no',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'ifsc',
    label: 'IFSC',
    align: 'left',
    field: 'ifsc',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'is_default',
    label: 'Default',
    align: 'left',
    field: 'is_default',
    sortable: true,
    display: { visible: true, index: 0 },
    sort: { order: '1', index: 1 },
  },
  {
    name: 'account_type',
    label: 'Account Type',
    align: 'left',
    field: 'account_type',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
]

export const userColumns = [
  {
    name: 'firstName',
    required: true,
    label: 'First Name',
    align: 'left',
    field: 'firstName',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 2 },
  },
  {
    name: 'lastName',
    required: true,
    label: 'Last Name',
    align: 'left',
    field: 'lastName',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'userName',
    required: true,
    label: 'User Name',
    align: 'left',
    field: 'userName',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'phone',
    required: true,
    label: 'Mobile',
    align: 'left',
    field: 'phone',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
  {
    name: 'isVerified',
    required: true,
    label: 'Verified',
    align: 'left',
    field: 'isVerified',
    sortable: true,
    display: { visible: true, index: 2 },
    sort: { order: '1', index: 0 },
  },
]

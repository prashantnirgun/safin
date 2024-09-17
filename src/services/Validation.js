import { date } from 'quasar'
import moment from 'moment'
/*
//Note : do not use rules in quotes
<q-input v-model="user.full_name" :rules="[required]" />
*/
const emailPattern =
  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

export const emailRule = (val) =>
  emailPattern.test(val) || 'Please enter a valid email address'

export const required = (val) => !!val || 'Field is required'

export const positiveNumber = (val) =>
  (!!val && parseInt(val) > 0) || 'Value should be positive'

export const positiveDecimal = (val) =>
  (!!val && parseInt(val) > 0) || 'Value should be positive'

export const isNumber = (val) => Number(val) == val || 'Enter Numeric Value'

export const isPhoneNumber = (val) => {
  let value = val
  if (typeof val === 'number') {
    value = val.toString()
  }
  return (
    (Number(value) == value && value.length === 10) ||
    'Enter valid mobile number'
  )
}

export const isDateValid = (v) => {
  if (v == null || v.length < 10) {
    return 'Invalid Date'
  }
  // ISO standard YYYY-MM-DD
  // date is nonstandard
  // attempt to standerdize it before validation
  const standardizedDate = v.split('-').reverse().join('-')
  // console.log('date', Quasar.utils.date.formatDate(standardizedDate, 'MM/DD/YYYY'))
  //return Quasar.utils.date.isValid(standardizedDate) || 'Invalid Date';
  return date.isValid(standardizedDate) || 'Invalid Date'
}

export const isDateTimeValid = (v) => {
  if (v == null || v.length < 13) {
    return 'Invalid Date'
  }

  return moment(v).isValid() || 'Invalid Date'
}

export const dmy2ymd = (v) => {
  const value = new Date(v.replace(/(\d+[-])(\d+[-])/, '$2$1'))
  return moment(value).format('YYYY-MM-DD')
}

export const formatedDateTime = (val, format = 'DD-MM-YYYY') => {
  // console.log(typeof val)
  const dt = new Date(val)
  return moment(dt).format(format)
}
export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-IN').format(value)
}

export const formatCurrency = (value, symbol = false) => {
  if (!!symbol) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(value)
  } else {
    return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(
      value
    )
  }
}

export const dt2IST = (val, format = 'DD-MM-YYYY hh:mm A') => {
  const dt = new Date(val)
  return moment(dt).format(format)
}

export const saveAs = (fileName, fileType, blob) => {
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob, {
    type: fileType,
  })
  link.download = fileName
  link.click()
}

import { Notify } from 'quasar'
import { useRouter } from 'vue-router'

export default function useCommon() {
  const router = useRouter()

  const goto = (argument) => {
    router.push(argument)
  }

  const showAlert = (argument) => {
    Notify.create(argument)
  }

  const utc2ist = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    return new Date(date).toLocaleDateString(undefined, options)
  }

  const isDateValid = (v) => {
    if (v == null || v.length < 10) {
      return 'Invalid Date'
    }

    const standardizedDate = v.split('-').reverse().join('-')
    return date.isValid(standardizedDate) || 'Invalid Date'
  }

  const toMySQLDate = (v) => v.toLocaleString().replaceAll('/', '-')

  const toProperCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  const sleep = async (milliseconds) => {
    await new Promise((resolve) => {
      return setTimeout(resolve, milliseconds)
    })
  }

  const toCurrency = (value, decimal = 2) => {
    switch (decimal) {
      case 0:
        return new Intl.NumberFormat('en-IN').format(value)
      default:
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        })
          .format(parseFloat(value))
          .replace('₹', '')
    }
  }

  const capitalise = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1)
  }

  const summaryColumns = (rows, columns) => {
    rows.map((row, index) => {
      const cols = Object.keys(row)
      cols.map((col) => {
        const found = columns.find((el) => el.summaryRow && el.name === col)
        if (found) {
          /*
          if (found.summaryRow.decimal) {
            found.tot = (
              index
                ? parseFloat(found.tot) + parseFloat(row[col])
                : parseFloat(row[col])
            ).toFixed(0)
          } else {
            */
          found.tot = (
            index
              ? parseInt(found.tot) + parseInt(row[col])
              : parseInt(row[col])
          ).toFixed(2)
          //).toFixed(found.summaryRow.decimal ? found.summaryRow.decimal : 0)
          //}

          //found.tot = index ? found.tot + row[col] : row[col]
          //console.log('found', col, row[col], found, index)
        }
      })
    })
  }

  return {
    showAlert,
    goto,
    utc2ist,
    isDateValid,
    toMySQLDate,
    toCurrency,
    sleep,
    toProperCase,
    capitalise,
    summaryColumns,
  }
}

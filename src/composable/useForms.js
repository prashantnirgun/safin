import { ref } from 'vue'
import { patch } from 'boot/axios'

export default () => {
  const visibleColumns = ref([])
  //const routeName = ref('')
  //const id = ref(0)
  const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10,
  })
  const updatedValue = (primary, current) => {
    const keys = Object.keys(primary)
    const data = {}
    keys.map((key) => {
      if (primary[key] !== current[key]) {
        data[key] = current[key]
      }
    })

    return data
  }

  const deletedList = (lists, key) => {
    let names = ''
    if (lists.length > 0) {
      lists.map((row) => {
        names += (names.length > 0 ? ', ' : '') + row[key]
      })
    }
    return names
  }

  const sortBuilder = (lists) => {
    let sortedList = []
    let tempList = lists.filter((row) => row.sort && row.sort.index > 0)

    tempList.sort((a, b) => a.sort.index - b.sort.index)

    tempList.map((row) => {
      if (row.sort && row.sort?.index > 0) {
        const key = `$sort[${row.name}]`
        const data = {
          [key]: row.sort.order,
        }
        sortedList.push(data)
      }
    })
    return sortedList
  }

  const whereBuilder = (lists) => {
    let expression = {}
    const columns = []
    lists.map((row) => {
      console.log(
        !row.values.includes(''),
        row.values,
        row.name,
        !row.values.includes('Select Any')
      )
      if (
        row.condition !== null &&
        row.values.length &&
        !row.values.includes('Select Any') //&&
        //!row.values.includes('')
      ) {
        let key,
          isValid = true
        switch (row.condition) {
          case 'Equal':
            console.log('inside equal')
            //expression = `${props.row.name}=${model.value}`;
            //key = row.type === 'Number' ? `${row.name}[$in][]` : `${row.name}`
            let val = row.values[0]
            if (val === null || val === '') {
              isValid = false
            } else {
              key = row.name
              expression = { [key]: val }
            }
            break
          case 'Not Equal':
            //expression = `${modelOne.value}[$ne]=${props.row.name}`;
            key = `${row.name}[$ne]`
            expression = { [key]: row.values[0] }
            break
          case 'Starting with':
            //expression = `${modelOne.value}[$like]=%${props.row.name}`;
            key = `${row.name}[$like]`
            expression = { [key]: `${row.values[0]}%` }
            break
          case 'Contains':
            //strictly it should be string
            //expression = `${modelOne.value}[$like]=%${props.row.name}%`;
            let value = row.values[0]

            value = value.trim()
            value = value.replace('+', '')

            if (value.length) {
              key = `${row.name}[$regex]`
              expression = { [key]: `${value}` }
            } else {
              isValid = false
            }
            break
          case 'Greater than':
            //expression = `${modelOne.value}[$gt]=${props.row.name}`;
            key = `${row.name}[$gt]`
            expression = { [key]: row.values[0] }
            break
          case 'Greater than equal':
            //expression = `${modelOne.value}[$gte]=${props.row.name}`;
            key = `${row.name}[$gte]`
            expression = { [key]: row.values[0] }
            break
          case 'Less than':
            key = `${row.name}[$lt]`
            expression = { [key]: row.values[0] }
            break
          case 'Less than equal':
            //expression = `${modelOne.value}[$lte]=${props.row.name}`;
            key = `${row.name}[$lte]`
            expression = { [key]: row.values[0] }
          case 'Between':
            //expression = `${modelOne.value}[$gte]=${props.row.name}&${modelOne.value}[$lte]=${props.row.name}`;
            key = `${row.name}[$gte]`
            expression = { [key]: row.values[0] }
            break
          default:
            error.value = 'Please select the condition'
            break
        }
        if (!!isValid) columns.push(expression)
      }
    })
    return columns
  }

  const booleanConditon = ref(['Select Condition', 'Equal', 'Not Equal'])
  const stringConditon = ref([
    'Select Condition',
    'Equal',
    'Not Equal',
    'Contains',
    'Starting with',
  ])
  const numberConditon = ref([
    'Select Condition',
    'Equal',
    'Greater than',
    'Greater than equal',
    'Less than',
    'Less than equal',
  ])
  const dateConditon = ref([
    'Select Condition',
    'Between',
    'Greater than',
    'Less than',
  ])

  const buildVisibleColumnList = (rows) => {
    const lists = []
    rows.map((row) => {
      if (!!row.display.visible || !!row.required) {
        const data = {
          label: row.label,
          align: row.align,
          field: row.field,
          index: row.display.index,
        }
        lists.push(data)
      } else {
        //console.log('else', row.name, !!row.required)
      }
    })
    lists.sort((a, b) => a.index - b.index)
    return lists
  }

  const updateColumnValue = async (
    routeName,
    id,
    value,
    initialValue,
    column_name
  ) => {
    try {
      if (value !== initialValue) {
        const body = {}
        body[column_name] = value
        await patch(routeName, id, body)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateColumnHandler1 = async (
    value,
    initialValue,
    column_name,
    callback
  ) => {
    /*
    await updateColumnValue(
      routeName.value,
      id.value,
      value,
      initialValue,
      column_name
    )
      */
    //console.log('paginate', pagination.value)
    //await callback({ pagination: pagination.value })
    callback()
  }

  return {
    updatedValue,
    deletedList,
    booleanConditon,
    stringConditon,
    numberConditon,
    dateConditon,
    visibleColumns,
    sortBuilder,
    whereBuilder,
    buildVisibleColumnList,
    pagination,
    updateColumnValue,
  }
}

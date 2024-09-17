<template>
  <div class="row q-mt-md">
    <q-card class="my-card">
      <q-card-section>
        <q-form class="col-6" @submit="onSubmit">
          <div class="row">
            <q-input
              v-bind="firstNameProps"
              v-model="firstName"
              label="First Name"
              class="col-6 q-pr-xs"
            ></q-input>
            <q-input
              v-bind="lastNameProps"
              v-model="lastName"
              label="Last Name"
              class="col-6 q-pr-xs"
            ></q-input>
          </div>

          <div class="row q-my-sm">
            <q-input
              v-bind="userNameProps"
              v-model="userName"
              label="User Name"
              class="col-6 q-pr-xs"
            ></q-input>
            <q-input
              v-bind="phoneProps"
              v-model="phone"
              label="Phone"
              class="col-6 q-pl-xs"
            ></q-input>
          </div>

          <div class="row">
            <q-input
              v-bind="emailProps"
              v-model="email"
              label="Email"
              class="col-12"
            ></q-input>
          </div>

          <div class="row q-mt-xs justify-end q-gutter-md">
            <q-btn :disable="!meta.valid" type="submit" color="primary">
              Submit
            </q-btn>

            <q-btn> close </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { findById, find, post, patch } from 'boot/axios'
import { toTypedSchema } from '@vee-validate/zod'
import { useQuasar } from 'quasar'

//composable
import useGeneralLedger from '../ledger/useGeneralLedger'

//local
import { schemeTypeList } from 'src/config/optionValues'

//store
import { useGlobalStore } from 'src/stores/global'

defineOptions({
  name: 'UserProfileUpdate',
})

const routeName = 'users'
const global = useGlobalStore()

const $q = useQuasar()
const { getLedgerList } = useGeneralLedger()

const schema = toTypedSchema(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
    email: z.string(),
    phone: z.string(),
  })
)

const { defineField, handleSubmit, setFieldValue, errors, meta, values } =
  useForm({
    validationSchema: schema,
  })

const quasarConfig = (state) => ({
  props: {
    error: !!state.errors[0],
    'error-message': state.errors[0],
  },
})
const [firstName, firstNameProps] = defineField('firstName', quasarConfig)
const [lastName, lastNameProps] = defineField('lastName', quasarConfig)
const [userName, userNameProps] = defineField('userName', quasarConfig)
const [email, emailProps] = defineField('email', quasarConfig)
const [phone, phoneProps] = defineField('phone', quasarConfig)

onMounted(async () => {
  $q.loading.show()

  try {
    console.log('user', global.getUserId)
    const response = await find(`${routeName}/me`)

    const keys = Object.keys(response.data)
    //console.log('data', response.data)
    keys.map((column) => {
      setFieldValue(column, response.data[column])
    })
  } catch (error) {}

  $q.loading.hide()
})

const onSubmit = handleSubmit(async (values) => {
  try {
    if (props.id.length) {
      const result = await patch(routeName, props.id, values)
    } else {
      await post(routeName, values)
    }
  } catch (error) {}
})
</script>

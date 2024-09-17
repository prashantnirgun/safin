<template>
  <q-page padding>
    <div class="absolute-center">
      <q-card class="my-class">
        <q-card-section>
          <div class="text-h6">
            <q-avatar class="">
              <img src="/images/logo.png" />
            </q-avatar>
            Register User
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 q-mb-xs">Already has account ?</div>
          <div class="">
            <router-link to="login">Sign In</router-link>
            here
          </div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="">
            <div class="row">
              <q-input
                v-bind="firstNameProps"
                v-model="firstName"
                label="Frirst Name"
                placeholder="First Name"
                class="col-6 q-pr-xs"
              />
              <q-input
                v-bind="lastNameProps"
                v-model="lastName"
                label="Last Name"
                placeholder="last Name"
                class="col-6 q-pl-xs"
              />
            </div>
            <div class="q-my-sm">
              <q-input
                v-bind="emailProps"
                v-model="email"
                label="Email"
                placeholder="email/Email/Mobile"
              />
            </div>
            <div class="row">
              <q-input
                v-bind="userNameProps"
                v-model="userName"
                label="User Name"
                placeholder="user Name"
                class="col-6 q-pr-xs"
              />
              <q-input
                v-bind="phoneProps"
                v-model="phone"
                label="phone"
                placeholder="Mobile No"
                class="col-6 q-pl-xs"
              />
            </div>
            <div class="q-my-sm">
              <q-input
                v-bind="passwordProps"
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
              >
                <template #append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="row justify-end">
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
              <q-btn color="primary" type="submit" label="Register" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { post } from 'boot/axios'

import { toTypedSchema } from '@vee-validate/zod'

import useAuth from 'src/composable/useAuth'
import useCommon from 'src/composable/useCommon'

defineOptions({
  name: 'RegisterPage',
})

const routeName = 'users'
const isPwd = ref(true)
const schema = toTypedSchema(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    userName: z.string(),
    phone: z.string(),
    password: z.string(),
  })
)
const { login } = useAuth()
const { goto, showAlert } = useCommon()

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
const [email, emailProps] = defineField('email', quasarConfig)
const [userName, userNameProps] = defineField('userName', quasarConfig)
const [phone, phoneProps] = defineField('phone', quasarConfig)
const [password, passwordProps] = defineField('password', quasarConfig)

const onReset = () => {}

const onSubmit = handleSubmit(async (values) => {
  try {
    console.log(values)
    const result = await post(routeName, values)
    showAlert({ message: 'Please check your email for confirmation!' })

    goto('/')
  } catch (error) {
    console.log(error)
  }
})
</script>
<style lang="sass" scoped>
a
  text-decoration: none


.my-class
  width: 350px
</style>

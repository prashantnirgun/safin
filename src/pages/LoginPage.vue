<template>
  <q-page padding>
    <div class="fixed-center">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">
            <q-avatar class="">
              <img src="/images/logo.png" />
            </q-avatar>
            Login
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 q-mb-xs">New here ?</div>
          <div class="">
            <router-link to="register">Signing Up</router-link>
            is easy. It only takes a few steps
          </div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div>
              <q-input
                v-bind="userNameProps"
                v-model="userName"
                label="Email"
                placeholder="email/Email/Mobile"
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
              <q-btn color="primary" type="submit" label="Login" />
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
  name: 'LoginPage',
})

const routeName = 'auth'
const isPwd = ref(true)
const schema = toTypedSchema(
  z.object({
    userName: z.string(),
    password: z.string(),
  })
)
const { login } = useAuth()
const { goto } = useCommon()

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
const [userName, userNameProps] = defineField('userName', quasarConfig)
const [password, passwordProps] = defineField('password', quasarConfig)

const onReset = () => {}

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await login(values.userName, values.password)
    if (!!result) {
      goto('/')
    }
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

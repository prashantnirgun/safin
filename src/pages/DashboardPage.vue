<template>
  <q-page padding>
    <div class="row">
      <div class="text-h5 text-bold">Welcome Amol</div>
      <q-space />
      <div class="">
        <q-btn unelevated rounded color="primary">
          <q-icon left name="calendar_month" />
          <div>{{ today }}</div>
        </q-btn>
      </div>
    </div>
    <div class="row text-body text-weight-light">
      All systems are running smoothly! You have
      <span class="text-blue">&nbsp; 3 unread alerts!</span>
    </div>
    <div class="row">
      <div class="row q-mt-sm">
        <div class="col-6 col-12-sm">
          <q-card class="my-card">
            <img src="/images/people.svg" />
          </q-card>
        </div>
        <div class="col-6 col-12-sm row text-white">
          <div class="col-6 q-pa-sm">
            <q-card bordered class="col-6 q-pa-md bg-blue-6">
              <q-card-section>
                <div class="text-h6">Yearly</div>
                <div class="text-subtitle2">{{ statistics.yearly }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6 q-pa-sm">
            <q-card bordered class="col-6 q-pa-md bg-indigo-6">
              <q-card-section>
                <div class="text-h6">Monthly</div>
                <div class="text-subtitle2">{{ statistics.monthly }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6 q-pa-sm">
            <q-card bordered class="col-6 q-pa-md bg-teal-6">
              <q-card-section>
                <div class="text-h6">Daily</div>
                <div class="text-subtitle2">{{ statistics.daily }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6 q-pa-sm">
            <q-card bordered class="col-6 q-pa-md bg-deep-orange-4">
              <q-card-section>
                <div class="text-h6">Total</div>
                <div class="text-subtitle2">
                  Debtors : {{ statistics.debtors }}
                </div>
                <div class="text-subtitle2">
                  Creditors : {{ statistics.creditors }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import moment from 'moment'
import { formatCurrency } from 'src/services/Validation'
defineOptions({
  name: 'DashbaordPage',
})

const statistics = reactive({
  yearly: formatCurrency(457833, true),
  monthly: formatCurrency(78789, true),
  daily: formatCurrency(13000, true),
  debtors: formatCurrency(13000, true),
  creditors: formatCurrency(7000, true),
})

const today = moment(new Date()).format('DD-MM-YYYY')
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 10px;
}
</style>

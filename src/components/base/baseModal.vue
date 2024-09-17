<template>
  <q-dialog v-model="showModal" seamless @update="listenModal">
    <q-card :style="dialogStyle" style="resize: both">
      <q-bar
        v-touch-pan.mouse="onPan"
        class="bg-primary text-white cursor-pointer"
      >
        <q-icon :name="icon" />
        <div>{{ title }}</div>
        <q-space />
        <q-btn dense flat round icon="close" @click="close(false)">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'search',
    },
    size: {
      type: String,
      default: '500px',
    },
  },
  emits: ['close', 'open'],
  setup(props, { emit }) {
    const dialogPos = ref({
      x: 0,
      y: 0,
    })
    const listenModal = (val) => {
      //console.log("listing", val);
    }
    const close = (payload) => {
      emit('close', payload)
    }
    const open = () => {
      emit('open')
    }
    const onPan = (evt) => {
      dialogPos.value.x += evt.delta.x
      dialogPos.value.y += evt.delta.y
    }
    const showModal = computed(() => props.show)
    const dialogStyle = computed(() => {
      return {
        transform: `translate(${dialogPos.value.x}px, ${dialogPos.value.y}px)`,
        width: props.size,
      }
    })
    return {
      dialogPos,
      listenModal,
      close,
      open,
      onPan,
      showModal,
      dialogStyle,
    }
  },
})
</script>

<style scoped></style>

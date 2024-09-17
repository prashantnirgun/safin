<!-- <template>
  <div>
    <q-list>
      <div v-for="item in options" :key="item.label">
        <q-expansion-item
          v-if="item.children"
          v-show="isShowHide(item)"
          :icon="item.icon"
          :label="item.label"
          expand-icon="arrow_circle_down"
          expanded-icon="arrow_circle_up"
          group="somegroup"
          header-class="text-green"
          @click="handleClick"
        >
          <Sidebar :options="item.children" class="q-ml-lg" />
        </q-expansion-item>
        <q-item v-else v-show="isShowHide(item)" clickable :to="item.to">
          <q-item-section avatar>
            <q-icon color="primary" :name="item.icon" />
          </q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template> -->

<template>
  <div>
    <q-list>
      <div v-for="item in options" :key="item.label">
        <q-expansion-item
          v-if="item.children"
          v-show="isShowHide(item)"
          :icon="item.icon"
          :label="item.label"
          expand-icon="arrow_circle_down"
          expanded-icon="arrow_circle_up"
          group="somegroup"
          header-class="text-green"
          @click="handleClick"
        >
          <Sidebar :options="item.children" class="q-ml-lg" />
        </q-expansion-item>
        <q-item v-else v-show="isShowHide(item)" clickable :to="item.to">
          <q-item-section avatar>
            <q-icon color="primary" :name="item.icon" />
          </q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
//import { useGlobalStore } from 'src/stores/global'

export default defineComponent({
  name: 'SidebarDrawer',
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    minSidebar: {
      type: Boolean,
    },
  },
  emits: ['expandBar'],
  setup(props, { emit }) {
    //const global = useGlobalStore()
    const isLoggedIn = true //global.isLoggedIn
    const isAdmin = true

    const handleClick = () => {
      if (props.minSidebar) {
        emit('expandBar')
      }
    }
    const isShowHide = (item) => {
      const result = !!item.isAdmin
        ? !!item.isAdmin === isAdmin
        : !!item.loggedIn
        ? !!item.loggedIn === isLoggedIn
        : true
      return result
      //}
    }
    return { ...props, handleClick, isLoggedIn, isAdmin, isShowHide }
  },
})
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>

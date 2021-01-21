<template>
  <div
    :class="classes"
    v-click-outside="outsideClickHandler"
  >
    <v-icon
      color="white"
      class="rt-right-panel__btn"
      size="18"
      @click="togglePanel"
      clickable
    >
      {{ `fas fa-angle-double-${isActive ? 'right':'left'}` }}
    </v-icon>
    <div class="rt-right-panel__slot">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'

  export default defineComponent({
    name: 'rt-swims-panel',
    props: {
      isActive: Boolean
    },

    setup() {
      const isActive = ref(true)

      const classes = computed(() => {
        return {
          'rt-right-panel': true,
          'rt-right-panel--expanded': isActive.value,
          'rt-right-panel--compressed': !isActive.value,
        }
      })

      const togglePanel = () => {
        isActive.value = !isActive.value
      }

      const outsideClickHandler = computed(() => {
        return isActive.value ? {
          handler: togglePanel,
          closeConditional: false
        } : undefined
      })

      return {
        isActive,
        outsideClickHandler,
        classes,
        togglePanel,
      }
    }
  })
</script>
<style lang="scss">
  @import "RtRightPanel";
</style>

<template>
  <div class="auth-layout">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'auth-layout',
})
</script>

<style lang="scss">
  .auth-layout {
    width: 100%;
    height: 100%;
  }
</style>

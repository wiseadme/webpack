<template>
  <div class="app-layout">
    <app-header/>
    <app-sidebar/>
    <app-dialog/>
    <div class="route-wrap">
      <router-view v-slot="{Component}">
        <transition name="fade" mode="in-out">
          <Suspense>
            <template #default>
              <component :is="Component"/>
            </template>
            <template #fallback>
              <span style="position: absolute; top: 10px; left: 10px; ">loading...</span>
            </template>
          </Suspense>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  import { AppHeader } from '@/components/AppHeader'
  import { AppSidebar } from '@/components/AppSidebar'

  const AppDialog = defineAsyncComponent(() => import('@/components/AppDialog'))

  export default defineComponent({
    name: 'table-layout',
    components: {
      AppHeader,
      AppSidebar,
      AppDialog
    }
  })
</script>

<style lang="scss">
  @import "AppLayout";
</style>

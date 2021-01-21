<template>
  <div class="orders-map-page">
    <AppMap :order="mainOrder"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { AppMap } from '@/components/AppMap'
import { useState, useActions } from '@/effects/use-store'

export default defineComponent({
  name: 'OrdersMapPage',
  components: {
    AppMap
  },

  async setup() {
    const $store = useStore()
    const $router = useRouter()

    const orderDocID = $router.currentRoute.value.params.id
    let mainOrder: any = null

    const { fetchOrderById } = useActions($store, store.Module.ORDER, {
      fetchOrderById: action.Types.FETCH_ORDER,
    })

    const currentOrder = computed(() => {
      return useState($store, store.Module.ORDER).orders.find(it => {
        return it.documentId === orderDocID
      })
    })

    if (currentOrder.value) {
      mainOrder = currentOrder.value
    } else {
      const { order } = await fetchOrderById({
        params: {
          documentId: $router.currentRoute.value.params.id
        }
      })
      mainOrder = order
    }

    return {
      mainOrder
    }
  }
})
</script>

<style lang="scss">
.orders-map-page {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
  z-index: 10;
}
</style>

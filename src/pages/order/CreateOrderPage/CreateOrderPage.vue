<template>
  <div class="orders-page">
    <AppOrderForm
      v-model:address="order.address"
      v-model:type="order.type"
      v-model:text="order.text"
      v-model:price="order.price"
      v-model:weight="order.weight"
      v-model:dimensions="order.dimensions"
      title="Форма заказа"
      @save="sendOrder"
    />
  </div>
</template>

<script lang="ts">
  import { reactive, watch, computed, defineComponent } from 'vue'

  // Effects
  import { useActions, useState } from '@/effects/use-store'
  import { useDialog } from '@/effects/use-dialog'

  // Services
  import { Icons } from '@/services/fa-icons'

  // Types
  import { Order } from '@/types'

  // Components
  import { AppOrderForm } from '@/components/AppOrderForm'

  // Schemes
  import orderTypes from '@/schemes/order-types.json'

  export default defineComponent({
    name: 'CreateOrder',
    components: {
      AppOrderForm
    },
    async setup() {
      const $store = useStore()
      const { dialog } = useDialog()

      const order: Order = reactive({
        user: '',
        type: {
          orderType: 0,
          title: ''
        },
        address: [],
        text: '',
        price: 0,
        weight: 0,
        dimensions: {
          width: 0,
          height: 0,
          length: 0
        }
      })

      const { createOrder } = useActions(
        $store, store.Module.ORDER,
        {
          createOrder: action.Types.CREATE_ORDER,
        }
      )

      watch(() => order.dimensions, to => console.log(to, 'order form page'))

      const user = computed(() => {
        return useState($store, store.Module.AUTH).user
      })

      function createNewOrder() {
        return createOrder(order)
      }

      function sendOrder() {
        if (order.type?.orderType === 1) delete order.weight

        order.user = user.value._id

        createNewOrder()
          .then(() => {
            dialog.show({
              header: 'Успех!',
              type: 'success',
              content: 'Ваш заказ успешно создан!',
              actions: [
                {
                  type: 'success',
                  title: 'понятно',
                  handler: () => dialog.close()
                }
              ]
            })
          })
      }

      return {
        sendOrder,
        order,
        orderTypes,
        Icons
      }
    }
  })
</script>

<style lang="scss">
  @import "CreateOrderPage";
</style>

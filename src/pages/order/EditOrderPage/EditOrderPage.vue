<template>
  <div class="edit-order-page">
    <AppOrderForm
      v-model:address="orderForEdit.address"
      v-model:type="orderForEdit.type"
      v-model:text="orderForEdit.text"
      v-model:price="orderForEdit.price"
      v-model:weight="orderForEdit.weight"
      v-model:dimensions="orderForEdit.dimensions"
      :is-editor-mode="true"
      title="Редактирование заказа"
      @save="save"
    />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'

  import { useActions } from '@/effects/use-store'
  import { AppOrderForm } from '@/components/AppOrderForm'

  // import { useDialog } from '@/effects/use-dialog'

  // import { copyWithoutLink } from '@/helpers'

  import { Order } from '@/types'

  // TODO create the method which is will compare the state of object before and after update

  export default defineComponent({
    name: 'EditOrderPage',
    components: {
      AppOrderForm
    },
    async setup() {
      const $store = useStore()
      const $router = useRouter()

      // const { dialog } = useDialog()

      const { fetchOrderById, updateOrder } = useActions($store, store.Module.ORDER, {
        fetchOrderById: action.Types.FETCH_ORDER,
        updateOrder: action.Types.UPDATE_ORDER
      })

      const orderForEdit = ref<Order | null>(null)

      await fetchOrderById({
        params: {
          documentId: $router.currentRoute.value.params.id
        }
      })
        .then(({ order }) => {
          orderForEdit.value = order
        })

      function save(order) {
        console.log(order, updateOrder)
        // updateOrder(orderForEdit)
        //   .then(() => {
        //     dialog.show({
        //       header: 'Операция выполнена',
        //       type: 'success',
        //       content: `Заказ за номером ${ orderForEdit.value!.documentId } изменен успешно.`,
        //       actions: [
        //         {
        //           type: 'success',
        //           title: 'Понятно',
        //           handler: () => {
        //             dialog.close()
        //             $router.back(-1)
        //           }
        //         }
        //       ]
        //     })
        //   })
      }

      return {
        orderForEdit,
        save
      }
    }
  })
</script>

<style style="scss">
  .edit-order-page {
    padding: 10px;
  }
</style>

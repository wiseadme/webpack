<template>
  <div class="my-orders-page">
    <v-data-table
      :cols="cols"
      :rows="rows"
      class="elevation-5"
      align="start"
      numbered
    >
      <template v-slot:status="{row, format}">
        <div
          :class="[status[row.status].color, 'white--text']"
          style="border-radius: 10px; padding: 3px 10px 8px 10px;"
        >
          {{ format(row) }}
        </div>
      </template>
      <template v-slot:actions="{ row }">
        <v-icon
          :icon="Icons.$file"
          color="primary"
          size="16"
          clickable
          @click="openOrderDocument(row)"
        />
        <v-icon
          :icon="Icons.$map"
          color="primary"
          size="16"
          clickable
          @click="openRouteMap(row)"
        />
      </template>

    </v-data-table>
    <v-modal
      v-model="openDocument"
      transition="scale-in"
      overlay
    >
      <v-card width="550">
        <div class="order-wrap">
          <app-order-card v-if="document" :order="document"/>
          <v-button
            color="primary"
            width="40"
            elevation="3"
            style="margin: 20px 0 20px 20px;"
            @click="openOrderEditor(document)"
          >
            <v-icon :icon="Icons.$pen" color="white" size="20"/>
          </v-button>
          <v-button
            color="warning"
            width="40"
            elevation="3"
            style="margin-left: 10px;"
            @click="openDocument = false"
          >
            <v-icon :icon="Icons.$close" color="white" size="20"/>
          </v-button>
        </div>
      </v-card>
    </v-modal>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, computed } from 'vue'
  import { useActions, useState } from '@/effects/use-store'

  import AppOrderCard from '@/components/AppOrderCard'

  import { Order, TableColumn } from '@/types'

  import { Icons } from '@/services/fa-icons'
  import { status } from '@/services/order-statuses'

  export default defineComponent({
    name: 'MyOrders',
    components: {
      AppOrderCard
    },

    async setup() {
      const $store = useStore()
      const $router = useRouter()

      const openDocument = ref<boolean>(false)
      const rows = ref<Order[]>([])
      const cols = ref<TableColumn[]>([
        {
          key: 'type',
          title: 'Тип заказа',
          sortable: true,
          filterable: true,
          resizeable: true,
          width: 200,
          format: row => row?.type?.title
        },
        {
          key: 'documentId',
          title: 'Номер',
          sortable: true,
          filterable: true,
          resizeable: true,
          width: 200,
        },
        {
          key: 'date',
          title: 'Дата',
          sortable: true,
          filterable: true,
          resizeable: true,
          width: 200,
          format: row => new Date(row.date).toLocaleString()
        },
        {
          key: 'price',
          title: 'Цена (руб)',
          sortable: true,
          filterable: true,
          resizeable: true,
          width: 200,
        },
        {
          key: 'address',
          title: 'Пункт №1',
          sortable: true,
          filterable: true,
          resizeable: true,
          width: 200,
          format: row => row?.address[0]?.line
        },
        {
          key: 'address',
          title: 'Кол-во адресов',
          sortable: true,
          filterable: true,
          resizeable: true,
          width: 200,
          format: row => row?.address?.length
        },
        {
          key: 'status',
          title: 'Статус',
          sortable: true,
          filterable: true,
          resizeable: true,
          width: 200,
          format: row => status[row.status].ru
        },
        {
          key: 'actions',
          title: 'Действия',
          width: 100,
        },
      ])

      const document = ref<Order | null>(null)

      const { fetchMyOrders } = useActions(
        $store, store.Module.ORDER,
        {
          fetchMyOrders: action.Types.FETCH_MY_ORDERS,
        }
      )

      const user = computed(() => {
        return useState($store, store.Module.AUTH).user
      })

      function openRouteMap(row) {
        $router.push(`orders-map/order/${ row.documentId }`)
      }

      function openOrderDocument(row) {
        document.value = row
        openDocument.value = true
      }

      function openOrderEditor(order) {
        $router.push(`/orders/my-orders/${ order._id.slice(-8) }`)
      }

      await fetchMyOrders({
        params: {
          user: user.value._id
        }
      }).then(({ orders }) => {
        rows.value = orders
      })

      return {
        cols,
        rows,
        Icons,
        status,
        document,
        openDocument,
        openRouteMap,
        openOrderEditor,
        openOrderDocument
      }
    }
  })
</script>

<style lang="scss">
  @import "./MyOrdersPage.scss";
</style>

<template>
  <v-card
    width="550"
    class="order"
  >
    <v-card-title class="primary--text">
      <span class="order-type">{{ order.type.title }}</span>
    </v-card-title>
    <v-card-subtitle class="grey--text">
      <span class="order-date">{{ new Date(order.date).toLocaleString() }}</span>
    </v-card-subtitle>
    <v-card-subtitle>
        <span
          :class="['order-status', 'white--text', 'elevation-4', status[order.status].color]">
          Статус заказа: {{ status[order.status].ru }}
        </span>
    </v-card-subtitle>
    <v-card-content>
      <div class="order-address">
        <h2 class="order-header">Адреса</h2>
        <hr class="blue"/>
        <div
          v-for="(it, i) in order.address"
          class="order-address__line grey--text text--darken-2"
        >
            <span class="order-address__line-title">
              <v-icon :icon="Icons.$marker" size="14" color="primary"/>
              {{ `Адрес-${i + 1}: ` }}
            </span>
          <span class="order-address__line-value">{{ it.line }}</span>
        </div>
      </div>
      <div
        v-if="order.weight"
        class="order-weight"
      >
        <h2 class="order-header">Масса</h2>
        <hr class="blue"/>
        <span class="order-weight__title primary--text">
            <v-icon :icon="Icons.$weight" color="primary" size="14"/>
            Вес груза: {{ order.weight }} (кг)
          </span>
      </div>
      <div
        v-if="order.dimensions"
        class="order-dimensions"
      >
        <h2 class="order-header">Габариты</h2>
        <hr class="blue"/>
        <span class="order-dimensions__height">
            <v-icon :icon="Icons.$height" color="primary" size="18"/>
            Высота: {{ order.dimensions.height }} (см)
          </span>
        <span class="order-dimensions__width">
            <v-icon :icon="Icons.$width" color="primary" size="18"/>
            Ширина: {{ order.dimensions.width }} (см)
          </span>
        <span class="order-dimensions__length">
            <v-icon :icon="Icons.$length" color="primary" size="18"/>
            Длина: {{ order.dimensions.length }} (см)
          </span>
      </div>
      <div class="order-text">
        <h2 class="order-header">Сообщение исполнителю</h2>
        <hr class="blue"/>
        <span class="order-text__message">
            <v-icon :icon="Icons.$envelop" color="primary" size="18"/>
            {{ order.text }}
          </span>
      </div>
      <div class="order-price">
        <h2 class="order-header">Назначенная цена</h2>
        <hr class="blue"/>
        <span class="order-price__number">
          <span class="order-price__count primary--text">{{ order.price }}</span>
          <v-icon :icon="Icons.$rouble" color="primary" size="22"/>
        </span>
      </div>
    </v-card-content>
  </v-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Icons } from '@/services/fa-icons'
  import { status } from '@/services/order-statuses'

  export default defineComponent({
    name: 'AppOrderCard',
    props: {
      order: {
        type: Object,
        required: true
      }
    },

    setup() {

      return {
        Icons,
        status
      }
    }
  })
</script>

<style lang="scss">
  @import "AppOrderCard";
</style>

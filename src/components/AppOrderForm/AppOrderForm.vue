<template>
  <v-form v-slot="{validate}" v-if="computedOrderAddress">
    <v-card style="width: 100%; max-width: 800px;" color="white" elevation="4">
      <v-card-title class="primary--text">
        {{ title }}
      </v-card-title>
      <v-card-content>
        <v-select
          v-model="computedOrderType"
          label="Выберите услугу"
          value-key="title"
          readonly
          :prepend-icon="Icons.$shipping"
          :items="orderTypes"
          :disabled="isEditorMode"
          :rules="[v => !!v || 'Обязтельно к заполнению']"
        />
        <div
          v-for="(it, i) in computedOrderAddress"
          class="address-block elevation-5"
        >
          <app-address-field
            :value="it"
            :label="`Адрес ${i + 1}`"
            :rules="[v => !!v || 'Обязтельно к заполнению']"
            :prepend-icon="Icons.$marker"
            value-key="line"
            clearable
            @house-is-listed="onHouseIsListed"
            @select="setAddress"
          />
          <v-list>
            <v-list-group color="primary" style="border: 1px solid #eeeeee;">
              <template v-slot:title>
                <v-list-item-title>Дополнительная Информация</v-list-item-title>
              </template>
              <template v-slot:prependIcon>
                <v-icon :icon="Icons.$address" size="18"/>
              </template>
              <div class="address-details">
                <v-text-field
                  v-model="it.details.entrance"
                  label="Подъезд"
                  class="address-details__input"
                />
                <v-text-field
                  v-model="it.details.flat"
                  label="Квартира"
                  class="address-details__input"
                />
                <v-text-field
                  v-model="it.details.doorPhone"
                  label="Домофон"
                  class="address-details__input"
                />
                <v-text-field
                  v-model="it.details.contact"
                  label="Контакт"
                  class="address-details__input"
                />
                <v-textarea
                  v-model="it.details.text"
                  class="address-details__text"
                  label="Дополнительно по адресу"
                />
              </div>
            </v-list-group>
          </v-list>
        </div>
        <v-button
          label="добавить адрес"
          color="primary"
          elevation="3"
          :disabled="computedOrderType.orderType === 1"
          @click="addNewAddressField"
        />
        <v-button
          v-if="computedOrderAddress.length > 2"
          label="удалить адрес"
          color="danger"
          elevation="3"
          style="margin-left: 10px;"
          @click="removeAddress"
        />
        <v-text-field
          v-if="computedOrderType.orderType === 0"
          v-model="computedOrderWeight"
          label="Вес доставки (кг)"
          type="number"
          style="margin: 10px 0;"
          :rules="[v => !!v || 'Обязтельно к заполнению']"
          :prepend-icon="Icons.$weight"
        />
        <v-text-field
          v-if="dimensions && computedOrderType.orderType === 0"
          v-model="computedOrderDmsWidth"
          label="Ширина (см)"
          :prepend-icon="Icons.$width"
          :rules="[v => !!v || 'Обязтельно к заполнению']"
          type="number"
        />
        <v-text-field
          v-if="dimensions && computedOrderType.orderType === 0"
          v-model="computedOrderDmsLength"
          label="Длина (см)"
          :prepend-icon="Icons.$length"
          :rules="[v => !!v || 'Обязтельно к заполнению']"
          type="number"
        />
        <v-text-field
          v-if="dimensions && computedOrderType.orderType === 0"
          v-model="computedOrderDmsHeight"
          label="Высота (см)"
          :prepend-icon="Icons.$height"
          :rules="[v => !!v || 'Обязтельно к заполнению']"
          type="number"
        />
        <v-button
          v-if="computedOrderType.orderType === 0"
          :label="dimensions ? 'Удалить габариты' : 'Добавить габариты'"
          color="primary"
          elevation="3"
        />
        <v-textarea
          v-if="computedOrderType"
          v-model="computedOrderText"
          label="Сообщение"
          style="margin: 10px 0;"
          :rules="[v => !!v || 'Обязтельно к заполнению']"
        />
        <v-text-field
          v-model="computedOrderPrice"
          style="margin: 10px 0;"
          type="number"
          label="Назначьте цену"
          :rules="[v => !!v || 'Обязтельно к заполнению']"
          :prepend-icon="Icons.$rouble"
        />
      </v-card-content>
      <v-card-actions>
        <v-button
          color="primary"
          label="сохранить"
          elevation="3"
          @click="prepareOrder(validate)"
        ></v-button>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue'
  import { Icons } from '@/services/fa-icons'
  import orderTypes from '@/schemes/order-types.json'
  import { copyWithoutLink } from '@/helpers'
  // import { useDialog } from '@/effects/use-dialog'
  import { Order, Dimensions } from '@/types'

  import { AppAddressField } from '@/components/AppAddressField'

  export default defineComponent({
    name: 'AppOrderForm',
    components: {
      AppAddressField
    },
    props: {
      title: String,
      address: Array,
      type: Object,
      text: String,
      price: Number,
      weight: Number,
      dimensions: Object,
      isEditorMode: Boolean
    },

    emits: [
      'update:address',
      'update:type',
      'update:text',
      'update:price',
      'update:weight',
      'update:dimensions',
      'save'
    ],

    setup(props, { emit }) {
      const updates: any = {}

      const address = {
        line: '',
        location: {},
        priority: 0,
        details: {
          entrance: null,
          flat: null,
          doorPhone: null,
          contact: null,
          text: null
        }
      }

      const dimensions = {
        width: 0,
        height: 0,
        length: 0
      }

      const incompleteAddresses: {
        isComplete: boolean
        addressIndex: number
      }[] = []

      const computedOrderAddress = computed<Order['address']>({
        get() {
          return props.address as any
        },
        set(val: any) {
          if (val) {
            emit('update:address', val)
          }
        }
      })

      const computedOrderType = computed<Order['type']>({
        get() {
          return props.type as Order['type']
        },
        set(val) {
          console.log(val, 'type')
          if (props.isEditorMode) updates.type = props.type !== val

          emit('update:type', val)
        }
      })

      const computedOrderText = computed<Order['text']>({
        get() {
          return props.text as Order['text']
        },
        set(val) {
          if (props.isEditorMode) updates.text = props.text !== val

          emit('update:text', val)
        }
      })

      const computedOrderPrice = computed<Order['price']>({
        get() {
          return props.price as Order['price']
        },
        set(val) {
          if (props.isEditorMode) updates.price = props.price !== val

          emit('update:price', +val)
        }
      })

      const computedOrderWeight = computed<Order['weight']>({
        get() {
          return props.weight as Order['weight']
        },
        set(val) {
          if (props.isEditorMode) updates.weight = props.weight !== val

          console.log(val)
          emit('update:weight', +val!)
        }
      })

      const computedOrderDmsWidth = computed<Dimensions['width']>({
        get() {
          return props.dimensions?.width as Dimensions['width']
        },
        set(val) {
          if (props.isEditorMode) {
            if (!updates.dimensions) {
              updates.dimensions = {}
            }
            updates.dimensions.width = props.dimensions?.width !== val
          }

          dimensions.width = val

          emit('update:dimensions', dimensions)
        }
      })

      const computedOrderDmsHeight = computed<Dimensions['height']>({
        get() {
          return props.dimensions?.height as Dimensions['height']
        },
        set(val) {
          if (props.isEditorMode) {
            if (!updates.dimensions) {
              updates.dimensions = {}
            }
            updates.dimensions.height = props.dimensions?.height !== val
          }

          dimensions.height = val

          emit('update:dimensions', dimensions)
        }
      })

      const computedOrderDmsLength = computed<Dimensions['length']>({
        get() {
          return props.dimensions?.length as Dimensions['length']
        },
        set(val) {
          if (props.isEditorMode) {
            if (!updates.dimensions) {
              updates.dimensions = {}
            }
            updates.dimensions.length = props.dimensions?.length !== val
          }

          dimensions.length = val

          emit('update:dimensions', dimensions)
        }
      })

      watch(() => computedOrderType.value, to => {
        if (to.orderType === 0 && computedOrderAddress.value.length < 2) {
          addNewAddressField()
        }
        if (to.orderType === 1) computedOrderAddress.value.length = 1
      })

      function addNewAddressField() {
        address.priority += 1
        const arr = [...computedOrderAddress.value, copyWithoutLink(address)]
        computedOrderAddress.value = arr as any
      }

      function removeAddress() {
        const arr = copyWithoutLink(computedOrderAddress.value) as any
        arr.length -= 1
        computedOrderAddress.value = arr
      }

      function onHouseIsListed(addressState) {
        incompleteAddresses.push(addressState)
      }


      function setAddress(address) {
        if (props.isEditorMode) {
          const diff = props.address!.find(it => {
            return (it as any).line === address.line
          })

          if (!!diff) updates.address = address
          else delete updates.address

        }

        const propsAddress = [...props.address as any]

        const found = propsAddress.findIndex(it => {
          return address.priority === it.priority
        })

        propsAddress[found] = address

        emit('update:address', propsAddress)
      }

      function prepareOrder(validate) {
        validate().then(() => {
          const { type, address, weight, dimensions, text, price } = props
          const order = {
            type,
            address,
            weight,
            dimensions,
            text,
            price
          }

          emit('save', order)
          console.log(order)
        })
      }

      !computedOrderAddress.value.length && addNewAddressField()

      return {
        orderTypes,
        Icons,
        computedOrderAddress,
        computedOrderType,
        computedOrderText,
        computedOrderPrice,
        computedOrderWeight,
        computedOrderDmsWidth,
        computedOrderDmsHeight,
        computedOrderDmsLength,
        addNewAddressField,
        onHouseIsListed,
        setAddress,
        removeAddress,
        prepareOrder,
      }
    }
  })
</script>
<style lang="scss">
  @import "./AppOrderForm";
</style>

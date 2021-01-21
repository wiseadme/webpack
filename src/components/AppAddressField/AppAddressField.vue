<template>
  <v-autocomplete
    v-model="computedValue"
    :label="label"
    :rules="rules"
    :items="addressHints"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :clearable="clearable"
    :disabled="disabled"
    value-key="value"
    @input="getHints"
    @select="onAddressSelect"
    @blur="onBlur"
    @focus="getHints"
  />
</template>

<script lang="ts">
  import { ref, computed, defineComponent } from 'vue'
  import { getSuggestions } from '@/api'

  import { Icons } from '@/services/fa-icons'
  import { Address } from '@/types'
  import { copyWithoutLink } from '@/helpers'

  export default defineComponent({
    name: 'AppAddressField',

    emits: [
      'select',
      'house-is-listed'
    ],

    props: {
      label: String,
      items: Array,
      prependIcon: {
        type: String,
        default: () => Icons.$marker
      },
      rules: Array,
      appendIcon: String,
      valueKey: String,
      clearable: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      value: [Number, String, Object]
    },

    setup(props, { emit }) {
      const addressHints = ref([])

      const formattedAddress: any = ref({
        value: (props.value as Address)[props.valueKey as string]
      })

      const address = copyWithoutLink(props.value) as any

      const computedValue = computed({
        get() {
          return formattedAddress.value
        },

        set(val: any) {
          formattedAddress.value = val
          address[props.valueKey!] = val.value
        }
      })

      function onBlur() {
        if ((props.value as Address).line !== address.line) {
          setTimeout(() => {
            formattedAddress.value.value = (props.value as Address).line
          }, 100)
        }
      }

      function onAddressSelect(val) {
        address[props.valueKey!] = val.value

        address.location = {
          lat: val.data?.geo_lat,
          lng: val.data?.geo_lon
        }

        emit('select', address)

        val.data && emit('house-is-listed', {
          isComplete: !!val.data.house,
          addressIndex: address.priority
        })
      }

      function getHints(query) {
        getSuggestions({
          query: query || 'москва',
          count: 10,
          language: 'ru'
        })
          .then(({ data: { suggestions } }) => {
            addressHints.value = suggestions
          })
          .catch(err => console.log({ err }))
      }

      return {
        addressHints,
        computedValue,
        Icons,
        getHints,
        onBlur,
        onAddressSelect
      }
    }
  })
</script>

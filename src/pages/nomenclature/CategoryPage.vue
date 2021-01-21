<template>
  <v-data-table
      :cols="cols"
      :rows="rows"
      :rows-on-table="[25, 40, 50, 75]"
      class="elevation-5"
      style="margin: 10px;"
      color="blue-grey darken-4"
      header-color="blue-grey darken-3"
      numbered
      checkbox
      dark
  >
    <template v-slot:toolbar>
      <v-tooltip bottom offset-y="10">
        <template v-slot:activator="{on}">
          <v-button v-on="on" width="42" color="blue-grey darken-3" elevation="4">
            <v-icon icon="fas fa-plus" color="green accent-3" size="18"/>
          </v-button>
        </template>
        <span>add new row</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'table-page',

  setup() {
    const cols = [
      {
        key: 'name',
        title: 'Name',
        resizeable: true,
        sortable: true,
        filterable: true,
      },
      {
        key: 'value',
        title: 'Value',
        resizeable: true,
        sortable: true,
        filterable: true,
      },
      {
        key: 'price',
        title: 'Price',
        resizeable: true,
        sortable: true,
        filterable: true,
      }
    ]

    const rows = [
      {
        name: 'Sony Playstation 5',
        value: 25,
        price: 1250
      },
      {
        name: 'XBox Series X',
        value: 25,
        price: 1100
      },
    ]

    return {
      cols,
      rows
    }
  }
})
</script>

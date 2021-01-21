<template>
  <div class="app-toolbar">
    <v-tooltip bottom offset-y="10" elevation="5" color="blue-grey darken-3">
      <template v-slot:activator="{on}">
        <v-button
          v-on="on"
          width="42"
          color="primary"
          elevation="4"
          @click="$emit('add-new')"
        >
          <v-icon :icon="Icons.$add" color="white" size="18"/>
        </v-button>
      </template>
      <span>add new rows</span>
    </v-tooltip>
    <v-tooltip bottom offset-y="10" elevation="5" color="blue-grey darken-3">
      <template v-slot:activator="{on}">
        <v-button
          v-on="on"
          width="42"
          color="red accent-3"
          elevation="4"
          style="margin: 0 5px;"
          @click="$emit('delete')"
        >
          <v-icon :icon="Icons.$delete" color="white" size="18"/>
        </v-button>
      </template>
      <span>delete rows</span>
    </v-tooltip>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import { Icons } from '@/services/fa-icons'

  export default defineComponent({
    name: 'app-toolbar',
    setup() {
      return {
        Icons
      }
    }
  })
</script>

<style lang="scss">
  @import "AppToolbar";
</style>

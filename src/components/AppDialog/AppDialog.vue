<template>
  <v-modal
    v-if="dialogParams"
    v-model="showDialog"
    transition="scale-in"
    overlay
  >
    <v-card
      class="app-dialog"
      elevation="15"
      :width="dialogParams.width || 550"
    >
      <v-card-title :class="[`${dialogParams.type}`]">
        <div :class="['app-dialog__header', 'white--text']">
          <v-icon
            :icon="Icons[`$${dialogParams.type}`]"
            size="22"
          />
          <div style="margin-left: 10px;">{{ dialogParams.header }}</div>
        </div>
      </v-card-title>

      <v-card-content>
        <div class="app-dialog__content">{{ dialogParams.content }}</div>
      </v-card-content>
      <v-card-actions>
        <div
          v-for="btn in dialogParams.actions"
          :key="btn.title"
          class="app-dialog__actions"
        >
          <v-button
            :color="`${btn.type}`"
            elevation="3"
            outlined
            @click="btn.handler"
          >
            {{ btn.title }}
          </v-button>
        </div>
      </v-card-actions>
    </v-card>
  </v-modal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { dialogParams, showDialog } from '@/effects/use-dialog'
  import { Icons } from '@/services/fa-icons'

  export default defineComponent({
    name: 'app-dialog',
    setup() {
      return {
        showDialog,
        dialogParams,
        Icons,
      }
    },
  })
</script>
<style lang="scss">
  @import "./AppDialog";
</style>

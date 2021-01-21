<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { lStorage } from '@/utils'
  import { useMutations } from '@/effects/use-store'

  export default defineComponent({
    name: 'App',
    setup() {
      const $store = useStore()

      const user = lStorage.get('user')

      const { setUser } = useMutations(
        $store,
        store.Module.AUTH, {
          setUser: mutation.Types.SET_USER
        }
      )

      if (user) setUser(user)
    }
  })
</script>

<style lang="scss">
  .container {
    width: 100%;
    height: 100vh;
  }
</style>

<template>
  <aside class="app-sidebar white">
    <nav class="app-nav">
      <div
        v-for="item in nav"
        :class="['app-nav__item' ]"
        @mouseenter="item.active = true"
        @mouseleave="item.active = false"
      >
        <v-icon
          :icon="item.icon"
          :color="item.color"
          :class="[item.active ? 'brand-orange--text': 'brand-dark-blue--text']"
          style="transition: color .2s linear;"
          size="18"
        />
        <transition name="fade">
          <div
            v-show="item.active"
            class="app-nav__item-list white elevation-3"
          >
            <div class="app-nav__item-header brand-orange white--text">
              <v-icon
                :icon="Icons.$layers" size="14"
              />
              <span
                class="app-nav__item-title"
              >
              {{ item.title }}
            </span>
            </div>
            <v-list>
              <v-list-group
                v-for="child in item.children"
                group="list"
                :no-action="!child.children"
                @click="child.route && goTo(child, item)"
              >
                <template v-slot:title>
                  <v-list-item-title>
                    {{ child.title }}
                  </v-list-item-title>
                </template>
                <v-list-item
                  v-for="sub of child.children"
                  @click="goTo(sub, item)"
                >
                  <v-list-item-title>
                    {{ sub.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list>
          </div>
        </transition>
      </div>
    </nav>
  </aside>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Icons } from '@/services/fa-icons'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'app-header',
    setup() {
      const router = useRouter()
      const nav = ref([
        {
          title: 'Таблица',
          icon: Icons.$thlist,
          route: '/',
          active: false,
          children: [
            {
              title: 'номенклатура',
              children: [
                {
                  title: 'группы',
                  route: '/dictionaries/groups'
                },
                {
                  title: 'категории',
                  route: '/dictionaries/categories'
                },
                {
                  title: 'единицы измерения',
                  route: '/dictionaries/categories'
                },
              ]
            },
            {
              title: 'товары',
              route: '/dictionaries/products'
            }
          ]
        },
        {
          title: 'Заказы',
          icon: Icons.$help,
          children: [
            {
              title: 'создать заказ',
              route: '/orders/create'
            },
            {
              title: 'мои заказы',
              route: '/orders/my-orders'
            }
          ],
        },
        {
          title: 'Карта заказов',
          icon: Icons.$map
        }
      ])

      const goTo = (nav, item) => {
        router.push(nav.route)
        item.active = false
      }

      return {
        nav,
        goTo,
        Icons
      }
    }
  })
</script>
<style lang="scss">
  @import "./AppSidebar";
</style>

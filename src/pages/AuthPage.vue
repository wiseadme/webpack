<template>
  <div class="auth-page">
    <div class="user-block">
      <transition name="fade">
        <v-card
          width="400"
          v-if="individual"
        >
          <v-card-title class="primary--text">
            {{ `${isLogin ? 'Авторизация' : 'Регистрация'}` }}
          </v-card-title>
          <v-card-content>
            <v-form v-slot="{ validate }" style="display: block; width:100%;">
              <v-text-field
                v-model="login"
                label="логин"
                :prepend-icon="Icons.$userLock"
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-if="!isLogin"
                v-model="email"
                :prepend-icon="Icons.$envelop"
                label="почта"
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-model="password"
                label="пароль"
                type="password"
                :prepend-icon="Icons.$password"
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-if="!isLogin"
                v-model="confirm"
                :prepend-icon="Icons.$password"
                label="повторите пароль"
                type="password"
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле', val => val === password || 'Пароли не совпадают']"
              />
              <v-button
                label="send"
                color="primary"
                elevation="4"
                outlined
                style="margin-top: 20px;"
                @click="sendUserParams(validate)"
              />
            </v-form>
          </v-card-content>
          <v-card-actions>
          <span v-if="!isLogin" class="primary--text">
            Есть аккаунт?
            <router-link to="/auth/login">Войти</router-link></span>
            <span v-else class="primary--text">
            Нет аккаунта?
            <router-link to="/auth/create" class="primary--text">
              Зарегистрироваться
            </router-link>
          </span>
          </v-card-actions>
        </v-card>
      </transition>
    </div>
    <div class="org-block">
      <transition name="fade">
        <v-card
          width="400"
          v-if="!individual"
        >
          <v-card-title class="primary--text">
            {{ `${isLogin ? 'Авторизация' : 'Регистрация'}` }}
          </v-card-title>
          <v-card-content>
            <v-form v-slot="{ validate }" style="display: block; width:100%;">
              <v-text-field
                v-if="!isLogin"
                v-model="orgParams.inn"
                label="ИНН"
                type="number"
                autocomplete="new-password"
                :prepend-icon="Icons.$inn"
                :rules="[val => !!val || 'Обязательное поле', val => val.length >= 9 || 'Не менее 9 символов']"
                @blur="getOrgInfo(validate)"
              />
              <v-text-field
                v-if="!isLogin && orgReqResult"
                v-model="orgParams.ogrn"
                :prepend-icon="Icons.$ogrn"
                label="ОГРН"
                autocomplete="new-password"
                disabled
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-if="!isLogin && orgReqResult"
                v-model="orgParams.name"
                label="название организации"
                :prepend-icon="Icons.$company"
                autocomplete="new-password"
                disabled
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-if="!isLogin && orgReqResult"
                v-model="orgParams.address"
                :prepend-icon="Icons.$marker"
                label="адрес"
                disabled
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-if="isLogin || orgReqResult"
                v-model="orgParams.email"
                :prepend-icon="Icons.$envelop"
                label="почта"
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-if="!isLogin && orgReqResult"
                v-model="orgParams.phone"
                :prepend-icon="Icons.$phone"
                label="телефон"
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-if="isLogin || orgReqResult"
                v-model="orgParams.password"
                label="пароль"
                type="password"
                :prepend-icon="Icons.$password"
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-if="!isLogin && orgReqResult"
                v-model="orgParams.confirmPass"
                :prepend-icon="Icons.$password"
                label="повторите пароль"
                type="password"
                autocomplete="new-password"
                :rules="[val => !!val || 'Обязательное поле', val => val === orgParams.password || 'Пароли не совпадают']"
              />
              <v-button
                label="send"
                color="primary"
                elevation="4"
                outlined
                style="margin-top: 20px;"
                @click="sendUserParams(validate)"
              />
            </v-form>
          </v-card-content>
          <v-card-actions>
          <span v-if="!isLogin" class="primary--text">
            Есть аккаунт?
            <router-link to="/auth/login">Войти</router-link></span>
            <span v-else class="primary--text">
            Нет аккаунта?
            <router-link to="/auth/create" class="primary--text">
              Зарегистрироваться
            </router-link>
          </span>
          </v-card-actions>
        </v-card>
      </transition>
    </div>
    <div
      :class="[
        'info-block',
        'blue darken-4',
        'elevation-10',
        {'legal--active': !individual}
        ]"
    >
      <img
        :class="['logo']"
        src="/assets/img/routeme.png"
        @click="individual = !individual"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, reactive, toRefs, computed, defineComponent } from 'vue'
  import { useActions, useState } from '@/effects/use-store'
  import { getOrganizationInfo } from '@/api'
  import { lStorage } from '@/utils'
  import { Icons } from '@/services/fa-icons'

  export default defineComponent({
    name: 'auth-page',
    setup() {
      const individual = ref(true)

      const userParams = reactive({
        login: '',
        email: '',
        password: '',
        confirm: '',
      })

      const orgParams = reactive({
        name: '',
        inn: '',
        ogrn: '',
        phone: '',
        email: '',
        address: '',
        orgType: '',
        password: '',
        confirmPass: ''
      })

      const orgTypes = [
        { orgType: 0, title: 'ИП' },
        { orgType: 1, title: 'ООО, АО, ЗАО и т.д.' }
      ]

      const orgReqResult = ref<any>(null)

      const $store = useStore()
      const $router = useRouter()

      const { createUser, loginUser } = useActions(
        $store, store.Module.AUTH, {
          createUser: action.Types.CREATE_USER,
          loginUser: action.Types.LOGIN_USER
        }
      )

      const user = computed(() => {
        return useState($store, store.Module.AUTH).user
      })

      const isLogin = computed(() => {
        return $router.currentRoute.value.path === '/auth/login'
      })

      function getOrgInfo(validate) {
        validate()
          .then(() => {
            getOrganizationInfo({ query: orgParams.inn })
              .then(({ data }) => {
                if (data.suggestions.length) {
                  orgReqResult.value = data.suggestions[0].data
                  orgParams.ogrn = orgReqResult.value.ogrn
                  orgParams.name = orgReqResult.value.name.short_with_opf
                  orgParams.address = orgReqResult.value.address.value
                } else {
                  console.error('Организация не найдена')
                }
              })
          })
          .catch(() => false)
      }

      function sendUserParams(validate) {
        validate().then(() => {
          !isLogin.value && createUser(userParams)
          isLogin.value && authUser()
        })
      }

      function authUser() {
        loginUser(userParams).then(({ user, refresh }) => {
          lStorage.set('user', { user, refresh })
          $router.replace('/orders/create')
        })
      }

      return {
        Icons,
        isLogin,
        user,
        individual,
        orgParams,
        orgReqResult,
        orgTypes,
        ...toRefs(userParams),
        sendUserParams,
        getOrgInfo
      }
    }
  })
</script>

<style lang="scss">
  .auth-page {
    @include flex(flex, flex-start, center);
    width: 100%;
    height: 100%;
    position: relative;
  }

  .user-block {
    @include flex(flex, center, center);
    width: 50%;
    height: 100%;
  }

  .org-block {
    @include flex(flex, center, center);
    width: 50%;
    height: 100%;
  }

  .info-block {
    @include flex(flex, center, center);
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    transition: transform .2s linear;
  }

  .legal-user {
    cursor: pointer;
    font-size: 1.2rem;
  }

  .legal--active {
    transform: translateX(-100%);
  }
</style>

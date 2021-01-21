// Vuex API
import { createStore } from 'vuex'

// Types
import { Store } from 'vuex/types'
import { RootState } from '@/types'

// Namespaces
import { Module } from './namespaces'

// Modules
import * as AuthModule from './modules/auth'
import * as DictionariesModule from './modules/dictionaries'
import * as OrdersModule from './modules/orders'

// Plugin
import { apiInterceptor } from '@/plugins/interceptor'

const plugins = [apiInterceptor]

const state: RootState = {
  version: ''
}

export const store: Store<RootState> = createStore({
  state,
  plugins
})

store.registerModule(Module.AUTH, AuthModule)
store.registerModule(Module.DICTIONARY, DictionariesModule)
store.registerModule(Module.ORDER, OrdersModule)


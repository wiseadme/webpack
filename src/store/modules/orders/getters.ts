import { GetterTree } from 'vuex/types'
import { OrdersState, RootState } from '@/types'

type Getters = {
  getGroups: (state: OrdersState) => any | null
}

export const getters: GetterTree<OrdersState, RootState> & Getters = {
  getGroups(state) {
    return state.orders
  }
}

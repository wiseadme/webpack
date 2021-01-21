import { MutationTree } from 'vuex/types'
import { OrdersState, Order } from '@/types'
import { Types as Mutation } from '@/store/mutation-types'

type Mutations<S = OrdersState> = {
  [Mutation.SET_ORDERS]: (state: S, orders: Order[]) => void
}

export const mutations: MutationTree<OrdersState> & Mutations = {
  [Mutation.SET_ORDERS](state, orders) {
    state.orders = orders
  }
}

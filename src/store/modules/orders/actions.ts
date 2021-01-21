import { ActionContext, ActionTree } from 'vuex/types'
import { AxiosPromise } from 'axios'

import { Types as Action } from '../../action-types'
import { Types as Mutation } from '../../mutation-types'

import { createOrder, fetchMyOrders, fetchOrderById, updateOrder } from '@/api'
import { DictionariesState, RootState } from '@/types'

export type DictionaryActions = {
  [Action.CREATE_ORDER]: (context: ActionContext<DictionariesState, RootState>, options: any) => Promise<AxiosPromise>
}

export const actions: ActionTree<DictionariesState, RootState> & DictionaryActions = {

  async [Action.CREATE_ORDER](_, order): Promise<AxiosPromise> {
    try {
      const { data } = await createOrder(order)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async [Action.FETCH_MY_ORDERS]({ commit }, params) {
    try {
      const { data } = await fetchMyOrders(params)
      commit(Mutation.SET_ORDERS, data.orders)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async [Action.FETCH_ORDER](_, params) {
    try {
      const { data } = await fetchOrderById(params)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async [Action.UPDATE_ORDER](_, update) {
    try {
      const { data } = await updateOrder(update)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

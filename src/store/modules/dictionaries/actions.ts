import { ActionContext, ActionTree } from 'vuex/types'
import { AxiosPromise } from 'axios'

import { Types as Action } from '../../action-types'
import { Types as Mutation } from '../../mutation-types'

import { createGroup, fetchGroups, deleteGroups } from '@/api'
import { DictionariesState, RootState } from '@/types'

export type DictionaryActions = {
  [Action.CREATE_GROUP]: (context: ActionContext<DictionariesState, RootState>, options: any) => Promise<AxiosPromise>
  [Action.FETCH_GROUPS]: (context: ActionContext<DictionariesState, RootState>, options: any) => Promise<AxiosPromise>
  [Action.DELETE_GROUPS]: (context: ActionContext<DictionariesState, RootState>, options: any) => Promise<AxiosPromise>
}

export const actions: ActionTree<DictionariesState, RootState> & DictionaryActions = {

  async [Action.CREATE_GROUP](_, group): Promise<AxiosPromise> {
    try {
      const { data } = await createGroup(group)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async [Action.FETCH_GROUPS]({ commit }) {
    try {
      const { data } = await fetchGroups()
      commit(Mutation.SET_GROUPS, data.groups)
      return data.groups
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async [Action.DELETE_GROUPS](_, groups) {
    try {
      const { data } = await deleteGroups(groups)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

import { ActionContext, ActionTree } from 'vuex/types'
import { AxiosPromise } from 'axios'
import { AuthState, RootState } from '@/types'
import { Types as Actions } from '../../action-types'
import { Types as Mutations } from '../../mutation-types'
import { createUser, loginUser, refreshToken } from '@/api'

export type AuthActions = {
  [Actions.CREATE_USER]: (context: ActionContext<AuthState, RootState>, options: any) => Promise<AxiosPromise>
}

export const actions: ActionTree<AuthState, RootState> & AuthActions = {

  async [Actions.CREATE_USER](_, user): Promise<AxiosPromise> {
    try {
      const { data } = await createUser(user)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async [Actions.LOGIN_USER]({ commit }, user) {
    try {
      const { data } = await loginUser(user)
      commit(Mutations.SET_USER, data)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async [Actions.REFRESH_TOKEN]({ commit }, params) {
    try {
      const { data } = await refreshToken(params)
      commit(Mutations.SET_USER, data)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

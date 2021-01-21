import { MutationTree } from 'vuex/types'
import { AuthState, User } from '@/types'
import { Types as Mutation } from '@/store/mutation-types'

type Mutations<S = AuthState> = {
  [Mutation.SET_USER]: (state: S, payload: any) => void
}

export const mutations: MutationTree<AuthState> & Mutations = {
  [Mutation.SET_USER](state, payload) {
    state.user = payload.user as User
    state.refresh = payload.refresh
  }
}

import { GetterTree } from 'vuex/types'
import { AuthState, RootState, User } from '@/types'

type Getters = {
  getUser: (state: AuthState) => User | null
}

export const getters: GetterTree<AuthState, RootState> & Getters = {
  getUser(state) {
    return state.user
  }
}

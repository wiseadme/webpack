import { MutationTree } from 'vuex/types'
import { DictionariesState, Group } from '@/types'
import { Types as Mutation } from '@/store/mutation-types'

type Mutations<S = DictionariesState> = {
  [Mutation.SET_NEW_GROUP]: (state: S, group: Group) => void
}

export const mutations: MutationTree<DictionariesState> & Mutations = {
  [Mutation.SET_NEW_GROUP](state, group) {
    state.groups?.push(group)
  },

  [Mutation.SET_GROUPS](state, groups) {
    state.groups = groups
  }
}

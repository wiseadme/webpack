import { GetterTree } from 'vuex/types'
import { DictionariesState, RootState } from '@/types'

type Getters = {
  getGroups: (state: DictionariesState) => any | null
}

export const getters: GetterTree<DictionariesState, RootState> & Getters = {
  getGroups(state) {
    return state.groups
  }
}

import { rest } from './axios'
import { Store } from 'vuex/types'
import { getCookie, isJWTValid } from '@/helpers'
import { lStorage } from '@/utils'


export const apiInterceptor = ({ state, dispatch }: Store<any>) => {
  rest.interceptors.request.use(
    async request => {
      const jwt = getCookie('jwt-token')

      if (isJWTValid(jwt)) return request

      const params = {
        user: state.AUTH.user,
        refresh: state.AUTH.refresh
      }

      await dispatch(`AUTH/${ action.Types.REFRESH_TOKEN }`, params)
        .then(data => lStorage.replace('user', data))

      return request
    },
    error => {
      return error
    }
  )
}


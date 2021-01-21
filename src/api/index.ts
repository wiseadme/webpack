import { rest } from '@/plugins/axios'
import { auth } from '@/plugins/axios'
import { api } from '@/plugins/axios'

export const createUser = user => auth.post('/api/auth/user/create', user)
export const loginUser = user => auth.post('/api/auth/user/login', user)
export const refreshToken = params => auth.post('/api/auth/user/refresh', params)

export const createGroup = group => rest.post('/api/v1/dictionaries/groups/create', group)
export const fetchGroups = () => rest.get('/api/v1/dictionaries/groups')
export const deleteGroups = groups => rest.post('/api/v1/dictionaries/groups/delete', groups)

export const createOrder = order => rest.post('/api/v1/orders/create', order)
export const fetchMyOrders = params => rest.get('/api/v1/orders', params)
export const fetchOrderById = params => rest.get('/api/v1/orders/my/order', params)
export const updateOrder = update => rest.post('/api/v1/orders/update', update)

export const getLocationByAddress = address => api.post('https://cleaner.dadata.ru/api/v1/clean/address', address)
export const getSuggestions = address => api.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', address)
export const getOrganizationInfo = inn => api.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', inn)

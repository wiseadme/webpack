export type RootState = {
  [key: string]: any
}

export interface AuthState {
  user: User | null,
  refresh: object | null
}

export interface OrdersState {
  orders: Order[],
}

export interface DictionariesState {
  groups: Group[] | null
  categories: string | null
}

export interface Group {
  title: string
  _id?: string
}

export type Dimensions = {
  width: number
  height: number
  length: number
}

export type Address = {
  line: string
  location: { lat: number, lng: number }
  priority: number
}

export type Order = {
  user: string
  type: any
  address: Address[]
  price: number
  text: string
  dimensions?: Dimensions
  status?: number
  contractor?: string
  weight?: number
  documentId?: string
}

export interface User {
  login: string
  email: number
}

export type TableColumn = {
  key: string
  title: string
  resizeable?: boolean
  sortable?: boolean
  filterable?: boolean
  width?: number
  format?: (row: any) => any
}

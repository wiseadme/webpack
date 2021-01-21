import axios, { AxiosInstance } from 'axios'

export const rest: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ''
  },
  withCredentials: true,
  maxContentLength: 50000000,
  timeout: 150000
})

export const auth: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  maxContentLength: 50000000,
  timeout: 150000
})

export const api: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${ process.env.API_TOKEN }`,
    'X-Secret': process.env.API_SECRET,
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  maxContentLength: 50000000,
  timeout: 150000
})

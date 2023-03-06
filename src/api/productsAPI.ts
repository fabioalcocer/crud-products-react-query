import axios from 'axios'
import { Product } from '../types/product'

const productsApi = axios.create({
  baseURL: 'http://localhost:3000',
})

export const getProducts = async () => {
  const res = await productsApi.get('/products')
  return res.data
}

export const createProduct = async (product: Product | {}) => {
  productsApi.post('/products', product)
}

import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/productsAPI'

type Product = {
  id: number
  name: string
  description: string
  price: number
  inStock: boolean
}

function ProductsList() {
  const { isLoading, data, isError, error } = useQuery<
    Product[],
    Error
  >({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  if (isLoading) return <div>Loading...</div>
  else if (isError && error instanceof Error)
    return <div>Error: {error.message}</div>

  return data?.map((product) => (
    <div key={product.id}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button>Delete</button>
      <input type="checkbox" />
      <label>inStock</label>
    </div>
  ))
}

export default ProductsList

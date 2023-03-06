import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/productsAPI'
import { Product } from '../types/product'

function ProductsList() {
  const { isLoading, data, isError, error } = useQuery<
    Product[],
    Error
  >({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (products) =>
      products.sort((a: any, b: any) => b.id - a.id),
  })

  if (isLoading) return <div>Loading...</div>
  else if (isError && error instanceof Error)
    return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.map((product) => (
        <article key={product.id}>
          <div>
            <h1 className='text-red-400'>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
          <div>
            <button>Delete</button>
            <input type='checkbox' />
            <label>inStock</label>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProductsList

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from '../api/productsAPI'
import { Product } from '../types/product'

function ProductsList() {
  const { isLoading, data, isError, error } = useQuery<
    Product[],
    Error
  >({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  })

  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log('Product deleted!')
      queryClient.invalidateQueries(['products'])
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log('Product updated!')
      queryClient.invalidateQueries(['products'])
    },
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
            <button
              onClick={() => {
                deleteProductMutation.mutate(product.id)
              }}
            >
              Delete
            </button>
            <input
              id='in-stock'
              type='checkbox'
              checked={product.inStock}
              onChange={(e) => {
                updateProductMutation.mutate({
                  ...product,
                  inStock: e.currentTarget.checked,
                })
              }}
            />
            <label htmlFor='in-stock'>inStock</label>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProductsList

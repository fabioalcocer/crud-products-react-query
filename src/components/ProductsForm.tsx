import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { createProduct } from '../api/productsAPI'

function ProductsForm() {
  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log('Product added!')
      //this revalidate data from the server
      queryClient.invalidateQueries(['products'])
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const product = Object.fromEntries(formData)

    addProductMutation.mutate({
      ...product,
      price: parseInt(product.price as string),
      inStock: true,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />
      </div>
      <div>
        <label htmlFor='price'>Price</label>
        <input type='number' name='price' id='price' />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea name='description' id='description' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default ProductsForm

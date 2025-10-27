import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const PostOperations = () => {

    const queryClient = useQueryClient();

    const {data, error, isLoading, isError, refetch}=useQuery({
        queryKey:['products'],
        queryFn:async()=>{
            const res = await axios.get('https://dummyjson.com/products')
            return res.data
        },
        refetchOnMount:false
    })
    const updateApiCall=async({id, payload})=>{
        const res=await axios.put(`https://dummyjson.com/products/${id}`, payload)
        return res.data
    }
    const updateProduct = useMutation({
        mutationFn:updateApiCall,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['products']})
        }
    })

    const handleOnClick=()=>{
        updateProduct.mutate({
            id:2,
            payload: {title:"Updated title"}
        })
    }
    if(isLoading)
        return <div>Loading...</div>
    if(isError)
        return <div>{error.message}</div>
  return (
    <div>
      <h2>Products data</h2>
      {
        data.products.map((product)=>{
            return <div key={product.id}>{product.title}</div>
        })
      }
      <button onClick={handleOnClick}>Update product</button>
    </div>
  )
}

export default PostOperations

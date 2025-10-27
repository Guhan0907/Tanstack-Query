import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const Component2 = () => {
  const {data, error, isLoading, isError}=useQuery({
        queryKey:['products'],
        queryFn:async()=>{
            const res = await axios.get('https://dummyjson.com/products')
            return res.data
        },
        refetchOnMount:false
    })
    if(isError){
        return <div>{error.message}</div>
    }
    if(isLoading){
        return <div>Loading...</div>
    }
  return (
    <div>
        <h1>Component 2</h1>
      {data.products.map((product)=>{
        return <div key={product.id}>{product.title}</div>
      })}
    </div>
  )
}

export default Component2

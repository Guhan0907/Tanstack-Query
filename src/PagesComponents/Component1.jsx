import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const Component1 = () => {
    const {data, error, isLoading, isError, refetch}=useQuery({
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
        <h1>Component 1</h1>
      {data.products.map((product)=>{
        return <div key={product.id}>{product.title}</div>
      })}

      <button onClick={()=>refetch()}>Refresh data</button>
    </div>
  )
}

export default Component1

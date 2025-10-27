import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import OnlineAndOfflineComponent from '../PagesComponents/OnlineAndOfflineComponent'

const OnlineAndOffline = () => {
    const [component, setComponent]=useState(false)
    const {data, error, isLoading, isError, refetch}=useQuery({
        queryKey:['products'],
        queryFn:async()=>{
            const res = await axios.get('https://dummyjson.com/products')
            return res.data
        },
        refetchOnMount:false,
        enabled:false,
        refetchOnReconnect:false,
    })
    const renderProductList=()=>{
        if(isLoading)
            return <div>Loading...</div>
        if(isError)
            return <div>{error.message}</div>
        if(!data)
            return <div>Data not fetched</div>
        return data.products.map((product)=>{
                return <div key={product.id}>{product.title}</div>
            })
    }
  return (
    <div>
      <button onClick={()=>refetch()}>Fetch product data</button>
      {
        renderProductList()
      }
      <button onClick={()=>setComponent(!component)}>Mount Cart compnent</button>
      {
        component && <OnlineAndOfflineComponent />
      }
    </div>
  )
}

export default OnlineAndOffline

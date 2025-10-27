import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import PayLoadDifferenceComponent from '../PagesComponents/PayLoadDifferenceComponent'
import PayLoadDifferenceComponent2 from '../PagesComponents/PayLoadDifferenceComponent2'

const PayLoadDifference = () => {
    const [id1, setId1]=useState(null)
    const [id2, setId2]=useState(null)
  return (
    <div>
      <button onClick={()=>setId1(1)}>State 1 Id: 1</button>
      <button onClick={()=>setId1(2)}>State 1 Id: 2</button>
      <button onClick={()=>setId1(1)}>State 1 Id: 1</button>

      <button onClick={()=>setId2(1)}>State 2 Id: 1</button>
      <button onClick={()=>setId2(2)}>State 2 Id: 2</button>
      <button onClick={()=>setId2(1)}>State 2 Id: 1</button>
      <PayLoadDifferenceComponent id={id1} />
      <PayLoadDifferenceComponent2 id={id2} />
    </div>
  )
}

export default PayLoadDifference

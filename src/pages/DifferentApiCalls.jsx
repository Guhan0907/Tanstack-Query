import React, { useState } from 'react'
import Component1 from '../PagesComponents/Component1'
import Component2 from '../PagesComponents/Component2'

const DifferentApiCalls = () => {
    const [component1, setComponent1]=useState(false)
    const [component2, setComponent2]=useState(false)
  return (
    <div>
      <button onClick={()=>setComponent1(!component1)}>Mount component 1</button>
      <button onClick={()=>setComponent2(!component2)}>Mount component 2</button>
      {component1 && <Component1 />}
      {component2 && <Component2 />}
    </div>
  )
}

export default DifferentApiCalls

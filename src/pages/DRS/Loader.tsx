import { Html } from '@react-three/drei'
import React from 'react'

const Loader = () => {
  return (
    <Html>
      <div style={{"display":"flex","position":"absolute","top":"0","left":"0","justifyContent":"center","alignItems":"center","width":"100%","height":"100%"}}>
        <div style={{"borderRadius":"9999px","width":"10vw","height":"10vw"}}>
          Loading...
        </div>
      </div>
    </Html>
  )
}

export default Loader
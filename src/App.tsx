import './App.css'

import { Canvas } from '@react-three/fiber'
import RenderSystem from './SolarSystem'
import { useEffect, useState } from 'react'

function App() {

  return (
    <Canvas className='cv'>
      <ambientLight intensity={1}/>
      <directionalLight position={[6,2,3]} intensity={2}/>
      <RenderSystem/>
    </Canvas>
  )
}

export default App

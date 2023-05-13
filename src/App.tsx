import './App.css'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Box from './Box'


function App() {


  return (
    <Canvas className='cv'>
      <ambientLight intensity={1}/>
      <directionalLight position={[6,2,3]} intensity={2}/>
      <Box />
    </Canvas>
  )
}

export default App

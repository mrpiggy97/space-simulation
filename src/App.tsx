import './App.css'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'
import texture from "./assets/solar-texture.jpg"

function App() {
  const map = useLoader(TextureLoader,texture)

  return (
    <div>
      <Canvas className='cv'>
        <OrbitControls/>
        <ambientLight intensity={1}/>
        <directionalLight position={[6,2,3]} intensity={2}/>
        <mesh rotation={[90,0,20]}>
          <boxGeometry attach="geometry" />
          <meshStandardMaterial attach="material" color="yellow" map={map} />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App

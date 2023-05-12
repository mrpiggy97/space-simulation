import './App.css'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import texture from "./assets/solar-texture.jpg"

function App() {
  const map = useLoader(TextureLoader,texture)

  return (
    <div>
      <Canvas className='cv'>
        <ambientLight intensity={1}/>
        <directionalLight position={[6,2,3]} intensity={2}/>
        <mesh position={[5,0,0]} scale={1}>
          <boxGeometry attach="geometry"/>
          <meshStandardMaterial attach="material" color="yellow" map={map} />
        </mesh>
      </Canvas>
      <Canvas>
        <ambientLight intensity={1}/>
        <OrbitControls enableZoom={false}/>
        <directionalLight position={[6,2,3]} intensity={2}/>
        <Sphere>
          <MeshDistortMaterial distort={0.3} attach="material" color={"red"} map={map}/>
        </Sphere>
      </Canvas>
    </div>
  )
}

export default App

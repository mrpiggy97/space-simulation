import './App.css'

import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import Planet, {Sun, Saturn} from './SolarSystem'
import mercury from "./assets/mercury.jpg"
import venus from "./assets/venus.jpg"
import earth from "./assets/earth.jpg"
import mars from "./assets/mars.jpg"
import jupiter from "./assets/jupiter.jpg"
import saturn from "./assets/saturn.jpg"
import saturnRings from "./assets/saturn-rings.png"
import uranus from "./assets/uranus.jpg"
import neptune from "./assets/neptune.jpg"


function App() {
  const mercuryMap = useLoader(TextureLoader,mercury)
  const venusMap = useLoader(TextureLoader,venus)
  const earthMap = useLoader(TextureLoader,earth)
  const marsMap = useLoader(TextureLoader,mars)
  const jupiterMap = useLoader(TextureLoader,jupiter)
  const saturnMap = useLoader(TextureLoader,saturn)
  const uranusMap = useLoader(TextureLoader,uranus)
  const neptuneMap = useLoader(TextureLoader,neptune)

  return (
    <Canvas className='cv'>
      <ambientLight intensity={1}/>
      <directionalLight position={[6,2,3]} intensity={2}/>
      <Sun/>
      <Planet radiusX={1.2} radiusY={0} speed={4} scale={0.03} map={mercuryMap} />
      <Planet radiusX={1.5} radiusY={0} speed={3} scale={0.05} map={venusMap}/>
      <Planet radiusX={1.9} radiusY={0} speed={2} scale={0.09} map={earthMap}/>
      <Planet radiusX={2.2} radiusY={0} speed={1.5} scale={0.08} map={marsMap}/>
      <Planet radiusX={5.5} radiusY={2.5} speed={0.8} scale={0.4} map={jupiterMap}/>
      <Saturn radiusX={7} radiusY={3} speed={0.6} scale={0.2} map={saturnMap}/>
      <Planet radiusX={7.7} radiusY={4} speed={0.4} scale={0.1} map={uranusMap}/>
      <Planet radiusX={8.2} radiusY={5.5} speed={0.05} scale={0.1} map={neptuneMap}/>
    </Canvas>
  )
}

export default App

import { useLoader, useFrame } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { Suspense, useMemo, useRef } from "react";
import texture from "./assets/solar-texture.jpg"
import rings from "./assets/saturn-rings.png"
import { DoubleSide } from "three";
import mercury from "./assets/mercury.jpg"
import venus from "./assets/venus.jpg"
import earth from "./assets/earth.jpg"
import mars from "./assets/mars.jpg"
import jupiter from "./assets/jupiter.jpg"
import saturn from "./assets/saturn.jpg"
import uranus from "./assets/uranus.jpg"
import neptune from "./assets/neptune.jpg"

type PlanetProps = {
    radiusX : number
    radiusY : number
    speed : number
    scale: number
    map : any,
    timeout : number,
}

export function Sun() : JSX.Element{
    const map = useLoader(TextureLoader,texture)
    const mesh = useRef<Mesh>(null!)
    useFrame(({clock}) => {
        const a = clock.getElapsedTime()
        mesh.current.rotation.x = a
    })
    return(
        <mesh ref={mesh} scale={1} position={[0,0,0]}>
            <sphereGeometry attach={"geometry"} />
            <meshStandardMaterial
                map={map}
                color="yellow"
                attach="material"
            />
        </mesh>
    )
}

function Saturn(props : PlanetProps) : JSX.Element{
    const ringsMap = useLoader(TextureLoader,rings)
    const mesh = useRef<Mesh>(null!)
    const ringMesh = useRef<Mesh>(null!)

    useFrame(({clock}) => {
        const a = clock.getElapsedTime()
        ringMesh.current.rotation.x = a
        const ellipseX = Math.cos(a * props.speed) * props.radiusX;
        const ellipseY = Math.sin(a * props.speed) * props.radiusY;
        mesh.current.position.set(ellipseX, ellipseY, 0);
        ringMesh.current.position.set(ellipseX,ellipseY,0);
    })

    return (
        <>
            <mesh ref={mesh} scale={props.scale}>
            <sphereGeometry attach="geometry" />
            <meshStandardMaterial attach="material" map={props.map} />
            </mesh>
            <mesh ref={ringMesh} scale={props.scale+0.1}>
            <ringGeometry attach="geometry" />
            <meshBasicMaterial attach="material" map={ringsMap} side={DoubleSide} transparent={true} />
            </mesh>
      </>
    )
}

function Planet(props : PlanetProps) : JSX.Element{
    const mesh = useRef<Mesh>(null!)
    useFrame(({clock}) => {
        const a = clock.getElapsedTime()
        mesh.current.rotation.x = a
        if(props.scale <= 0.1){
            const x = Math.cos(a * props.speed) * props.radiusX;
            const y = Math.sin(a * props.speed) * props.radiusX;
            mesh.current.position.set(x,y,0)
        }
        if(props.scale > 0.09){
            const ellipseX = Math.cos(a * props.speed) * props.radiusX;
            const ellipseY = Math.sin(a * props.speed) * props.radiusY;
            mesh.current.position.set(ellipseX, ellipseY, 0);
        }
    })

    return(
        <mesh ref={mesh} scale={props.scale}>
            <sphereGeometry attach={"geometry"} />
            <meshStandardMaterial attach={"material"} map={props.map}/>
        </mesh>
    )
}

export default function RenderSystem(){
    const mercuryMap = useLoader(TextureLoader,mercury)
    const venusMap = useLoader(TextureLoader,venus)
    const earthMap = useLoader(TextureLoader,earth)
    const marsMap = useLoader(TextureLoader,mars)
    const jupiterMap = useLoader(TextureLoader,jupiter)
    const saturnMap = useLoader(TextureLoader,saturn)
    const uranusMap = useLoader(TextureLoader,uranus)
    const neptuneMap = useLoader(TextureLoader,neptune)
    const planets : PlanetProps[] = useMemo(() => {
        const mercuryP : PlanetProps = {
            radiusX : 1.2,
            radiusY: 0,
            speed: 4,
            scale: 0.03,
            map: mercuryMap,
            timeout : 500
        }
        const venusP: PlanetProps = {
            radiusX: 1.5,
            radiusY: 0,
            speed: 3,
            scale: 0.05,
            map: venusMap,
            timeout : 1000
        }
        const earthP : PlanetProps = {
            radiusX: 1.9,
            radiusY: 0,
            speed: 2,
            scale: 0.09,
            map: earthMap,
            timeout: 1500
        }
        const marsP : PlanetProps = {
            radiusX: 2.2,
            radiusY: 0,
            speed : 1.5,
            scale: 0.08,
            map: marsMap,
            timeout: 2000,
        }
        const jupiterP : PlanetProps = {
            radiusX: 5.5,
            radiusY: 2.5,
            speed: 0.8,
            scale: 0.4,
            map: jupiterMap,
            timeout : 2500,
        }
        return [mercuryP, venusP, earthP, marsP, jupiterP]
    },[mercuryMap,venusMap,earthMap,marsMap,jupiterMap])
    
    const planets2 : PlanetProps[] = useMemo(() => {
        const uranusP : PlanetProps = {
            radiusX: 7.7,
            radiusY: 4,
            speed: 0.4,
            scale: 0.1,
            map: uranusMap,
            timeout: 3500
        }
        const neptuneP : PlanetProps = {
            radiusX: 8.2,
            radiusY: 5.5,
            speed: 0.05,
            scale: 0.1,
            map: neptuneMap,
            timeout: 4000
        }
        return [uranusP, neptuneP]
    }, [uranusMap, neptuneMap])
    return(
        <>
            <Sun/>
            {planets.map((val,index) => (
                <Suspense fallback={null}>
                    <Planet
                    radiusX={val.radiusX}
                    radiusY={val.radiusY}
                    speed={val.speed}
                    scale={val.scale}
                    timeout={200}
                    key={index}
                    map={val.map}
                    />                    
                </Suspense>
            ))}
            <Suspense fallback={null}>
                <Saturn
                radiusX={7}
                radiusY={3}
                scale={0.2}
                speed={0.6}
                map={saturnMap}
                timeout={3000}
                />                
            </Suspense>
            {planets2.map((val,index) => (
                <Suspense fallback={null}>
                    <Planet
                    radiusX={val.radiusX}
                    radiusY={val.radiusY}
                    speed={val.speed}
                    scale={val.scale}
                    timeout={200}
                    key={index}
                    map={val.map}
                    />                    
                </Suspense>
            ))}
        </>
    )
}
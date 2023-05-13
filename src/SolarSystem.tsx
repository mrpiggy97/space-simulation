import { useLoader, useFrame } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useRef } from "react";
import texture from "./assets/solar-texture.jpg"
import rings from "./assets/saturn-rings.png"
import { DoubleSide } from "three";

type PlanetProps = {
    radiusX : number
    radiusY : number
    speed : number
    scale: number
    map : any
}

function Sun() : JSX.Element{
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

export default function Planet(props : PlanetProps) : JSX.Element{
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

export {Sun, Saturn}
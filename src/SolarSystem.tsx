import { useLoader, useFrame } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useRef } from "react";
import texture from "./assets/solar-texture.jpg"

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

function Jupiter(props : PlanetProps) : JSX.Element{
    return (
        <mesh scale={props.scale}>
            <sphereGeometry attach={"geometry"}/>
            <ringGeometry attach={"geometry"}/>
        </mesh>
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

export {Sun, Jupiter}
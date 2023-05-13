import { useLoader, useFrame } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useRef, useState } from "react";
import texture from "./assets/solar-texture.jpg"

export default function Box() : JSX.Element{
    const map = useLoader(TextureLoader,texture)
    const mesh = useRef<Mesh>(null!)
    let counter = 0
    useFrame(({clock}) => {
        const a = clock.getElapsedTime()
        mesh.current.rotation.x = a
        const radius = 1; // Radius of the circular motion
        const speed = 2; // Speed of rotation
        const x = Math.cos(a * speed) * radius;
        const z = Math.sin(a * speed) * radius;
        if(counter < 200){
            console.log(x,z)
            counter++
        }
        mesh.current.position.set(x,z,0)
    })

    return(
        <mesh ref={mesh} scale={0.2}>
            <sphereGeometry attach={"geometry"} />
            <meshStandardMaterial attach={"material"} color={"yellow"} map={map}/>
        </mesh>
    )
}
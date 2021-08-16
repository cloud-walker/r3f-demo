import React from 'react'
import {Canvas, MeshProps, useFrame} from '@react-three/fiber'

export function App() {
  return (
    <div
      style={{height: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr'}}
    >
      <h1>React Three Fiber</h1>

      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Box position={[1.2, 0, 0]} />
        <Box position={[-1.2, 0, 0]} />
      </Canvas>
    </div>
  )
}

function Box(props: MeshProps) {
  const meshRef = React.useRef<THREE.Mesh>()
  const [active, setActive] = React.useState(false)
  const [hovered, setHover] = React.useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => {
    const mesh = meshRef.current
    if (mesh != null) {
      const rotationSpeed = 0.02
      mesh.rotation.x += rotationSpeed
      mesh.rotation.y += rotationSpeed
      mesh.rotation.z += rotationSpeed
    }
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => {
        setActive(not)
      }}
      onPointerOver={() => {
        setHover(true)
      }}
      onPointerOut={() => {
        setHover(false)
      }}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function not(value: boolean) {
  return !value
}

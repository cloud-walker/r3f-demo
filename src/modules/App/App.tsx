import React from 'react'
import {Canvas, MeshProps, RootState, useFrame} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'

import {not} from '../not'

export function App() {
  return (
    <div
      style={{height: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr'}}
    >
      <h1>React Three Fiber</h1>

      <Canvas shadows camera={{position: [10, 5, 5]}}>
        <ambientLight intensity={0.2} />
        <directionalLight castShadow position={[0, 5, 0]} />

        <group>
          <mesh
            receiveShadow
            scale={1000}
            rotation={[-1.5, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeGeometry />
            <shadowMaterial opacity={0.5} />
          </mesh>
        </group>

        <Thing position={[3, 0, -3]} />
        <Thing position={[0, 0, 3]} />
        <Thing position={[-3, 0, -3]} />

        <OrbitControls autoRotate />
      </Canvas>
    </div>
  )
}

function Frame({
  onFrame,
}: {
  onFrame: (state: RootState, delta: number) => void
}) {
  useFrame(onFrame)

  return null
}

function Thing(props: MeshProps) {
  const meshRef = React.useRef<THREE.Mesh>()
  const [active, setActive] = React.useState(false)
  const [hovered, setHover] = React.useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(state => {
    const mesh = meshRef.current
    if (mesh != null) {
      const elapsedTime = state.clock.getElapsedTime()
      const rotationSpeed = Math.sin(elapsedTime)

      mesh.rotation.x = rotationSpeed
      mesh.rotation.y = rotationSpeed
      mesh.rotation.z = rotationSpeed
    }
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      castShadow
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

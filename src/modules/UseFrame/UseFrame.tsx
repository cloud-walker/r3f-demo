import {RootState, useFrame} from '@react-three/fiber'

export function UseFrame({
  onFrame,
}: {
  onFrame: (state: RootState, delta: number) => void
}) {
  useFrame(onFrame)

  return null
}

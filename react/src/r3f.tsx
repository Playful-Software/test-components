import type { ComponentDescription, ComponentProperties } from '@playful/runtime';
import React, { useRef, useState } from 'react';
import { Canvas, MeshProps, useFrame } from 'react-three-fiber';
import type { Mesh } from 'three';

type ThreeProperties = {} & ComponentProperties;

function Three(props: ThreeProperties) {
  // Preserve drawing buffer at design time so it will become part of the preview thumbnail.
  const preserveDrawingBuffer = props.component!.project.designMode;

  return (
    <Canvas gl={{ preserveDrawingBuffer }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-2.2, 0, 0]} />
      <Box position={[2.2, 0, 0]} />
    </Canvas>
  );
}

export const ThreeDescription: ComponentDescription = {
  name: 'Three',
  description: 'The Three Component ...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'React Test Kit',
  renderer: Three,
  extends: 'Play Kit/View',
  properties: {
    // Override default width, height.
    width: { type: 'number', title: 'Width', default: 400 },
    height: { type: 'number', title: 'Height', default: 200 },
  },
};

const Box: React.FC<MeshProps> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [2.5, 2.5, 2.5] : [2, 2, 2]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

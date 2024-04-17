import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';

import { ThreeLoader } from '../../components/ThreeLoader/ThreeLoader';
import AnimalCellModel from '../../Models/AnimalCellModel';

import './threehero.scss';

const ThreeHero = () => {

  const [isRotating, setIsRotating] = useState(false);

  return (
    <Canvas className={`hero-canvas ${isRotating ? "cursor-grabbing" : "cursor-grab"}`} camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<ThreeLoader />}>
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 5, 10]} intensity={2} />
            <spotLight
                position={[0, 50, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
            />
            <hemisphereLight groundColor="#000000" intensity={1} />

            {/* <BirdModel /> */}
            {/* <MagicModel isRotating={isRotating} /> */}
            <AnimalCellModel 
              // @ts-ignore
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              position={[0, 0, -5]}
              scale={[0.75, 0.75, 0.75]}
              rotation={[0.5, 0, 0]}
            />
        </Suspense>
    </Canvas>
  )
}

export default ThreeHero
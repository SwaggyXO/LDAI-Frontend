import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"

import * as THREE from 'three'
import Qutub_scene from '../../assets/Models/Qutub_scene'
import { Ref, Suspense } from "react";
import Lights from "./Lights";
import Loader from "./Loader";

type ModelProps = {
  groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>; 
  controlRef: React.MutableRefObject<undefined>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
}

const ModelView = (props: ModelProps) => {

  const groupRef = props.groupRef;
  const controlRef = props.controlRef;
  const setRotationState = props.setRotationState;
  
  return (
    <View
      className={`w-full h-full absolute`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls 
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0 ,0)}
      /> 

      <group ref={groupRef} name={'small'} position={[0, 0 ,0]}>
        <Suspense fallback={<Loader />}>
          <Qutub_scene 
            scale={[15, 15, 15]}
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
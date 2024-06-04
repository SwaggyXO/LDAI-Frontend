import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  Html,
  OrbitControlsProps,
  useProgress,
} from "@react-three/drei";
import { color } from "three/examples/jsm/nodes/shadernode/ShaderNode.js";
import { Heart as HeartModel } from "../../Models/Heart";
import { Brain as BrainModel } from "../../Models/Brain";
import { InnerEar as InnerEarModel } from "../../Models/InnerEar";
import { Larynx as LarynxModel } from "../../Models/Larynx";
import { Neuron as NeuronModel } from "../../Models/Neuron";
import "./threedcomponent.scss";
import { CubeTextureLoader } from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import * as TWEEN from "@tweenjs/tween.js";
import { Coords } from "../../api/quizApiSlice";
import React from "react";

const annotations = [
  {
    question: "Name this part",
    camPos: {
      x: 8,
      y: 0,
      z: 8,
    },
    lookAt: {
      x: 1,
      y: 0.09,
      z: 1,
    },
  },
  {
    question: "What does Ascending Aorta do?",
    camPos: {
      x: -6,
      y: 1.100902499991096,
      z: 8,
    },
    lookAt: {
      x: -0.6385672631219208,
      y: 1.100902499991096,
      z: 1.8547378740795566,
    },
  },
];

// function ClickLogger() {
//     const { scene, camera } = useThree();
//     const [currentScene, setCurrentScene] = useState(scene);
//     const [currentCamera, setCurrentCamera] = useState(camera);
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();

//     useEffect(() => {
//         setCurrentScene(scene);
//         setCurrentCamera(camera);
//     }, [scene, camera]);

//     useEffect(() => {
//         const logCoordinates = (event: any) => {
//         // Normalize mouse position to -1 to 1 range
//         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//         raycaster.setFromCamera(mouse, currentCamera);

//         // calculate objects intersecting the picking ray
//         const intersects = raycaster.intersectObjects(
//             currentScene.children,
//             true
//         );

//         if (intersects.length > 0) {
//             console.log(intersects[0].point);
//         }
//         };

//         window.addEventListener("click", logCoordinates, false);

//         return () => {
//         window.removeEventListener("click", logCoordinates, false);
//         };
//     }, [currentScene, currentCamera]);

//     return null;
// }

type ThreeDComponentProps = {
  name: string;
  scale: number;
  annotations: {
    question: string;
    cameraPos: Coords;
    lookAt: Coords;
  }[];
};

const ThreeDComponent = (props: ThreeDComponentProps) => {

  const name = props.name;
  const scale = props.scale;
  const annotations = props.annotations;

  const position: any = [];

  const handleModel = (name: string) => {
    
    switch (name) {
      case "Heart":
        position.push(0, 0, 0);
        console.log("Heart from heart");
        return <HeartModel />;
      case "Brain":
        position.push(0.75, -5, 0);
        return <BrainModel />;
      case "InnerEar":
        position.push(0, -0.75, 0);
        return <InnerEarModel />;
      case "Larynx":
        position.push(0, -5, -2);
        return <LarynxModel />;
      case "Neuron":
        position.push(-4, 0, 0);
        return <NeuronModel />;
      default:
        console.log("Heart from here");
        return <HeartModel />;
    }
  };

  const ref = useRef<any>(null);

  function SkyBox() {
    const { scene } = useThree();
    
    const loader = new CubeTextureLoader();

    const texture = loader.load([
      "/textures/skybox/px.png",
      "/textures/skybox/nx.png",
      "/textures/skybox/py.png",
      "/textures/skybox/ny.png",
      "/textures/skybox/pz.png",
      "/textures/skybox/nz.png",
    ]);

    scene.background = texture;
    scene.backgroundIntensity = 0.2;
    return null;
  }

  function Annotations({ controls }: any) {
    const { camera } = useThree();
    const [selected, setSelected] = useState(-1);
    const [hasClickedAnnotation, setHasClickedAnnotation] = useState(false);

    // Closing the annotation view when clicking outside of the annotation
    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (event.target && event.target instanceof Element) {
          const clickedAnnotation = event.target.closest(".annotation-wrapper");
          if (
            !clickedAnnotation &&
            hasClickedAnnotation
          ) {
            const clickedIndex = Array.from(document.querySelectorAll(".annotation-wrapper")).indexOf(clickedAnnotation!);
            if (clickedIndex === selected) {
              setSelected(-1);
              setHasClickedAnnotation(false); // Reset the state
              // Reset camera and target positions
              new TWEEN.Tween(controls.current.target)
                .to({ x: 0, y: 0, z: 0 }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
              new TWEEN.Tween(camera.position)
                .to({ x: 0, y: 0, z: 15 }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
            }
          }
        }
      };

      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }, [controls, camera, hasClickedAnnotation]);

    return (
      <>
        {annotations.map((a, i) => {
          return (
            <Html
              className="annotation-wrapper"
              key={i}
              position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}
            >
              <svg
                height="34"
                width="34"
                transform="translate(-16 -16)"
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="2"
                  fill="rgba(0,0,0,.66)"
                  onPointerUp={() => {
                    if (i === selected) {
                      setSelected(-1);
                      setHasClickedAnnotation(false);
                      // Reset camera and target positions
                      new TWEEN.Tween(controls.current.target)
                        .to({ x: 0, y: 0, z: 0 }, 1000)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start();
                      new TWEEN.Tween(camera.position)
                        .to({ x: 0, y: 0, z: 15 }, 1000)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start();
                    } else {
                      setSelected(i);
                      setHasClickedAnnotation(true);
                      // change target
                      new TWEEN.Tween(controls.current.target)
                        .to(
                          {
                            x: a.lookAt.x,
                            y: a.lookAt.y,
                            z: a.lookAt.z,
                          },
                          1000
                        )
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start();

                      // change camera position
                      new TWEEN.Tween(camera.position)
                        .to(
                          {
                            x: a.cameraPos.x,
                            y: a.cameraPos.y,
                            z: a.cameraPos.z,
                          },
                          1000
                        )
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start();
                    }
                  }}
                />
                <text
                  x="9"
                  y="16"
                  fill="white"
                  fontSize={10}
                  fontFamily="monospace"
                  style={{ pointerEvents: "none" }}
                >
                  {i + 1}
                </text>
              </svg>
              {a.question && i === selected && (
                <div
                  id={"quest_" + i}
                  className="annotation-question"
                  dangerouslySetInnerHTML={{ __html: a.question }}
                />
              )}
            </Html>
          );
        })}
      </>
    );
  }

  function Tween() {
    useFrame(() => {
      TWEEN.update();
    });

    return null;
  }

  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  const content = (
    <Canvas
      gl={{ antialias: false, preserveDrawingBuffer: true }}
      shadows
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{
        width: window.innerWidth,
        height: "90vh",
      }}
    >
      <directionalLight intensity={1} />
      <ambientLight intensity={1} />
      <hemisphereLight intensity={1} />
      {/* Pull scale of the model */}
      <Suspense fallback={<Loader />}>
        <group position={position} scale={scale}>
          <Center>{handleModel(name)}</Center>
        </group>
        <OrbitControls
          ref={ref}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <Annotations controls={ref} />
        <Tween />
        <SkyBox />
      </Suspense>
    </Canvas>
  );

  return content;
};

export const MemoizedThreeDComponent = React.memo(ThreeDComponent);

export default ThreeDComponent;

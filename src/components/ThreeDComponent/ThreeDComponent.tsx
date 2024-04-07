import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import plantCellScene from "../../assets/ThreeModels/plant_cell.glb";
import { useEffect, useRef, useState } from "react";
import "./ThreeDComponent.scss";
import * as TWEEN from "@tweenjs/tween.js";

const ThreeDComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [zoomOutButtonVisible, setZoomOutButtonVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer!: THREE.WebGLRenderer;
    let camera!: THREE.PerspectiveCamera;
    let scene!: THREE.Scene;
    let mesh!: THREE.Mesh;
    let sprite1!: THREE.Sprite<THREE.Object3DEventMap>;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let spriteBehindObject = false;
    const annotation1 = document.querySelector(".annotation1") as HTMLElement;

    const boxElement = document.querySelector(".box") as HTMLElement;

    window.addEventListener(
      "click",
      (event) => {
        // Normalize mouse position to -1 to 1 range
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          console.log(intersects[0].point);
        }
      },
      false
    );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight / 2);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight / 2),
      0.1,
      1000
    );
    // camera.position.x = 750;
    // camera.position.y = 500;
    // camera.position.z = 1250;
    // camera.updateProjectionMatrix();
    console.log(camera.position.x, camera.position.y, camera.position.z);

    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableZoom = false;
    controls.enableDamping = true;

    const ambientlight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientlight);
    const hemilight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemilight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight / 2);
      camera.aspect = window.innerWidth / (window.innerHeight / 2);
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // 0.7070567808043999 4.30955171585083 -2.630984615266012
    // const annotationPosition = new THREE.Vector3(
    //   1.548962918230570196,
    //   0.7712268491476505,
    //   -1.8336998742618607
    // );
    // const annotationText = "Nucleolus";
    // const annotation = createAnnotation(annotationPosition, annotationText);
    // scene.add(annotation);

    const loader = new GLTFLoader();

    loader.load(
      plantCellScene,
      function (data: GLTF) {
        data.scene.scale.set(2, 2, 2);
        const boundingBox = new THREE.Box3().setFromObject(data.scene);
        const boxGeometry = new THREE.BoxGeometry(
          boundingBox.max.x - boundingBox.min.x,
          boundingBox.max.y - boundingBox.min.y,
          boundingBox.max.z - boundingBox.min.z
        );

        mesh = new THREE.Mesh(
          boxGeometry,
          new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
            opacity: 0,
            transparent: true,
          })
        );

        scene.add(mesh);
        // Get the center of the bounding box
        const center = boundingBox.getCenter(new THREE.Vector3());

        // Adjust the model's position
        data.scene.position.sub(center);

        scene.add(data.scene);
        console.log("added");
      },
      undefined,
      function (err: any) {
        console.error(err);
      }
    );

    const spriteMaterial1 = new THREE.SpriteMaterial({
      // map: numberTexture,
      alphaTest: 0.5,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    sprite1 = new THREE.Sprite(spriteMaterial1);
    sprite1.position.set(1, 1, 1);
    sprite1.scale.set(0.5, 0.5, 0.5);
    scene.add(sprite1);

    // const composer = new EffectComposer(renderer);

    // // Add the render pass
    // const renderPass = new RenderPass(scene, camera);
    // composer.addPass(renderPass);

    // // Add the bloom pass
    // const bloomPass = new UnrealBloomPass(
    //   new THREE.Vector2(window.innerWidth, window.innerHeight),
    //   1.5,
    //   0.4,
    //   0.85
    // );
    // composer.addPass(bloomPass);

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 20, 10);
    controls.update();

    function animate() {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      TWEEN.update();
      controls.update();
      renderer.render(scene, camera);
      if (mesh) {
        updateAnnotationOpacity();
        // updateScreenPosition();
      }
    }

    animate();

    // function createAnnotation(
    //   position: THREE.Vector3,
    //   text: string
    // ): THREE.Object3D {
    //   const annotation = new THREE.Object3D();
    //   annotation.position.copy(position);

    //   const canvas = document.createElement("canvas");
    //   const context = canvas.getContext("2d");
    //   if (context) {
    //     context.font = "24px Arial Bold";
    //     context.fillStyle = "white";
    //     context.fillText(text, 0, 20);
    //   }

    //   const texture = new THREE.CanvasTexture(canvas);

    //   const spriteMaterial = new THREE.SpriteMaterial({
    //     map: texture,
    //   });

    //   const sprite = new THREE.Sprite(spriteMaterial);
    //   sprite.scale.set(5, 2, 1);
    //   annotation.add(sprite);

    //   return annotation;
    // }

    boxElement.addEventListener("click", () => {
      console.log("clicked");
      const newCameraPosition = new THREE.Vector3(
        0.2946217774641395,
        5.61910343170166,
        -6.233222830026005
      );
      moveCameraToPosition(newCameraPosition);
    });

    function updateAnnotationOpacity() {
      const meshDistance = camera.position.distanceTo(mesh.position);
      const spriteDistance = camera.position.distanceTo(sprite1.position);
      spriteBehindObject = spriteDistance > meshDistance;
      sprite1.material.opacity = spriteBehindObject ? 0.25 : 1;
      sprite1.material.opacity = 0;
    }

    // function updateScreenPosition() {
    // //   const vector = new THREE.Vector3(
    // //     0.5946217774641395,
    // //     6.61910343170166,
    // //     -4.233222830026005
    // //   );
    // //   vector.project(camera);

    // //   const canvas = renderer.domElement;
    //   vector.x = Math.round((0.5 + vector.x / 2) * canvas.width);
    //   vector.y = Math.round((0.5 - vector.y / 2) * canvas.height);

    //   if (annotation1) {
    //     // console.log(annotation1.style.top, annotation1.style.left);
    //     annotation1.style.top = annotation1.style.top ? `${Number(annotation1.style.top) + 5}px` : "5px";
    //     annotation1.style.left = annotation1.style.left ? `${Number(annotation1.style.left) + 5}px` : "5px";
    //   }
    // }

    function moveCameraToPosition(position: THREE.Vector3) {
      const targetPosition = position.clone();
      const offset = new THREE.Vector3(0, 0, 0);
      targetPosition.add(offset);

      new TWEEN.Tween(camera.position)
        .to(
          { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z },
          1000
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          controls.update();
        })
        .start();
    }

    // window.addEventListener(
    //   "click",
    //   (event) => {
    //     // Normalize mouse position to -1 to 1 range
    //     mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
    //     mouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;

    //     raycaster.setFromCamera(mouse, camera);

    //     // calculate objects intersecting the picking ray
    //     const intersects = raycaster.intersectObjects(scene.children, true);

    //     if (intersects.length > 0) {
    //       const intersection = intersects[0];
    //       if (intersection.object.parent === annotation) {
    //         const vector = new THREE.Vector3();
    //         vector.subVectors(intersection.point, camera.position);
    //         vector.normalize();

    //         // Move the camera to a certain distance away from the clicked point
    //         const distance = -5; // Adjust this value to your liking
    //         camera.position.copy(intersection.point);
    //         camera.position.add(vector.multiplyScalar(distance));

    //         // Make the camera look at the clicked point
    //         camera.lookAt(intersection.point);
    //       }
    //     }
    //   },
    //   false
    // );

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const content = (
    <div className="annotation annotation1">
      <div className="box box1">
        <div className="boxInner">
          <p>
            <strong>Nucleolus</strong>
          </p>
        </div>
        {/* <div className="circleMark circleMark1">1</div> */}
      </div>
    </div>
  );

  return (
    <div id="td-scene" ref={containerRef}>
      {content}
    </div>
  );
};

export default ThreeDComponent;
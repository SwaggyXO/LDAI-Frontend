import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import animalCellScene from "../assets/ThreeModels/animal_cell_plain.glb";
import { useEffect, useRef } from "react";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

const AnimalCellModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // window.addEventListener(
    //   "click",
    //   (event) => {
    //     // Normalize mouse position to -1 to 1 range
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //     raycaster.setFromCamera(mouse, camera);

    //     // calculate objects intersecting the picking ray
    //     const intersects = raycaster.intersectObjects(scene.children, true);

    //     if (intersects.length > 0) {
    //       console.log(intersects[0].point);
    //     }
    //   },
    //   false
    // );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight / 2);
    // document.body.appendChild(renderer.domElement);
    document.querySelector("#td-scene")?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight / 2),
      0.1,
      1000
    );
    camera.updateProjectionMatrix();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight / 2);
      camera.aspect = window.innerWidth / (window.innerHeight / 2);
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enablePan = false;

    const ambientlight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientlight);
    const hemilight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemilight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    const annotationPosition = new THREE.Vector3(
      1.548962918230570196,
      0.7712268491476505,
      -1.8336998742618607
    );
    const annotationText = "Nucleolus";
    const annotation = createAnnotation(annotationPosition, annotationText);
    scene.add(annotation);

    const loader = new GLTFLoader();

    loader.load(
      animalCellScene,
      function (data: GLTF) {
        const boundingBox = new THREE.Box3().setFromObject(data.scene);

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

    controls.autoRotate = true;
    controls.update();

    function animate() {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    }

    animate();

    function createAnnotation(
      position: THREE.Vector3,
      text: string
    ): THREE.Object3D {
      const annotation = new THREE.Object3D();
      annotation.position.copy(position);

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = "24px Arial Bold";
        context.fillStyle = "white";
        context.fillText(text, 0, 20);
      }

      const texture = new THREE.CanvasTexture(canvas);

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(5, 2, 1);
      annotation.add(sprite);

      return annotation;
    }

    window.addEventListener(
      "click",
      (event) => {
        // Normalize mouse position to -1 to 1 range
        mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          const intersection = intersects[0];
          if (intersection.object.parent === annotation) {
            const vector = new THREE.Vector3();
            vector.subVectors(intersection.point, camera.position);
            vector.normalize();

            // Move the camera to a certain distance away from the clicked point
            const distance = -5; // Adjust this value to your liking
            camera.position.copy(intersection.point);
            camera.position.add(vector.multiplyScalar(distance));

            // Make the camera look at the clicked point
            camera.lookAt(intersection.point);
          }
        }
      },
      false
    );

    return () => window.removeEventListener('resize', handleResize);
  });

  return <div id="td-scene" ref={containerRef}></div>;
};

export default AnimalCellModel;
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import getStarfield from "./src/getStarfield";
import { getFresnelMat } from "./src/getFresnelMat";

// set width and height
const w = window.innerWidth;
const h = window.innerHeight;

//set scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w,h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// group for earth tilt
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI /180;
scene.add(earthGroup);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


// add earth and lights
const detail = 15; // for adjusting detail on earyh
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);

const material = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/8081_earthmap10k.jpg"),
    
});

const lightMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/8081_earthlights10k.jpg"),
    blending: THREE.AdditiveBlending,
});

const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/8081_earthhiresclouds4k.jpg"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    side: THREE.DoubleSide,
});


// adding meshes for earth maps
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

// adding night light
const lightsMesh = new THREE.Mesh(geometry, lightMaterial);
scene.add(lightsMesh);

// adding clouds
const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

// adding stars
const starfield = getStarfield({ numStars: 5000 });
scene.add(starfield);

// adding fresnal mat
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

//sunlight for realistic globe look
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2,0.5,1.5);
scene.add(sunLight);


//function for animation THREE.js
function animate() {
    requestAnimationFrame(animate);

    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.00225;
    glowMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
    controls.update();
}

animate();
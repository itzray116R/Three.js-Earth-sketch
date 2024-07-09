import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth ;
const h = window.innerHeight;

//set scene camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w,h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const hemilight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemilight);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
}

animate();

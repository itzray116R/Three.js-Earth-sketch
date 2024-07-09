import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//set scene camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

//create a cube
const geometry = new THREE.BoxGeometry();
//make the cube navy blue
const material = new THREE.MeshBasicMaterial({ color: 0x000080 });
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

//add wireframe and light on the cube

const wireframe = new THREE.WireframeGeometry( geometry );
const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;
scene.add( line );
const light = new THREE.DirectionalLight( 0xffffff, 1 );   
light.position.set( 0, 0, 1 );
scene.add( light );
//animate the cube
function animate() {
    requestAnimationFrame(animate);
    
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);

    
}
animate();
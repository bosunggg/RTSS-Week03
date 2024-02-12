import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Setup the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 0); // Position at the center
light.castShadow = true; // Enable shadows
scene.add(light);

// Add image texture to the walls
const loader = new THREE.TextureLoader();
const texture = loader.load('01.png');
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Load an external 3D model
const astronautLoader = new GLTFLoader();
astronautLoader.load('.glb', function (gltf) {
    const astronaut = gltf.scene;
    astronaut.position.set(0, -1, 0);
    scene.add(astronaut);
});

// Animate the camera
let cameraPositionIndex = 0;
function animateCamera() {
    requestAnimationFrame(animateCamera);
    camera.position.x = Math.sin(cameraPositionIndex) * 5;
    camera.position.z = Math.cos(cameraPositionIndex) * 5;
    camera.lookAt(scene.position);
    cameraPositionIndex += 0.01;
}

// Change the lighting over time
function changeLighting() {
    light.intensity = (Math.sin(Date.now() * 0.001) + 1) / 2 * 0.5 + 0.5; // Oscillate light intensity
}

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    changeLighting();
    renderer.render(scene, camera);
}

animateCamera();
animate();
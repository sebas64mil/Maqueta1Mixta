import * as THREE from 'three';



import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
const container = document.getElementById("canvas-container");
container.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

controls.enablePan= false;
camera.position.z = 5;


// Obtener el color del CSS y aplicarlo a la escena
const rootStyles = getComputedStyle(document.documentElement);
const backgroundColor = rootStyles.getPropertyValue('--color-primary-400').trim(); 

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    return new THREE.Color(r, g, b);
}

scene.background = hexToRgb(backgroundColor);

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );



function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
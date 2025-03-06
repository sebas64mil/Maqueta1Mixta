import * as THREE from 'three';

import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
const container = document.getElementById("auto");
container.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

camera.position.z = 8;

let fbxModel = null; 

const loader = new FBXLoader();
loader.load( '/Public/MaquetaCorte1.fbx', function ( object ) {

	fbxModel=object
    
	object.traverse(function(child) {
        if (child.isMesh) {
            // Aplica un material básico si no tiene un material
            if (child.material) {
                child.material = new THREE.MeshPhongMaterial({
                    color: child.material.color || 0x00ff00 // O el color que desees
                });
            }
        }
    });
	object.scale.set(0.005, 0.005, 0.005);
    object.position.set(0,-1.5,0);
    scene.add( object );
	

} );


const geometry = new THREE.BoxGeometry( 20, 0.5, 20 ); 
const material = new THREE.MeshPhongMaterial( {color: 0x817676} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );

cube.position.y=-2.2

scene.background=new THREE.Color().setHex( 0x112233 )

function animate() {
    

    if (fbxModel) { 
        fbxModel.rotation.y += 0.005; 
    }

	renderer.render( scene, camera );

}
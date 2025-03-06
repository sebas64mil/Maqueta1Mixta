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

/*

section de calculo de la calculadora
*/

let masaAuto1 = 0;  
let tipoDeMasa1 = "kg"; 

document.getElementById("MasaAuto_Aceleracion").addEventListener("input", (event) => {
    masaAuto1 = parseFloat(event.target.value) || 0; 
});
document.getElementById("Masa_unidadesAuto1").addEventListener("input", function() {
    tipoDeMasa1 = this.value || "kg"; 
});

function convertirAKilogramos(valor, unidad) {
    let factorConversion = {
        "mg": 0.000001,
        "cg": 0.00001,
        "g": 0.001,
        "dg": 0.0001,
        "hg": 0.1,
        "kg": 1
    };

    let resultado = valor * (factorConversion[unidad] || 1);
    console.log(`${valor} ${unidad} en kg es: ${resultado} kg`);
}

// Llamar la función cuando se haga clic
document.getElementById("mostrarUnidades1").addEventListener('click', () => {
    convertirAKilogramos(masaAuto1, tipoDeMasa1);
});







function animate() {
    

    if (fbxModel) { 
        fbxModel.rotation.y += 0.005; 
    }

	renderer.render( scene, camera );

}
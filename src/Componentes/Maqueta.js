import * as THREE from 'three';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
const container = document.getElementById("canvas-container");
container.appendChild(renderer.domElement);



camera.position.z = 9;

function rgbToHex(color) {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// Obtener el color del CSS y aplicarlo a la escena
const rootStyles = getComputedStyle(document.documentElement);
const backgroundColor = rootStyles.getPropertyValue('--color-Neutral-50').trim(); 

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    return new THREE.Color(r, g, b);
}

scene.background = hexToRgb("#ffffff");

let materiales =[]
const loader = new FBXLoader();
loader.load( '/Public/MaquetaCorte1.fbx', function ( object ) {
    
    object.scale.set(0.005, 0.005, 0.005);
    object.position.set(0,-1.5,0);

    object.traverse(function(child) {
        if (child.isMesh) {
            const material = child.material;
            // Aplica un material básico si no tiene un material
            if (child.material) {
                child.material = new THREE.MeshBasicMaterial({
                    color: child.material.color || 0x00ff00 // O el color que desees
                });
            }


            if (material.color) {
                console.log('Color del material (RGB):', material.color);
                const hexColor = rgbToHex(material.color); // Convertimos a HEX
                console.log('Color del material (HEX):', hexColor);
                
                // Guardamos el nombre y el color en el mismo objeto
                materiales.push({ name: material.name, color: hexColor });
            }
        }
    });



localStorage.setItem('material', JSON.stringify(materiales));

    scene.add( object );

} );



function animate() {
    camera.position.x = Math.sin(Date.now() * 0.0005) * 5;
    camera.position.y = Math.cos(Date.now() * 0.0005) * 5;
    camera.position.z = Math.cos(Date.now() * 0.0005) * 10;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);

}
renderer.setAnimationLoop( animate );
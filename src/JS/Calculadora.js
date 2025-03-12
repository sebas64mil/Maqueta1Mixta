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


//Creacion de unidades

let masaAuto = 10;  
let tipoDeMasa = "kg"; 
let coeficienteFriccion=10;
let planeta= "Tierra";
let masaAuto2 = 10;  
let tipoDeMasa2 = "kg"; 
let coeficienteFriccion2=10;
let planeta2= "Tierra";
let FuerzaMotor=10;
let TorqueMotor=10;
let tipoTorqueMotor="N_m";
let radioEngranaje=10;
let tiporadioEngranaje="m";
let radioLlantasT=10;
let tiporadioLlantas="m";

//se recolectan los datos de las etiqutas id

document.getElementById("MasaAuto_Aceleracion").addEventListener("input", (event) => {
    masaAuto = parseInt(event.target.value) || 0; 
});

document.getElementById("MasaAuto_Radio").addEventListener("input", (event) => {
    masaAuto2 = parseInt(event.target.value) || 0; 
});


document.getElementById("Masa_unidadesAuto1").addEventListener("input", function() {
    tipoDeMasa = this.value || "kg"; 
});

document.getElementById("Masa_unidadesAuto2").addEventListener("input", function() {
    tipoDeMasa2 = this.value || "kg"; 
});


document.getElementById("CoeficienteFriccion1").addEventListener("input",(event)=>{

    coeficienteFriccion = parseFloat(event.target.value) || 0;
});

document.getElementById("CoeficienteFriccion2").addEventListener("input",(event)=>{

    coeficienteFriccion2 = parseFloat(event.target.value) || 0;
});

document.getElementById("Planetas").addEventListener("input",function () {
    planeta = this.value || "Tierra";
});

document.getElementById("Planetas2").addEventListener("input",function () {
    planeta2 = this.value || "Tierra";
});



document.getElementById("FuerzaMotor").addEventListener("input",(event)=>{
    FuerzaMotor = parseInt(event.target.value);
});

document.getElementById("Torquemotor").addEventListener("input",(event)=>{

    TorqueMotor= parseFloat(event.target.value) || 0;
});

document.getElementById("Torquemotor_Unidades").addEventListener("input",function () {
    tipoTorqueMotor = this.value || "N_m";
});

document.getElementById("Radio1").addEventListener("input",(event)=>{

    radioEngranaje= parseFloat(event.target.value) || 0;
});

document.getElementById("RadioEngranaje1").addEventListener("input",function () {
    tiporadioEngranaje = this.value || "m";
});

document.getElementById("RadioLlantas").addEventListener("input",(event)=>{

    radioLlantasT= parseFloat(event.target.value) || 0;
});

document.getElementById("RadioLlantas1").addEventListener("input",function () {
    tiporadioLlantas = this.value || "m";
});

//conversion de unidades

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
    return resultado;
}

function GravedadPlanetaria(Planeta) {
    let  listaPlanetas={
        "Mercurio": 4,  
        "Venus": 9,    
        "Tierra": 10,   
        "Marte": 4,    
        "Júpiter": 25,  
        "Saturno": 10, 
    };
    let resultado = listaPlanetas[Planeta];
    return resultado;
}

function ConversionNewtonMetro(valor,unidad) {
    let factorConversionTorque = {
        "dyn_cm": 0.0000001,  // Dina centímetro a N·m
        "gf_cm": 0.0000980665, // Gramo-fuerza centímetro a N·m
        "oz_in": 0.00706155,   // Onza-pulgada a N·m
        "lb_in": 0.113,        // Libra-pulgada a N·m
        "kg_cm": 0.0980665,    // Kilogramo-fuerza centímetro a N·m
        "gf_m": 0.00980665,    // Gramo-fuerza metro a N·m
        "N_m": 1,             // Newton metro (sin conversión)
        "lb_ft": 1.356,       // Libra-pie a N·m
        "kg_m": 9.80665       // Kilogramo-fuerza metro a N·m
    };

    let resultado = valor * (factorConversionTorque[unidad]||1);
    return resultado;
}

function conversionLongitud(valor,unidad) {
    let factorConversionLongitud = {
        "mm": 0.001,  // Milímetros a metros
        "cm": 0.01,   // Centímetros a metros
        "dm": 0.1,    // Decímetros a metros
        "m": 1,       // Metros (sin conversión)
        "dam": 10,    // Decámetros a metros
        "hm": 100,    // Hectómetros a metros
        "km": 1000    // Kilómetros a metros
    };

    let resultado = valor * (factorConversionLongitud[unidad] ||1);
    console.log(resultado)
    return resultado;
}

// calcular la aceleracion y el radio

function Aceleracion(masa,Fuerzamotor,Coeficiente,gravedad) {

    if (masa === 0) {
        console.log("Error: La masa no puede ser 0.");
        return;
    }
    
    let aceleracion = (Fuerzamotor/masa)-(Coeficiente*gravedad);
    console.log(`esta es la aceleracion ${aceleracion}`);

    return aceleracion;

    
}

function RadioEngranaje(masa,gravedad,coeficiente,radio1,torquemotor,radioLlantas) {
    if (torquemotor === 0) {
        console.log("Error: el torque no puedeser cero");
        return;
    }

    let Normal= (masa*gravedad)/4;
    let fuerza_friccion=coeficiente*Normal;
    let R_Engranaje=(radio1*fuerza_friccion*radioLlantas)/torquemotor;
    console.log(`Este es el radio del engranaje ${R_Engranaje} la normal ${Normal} fuerza friccion ${fuerza_friccion} coenficiente ${coeficiente} radioLlantas ${radioLlantas}`)
    return R_Engranaje;

}

//Apartado donde se llama y se muestra la aceleracion
document.getElementById("mostrarUnidades1").addEventListener('click', () => {
    let MasaFinal= convertirAKilogramos(masaAuto,tipoDeMasa);
    let gravedadFinal = GravedadPlanetaria(planeta);
    let AceleracionFinal=Math.ceil(Aceleracion(MasaFinal,FuerzaMotor,coeficienteFriccion,gravedadFinal));
    document.getElementById("gravedadPlaneta").innerHTML = `${gravedadFinal} m/s<sup>2</sup>`;

    if ( MasaFinal === 0) {
        document.getElementById("ResultadoAceleracion").innerHTML=`La masa no puede ser 0`;

    }else if(AceleracionFinal<=0 ){

        document.getElementById("ResultadoAceleracion").innerHTML=`se esta desacelerando `;

    }
    
    else{

        document.getElementById("ResultadoAceleracion").innerHTML=`La aceleracion es ${AceleracionFinal} m/s<sup>2</sup>`;

    }

});

//Apartado donde se llama y se muestra el radio del engranaje

document.getElementById("MostrarRadio").addEventListener('click',()=>{
    let MasaFinal= convertirAKilogramos(masaAuto2,tipoDeMasa2);
    let gravedadFinal = GravedadPlanetaria(planeta2);
    let torquemotorFInal = ConversionNewtonMetro(TorqueMotor,tipoTorqueMotor);
    let radioLlantasFinal = conversionLongitud(radioLlantasT,tiporadioLlantas);
    let RadioEngranaje1Final= conversionLongitud(radioEngranaje,tiporadioEngranaje);

    let radioEngranaje2Final= RadioEngranaje(MasaFinal,gravedadFinal,coeficienteFriccion2,RadioEngranaje1Final,torquemotorFInal,radioLlantasFinal);

    document.getElementById("gravedadPlaneta2").innerHTML = `${gravedadFinal} m/s<sup>2</sup>`;

    if (  torquemotorFInal ===0 ) {

        document.getElementById("ResultadoREngranaje").innerHTML=`el torque del motor no puede ser 0`;

    }else if(radioEngranaje2Final<=0){
        document.getElementById("ResultadoREngranaje").innerHTML=`no existe el radio del engranaje Trasero`;
    }
    
    else{

        document.getElementById("ResultadoREngranaje").innerHTML=`El radio del engranaje trasero es ${radioEngranaje2Final} m`;

    }

});

function animate() {
    

    if (fbxModel) { 
        fbxModel.rotation.y += 0.005; 
    }

	renderer.render( scene, camera );

}
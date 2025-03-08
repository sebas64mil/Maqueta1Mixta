// Tipos de cada categoría
let Medidacarton = "none"; 
let Tamañotapa = "none";
let Tamañosilicona = "none"; 
let TamañoEngranaje = "none";
let Tamañapolea = "none";
let Tamañaoliga = "none";
let Grosoralambre = "none";

// Valores numéricos
let numCarton = 0;
let numTapabotella = 0;
let numclip = 0;
let numpincho = 0;
let numMondadiente = 0;
let numsilicona = 0;
let numengranaje = 0;
let numpolea = 0;
let numliga = 0;
let numalambre = 0;

// Precios individuales
const priceclip = 10;
const pricepincho = 100;
const pricemondadiente = 1.3;

// Valores de suma (inicializados en 0)
let sum1 = 0, sum2 = 0, sum3 = 0, sum4 = 0, sum5 = 0, sum6 = 0, sum7 = 0, sum8 = 0, sum9 = 0, sum10 = 0;

// Función genérica para actualizar precios
function actualizarPrecio(inputId, precio, sumaVar, resultadoId) {
    document.getElementById(inputId).addEventListener("input", (event) => {
        let cantidad = parseInt(event.target.value) || 0;
        window[sumaVar] = precio * cantidad;
        document.getElementById(resultadoId).innerHTML = `$ ${window[sumaVar]}`;
    });
}

// Eventos para precios fijos
actualizarPrecio("cant_n3", priceclip, "sum3", "precio3");
actualizarPrecio("cant_n4", pricepincho, "sum4", "precio4");
actualizarPrecio("cant_n5", Math.round(pricemondadiente), "sum5", "precio5");

// Función para manejar selección de elementos con precios variables
function manejarSeleccion(selectId, precios, inputCantidadId, sumaVar, resultadoId) {
    document.getElementById(selectId).addEventListener("input", function () {
        let tipoSeleccionado = this.value || "none";

        document.getElementById(inputCantidadId).addEventListener("input", (event) => {
            let cantidad = parseInt(event.target.value) || 0;
            window[sumaVar] = precios[tipoSeleccionado] * cantidad;
            document.getElementById(resultadoId).innerHTML = `$ ${window[sumaVar]}`;
        });
    });
}

// Precios por tipo de producto
const preciosCarton = {
    none: 0, TamañoA4: 2500, TamañoA3: 5000, TamañoA2: 9000, TamañoA1: 15000, TamañoA0: 25000, Tamañoindustrial: 50000
};
manejarSeleccion("Cant_elemento1", preciosCarton, "cant_n1", "sum1", "precio1");

const preciosTapas = {
    none: 0, Pequeño: 200, Mediana: 500, Grande: 800, Extragrande: 1200
};
manejarSeleccion("Cant_elemento2", preciosTapas, "cant_n2", "sum2", "precio2");

const preciosSiliconas = {
    none: 0, delgada: 1500, grande: 3000
};
manejarSeleccion("Cant_elemento3", preciosSiliconas, "cant_n6", "sum6", "precio6");

const preciosEngranajes = {
    none: 0, Diámetro20mm: 1500, Diámetro30mm: 2500, Diámetro40mm: 3500, Diámetro50mm: 4500, Diámetro60mm: 5500,
    Diámetro70mm: 6500, Diámetro80mm: 7500, Diámetro90mm: 8500, Diámetro100mm: 9500
};
manejarSeleccion("Cant_elemento4", preciosEngranajes, "cant_n7", "sum7", "precio7");

const preciosPoleas = {
    none: 0, Diámetro50mm: 3000, Diámetro75mm: 5000, Diámetro100mm: 7000, Diámetro125mm: 9000,
    Diámetro150mm: 11000, Diámetro200mm: 14000, Diámetro250mm: 17000, Diámetro300mm: 20000
};
manejarSeleccion("Cant_elemento5", preciosPoleas, "cant_n8", "sum8", "precio8");

const preciosLigasCaucho = {
    none: 0, Diámetro30mm: 500, Diámetro40mm: 700, Diámetro50mm: 900, Diámetro60mm: 1100,
    Diámetro70mm: 1300, Diámetro80mm: 1500, Diámetro90mm: 1700, Diámetro100mm: 2000
};
manejarSeleccion("Cant_elemento6", preciosLigasCaucho, "cant_n9", "sum9", "precio9");

const preciosAlambreDulce = {
    none: 0, Calibre8: 4000, Calibre10: 3500, Calibre12: 3000, Calibre14: 2500, Calibre16: 2000,
    Calibre18: 1500, Calibre20: 1200, Calibre22: 1000, Calibre24: 800
};
manejarSeleccion("Cant_elemento7", preciosAlambreDulce, "cant_n10", "sum10", "precio10");

// Cálculo del total
document.getElementById("Total").addEventListener("click", function () {
    let resultado = sum1 + sum2 + sum3 + sum4 + sum5 + sum6 + sum7 + sum8 + sum9 + sum10;

    if (isNaN(resultado) || resultado === 0) {
        document.getElementById("resultado").innerHTML = `Inserta los datos correspondientes`;
    } else {
        document.getElementById("resultado").innerHTML = `Tu carro cuesta $${resultado}`;
    }
});

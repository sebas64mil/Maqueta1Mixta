//tipos de cada categoria
let Medidacarton = "none"; 
let Tamañotapa = "none";
let Tamañosilicona = "none"; 
let TamañoEngranaje="none";
let Tamañapolea = "none";
let Tamañaoliga="none";
let Grosoralambre="none";



//valoresNum
let numCarton = 0;
let numTapabotella = 0;
let numclip = 0;
let numpincho = 0;
let numMondadiente =0;
let numsilicona=0;
let numengranaje=0;
let numpolea=0;
let numliga=0;
let numalambre=0;

//price inviduales

let priceclip=10;
let pricepincho=100;
let pricemondadiente=1.3;

//valores de suma
let sum1;
let sum2;
let sum3;
let sum4;
let sum5;
let sum6;
let sum7;
let sum8;
let sum9;
let sum10;

// valores sin tipo

document.getElementById("cant_n3").addEventListener("input",(event)=>{
    numclip = (parseInt(event.target.value)||0); 
    sum3=priceclip*numclip;
    document.getElementById("precio3").innerHTML=`$ ${sum3}`;

});

document.getElementById("cant_n4").addEventListener("input",(event)=>{
    numpincho = (parseInt(event.target.value)||0);
    sum4=pricepincho*numpincho;
    document.getElementById("precio4").innerHTML=`$ ${sum4}`;
});

document.getElementById("cant_n5").addEventListener("input",(event)=>{
    numMondadiente = (parseInt(event.target.value)||0); 
    sum5=pricemondadiente*numMondadiente;
    sum5=Math.round(sum5)
    document.getElementById("precio5").innerHTML=`$ ${sum5}`;
});


// recoleccion de los tipos

document.getElementById("Cant_elemento1").addEventListener("input", function(){
    Medidacarton = this.value || "none";
    const preciosCarton = {
        none: 0,  // Valor nulo o sin selección
        TamañoA4: 2500,  // Precio aproximado en COP
        TamañoA3: 5000,
        TamañoA2: 9000,
        TamañoA1: 15000,
        TamañoA0: 25000,
        Tamañoindustrial: 50000
    };
    document.getElementById("cant_n1").addEventListener("input",(event) => {

        numCarton = (parseInt(event.target.value)||0); 
        sum1=preciosCarton[Medidacarton]*numCarton;
        document.getElementById("precio1").innerHTML=`$ ${sum1}`;

    });
    
});
document.getElementById("Cant_elemento2").addEventListener("input",function(){
    Tamañotapa = this.value || "none";
    const preciosTapas = {
        none: 0,  // Sin selección
        Pequeño: 200,  // Precio estimado en COP
        Mediana: 500,
        Grande: 800,
        Extragrande: 1200
    };
    document.getElementById("cant_n2").addEventListener("input",(event)=>{

        numTapabotella = (parseInt(event.target.value)||0); 
        sum2 = preciosTapas[Tamañotapa]*numTapabotella;
        document.getElementById("precio2").innerHTML=`$ ${sum2}`;

    });


});

document.getElementById("Cant_elemento3").addEventListener("input",function(){
    Tamañosilicona = this.value || "none";
    const preciosSiliconas = {
        none: 0,  // Sin selección
        delgada: 1500,  // Precio estimado en COP
        grande: 3000
    };


    document.getElementById("cant_n6").addEventListener("input",(event)=>{
        numsilicona = (parseInt(event.target.value)||0);
        sum6 = preciosSiliconas[Tamañosilicona]*numsilicona; 
        document.getElementById("precio6").innerHTML=`$ ${sum6}`;
    });
    

});

document.getElementById("Cant_elemento4").addEventListener("input",function(){
    TamañoEngranaje = this.value || "none";
    const preciosEngranajes = {
        none: 0,  
        Diámetro20mm: 1500,  
        Diámetro30mm: 2500,  
        Diámetro40mm: 3500,  
        Diámetro50mm: 4500,  
        Diámetro60mm: 5500,  
        Diámetro70mm: 6500,  
        Diámetro80mm: 7500,  
        Diámetro90mm: 8500,  
        Diámetro100mm: 9500  
    };

    document.getElementById("cant_n7").addEventListener("input",(event)=>{
        numengranaje = (parseInt(event.target.value)||0);
        sum7 = preciosEngranajes[TamañoEngranaje]*numengranaje;  
        document.getElementById("precio7").innerHTML=`$ ${sum7}`;
    });
});

document.getElementById("Cant_elemento5").addEventListener("input",function(){
    Tamañapolea = this.value || "none";
    const preciosPoleas = {
        none: 0,  
        Diámetro50mm: 3000,  
        Diámetro75mm: 5000,  
        Diámetro100mm: 7000,  
        Diámetro125mm: 9000,  
        Diámetro150mm: 11000,  
        Diámetro200mm: 14000,  
        Diámetro250mm: 17000,  
        Diámetro300mm: 20000  
    };

    document.getElementById("cant_n8").addEventListener("input",(event)=>{
        numpolea = (parseInt(event.target.value)||0); 
        sum8 = preciosPoleas[Tamañapolea]*numpolea; 
        document.getElementById("precio8").innerHTML=`$ ${sum8}`;
    });

});

document.getElementById("Cant_elemento6").addEventListener("input",function(){
    Tamañaoliga = this.value || "none";
    const preciosLigasCaucho = {
        none: 0,  
        Diámetro30mm: 500,  
        Diámetro40mm: 700,  
        Diámetro50mm: 900,  
        Diámetro60mm: 1100,  
        Diámetro70mm: 1300,  
        Diámetro80mm: 1500,  
        Diámetro90mm: 1700,  
        Diámetro100mm: 2000  
    };

    document.getElementById("cant_n9").addEventListener("input",(event)=>{
        numliga = (parseInt(event.target.value)||1); 
        sum9 = preciosLigasCaucho[Tamañaoliga]*numliga; 
        document.getElementById("precio9").innerHTML=`$ ${sum9}`;
    });
});

document.getElementById("Cant_elemento7").addEventListener("input",function(){
    Grosoralambre = this.value || "none";
    const preciosAlambreDulce = {
        none: 0,  
        Calibre8: 4000,  
        Calibre10: 3500,  
        Calibre12: 3000,  
        Calibre14: 2500,  
        Calibre16: 2000,  
        Calibre18: 1500,  
        Calibre20: 1200,  
        Calibre22: 1000,  
        Calibre24: 800  
    };

    document.getElementById("cant_n10").addEventListener("input",(event)=>{
        numalambre = (parseInt(event.target.value)||1);
        sum10 = preciosAlambreDulce[Grosoralambre]*numalambre; 
        document.getElementById("precio10").innerHTML=`$ ${sum10}`;
    });
    
});

document.getElementById("Total").addEventListener("click",function () {
    let resultado = sum1 + sum2 + sum3+ sum4+ sum5+ sum6+ sum7+ sum8+ sum9+ sum10;

    if (isNaN(resultado)) {
        document.getElementById("resultado").innerHTML=`inserta los datos correspodientes`;
    }
    else{
        document.getElementById("resultado").innerHTML=`Tu carro cuesta$ ${resultado}`;
    }

});











const table = document.getElementById("contenido-tabla")

// Recuperar el arreglo desde localStorage
let  materales = JSON.parse(localStorage.getItem('material'));



let set = new Set(materales);
materales = Array.from(set);



// Función para agregar colores a la tabla
function agregarColoresAlaTabla(material) {
    material.forEach((material, index) => {
    const row = table.insertRow(index + 1); // Insertar nueva fila

    // Insertar celdas en la fila
    const cell1 = row.insertCell(0); 
    const cell2 = row.insertCell(1); 

    // Asignar valores a las celdas
    cell1.textContent =material.name ;
    
    cell2.textContent =material.color ;

    });
}

 // Colores de ejemplo
agregarColoresAlaTabla(materales);
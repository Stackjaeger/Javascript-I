// Variables
const ingresos = [
    new Ingreso("Salario", 2000),
    new Ingreso("Venta auto", 5000)
];

const egresos = [
    new Egreso("Renta", 4000),
    new Egreso("Ropa", 800)
];

let porcentajeEgreso = 0.00;
let totalIngresos = 0.00;
let totalEgresos = 0.00;

// Cargar la aplicacion
function cargarApp() {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

function cargarCabecero() {
    let presupuesto = totalIngresos() - totalEgresos(); 
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    let idPresupuesto = document.getElementById("presupuesto");
    idPresupuesto.innerHTML = formatoMoneda(presupuesto);
    let idPorcentaje = document.getElementById("porcentaje");
    idPorcentaje.innerHTML = formatoPorcentaje(porcentajeEgreso);
    let idIngresos = document.getElementById("ingresos");
    idIngresos.innerHTML = formatoMoneda(totalIngresos());
    let idEgresos = document.getElementById("egresos");
    idEgresos.innerHTML = formatoMoneda(totalEgresos());
    // let totalIngresos = 0;
    // let totalEgresos = 0;
    // totalIngresos = total_Ingresos(ingresos);
    // totalEgresos = total_Egresos(egresos);
    // const presupuesto = totalIngresos - totalEgresos;
    // const porcentajeEgreso = totalEgresos / totalIngresos;
    // document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    // document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    // document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos);
    // document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos);
};

// Cargar los elementos de listas de ingreso y egresos
const cargarIngresos = () => {
    let ingresosHTML = "";
    for (const ingreso of ingresos) {
        ingresoHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;

};

const cargarEgresos = () => {
    let egresosHTML = "";
    for (const egreso of egresos) {
        egresoHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

// Funcion Ingresos cargarlos
const total_Ingresos = (ingresos) => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};

// Funcion Egresos cargarlos

const total_Egresos = (egresos) => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
};

// Formatos

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-MX", { style: "percent", minimumFractionDigits: 2 });
};

const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });
};

// Creacion de elementos
// Creacion ingresos
const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
      <div class="elemento limpiarEstilos">
       <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
          <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
          <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
             <ion-button>
              <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
              </ion-button>
             </button>
          </div>
        </div>
      </div>
    `;
    return ingresoHTML;
};

// Creacion de Egresos

const crearEgresoHTML = (egreso) => {
    porcentajeEgreso = egreso.valor / total_Ingresos(ingresos);
    let egresoHTML = `
      <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
          <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
          <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
          <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
             <ion-button>
              <ion-icon name="close-circle-outline" aria-hidden="true" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
              </ion-button>
             </button>
          </div>
        </div>
      </div>
    `;
    return egresoHTML;
};

// Eliminar daros de ingreso
const eliminarIngreso = (id) => {
    let indiceEliminar = egresos.findIndex(indice => indice.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
};

// Eliminar dato de egresos
const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(indice => indice.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
};

// Agregar dato
const agregarDato = () => {
    let forma = document.getElementById("forma");
    let tipo = document.getElementById("tipo");
    let descripcion = document.getElementById("descripcion");
    let valor = document.getElementById("valor");
    if (descripcion.value !== "" && valor.value !== "") {
        if (tipo.value === "ingreso") {
            let ingreso = new Ingreso(descripcion.value, parseFloat(valor.value))
            ingresos.push(ingreso);
            cargarCabecero();
            cargarIngresos();
            descripcion.value = "";
            valor.value = "";
        }
        else if(tipo.value === "egreso"){
            let egreso = new Egreso(descripcion.value, parseFloat(valor.value))
            egresos.push(egreso);
            cargarCabecero();
            cargarEgresos();
            descripcion.value = "";
            valor.value = "";
        }
    }
    else{
        alert("La DESCRIPCION y el VALOR debe ser llenada");
    }
}

cargarIngresos();
cargarEgresos();

// Variables
const ingresos = [
    new Ingreso("Salario", 2000),
    new Ingreso('Venta auto', 5000)
];

const egresos = [
    new Egreso('Renta', 4000),
    new Egreso('Ropa', 800)
];

var porcentajeEgreso = 0.00;
var totalIngresos = 0.00;
var totalEgresos = 0.00;

//carga de funcionrs generales

function cargarApp() {
    cargarCabecero();
}

function cargarCabecero() {
    let totalIngresos = 0;
    let totalEgresos = 0;
    totalIngresos = total_Ingresos(ingresos);
    totalEgresos = total_Egresos(egresos);
    const presupuesto = totalIngresos - totalEgresos;
    const porcentajeEgreso = totalEgresos / totalIngresos;
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos);
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos);
};

cargarIngresos();
cargarEgresos();

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

//formatos de numeros

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 });
};


const cargarIngresos = () => {
    let ingresosHTML = "";
    for (const ingreso of ingresos) {
        const ingresoHTML = crearIngresoHTML(ingreso);
        ingresosHTML += ingresoHTML;
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

const cargarEgresos = () => {
    let egresosHTML = "";
    for (const egreso of egresos) {
        const egresoHTML = crearEgresoHTML(egreso);
        egresosHTML += egresoHTML;
    }
     document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

//edits html

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
      <div class="elemento limpiarEstilos">
       <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
          <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
          <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
             <ion-button>
              <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
              </ion-button>
             </button>
          </div>
        </div>
      </div>
    `;
    return ingresoHTML;
};

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
              <ion-icon name="close-circle-outline" aria-hidden="true" onclick='eliminarEgreso(${egreso.id})'></ion-icon>
              </ion-button>
             </button>
          </div>
        </div>
      </div>
    `;
    return egresoHTML;
};

const eliminarIngreso = (id) => {
    const indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    totalIngresos = 0;
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.valor;
    }
    porcentajeEgreso = totalEgresos / totalIngresos;    
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

const eliminarEgreso = (id) => {
    const indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    porcentajeEgreso = totalEgresos / totalIngresos;
    cargarCabecero();
    cargarEgresos();
};

const agregarDato = () => {
    const forma = document.getElementById('forma');
    const tipo = forma.tipo.value;
    const descripcion = forma.descripcion.value;
    if (descripcion == "") {
        alert("Favor de indicar la descripción");
    }
    const valor = Number(forma.importe.value);
    // console.log("Tipo = " + typeof (valor));
    if (descripcion !== '' && valor !== '') {
        if (tipo === 'ingreso') {
            ingresos.push(new Ingreso(descripcion, valor));
            totalIngresos = 0;
            for (let ingreso of ingresos) {
                totalIngresos += ingreso.valor;
            }
            cargarCabecero();
            cargarIngresos();
            cargarEgresos();
        }
        else {
            egresos.push(new Egreso(descripcion, valor));
            totalEgresos = 0;
            for (let egreso of egresos) {
                totalEgresos += egreso.valor;
            }
            cargarCabecero();
            cargarEgresos();
        }
    }
    document.getElementById("forma").reset();
}

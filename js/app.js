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

const cargarCabecero = () => {
    let presupuesto = totalIngresos()-totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    console.log(presupuesto);
    console.log(porcentajeEgreso);
    console.log(totalIngresos());
    console.log(totalEgresos());
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
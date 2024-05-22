import misFunciones from './funciones.js';
import simplex from './Simplex.js';
// Determinar las el tiempo por bote de cada maquina.
//Declaracion de constantes

function resolverSimplex() {
  //DEclaracion de variables
let metraje=[];
let velocidad=[];
let tiempo=[];
let peso=[];
let precio=[];
let tiempoPro;
let pesoCinta=[];

// Codigo para capturar el tiempo de produccion 
tiempoPro = parseFloat(document.getElementById('tiempoPro').value);

// Codigo para capturar el peso de la cinta

peso[0]=parseFloat(document.getElementById('pesoM1').value);
peso[1]=parseFloat(document.getElementById('pesoM2').value);
peso[2]=parseFloat(document.getElementById('pesoM3').value);
peso[3]=parseFloat(document.getElementById('pesoM4').value);

//Codigo para capturar el metraje
metraje[0]=parseFloat(document.getElementById('metrajeM1').value);
metraje[1]=parseFloat(document.getElementById('metrajeM2').value);
metraje[2]=parseFloat(document.getElementById('metrajeM3').value);
metraje[3]=parseFloat(document.getElementById('metrajeM4').value);

//Codigo para capturar la velocidad
velocidad[0]=parseFloat(document.getElementById('velocidadM1').value);
velocidad[1]=parseFloat(document.getElementById('velocidadM2').value);
velocidad[2]=parseFloat(document.getElementById('velocidadM3').value);
velocidad[3]=parseFloat(document.getElementById('velocidadM4').value);

//Calculando los tiempos para las restricciones de la 1 a la 4

for(let i=0; i<4; i++){
  tiempo[i] = (metraje[i]/velocidad[i])/60;
}


// Calculo del peso de la cinta del bote
// Converesion 1 text = 1gr/km
// El peso de la cinta es peso(Ktex) *(metraje/1000)

for(let i=0; i<4; i++){
  pesoCinta[i]= parseFloat(peso[i] * (metraje[i]/1000));
}

//Codigo para capturar el precio
precio[0]=parseFloat(document.getElementById('precioM1').value) * pesoCinta[0] * -1;
precio[1]=parseFloat(document.getElementById('precioM2').value) * pesoCinta[1] * -1;
precio[2]=parseFloat(document.getElementById('precioM3').value) * pesoCinta[2] * -1;
precio[3]=parseFloat(document.getElementById('precioM4').value) * pesoCinta[3] * -1;


// tabla simplex 5*10 x1, x2, x3, x4, x5, x6, x7, x8, x9
let A = [
  [1, precio[0], precio[1], precio[2], precio[3], 0, 0, 0, 0, 0, 0],
  [0, tiempo[0], 0, 0, 0, 1, 0, 0, 0, 0, tiempoPro],
  [0, 0, tiempo[1], 0, 0, 0, 1, 0, 0, 0, tiempoPro],
  [0, 0, 0, tiempo[2], 0, 0, 0, 1, 0, 0, tiempoPro],
  [0, 0, 0, 0, tiempo[3], 0, 0, 0, 1, 0, tiempoPro],
  [0, pesoCinta[0], pesoCinta[1], pesoCinta[2], pesoCinta[3], 0, 0, 0, 0, 1, 4411]
]


//llamando a la clase Simplex para solucionar el modelo

const simp = new simplex(A)

var res = simp.MSimplex();

const fun = new misFunciones(res.Solucion[0],res.Solucion[1],res.Solucion[2],res.Solucion[3]);

var pantalla = document.getElementById('result');

console.log('Solución del modelo', res.Solucion);
console.log('Solución del modelo', res.Valor);

pantalla.style.display = 'block';

//Este codigo es para escribir en la pantalla
pantalla.innerHTML = `<h2>Solucion del modelo de programacion lineal</h2>` 
                     + `<p>-------------------------------Modelo calculado-------------------------------------</p>`
                     + `<p>Max.Z = ${(precio[0]*-1).toFixed(2)}X1 + ${(precio[1]*-1).toFixed(2)}X2 + ${(precio[2]*-1).toFixed(2)}X3 + ${(precio[3]*-1).toFixed(2)}X4</p> `
                     + `<p>R1 = ${(tiempo[0]).toFixed(2)}X1 = 12</p> `
                     + `<p>R2 = ${(tiempo[1]).toFixed(2)}X2 = 12</p> `
                     + `<p>R3 = ${(tiempo[2]).toFixed(2)}X3 = 12</p> `
                     + `<p>R4 = ${(tiempo[3]).toFixed(2)}X5 = 12</p> `
                     + `<p>R5 = ${(pesoCinta[0]).toFixed(2)}X1 + ${(pesoCinta[1]).toFixed(2)}X2 + ${(pesoCinta[2]).toFixed(2)}X3 + ${(pesoCinta[3]).toFixed(2)}X4</p> `
                     + `<p>-------------------------------Solución---------------------------------------------</p>`
                     + `<p>El beneficio Max. es= $${res.Solucion[4].toFixed(2)} </p>`
                     + `<p>La cantidad de botes producidos por la Carda 1 (X1)= ${res.Solucion[0].toFixed(0)}</p>`
                     + `<p>La cantidad de botes producidos por la Carda 2 (X2)= ${res.Solucion[1].toFixed(0)} </p>`
                     + `<p>La cantidad de botes producidos por la Carda 3 (X3)= ${res.Solucion[2].toFixed(0)} </p>`
                     + `<p>La cantidad de botes producidos por la Carda 4 (X4)= ${res.Solucion[3].toFixed(0)} </p>`
                     + `<p>-----------------------Comprobacion de la solución----------------------------</p>`
                     + `<p>El tiempo de la maquina 1= ${fun.restriccion1(tiempo[0]).toFixed(2)} </p>`
                     + `<p>El tiempo de la maquina 2= ${fun.restriccion2(tiempo[1]).toFixed(2)} </p>`
                     + `<p>El tiempo de la maquina 3= ${fun.restriccion3(tiempo[2]).toFixed(2)} </p>`
                     + `<p>El tiempo de la maquina 4= ${fun.restriccion4(tiempo[3]).toFixed(2)} </p>`
                     + `<p>La producción total optima en kg= ${fun.restriccion5(pesoCinta).toFixed(2)}</p>`


}

const boton = document.getElementById('btnCalcular');
boton.addEventListener("click", resolverSimplex)

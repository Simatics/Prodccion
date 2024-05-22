export default class simplex{
   

    // El constructor recibe 3 arreglos con los coeficientes de la funcion objetivo, las restricciones y el lado derecho
    constructor(tabla){
       this.tabla = tabla;
       
    }



    MSimplex() {
        
        //Con este codigo se determina el numero de filas o restricciones
        const m = 6;
        //Con este codigo se determina el numero de columnas o variables
        const n = 11;

        // Construir la tabla inicial 
        let tablaSimplex = this.tabla;
    
 
         
        //console.log('Esta es la tabla simplex', tablaSimplex)
        //Determinar la columna pivote o la entrada
        let contador = 0;

        let solucion = [];
        
        while (true) {

            //Con este codigo se determina la columna pivote
            let ColumnaPivote = 1;
            let minValor = 0;

            for (let j = 0; j < n;  j++) {
                
                if(tablaSimplex[0][j] < minValor){
                    minValor = tablaSimplex[0][j];
                    ColumnaPivote = j;
                }
                
            }

            
            
            // Se comprueba la condicion de optimidad si se cumple se sale del ciclo while
            if(minValor >= 0){
                break;
            }
            

            // Con este codigo se determina la fila pivote 
            let filaPivote = -1;
            let razonActual = 0;
            let razonAnterior=0;

            console.log('-------------------------Iteracion--------- ', contador);

            tablaSimplex.forEach(function(element, index, tablaSimplex) {
                console.log(element);
            });

            console.log('-------------------------Iteracion--------- ', contador);

            for (let i = 1; i < m; i++) {
                
                if (tablaSimplex[i][ColumnaPivote]>0) {
                    razonActual = tablaSimplex[i][n]/tablaSimplex[i][ColumnaPivote];
                    if(razonAnterior == 0){
                        razonAnterior = razonActual;
                        filaPivote = i;
                    }else if(razonAnterior > razonActual){
                        razonAnterior = razonActual;
                        filaPivote = i;
                    }
                }
                
                
            }
            console.log('Columna pivote:', ColumnaPivote, 'iteracion :', contador);
            console.log('Fila pivote:', filaPivote, 'iteracion :', contador);
            

            if(filaPivote===-1){
                throw new Error("Solución no acotada");
            } 

            //Este codigo es para realizar la operacion de filas 

            let pivotValor = tablaSimplex[filaPivote][ColumnaPivote];

            for (let j = 0; j < n; j++) {
                // Este codigo divide la fila pivote entre el elemento pivote dejando el elemento pivote con el valor de cero
                tablaSimplex[filaPivote][j]/=pivotValor;               
            }

            
            
            for (let i = 0; i < m; i++) {
                
                if(i!== filaPivote){
                    
                    let elementoPivote;
                    let cPivote;
                    
                    cPivote = tablaSimplex[i][ColumnaPivote];

                    for(let j=0; j < n; j++){
                       
                        elementoPivote = tablaSimplex[filaPivote][j];

                        if(cPivote >= 0){

                            tablaSimplex[i][j] += elementoPivote * (cPivote * -1);

                        }else if(cPivote < 0){

                            tablaSimplex[i][j] += elementoPivote * Math.abs(cPivote);


                        }
                       
                    }

                }

            }

            //Este codigo es para almacenar las respuestas
            solucion[contador] = tablaSimplex[filaPivote][10];
            solucion[4] = tablaSimplex[0][10];

            contador++;

            

        }// Fin del while

        
        return {
            Solucion: solucion, Valor: tablaSimplex
        }

    } 


}
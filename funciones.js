 export default class misFunciones{
    

    constructor(x1,x2,x3,x4){
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.x4 = x4;
    }


    //Funcion objetivo
    funcionObjetivo(){
        let resultado = 11.23*this.x1 + 11.23*this.x2 + 11.23*this.x3 + 11.23*this.x4;
        return resultado;
    }
    
    //Restricción 1

    restriccion1(const1){
      
        let resultado1 = const1*this.x1 ;
        return resultado1;

    }

    //Restricción 2

    restriccion2(const1){
      
        let resultado2 = const1*this.x2 
        return resultado2;

    }

        //Restricción 3

    restriccion3(const1){
      
        let resultado3 = const1*this.x3 
        return resultado3;
    
    }
      //Restricción 4

      restriccion4(const1){
      
        let resultado4 = const1*this.x4 
        return resultado4;
    
    }

    //Restriccion 5
    restriccion5(peso){
        let resultado5 = peso[0]*this.x1 + peso[1]*this.x2 + peso[2]*this.x3 + peso[3]*this.x4;
        return resultado5;
    }

   
}


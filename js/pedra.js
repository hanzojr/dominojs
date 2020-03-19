class Pedra {

    posicao;
    lado1;
    lado2;
    vertical;

    width;
    height;

    tamanho_ponto;

    constructor(lado1, lado2) {
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.vertical = true;
        
        this.posicao = new Ponto();
    }


    draw(x, y) {

        this.posicao.x = x;
        this.posicao.y = y;

        let radius = TAMANHO_PEDRA * 0.10;
        this.tamanho_ponto = TAMANHO_PEDRA * 0.05;

        if(this.vertical) {
            this.height = TAMANHO_PEDRA;
            this.width = this.height/2;
        }
        else {
            this.width = TAMANHO_PEDRA;
            this.height = this.width/2;
        }


        context.fillStyle = cores.pedra; 

        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(this.posicao.x + radius, this.posicao.y);
        context.lineTo(this.posicao.x + this.width - radius, this.posicao.y);      
        context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y, this.posicao.x + this.width, this.posicao.y + radius);
        context.lineTo(this.posicao.x + this.width, this.posicao.y + this.height - radius);
        context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + this.height, this.posicao.x + this.width - radius, this.posicao.y + this.height);
        context.lineTo(this.posicao.x + radius, this.posicao.y + this.height);
        context.quadraticCurveTo(this.posicao.x, this.posicao.y + this.height, this.posicao.x, this.posicao.y + this.height - radius);
        context.lineTo(this.posicao.x, this.posicao.y + radius);
        context.quadraticCurveTo(this.posicao.x, this.posicao.y, this.posicao.x + radius, this.posicao.y);
        context.closePath();

        context.strokeStyle = "black";
        context.fill();
        context.stroke();

        //linha do meio      
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = cores.divisao;

        if(this.vertical) {
            context.moveTo(this.posicao.x + this.width*0.1, this.posicao.y + this.height/2);
            context.lineTo(this.posicao.x + this.width - this.width*0.1, this.posicao.y + this.height/2);
        }
        else {
            context.moveTo(this.posicao.x + this.width/2, this.posicao.y + this.height*0.1);
            context.lineTo(this.posicao.x + this.width/2, this.posicao.y + this.height-(this.height*0.1) );
        }
        
        context.stroke();
        context.closePath();
        
        
        
        //circulo do meio
     //   context.beginPath();
        context.fillStyle = cores.centro;
        context.arc(this.posicao.x + this.width/2  , this.posicao.y + this.height/2 , TAMANHO_PEDRA * 0.03, 0, 2 * Math.PI, false);
        context.fill();
     //   context.closePath();

        
        //marcaçoes dos lados
        context.fillStyle = cores.ponto;
        this.drawLado1();
        this.drawLado2();


    }

    drawLado1PontoMeio() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + this.width/2  , this.posicao.y + this.height/4 , this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + this.width/4  , this.posicao.y + this.height/2 , this.tamanho_ponto, 0, 2 * Math.PI, false);

        context.fill();
    }

    drawLado1Ponto1() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + this.width/4, this.posicao.y + this.height/8, this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + this.width/8, this.posicao.y + this.height/4, this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();            
    }

    drawLado1Ponto2() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + (3 * this.width/4), this.posicao.y + this.height/8, this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + (3 * this.width/8), this.posicao.y + this.height/4, this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();            
    }

    drawLado1Ponto3() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + this.width/4, this.posicao.y + (2 * this.height/8), this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + (2 * this.width/8), this.posicao.y + this.height/4, this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();            
    }
    
    drawLado1Ponto4() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + (3 * this.width/4), this.posicao.y + (2 * this.height/8), this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + (2 * this.width/8), this.posicao.y + (3 * this.height/4), this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();            
    }  

    drawLado1Ponto5() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + this.width/4, this.posicao.y + (3 * this.height/8), this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + this.width/8, this.posicao.y + (3 * this.height/4), this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();            
    }    

    drawLado1Ponto6() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + (3 * this.width/4), this.posicao.y + (3 * this.height/8), this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + (3 * this.width/8), this.posicao.y + (3 * this.height/4), this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();            
    }
    
    drawLado2PontoMeio() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + this.width/2  , this.posicao.y + 3 * (this.height/4) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + (3*this.width/4)  , this.posicao.y + this.height/2 , this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();  
    }    

    drawLado2Ponto1() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + this.width/4, this.posicao.y + 5 * (this.height/8) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + (5*this.width/8), this.posicao.y + this.height/4 , this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();  
    }
    
    drawLado2Ponto2() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + 3 * (this.width/4), this.posicao.y + 5 * (this.height/8) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + 7 * (this.width/8), this.posicao.y + this.height/4 , this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();  
    } 
    
    drawLado2Ponto3() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + this.width/4, this.posicao.y + 6 * (this.height/8) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + 6 * (this.width/8), this.posicao.y + this.height/4 , this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();  
    }
    
    drawLado2Ponto4() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + 3 * (this.width/4), this.posicao.y + 6 * (this.height/8) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + 6 * (this.width/8), this.posicao.y + 3 * (this.height/4) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();  
    }    
    
    drawLado2Ponto5() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + this.width/4, this.posicao.y + 7 * (this.height/8) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + 5 * (this.width/8), this.posicao.y + 3 * (this.height/4) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();  
    }    
    
    drawLado2Ponto6() {
        context.beginPath();

        if(this.vertical)
            context.arc(this.posicao.x + 3 * (this.width/4), this.posicao.y + 7 * (this.height/8) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        else
            context.arc(this.posicao.x + 7 * (this.width/8), this.posicao.y + 3 * (this.height/4) , this.tamanho_ponto, 0, 2 * Math.PI, false);
        
        context.fill();  
    }
 

    drawLado1() {
        switch(this.lado1) {
            case 1:
                this.drawLado1PontoMeio(); 
            break;

            case 2:
                this.drawLado1Ponto2();
                this.drawLado1Ponto5();
            break;            

            case 3:
                this.drawLado1PontoMeio();
                this.drawLado1Ponto2(); 
                this.drawLado1Ponto5();
            break;     

            case 4:
                this.drawLado1Ponto1(); 
                this.drawLado1Ponto2();
                this.drawLado1Ponto5();
                this.drawLado1Ponto6();
            break;                 
            
            case 5:
                this.drawLado1PontoMeio(); 
                this.drawLado1Ponto1();
                this.drawLado1Ponto2();
                this.drawLado1Ponto5();
                this.drawLado1Ponto6();
            break; 
            
            case 6:
                this.drawLado1Ponto1(); 
                this.drawLado1Ponto2();
                this.drawLado1Ponto3();
                this.drawLado1Ponto4();
                this.drawLado1Ponto5();
                this.drawLado1Ponto6();
            break;              

        }        

    }

    drawLado2() {
        switch(this.lado2) {
            case 1: 
                this.drawLado2PontoMeio(); 
            break;

            case 2: 
                this.drawLado2Ponto2(); 
                this.drawLado2Ponto5(); 
            break;            

            case 3: 
                this.drawLado2PontoMeio(); 
                this.drawLado2Ponto2(); 
                this.drawLado2Ponto5(); 
            break;

            case 4: 
                this.drawLado2Ponto1(); 
                this.drawLado2Ponto2(); 
                this.drawLado2Ponto5(); 
                this.drawLado2Ponto6();
            break;                        
            
            case 5: 
                this.drawLado2PontoMeio(); 
                this.drawLado2Ponto1(); 
                this.drawLado2Ponto2(); 
                this.drawLado2Ponto5(); 
                this.drawLado2Ponto6();
            break;            

            case 6: 
                this.drawLado2Ponto1(); 
                this.drawLado2Ponto2(); 
                this.drawLado2Ponto3(); 
                this.drawLado2Ponto4(); 
                this.drawLado2Ponto5(); 
                this.drawLado2Ponto6();
            break;                        
        }
    }
}
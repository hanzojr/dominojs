class Pedra {

    posicao;
    lado1;
    lado2;
    vertical;
    deitada;

    width;
    height;

    codigo;
    descricao;

    tamanho_ponto;

    _radius;
    _showColisaoArea = false;
    _showPrevisaoEncaixe = true;


    constructor(lado1, lado2) {
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.vertical = true;
        this.deitada = false;
        this.codigo = "["+lado1+"|"+lado2+"]";
        
        this.posicao = new Ponto(0, 0);
    }

    pegarDescricao() {
        if(this.lado1 == this.lado2)
            return "Carroça de "+this.pegarNomeLado(this.lado1);

        return this.pegarNomeLado(lado1) +" e " + this.pegarNomeLado(lado2);

    }

    isCarroca() {
        return (this.lado1 == this.lado2);
    }

    pegarNomeLado(_desc) {
        switch(_desc) {
            case 1: "Ás"; break;
            case 2: "Duque"; break;
            case 3: "Terno"; break;
            case 4: "Quadra"; break;
            case 5: "Quina"; break;
            case 6: "Sena"; break;
        }
    }

    virar() {
        this.vertical = !this.vertical;   
    }

    click() {
        if(mouseX >= this.posicao.x && 
            mouseX <= this.posicao.x + this.width &&
            mouseY >= this.posicao.y && 
            mouseY <= this.posicao.y + this.height)        
            return true;
        else
            return false;
    }    


    draw() {


        this._radius = TAMANHO_PEDRA * 0.10;
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

        context.moveTo(this.posicao.x + this._radius, this.posicao.y);
        context.lineTo(this.posicao.x + this.width - this._radius, this.posicao.y);      
        context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y, this.posicao.x + this.width, this.posicao.y + this._radius);
        context.lineTo(this.posicao.x + this.width, this.posicao.y + this.height - this._radius);
        context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + this.height, this.posicao.x + this.width - this._radius, this.posicao.y + this.height);
        context.lineTo(this.posicao.x + this._radius, this.posicao.y + this.height);
        context.quadraticCurveTo(this.posicao.x, this.posicao.y + this.height, this.posicao.x, this.posicao.y + this.height - this._radius);
        context.lineTo(this.posicao.x, this.posicao.y + this._radius);
        context.quadraticCurveTo(this.posicao.x, this.posicao.y, this.posicao.x + this._radius, this.posicao.y);
        context.closePath();
        context.fill();

        context.lineWidth = 1;
        context.setLineDash([1, 0]);
        context.strokeStyle = "black";
        
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
        context.fillStyle = cores.centro;
        context.arc(this.posicao.x + this.width/2  , this.posicao.y + this.height/2 , TAMANHO_PEDRA * 0.03, 0, 2 * Math.PI, false);
        context.fill();

        //area de colisao
        if(this._showColisaoArea) {
            
            //inferior
            context.beginPath();
            context.moveTo(this.posicao.x, this.posicao.y + this.height);
            context.lineTo(this.posicao.x + this.width, this.posicao.y + this.height);
            context.lineTo(this.posicao.x + this.width, this.posicao.y + this.height + AREA_COLISAO);
            context.lineTo(this.posicao.x, this.posicao.y + this.height + AREA_COLISAO);
            context.lineTo(this.posicao.x, this.posicao.y + this.height);
            //context.lineTo(400,400);

            context.setLineDash([5, 5]);
            context.strokeStyle = "red";
            context.lineWidth = 1;
            context.stroke();
   
        }

        if(this._showPrevisaoEncaixe)
            this.drawPrevisaoEncaixe();


        
        //marcaçoes dos lados
        context.fillStyle = cores.ponto;
        this.drawLado1();
        this.drawLado2();


    }

    drawPrevisaoEncaixe() {

        context.fillStyle = cores.encaixe; 


        if(!this.isCarroca()) {
            if(this.vertical) {

                let correcao = -this.height;

                //encaixe em cima
                context.beginPath();
                context.moveTo(this.posicao.x + this._radius, this.posicao.y + correcao);
                context.lineTo(this.posicao.x + this.width - this._radius, this.posicao.y + correcao);      
                context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + correcao, this.posicao.x + this.width, this.posicao.y + this._radius + correcao);
                context.lineTo(this.posicao.x + this.width, this.posicao.y + this.height - this._radius + correcao);
                context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + this.height + correcao, this.posicao.x + this.width - this._radius, this.posicao.y + this.height + correcao);
                context.lineTo(this.posicao.x + this._radius, this.posicao.y + this.height + correcao);
                context.quadraticCurveTo(this.posicao.x, this.posicao.y + this.height + correcao, this.posicao.x, this.posicao.y + this.height - this._radius + correcao);
                context.lineTo(this.posicao.x, this.posicao.y + this._radius + correcao);
                context.quadraticCurveTo(this.posicao.x, this.posicao.y + correcao, this.posicao.x + this._radius, this.posicao.y + correcao);            
                context.closePath();
                context.fill();            

                correcao = this.height;
                
                //encaixe em baixo
                context.beginPath();
                context.moveTo(this.posicao.x + this._radius, this.posicao.y + correcao);
                context.lineTo(this.posicao.x + this.width - this._radius, this.posicao.y + correcao);      
                context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + correcao, this.posicao.x + this.width, this.posicao.y + this._radius + correcao);
                context.lineTo(this.posicao.x + this.width, this.posicao.y + this.height - this._radius + correcao);
                context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + this.height + correcao, this.posicao.x + this.width - this._radius, this.posicao.y + this.height + correcao);
                context.lineTo(this.posicao.x + this._radius, this.posicao.y + this.height + correcao);
                context.quadraticCurveTo(this.posicao.x, this.posicao.y + this.height + correcao, this.posicao.x, this.posicao.y + this.height - this._radius + correcao);
                context.lineTo(this.posicao.x, this.posicao.y + this._radius + correcao);
                context.quadraticCurveTo(this.posicao.x, this.posicao.y + correcao, this.posicao.x + this._radius, this.posicao.y + correcao);            
                context.closePath();
                context.fill();
            }
            else { //horizontal

                let correcao = -this.width;

                //encaixe na esquerda
                context.beginPath();
                context.moveTo(this.posicao.x + this._radius + correcao, this.posicao.y);
                context.lineTo(this.posicao.x + this.width - this._radius + correcao, this.posicao.y);      
                context.quadraticCurveTo(this.posicao.x + this.width + correcao, this.posicao.y, this.posicao.x + this.width + correcao, this.posicao.y + this._radius);
                context.lineTo(this.posicao.x + this.width + correcao, this.posicao.y + this.height - this._radius);
                context.quadraticCurveTo(this.posicao.x + this.width + correcao, this.posicao.y + this.height, this.posicao.x + this.width - this._radius + correcao, this.posicao.y + this.height);
                context.lineTo(this.posicao.x + this._radius + correcao, this.posicao.y + this.height);
                context.quadraticCurveTo(this.posicao.x + correcao, this.posicao.y + this.height, this.posicao.x + correcao, this.posicao.y + this.height - this._radius);
                context.lineTo(this.posicao.x + correcao, this.posicao.y + this._radius);
                context.quadraticCurveTo(this.posicao.x + correcao, this.posicao.y, this.posicao.x + this._radius + correcao, this.posicao.y);            
                context.closePath();
                context.fill();    
                
                correcao = this.width;

                //encaixe na direita
                context.beginPath();
                context.moveTo(this.posicao.x + this._radius + correcao, this.posicao.y);
                context.lineTo(this.posicao.x + this.width - this._radius + correcao, this.posicao.y);      
                context.quadraticCurveTo(this.posicao.x + this.width + correcao, this.posicao.y, this.posicao.x + this.width + correcao, this.posicao.y + this._radius);
                context.lineTo(this.posicao.x + this.width + correcao, this.posicao.y + this.height - this._radius);
                context.quadraticCurveTo(this.posicao.x + this.width + correcao, this.posicao.y + this.height, this.posicao.x + this.width - this._radius + correcao, this.posicao.y + this.height);
                context.lineTo(this.posicao.x + this._radius + correcao, this.posicao.y + this.height);
                context.quadraticCurveTo(this.posicao.x + correcao, this.posicao.y + this.height, this.posicao.x + correcao, this.posicao.y + this.height - this._radius);
                context.lineTo(this.posicao.x + correcao, this.posicao.y + this._radius);
                context.quadraticCurveTo(this.posicao.x + correcao, this.posicao.y, this.posicao.x + this._radius + correcao, this.posicao.y);            
                context.closePath();
                context.fill();                  




            }

        }
        else { //se for carroça 
            if(this.vertical) { //carroça na vertical

                let localWidth = this.height;
                let localHeight = this.width;

                let correcaoX = -localWidth;
                let correcaoY = localHeight/2;

                //encaixe na esquerda
                context.beginPath();
                context.moveTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);
                context.lineTo(this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + correcaoY); 
                context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + correcaoY, this.posicao.x + localWidth + correcaoX, this.posicao.y + this._radius + correcaoY);
                context.lineTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
                context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
                context.lineTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
                context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
                context.lineTo(this.posicao.x + correcaoX, this.posicao.y + this._radius+ correcaoY);
                context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + correcaoY, this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);            
                context.closePath();
                context.fill();   


                localWidth = this.height;
                localHeight = this.width;

                correcaoX = localWidth/2;
                correcaoY = localHeight/2;                
                
                //encaixe na direita
                context.beginPath();
                context.moveTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);
                context.lineTo(this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + correcaoY); 
                context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + correcaoY, this.posicao.x + localWidth + correcaoX, this.posicao.y + this._radius + correcaoY);
                context.lineTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
                context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
                context.lineTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
                context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
                context.lineTo(this.posicao.x + correcaoX, this.posicao.y + this._radius+ correcaoY);
                context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + correcaoY, this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);            
                context.closePath();
                context.fill();                   

            }
            else { //carroça na  horizontal
                let localWidth = this.height;
                let localHeight = this.width;

                let correcaoX = -localWidth;
                let correcaoY = -localHeight/4;

                //encaixe na esquerda
                context.beginPath();
                context.moveTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);
                context.lineTo(this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + correcaoY); 
                context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + correcaoY, this.posicao.x + localWidth + correcaoX, this.posicao.y + this._radius + correcaoY);
                context.lineTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
                context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
                context.lineTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
                context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
                context.lineTo(this.posicao.x + correcaoX, this.posicao.y + this._radius+ correcaoY);
                context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + correcaoY, this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);            
                context.closePath();
                context.fill();   

                localWidth = this.height;
                localHeight = this.width;

                correcaoX = 2*this.height;
                correcaoY = -localHeight/4;

                //encaixe na esquerda
                context.beginPath();
                context.moveTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);
                context.lineTo(this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + correcaoY); 
                context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + correcaoY, this.posicao.x + localWidth + correcaoX, this.posicao.y + this._radius + correcaoY);
                context.lineTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
                context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
                context.lineTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
                context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
                context.lineTo(this.posicao.x + correcaoX, this.posicao.y + this._radius+ correcaoY);
                context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + correcaoY, this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);            
                context.closePath();
                context.fill();                   
            }

        }


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
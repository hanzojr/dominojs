class Pedra {

    posicao;
    dimensao; //tamanho da pedra, baseado no rate global TAMANHO_PEDRA

    lado1;
    lado2;
    vertical; //status da posição da pedra: vertical ou horizontal
    deitada; //Status da Pedra Deitada na Mesa
    ladosPossiveis = []; //utilizado para determinar quais lados existem colisão com a Pedra Selecionada;
    ponta; //armazena qual foi a ponta que a pedra foi deitada

    carrocaSaida; //status se a pedra for a carroça de saida;

    width;
    height;

    codigo;
    descricao;

    //tamanho_ponto;

    _posicaoAnterior;
    _radius;
    
    _possivelJogarLado1 = false;
    _possivelJogarLado2 = false;
    _showColisaoArea = true;
    //_showPrevisaoEncaixe = true;


    constructor(lado1, lado2) {
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.vertical = true;
        this.deitada = false;
        this.carrocaSaida = false;
        this.codigo = "["+lado1+"|"+lado2+"]";
        
        this.posicao = new Posicao(0, 0);

        this.pegarDimensoes();
    }

    pegarDescricao() {
        if(this.lado1 == this.lado2)
            return "Carroça de "+this.pegarNomeLado(this.lado1);

        return this.pegarNomeLado(lado1) +" e " + this.pegarNomeLado(lado2);

    }

    pegarCoordenada() {
        return "X: "+this.posicao.x + " Y: "+this.posicao.y+ " L: "+this.dimensao.x+ " A: "+this.dimensao.y;
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


    checkColision(pedra) {
       
        for(let i=0;i<this.ladosPossiveis.length;i++) {
            let retangulo1 = new Retangulo(this.ladosPossiveis[i].retangulo.X, this.ladosPossiveis[i].retangulo.Y, this.ladosPossiveis[i].retangulo.L, this.ladosPossiveis[i].retangulo.A);
            let retangulo2 = new Retangulo(pedra.posicao.x, pedra.posicao.y, pedra.dimensao.x, pedra.dimensao.y);

            if((retangulo1.X + retangulo1.L > retangulo2.X) &&
                (retangulo1.X < retangulo2.X + retangulo2.L) &&
                (retangulo1.Y + retangulo1.A > retangulo2.Y) &&
                (retangulo1.Y < retangulo2.Y + retangulo2.A))
                    return this.ladosPossiveis[i];
        }

        return null;

    }

    testarLadoColisao(lado, pedra) {
        if((lado == pedra.lado1) || lado ==pedra.lado2)
            return true;
        return false;
    }

    /**
     * Este método Calcula os Lados de colisão baseados em pedraSelecionada 
     * preenchendo o vetor ladosPossiveis[];
     */
    calcularAreaDeColisao(pedra, ponta) {
        switch(ponta) {
            case 'C': 
                if((mesa.ponta.carrocaSaida != mesa.ponta.esquerda) && //para habilitar superior, precisa ter liberado esquerda e direita
                    (mesa.ponta.carrocaSaida != mesa.ponta.direita)) {
                        if(this.isCarroca()) {
                            if(this.vertical) { //carroça na vertical em cima
                                if(this.testarLadoColisao(this.lado1, pedra)) {
                                    let r = new Retangulo(this.posicao.x, 
                                                            this.posicao.y - TAMANHO_PEDRA,
                                                            TAMANHO_PEDRA/2,
                                                            TAMANHO_PEDRA);
                                                            
                                    this.ladosPossiveis.push(new LadoSelecionado('C', this, r));
                                }
                            }
                            else { //carroça na horizontal em cima
                                if(this.testarLadoColisao(this.lado1, pedra)) {
                                    let r = new Retangulo(this.posicao.x + TAMANHO_PEDRA/4, 
                                                            this.posicao.y - TAMANHO_PEDRA,
                                                            TAMANHO_PEDRA/2,
                                                            TAMANHO_PEDRA);
                                                            
                                    this.ladosPossiveis.push(new LadoSelecionado('C', this, r));
                                }
                            }

                        }
                        else {
                            if(this.vertical) { //pedra normal na vertical em cima
                                if(pedra.isCarroca()) {
                                    if(this.testarLadoColisao(this.lado1, pedra)) {
                                        let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA/4, 
                                                                this.posicao.y - TAMANHO_PEDRA/2,
                                                                TAMANHO_PEDRA,
                                                                TAMANHO_PEDRA/2);
                                                                
                                        this.ladosPossiveis.push(new LadoSelecionado('C', this, r));
                                    }  
                                }
                                else {
                                    if(this.testarLadoColisao(this.lado1, pedra)) {
                                        let r = new Retangulo(this.posicao.x, 
                                                                this.posicao.y - TAMANHO_PEDRA,
                                                                TAMANHO_PEDRA/2,
                                                                TAMANHO_PEDRA);
                                                                
                                        this.ladosPossiveis.push(new LadoSelecionado('C', this, r));
                                    }                                    
                                }

                            }
                            else { //pedra normal na horizontal em cima
                            }

                        }

                    }
            
            
            break;
            case 'B': 
                if((mesa.ponta.carrocaSaida != mesa.ponta.esquerda) && //para habilitar superior, precisa ter liberado esquerda e direita
                (mesa.ponta.carrocaSaida != mesa.ponta.direita)) {            
                    if(this.isCarroca()) {
                        if(this.vertical) { //carroça na vertical embaixo
                            if(this.testarLadoColisao(this.lado2, pedra)) {
                                let r = new Retangulo(this.posicao.x, 
                                                        this.posicao.y + TAMANHO_PEDRA,
                                                        TAMANHO_PEDRA/2,
                                                        TAMANHO_PEDRA);
                                                        
                                this.ladosPossiveis.push(new LadoSelecionado('B', this, r));
                            }  
                        }
                        else { //carroça na horizontal embaixo
                            if(this.testarLadoColisao(this.lado2, pedra)) {
                                let r = new Retangulo(this.posicao.x + TAMANHO_PEDRA/4, 
                                                        this.posicao.y + TAMANHO_PEDRA/2,
                                                        TAMANHO_PEDRA/2,
                                                        TAMANHO_PEDRA);
                                                        
                                this.ladosPossiveis.push(new LadoSelecionado('B', this, r));
                            }                    

                        }

                    }
                    else {
                        if(this.vertical) { //pedra normal na vertical embaixo
                            if(pedra.isCarroca()) {
                                if(this.testarLadoColisao(this.lado2, pedra)) {
                                    let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA/4, 
                                                            this.posicao.y + TAMANHO_PEDRA,
                                                            TAMANHO_PEDRA,
                                                            TAMANHO_PEDRA/2);
                                                            
                                    this.ladosPossiveis.push(new LadoSelecionado('B', this, r));
                                } 
                            }
                            else {
                                if(this.testarLadoColisao(this.lado2, pedra)) {
                                    let r = new Retangulo(this.posicao.x, 
                                                            this.posicao.y + TAMANHO_PEDRA,
                                                            TAMANHO_PEDRA/2,
                                                            TAMANHO_PEDRA);
                                                            
                                    this.ladosPossiveis.push(new LadoSelecionado('B', this, r));
                                }                                  
                            }

                        }
                        else { //pedra normal na horizontal embaixo

                        }

                    }
                
                
                }
            break;
            case 'E': 
                if(this.isCarroca()) { 
                    if(this.vertical) { //carroça na vertical na esquerda

                        if(this.testarLadoColisao(this.lado1, pedra)) {
                            let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA, 
                                                    this.posicao.y + this.dimensao.y/4,
                                                    TAMANHO_PEDRA,
                                                    TAMANHO_PEDRA/2);
                                                    
                            this.ladosPossiveis.push(new LadoSelecionado('E', this, r));
                        }

                    }
                    else { //carroça na horizontal na esquerda

                    }
                }
                else { 
                    if(this.vertical) { //pedra normal na vertical na esquerda;

                    }
                    else { //pedra normal na horizontal na esquerda;

                        if(pedra.isCarroca()) {
                            if(this.testarLadoColisao(this.lado1, pedra)) {
                                let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA/2, 
                                                        this.posicao.y - (TAMANHO_PEDRA/4),
                                                        TAMANHO_PEDRA/2,
                                                        TAMANHO_PEDRA);
                                                        
                                this.ladosPossiveis.push(new LadoSelecionado('E', this, r));
                            }    
                        }
                        else {
                            if(this.testarLadoColisao(this.lado1, pedra)) {
                                let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA, 
                                                        this.posicao.y,
                                                        TAMANHO_PEDRA,
                                                        TAMANHO_PEDRA/2);
                                                        
                                this.ladosPossiveis.push(new LadoSelecionado('E', this, r));
                            }    
                        }   
                    }

                }

            break;
            case 'D': 
                if(this.isCarroca()) {
                    if(this.vertical) { //carroça na vertical na direita
                            if(this.testarLadoColisao(this.lado2, pedra)) {
                                let r = new Retangulo(this.posicao.x + TAMANHO_PEDRA/2, 
                                                        this.posicao.y + (TAMANHO_PEDRA/4),
                                                        TAMANHO_PEDRA,
                                                        TAMANHO_PEDRA/2);
                                                        
                                this.ladosPossiveis.push(new LadoSelecionado('D', this, r));
                            }                         

                    }
                    else { //carroça na horizontal na direita

                    }

                }
                else {
                    if(this.vertical) { //pedra normal na vertical na direita

                    }
                    else { //pedra normal na horizontal na direita
                        if(pedra.isCarroca()) {
                            if(this.testarLadoColisao(this.lado2, pedra)) {
                                let r = new Retangulo(this.posicao.x + TAMANHO_PEDRA, 
                                                        this.posicao.y - (TAMANHO_PEDRA/4),
                                                        TAMANHO_PEDRA/2,
                                                        TAMANHO_PEDRA);
                                                        
                                this.ladosPossiveis.push(new LadoSelecionado('D', this, r));
                            } 
                        }
                        else {
                            if(this.testarLadoColisao(this.lado2, pedra)) {
                                let r = new Retangulo(this.posicao.x + TAMANHO_PEDRA, 
                                                        this.posicao.y,
                                                        TAMANHO_PEDRA,
                                                        TAMANHO_PEDRA/2);
                                                        
                                this.ladosPossiveis.push(new LadoSelecionado('D', this, r));
                            }                              
                        }
                        
                    }
                }
            
            
            break;
        }



        // if(this.isCarroca()) { 
        //     if(this.vertical) { //carroça na vertical
        //         //lado1
        //         if(this.testarLadoColisao(this.lado1, pedra)) {
        //             let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA, 
        //                                     this.posicao.y + this.dimensao.y/4,
        //                                     TAMANHO_PEDRA,
        //                                     TAMANHO_PEDRA/2);
                                            
        //             this.ladosPossiveis.push(new LadoSelecionado('E', this, r));
        //         }

        //         //lado2
        //         if(this.testarLadoColisao(this.lado2, pedra)) {
        //             let r = new Retangulo(this.posicao.x + this.dimensao.x, 
        //                                     this.posicao.y + this.dimensao.y/4,
        //                                     TAMANHO_PEDRA,
        //                                     TAMANHO_PEDRA/2);

        //             this.ladosPossiveis.push(new LadoSelecionado('D', this, r));
        //         }                
        //     }
        //     else {
    
        //     }
        // }
        // else {
        //     if(this.vertical) { //pedra normal na vertical

        //     }
        //     else {//pedra normal na horizontal
        //         switch(this.ponta) {
        //             case 'C': 
                    
        //             break;
        //             case 'B': break;
        //             case 'E': 

        //                 //lado 1
        //                 if(pedra.isCarroca()) {
        //                     if(this.testarLadoColisao(this.lado1, pedra)) {
        //                         let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA/2, 
        //                                                 this.posicao.y - (TAMANHO_PEDRA/4),
        //                                                 TAMANHO_PEDRA/2,
        //                                                 TAMANHO_PEDRA);
                                                        
        //                         this.ladosPossiveis.push(new LadoSelecionado('E', this, r));
        //                     }    
        //                 }
        //                 else {
        //                     if(this.testarLadoColisao(this.lado2, pedra)) {
        //                         let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA, 
        //                                                 this.posicao.y,
        //                                                 TAMANHO_PEDRA,
        //                                                 TAMANHO_PEDRA/2);
                                                        
        //                         this.ladosPossiveis.push(new LadoSelecionado('E', this, r));
        //                     }    
        //                 }                    
                    
        //             break;
        //             case 'D': 
        //                 //lado 1
        //                 if(pedra.isCarroca()) {
        //                     if(this.testarLadoColisao(this.lado1, pedra)) {
        //                         let r = new Retangulo(this.posicao.x - TAMANHO_PEDRA/2, 
        //                                                 this.posicao.y - (TAMANHO_PEDRA/4),
        //                                                 TAMANHO_PEDRA/2,
        //                                                 TAMANHO_PEDRA);
                                                        
        //                         this.ladosPossiveis.push(new LadoSelecionado('D', this, r));
        //                     }    
        //                 }
        //                 else {
        //                     if(this.testarLadoColisao(this.lado2, pedra)) {
        //                         let r = new Retangulo(this.posicao.x + TAMANHO_PEDRA, 
        //                                                 this.posicao.y,
        //                                                 TAMANHO_PEDRA,
        //                                                 TAMANHO_PEDRA/2);
                                                        
        //                         this.ladosPossiveis.push(new LadoSelecionado('D', this, r));
        //                     }    
        //                 }                      
        //             break;                                                            
        //         }

                

            

        //     }

        // }


    }    

    virar() {
        this.vertical = !this.vertical;   
    }

    pegarDimensoes() {
        if(this.vertical)
            this.dimensao = new Posicao(TAMANHO_PEDRA/2, TAMANHO_PEDRA)
        else 
            this.dimensao = new Posicao(TAMANHO_PEDRA, TAMANHO_PEDRA/2)
    }

    inverterLados() {
        let temp = this.lado1;
        this.lado1 = this.lado2;
        this.lado2 = temp;
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

    checkDeitouNaMesa() {
        return this.posicao.y + this.height < mesa.console.posicao.y;
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

        if(this._showColisaoArea)
            this.drawAreaColisao();

      //  if(this._showPrevisaoEncaixe)
         //   this.drawPrevisaoEncaixe();

        
        //marcaçoes dos lados
        context.fillStyle = cores.ponto;
        this.drawLado1();
        this.drawLado2();


    }


    salvarPosicaoAnterior() {
        this._posicaoAnterior = this.posicao;
    }

    devolverPosicaoAnterior() {
        this.posicao = this._posicaoAnterior;
    }

    novaPosicao(posicao) {
        this.posicao = posicao;
        this._posicaoAnterior = null;
    }   

    drawAreaColisao() {

      //  console.log(this.ladosPossiveis.length);

        for(let i=0;i<this.ladosPossiveis.length;i++) {

            let p = this.ladosPossiveis[i].retangulo;

            context.beginPath();
            context.moveTo(p.X, p.Y);
            context.lineTo(p.X + p.L, p.Y);
            context.lineTo(p.X + p.L, p.Y + p.A);
            context.lineTo(p.X, p.Y + p.A);
            context.lineTo(p.X, p.Y);
            //context.lineTo(this.posicao.x, this.posicao.y + this.height);

            context.setLineDash([5, 5]);
            context.strokeStyle = "red";
            context.lineWidth = 1;
            context.stroke();
   

        }

    }
    

    // drawPrevisaoEncaixe() {

    //     context.fillStyle = cores.encaixe; 

    //     //this.deitada && 

    //     if(this.deitada ) {
           
    //         if(!this.isCarroca()) {
    //             if(this.vertical) {
    
    //                 //encaixe em cima

    //                 if(this._possivelJogarLado1) {
    //                     let correcao = -this.height;

    //                     context.beginPath();
    //                     context.moveTo(this.posicao.x + this._radius, this.posicao.y + correcao);
    //                     context.lineTo(this.posicao.x + this.width - this._radius, this.posicao.y + correcao);      
    //                     context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + correcao, this.posicao.x + this.width, this.posicao.y + this._radius + correcao);
    //                     context.lineTo(this.posicao.x + this.width, this.posicao.y + this.height - this._radius + correcao);
    //                     context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + this.height + correcao, this.posicao.x + this.width - this._radius, this.posicao.y + this.height + correcao);
    //                     context.lineTo(this.posicao.x + this._radius, this.posicao.y + this.height + correcao);
    //                     context.quadraticCurveTo(this.posicao.x, this.posicao.y + this.height + correcao, this.posicao.x, this.posicao.y + this.height - this._radius + correcao);
    //                     context.lineTo(this.posicao.x, this.posicao.y + this._radius + correcao);
    //                     context.quadraticCurveTo(this.posicao.x, this.posicao.y + correcao, this.posicao.x + this._radius, this.posicao.y + correcao);            
    //                     context.closePath();
    //                     context.fill();           
    //                 } 


    //                 if(this._possivelJogarLado2) {    
    //                     let correcao = this.height;
                        
    //                     //encaixe em baixo
    //                     context.beginPath();
    //                     context.moveTo(this.posicao.x + this._radius, this.posicao.y + correcao);
    //                     context.lineTo(this.posicao.x + this.width - this._radius, this.posicao.y + correcao);      
    //                     context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + correcao, this.posicao.x + this.width, this.posicao.y + this._radius + correcao);
    //                     context.lineTo(this.posicao.x + this.width, this.posicao.y + this.height - this._radius + correcao);
    //                     context.quadraticCurveTo(this.posicao.x + this.width, this.posicao.y + this.height + correcao, this.posicao.x + this.width - this._radius, this.posicao.y + this.height + correcao);
    //                     context.lineTo(this.posicao.x + this._radius, this.posicao.y + this.height + correcao);
    //                     context.quadraticCurveTo(this.posicao.x, this.posicao.y + this.height + correcao, this.posicao.x, this.posicao.y + this.height - this._radius + correcao);
    //                     context.lineTo(this.posicao.x, this.posicao.y + this._radius + correcao);
    //                     context.quadraticCurveTo(this.posicao.x, this.posicao.y + correcao, this.posicao.x + this._radius, this.posicao.y + correcao);            
    //                     context.closePath();
    //                     context.fill();
    //                 }
    //             }
    //             else { //horizontal
    
    //                 if(this._possivelJogarLado1) {
    //                     let correcao = -this.width;
        
    //                     //encaixe na esquerda
    //                     context.beginPath();
    //                     context.moveTo(this.posicao.x + this._radius + correcao, this.posicao.y);
    //                     context.lineTo(this.posicao.x + this.width - this._radius + correcao, this.posicao.y);      
    //                     context.quadraticCurveTo(this.posicao.x + this.width + correcao, this.posicao.y, this.posicao.x + this.width + correcao, this.posicao.y + this._radius);
    //                     context.lineTo(this.posicao.x + this.width + correcao, this.posicao.y + this.height - this._radius);
    //                     context.quadraticCurveTo(this.posicao.x + this.width + correcao, this.posicao.y + this.height, this.posicao.x + this.width - this._radius + correcao, this.posicao.y + this.height);
    //                     context.lineTo(this.posicao.x + this._radius + correcao, this.posicao.y + this.height);
    //                     context.quadraticCurveTo(this.posicao.x + correcao, this.posicao.y + this.height, this.posicao.x + correcao, this.posicao.y + this.height - this._radius);
    //                     context.lineTo(this.posicao.x + correcao, this.posicao.y + this._radius);
    //                     context.quadraticCurveTo(this.posicao.x + correcao, this.posicao.y, this.posicao.x + this._radius + correcao, this.posicao.y);            
    //                     context.closePath();
    //                     context.fill();    
    //                 }
                    
    //                 if(this._possivelJogarLado2) { 
    //                     let correcao = this.width;
        
    //                     //encaixe na direita
    //                     context.beginPath();
    //                     context.moveTo(this.posicao.x + this._radius + correcao, this.posicao.y);
    //                     context.lineTo(this.posicao.x + this.width - this._radius + correcao, this.posicao.y);      
    //                     context.quadraticCurveTo(this.posicao.x + this.width + correcao, this.posicao.y, this.posicao.x + this.width + correcao, this.posicao.y + this._radius);
    //                     context.lineTo(this.posicao.x + this.width + correcao, this.posicao.y + this.height - this._radius);
    //                     context.quadraticCurveTo(this.posicao.x + this.width + correcao, this.posicao.y + this.height, this.posicao.x + this.width - this._radius + correcao, this.posicao.y + this.height);
    //                     context.lineTo(this.posicao.x + this._radius + correcao, this.posicao.y + this.height);
    //                     context.quadraticCurveTo(this.posicao.x + correcao, this.posicao.y + this.height, this.posicao.x + correcao, this.posicao.y + this.height - this._radius);
    //                     context.lineTo(this.posicao.x + correcao, this.posicao.y + this._radius);
    //                     context.quadraticCurveTo(this.posicao.x + correcao, this.posicao.y, this.posicao.x + this._radius + correcao, this.posicao.y);            
    //                     context.closePath();
    //                     context.fill();    
    //                 }              
    //             }
    
    //         }
    //         else { //se for carroça 
    //             if(this.vertical) { //carroça na vertical
    
    //                 let localWidth = this.height;
    //                 let localHeight = this.width;
    
    //                 let correcaoX = -localWidth;
    //                 let correcaoY = localHeight/2;
    
    //                 //encaixe na esquerda
    //                 context.beginPath();
    //                 context.moveTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);
    //                 context.lineTo(this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + correcaoY); 
    //                 context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + correcaoY, this.posicao.x + localWidth + correcaoX, this.posicao.y + this._radius + correcaoY);
    //                 context.lineTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
    //                 context.lineTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
    //                 context.lineTo(this.posicao.x + correcaoX, this.posicao.y + this._radius+ correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + correcaoY, this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);            
    //                 context.closePath();
    //                 context.fill();   
    
    
    //                 localWidth = this.height;
    //                 localHeight = this.width;
    
    //                 correcaoX = localWidth/2;
    //                 correcaoY = localHeight/2;                
                    
    //                 //encaixe na direita
    //                 context.beginPath();
    //                 context.moveTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);
    //                 context.lineTo(this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + correcaoY); 
    //                 context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + correcaoY, this.posicao.x + localWidth + correcaoX, this.posicao.y + this._radius + correcaoY);
    //                 context.lineTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
    //                 context.lineTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
    //                 context.lineTo(this.posicao.x + correcaoX, this.posicao.y + this._radius+ correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + correcaoY, this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);            
    //                 context.closePath();
    //                 context.fill();                   
    
    //             }
    //             else { //carroça na  horizontal
    //                 let localWidth = this.height;
    //                 let localHeight = this.width;
    
    //                 let correcaoX = localWidth/2;
    //                 let correcaoY = -localHeight;
    
    //                 //encaixe em cima
    //                 context.beginPath();
    //                 context.moveTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);
    //                 context.lineTo(this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + correcaoY); 
    //                 context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + correcaoY, this.posicao.x + localWidth + correcaoX, this.posicao.y + this._radius + correcaoY);
    //                 context.lineTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
    //                 context.lineTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
    //                 context.lineTo(this.posicao.x + correcaoX, this.posicao.y + this._radius+ correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + correcaoY, this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);            
    //                 context.closePath();
    //                 context.fill();   
    
    //                 localWidth = this.height;
    //                 localHeight = this.width;
    
    //                 correcaoX = localWidth/2;
    //                 correcaoY = localHeight/2;
    
    //                 //encaixe em baixo
    //                 context.beginPath();
    //                 context.moveTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);
    //                 context.lineTo(this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + correcaoY); 
    //                 context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + correcaoY, this.posicao.x + localWidth + correcaoX, this.posicao.y + this._radius + correcaoY);
    //                 context.lineTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + localWidth + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + localWidth - this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
    //                 context.lineTo(this.posicao.x + this._radius + correcaoX, this.posicao.y + localHeight + correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + localHeight + correcaoY, this.posicao.x + correcaoX, this.posicao.y + localHeight - this._radius + correcaoY);
    //                 context.lineTo(this.posicao.x + correcaoX, this.posicao.y + this._radius+ correcaoY);
    //                 context.quadraticCurveTo(this.posicao.x + correcaoX, this.posicao.y + correcaoY, this.posicao.x + this._radius + correcaoX, this.posicao.y + correcaoY);            
    //                 context.closePath();
    //                 context.fill();                   
    //             }
    
    //         }
    
    //     }

    // }

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

class Retangulo {
    X;
    Y;
    L;
    A;

    constructor(x, y, l, a) {
        this.X = x;
        this.Y = y;
        this.L = l;
        this.A = a;
    }

}

class LadoSelecionado {
    retangulo;
    ponta;
    pedra;

    constructor(ponta, pedra, retangulo) {
        this.retangulo = retangulo;
        this.ponta = ponta;
        this.pedra = pedra;
    }

}
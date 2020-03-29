class Mesa {
    codigo;
    jogadores = [];
    pedras = [];
    ponta;
    pontas = [];

    console;
    pedraSelecionada;
    diffX;
    diffY;

    _draw_primeira_colisao=false;

    _debug_mensagem = [];
    _debug_mensagem_linha=30;

    _showDebug = true;

    constructor() {
        this.ponta = new Ponta();

        for(let i=0;i<7;i++)
            for(let j=i;j<7;j++)
                this.pedras.push(new Pedra(i,j));
                
        this.embaralhar();        

        // for(let i=0;i<4;i++) {
        //     let jogador = new Jogador("Jogador "+(i+1))
        //     jogador.pedras = this.pedras.slice(7 * i, 7 * i + 7) ;
        //     this.jogadores.push(jogador);
        // }

        for(let i=0;i<2;i++) {
            let jogador = new Jogador("Jogador "+(i+1))
            jogador.pedras = this.pedras.slice(14 * i, 14 * i + 14) ;
            this.jogadores.push(jogador);
        }        

        this.arrumarPedrasNaMao();
       
    }

    embaralhar() { //Fisher–Yates shuffle
        let m = this.pedras.length, t, i;
      
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = this.pedras[m];
          this.pedras[m] = this.pedras[i];
          this.pedras[i] = t;

          if(Math.floor(2 * Math.random()) == 1)
            this.pedras[m].inverterLados();

        }

    }

    drawPrimeiraColisao() {
       // context.fillStyle = cores.mesa;
        context.rect((LARGURA-TAMANHO_PEDRA/2)/2, (ALTURA-TAMANHO_PEDRA)/2, TAMANHO_PEDRA/2, TAMANHO_PEDRA);
        
        context.setLineDash([5, 5]);
        context.strokeStyle = "red";
        context.lineWidth = 1;
        context.stroke();   
       // context.fill();
    }

    draw() {
        if(this._draw_primeira_colisao)
            this.drawPrimeiraColisao();        

        this.console.draw();

        this.drawDebug();
        this.drawMaoJogador();


        
    }

    arrumarPedrasNaMao() {

        this.console = new Console(this.jogadores[0].pedras);

     //   console.log(this.console.posicao.x);
  
        for(let i=0; i < this.jogadores[0].pedras.length; i++)
            this.jogadores[0].pedras[i].posicao = new Posicao(
                                                        this.console.posicao.x + (TAMANHO_PEDRA/2 + TAMANHO_PEDRA*0.1 )*i, 
                                                        ALTURA - (TAMANHO_PEDRA + TAMANHO_PEDRA*0.5) + TAMANHO_PEDRA/4
                                                    );
    }    

    drawMaoJogador() {

        for(let i=0; i<this.jogadores[0].pedras.length; i++)
            this.jogadores[0].pedras[i].draw();

    }    
 

    checkPossibilidadeJogada() {
        for(let i=0;i<28;i++) {


            if(this.pedras[i].deitada) {

                if(this.pedras[i].isCarroca()) {
                    
                    if(this.pedraSelecionada.lado1 == this.pedras[i].lado1)
                        this.pedras[i]._possivelJogarLado1 = true;  
                    else    
                        this.pedras[i]._possivelJogarLado1 = false;  

                }
                else {

                    if((this.pedraSelecionada.lado1 == this.pedras[i].lado1) ||
                        (this.pedraSelecionada.lado2 == this.pedras[i].lado1))
                        this.pedras[i]._possivelJogarLado1 = true;  
                    else    
                        this.pedras[i]._possivelJogarLado1 = false;  

                    if((this.pedraSelecionada.lado1 == this.pedras[i].lado2) ||
                        (this.pedraSelecionada.lado2 == this.pedras[i].lado2)) 
                        this.pedras[i]._possivelJogarLado2 = true;
                    else    
                        this.pedras[i]._possivelJogarLado2 = false;                  

                }
            }


        }
    }

    checkObjectClick() {
         for(let i=0;i<28;i++) {
             if(this.pedras[i].click()) {
                    this.pedraSelecionada = this.pedras[i];
                    this.pedraSelecionada.deitada = false;
                    this.pedraSelecionada.salvarPosicaoAnterior();

                    this.checkPossibilidadeJogada();

                    this.diffX = this.pedraSelecionada.posicao.x - mouseX;
                    this.diffY = this.pedraSelecionada.posicao.y - mouseY;

                   // console.log("ponta: "+this.ponta.cima.codigo);
                    this.calcularAreaDeColisao(this.pedraSelecionada);

             }
    
         }

    }

    calcularAreaDeColisao() {
        if(this.checkPrimeiraPedraDeitada()) {


           // this._draw_primeira_colisao = true;

        }
        else {
            this._draw_primeira_colisao = false;
            this.ponta.cima.calcularAreaDeColisao(this.pedraSelecionada, 'C');
            this.ponta.baixo.calcularAreaDeColisao(this.pedraSelecionada, 'B');
            this.ponta.esquerda.calcularAreaDeColisao(this.pedraSelecionada, 'E');
            this.ponta.direita.calcularAreaDeColisao(this.pedraSelecionada, 'D');
        }
    }

    preencherPonta() {
        if(this.checkPrimeiraPedraDeitada()) {

            console.log("primeira pedra deitada: "+this.pedraSelecionada.codigo);
            this.ponta.cima = this.pedraSelecionada;
            this.ponta.baixo = this.pedraSelecionada;
            this.ponta.esquerda = this.pedraSelecionada;
            this.ponta.direita = this.pedraSelecionada;

            this.ponta.cima_ponta = null;
            this.ponta.baixo_ponta = null;
            this.ponta.esquerda_ponta = this.pedraSelecionada.lado1;
            this.ponta.direita_ponta = this.pedraSelecionada.lado1;

            this.ponta.carrocaSaida = this.pedraSelecionada;

            this.pedraSelecionada.vertical = true;
            this.pedraSelecionada.carrocaSaida = true; //marca pedra como saida;


            this.pedraSelecionada.novaPosicao( new Posicao(
                (LARGURA - TAMANHO_PEDRA/2) / 2,
                (ALTURA - TAMANHO_PEDRA) / 2
            ));

        }
                        
    }

    checkPrimeiraPedraDeitada() {
        if(this.ponta.cima == null &&
            this.ponta.baixo == null &&
                this.ponta.esquerda == null &&
                    this.ponta.direita == null ) 
                        return true;
        return false;
    }

    checkObjectRelease() {
        if(this.pedraSelecionada != null) {

            if(this.checkPrimeiraPedraDeitada()) {
                if(!this.pedraSelecionada.isCarroca()) //primeira pedra nao eh carroca
                    this.pedraSelecionada.devolverPosicaoAnterior(); 
                else {
                    this.pedraSelecionada.deitada = true;
                    this.preencherPonta();
                }
            }
            else {

                let s = this.checkColision();

                if(s == null) {
                    this.pedraSelecionada.devolverPosicaoAnterior();
                } 
                else {
                    this.deitarPedra(s)
                    
                }     
            }      

            for(let i=0;i<28;i++)
                this.pedras[i].ladosPossiveis = [];

            this.pedraSelecionada = null;

        }
        
    }

    deitarPedra(s) {

        let pedra = s.pedra;

        switch(s.ponta) {
            case 'C': 
                if(this.pedraSelecionada.lado2!=s.pedra.lado1)
                    this.pedraSelecionada.inverterLados();

                if(this.pedraSelecionada.isCarroca())
                    this.pedraSelecionada.virar();

                this.ponta.cima=this.pedraSelecionada; 
                this.ponta.cima_ponta=this.pedraSelecionada.lado1; 
                
            break;
            case 'B': 
                if(this.pedraSelecionada.lado1!=s.pedra.lado2)
                    this.pedraSelecionada.inverterLados();

                if(this.pedraSelecionada.isCarroca())
                    this.pedraSelecionada.virar();

                this.ponta.baixo=this.pedraSelecionada; 
                this.ponta.baixo_ponta=this.pedraSelecionada.lado2; 
            break;
            case 'E': 
                    if(this.pedraSelecionada.lado2!=s.pedra.lado1)
                        this.pedraSelecionada.inverterLados();

                    if(!this.pedraSelecionada.isCarroca())
                        this.pedraSelecionada.virar();                    

                    this.ponta.esquerda=this.pedraSelecionada; 
                    this.ponta.esquerda_ponta=this.pedraSelecionada.lado1; 

                break;
            case 'D': 
                    if(this.pedraSelecionada.lado1!=s.pedra.lado2)
                        this.pedraSelecionada.inverterLados();

                    if(!this.pedraSelecionada.isCarroca())
                        this.pedraSelecionada.virar();   

                    this.ponta.direita=this.pedraSelecionada; 
                    this.ponta.direita_ponta=this.pedraSelecionada.lado2; 
                break;  
            default: console.log("ERRO: nao escolheu nenhuma ponta");
                      
        }


        this.pedraSelecionada.deitada = true;
        this.pedraSelecionada.ponta = s.ponta;

        this.pedraSelecionada.posicao = new Posicao(s.retangulo.X, s.retangulo.Y);
        //this.preencherPonta();

    }


    isPonta(pedra) {
        if((pedra == this.ponta.cima) ||
            (pedra == this.ponta.baixo) ||
            (pedra == this.ponta.esquerda) ||
            (pedra == this.ponta.direita))
            return true;
        return false;
    }    


    checkColision() {

        for(let i=0;i<28;i++) {
            if(this.pedras[i] != this.pedraSelecionada && this.pedras[i].deitada) {

                if(this.isPonta(this.pedras[i])) {

                    let p = this.pedras[i].checkColision(this.pedraSelecionada);

                    if(p!=null)
                        return p;
    
    
                }


            }

        }
        return null;

    }



    checkObjectMove() {
        if(holdMouse)
            if(this.pedraSelecionada != null)
                this.pedraSelecionada.posicao = new Posicao(mouseX + this.diffX, mouseY + this.diffY);

    }

    checkKeyDown(code) {

        switch(code) {
            case "Space": 
                if(this.pedraSelecionada!= null)
                    this.pedraSelecionada.virar(); 
                break;

            case "F9":
                    this._showDebug  = !this._showDebug;
                break;

        }

    }

    showPedrasDemo() {
        for(let i=0;i<28;i++)
            this.pedras[i].posicao = new Posicao(i * (TAMANHO_PEDRA/2 + TAMANHO_PEDRA * 0.1), 600);
    }

    showPedras() {
        for(let i=0;i<28;i++)
            this.pedras[i].draw();

    }


    drawDebug() {
        if(this._showDebug) {

            this._debug_mensagem = [];

            this.appendDebugMessage("Mouse X: "+mouseX.toString().padStart(4, "0")+" / Y: " + mouseY.toString().padStart(4, "0"));

            this.appendDebugMessage("LARGURA: "+LARGURA+" | ALTURA: "+ALTURA);

            if(this._showPedraSelecionada)
                if(this.pedraSelecionada == null)
                    this.appendDebugMessage("PEDRA SELECIONADA: NENHUMA"); 
                else    
                    this.appendDebugMessage("PEDRA SELECIONADA: "+this.pedraSelecionada.codigo);       
                    
            if(this.ponta.carrocaSaida !=null)
                this.appendDebugMessage("SAIDA: "+this.ponta.carrocaSaida.codigo);        

            if(this.ponta.carrocaSaida != null) {
                this.appendDebugMessage("PONTAS {"); 
                this.appendDebugMessage("C: "+this.ponta.cima.codigo); 
                this.appendDebugMessage("B: "+this.ponta.baixo.codigo); 
                this.appendDebugMessage("E: "+this.ponta.esquerda.codigo); 
                this.appendDebugMessage("D: "+this.ponta.direita.codigo); 
                this.appendDebugMessage("}               "); 
            }    
            
  

            context.font = "20px Comic Sans MS";
            context.fillStyle = "yellow";
            context.textAlign = "right";            

            for(let i=0, linha=20;i<this._debug_mensagem.length;i++, linha+=30) {
                context.fillText(this._debug_mensagem[i]+ "  ", canvas.width, linha);
    
            }

        }

    }

    appendDebugMessage(str) {
        this._debug_mensagem.push(str);
    }


}

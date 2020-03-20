class Mesa {
    codigo;
    jogadores = [];
    pedras = [];

    // _showPedras = false;
    // _showMousePosition = false;
    // _showPedraPosition = false;
    // _showPedras = false;

    constructor() {

        for(let i=0;i<4;i++)
            this.jogadores.push(new Jogador("Jogador "+(i+1)));


        for(let i=0;i<7;i++)
            for(let j=i;j<7;j++)
                this.pedras.push(new Pedra(i,j));        
        
    }

    embaralhar() {
        contador = [];

        for(jogador=0;jogador<4;jogador++) {
            rand = Math.floor(28 * Math.random());
        }


    }

    checkObjectClick() {


         for(let i=0;i<28;i++) {

             if(mouseX >= this.pedras[i].posicao.x && 
                mouseX <= this.pedras[i].posicao.x + this.pedras[i].width &&
                mouseY >= this.pedras[i].posicao.y && 
                mouseY <= this.pedras[i].posicao.y + this.pedras[i].height) {
         

                    this.pedras[i].posicao.y-=30;
             }

         }
     

    }


    showPedrasDemo() {
        for(let i=0;i<28;i++)
            this.pedras[i].posicao = new Ponto(i * (TAMANHO_PEDRA/2 + TAMANHO_PEDRA * 0.1), 600);

        this.showPedras();
    }

    showPedras() {
        for(let i=0;i<28;i++)
            this.pedras[i].draw();

    }

    showMousePosition() {
        context.font = "20px Comic Sans MS";
        context.fillStyle = "yellow";
        context.textAlign = "left";
        context.fillText("Mouse X: "+mouseX.toString().padStart(4, "0")+" / Y: " + mouseY.toString().padStart(4, "0"), canvas.width-250, 20);        
    }

    showPedraPosition(i) {
        let p;

        if(i instanceof Pedra)
            p = i;
        else
            p = this.pedras[i];

        context.font = "20px Comic Sans MS";
        context.fillStyle = "yellow";
        context.textAlign = "right";
        context.fillText("Pedra "+p.codigo+ " => X: "+p.posicao.x+" | Y: "+p.posicao.y, canvas.width, 50);                

    }



}

pedras = {
    _pedra: [],

    lista: [],

    gerar: function() {
        this._pedra = [];

        for(i=0;i<7;i++)
            for(j=i;j<7;j++)
                this.lista.push(new Pedra(i,j));
        
    },
    
    distribuirPedras: function() {
    
        // for(jogador=0;jogador<4;jogador++) {
        //     console.log("jogador: "+(jogador+1))
        //     for(i=0;i<7;i++) {
                

        //         rand = Math.floor(28 * Math.random());

        //         console.log("RAND: "+rand);

        //         console.log("pedra: "+(i+1)+ "jogador: "+this.lista[rand].jogador)
        //         //while(this.lista[rand].jogador!=0);              
        //         this.lista[rand].jogador = jogador;
        //     }
        // }
    },

    arrumarMao: function() {
        // context.font = "30px Arial";
        // context.fillStyle = "red";

        
        // context.textAlign = "center";        


        // s= 500;
        // for(i=0; i<28; i++) {

        //     if(pedras.lista[i].jogador == 1) {
        //         x = lista[i].x = s;
        //         y = lista[i].y = 100

        //         this.lista[i].draw(x,y);

        //         s+=TAMANHO_PEDRA/2 + TAMANHO_PEDRA*0.1;
        //     }

        // }

    }

}

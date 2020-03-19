class Mesa {
    codigo;

    jogadores = [];

    pedras = [];

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



}

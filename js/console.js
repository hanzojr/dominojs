class Console {
    posicao;

    larguraX;
    alturaY;

    constructor(mao) {

        this.larguraX = mao.length * (TAMANHO_PEDRA/2 + TAMANHO_PEDRA*0.1) + TAMANHO_PEDRA/2;
        this.alturaY = TAMANHO_PEDRA + TAMANHO_PEDRA*0.5;

        this.posicao = new Posicao(
            (LARGURA - this.larguraX) / 2,
            ALTURA - this.alturaY
        );

    }



    draw() {
        context.fillStyle = cores.console; 
        context.rect(this.posicao.x, this.posicao.y, this.larguraX, this.alturaY);
        context.fill();
    }

}
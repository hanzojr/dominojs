class Controle {
    tamanho = 20;
    origem = new Ponto(50, 600);

    draw() {
        context.fillStyle="white";
        context.beginPath();

        this.drawEsquerda();
        this.drawDireita();
        this.drawCima();
        this.drawBaixo();

        context.closePath();

        context.fill();        

    }

    drawEsquerda() {
        context.moveTo(this.origem.x, this.origem.y);
        context.lineTo(this.origem.x + this.tamanho , this.origem.y - this.tamanho);
        context.lineTo(this.origem.x + this.tamanho, this.origem.y + this.tamanho);
    }

    drawDireita() {
        context.moveTo(this.origem.x + this.tamanho * 3, this.origem.y - this.tamanho);
        context.lineTo(this.origem.x + this.tamanho * 4, this.origem.y);
        context.lineTo(this.origem.x + this.tamanho * 3, this.origem.y + this.tamanho);  
    }

    drawCima() {
        context.moveTo(this.origem.x + this.tamanho , this.origem.y - this.tamanho);
        context.lineTo(this.origem.x + this.tamanho * 2, this.origem.y - this.tamanho * 2);
        context.lineTo(this.origem.x + this.tamanho * 3, this.origem.y - this.tamanho);
    }

    drawBaixo() {
        context.moveTo(this.origem.x + this.tamanho, this.origem.y + this.tamanho);
        context.lineTo(this.origem.x + this.tamanho * 3, this.origem.y + this.tamanho);
        context.lineTo(this.origem.x + this.tamanho * 2, this.origem.y + this.tamanho * 2);    
    }


}
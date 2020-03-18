var
    LARGURA = 1366, ALTURA = 768, TAMANHO_PEDRA = 70,
    canvas, context, frames = 0, pedras, pedraClicada = 0, mouseX=100, mouseY=100, rect ,

cores = {
    mesa: "green",
    pedra: "#ffffcc",
    //pedra: "black",
    ponto: "black",
    centro: "gray"
},



pedras = {
    _pedra: [],

    gerar: function() {
        this._pedra = [];

        for(i=0;i<7;i++)
            for(j=i;j<7;j++) 
                this._pedra.push({
                    lado1: i,
                    lado2: j,
                    vertical: true,
                    jogador: 0
                });
    },

    gerarHorizontal: function() {
        this._pedra = [];

        for(i=0;i<7;i++)
            for(j=i;j<7;j++) 
                this._pedra.push({
                    lado1: i,
                    lado2: j,
                    vertical: false,
                    x: 0,
                    y: 0 
                });
        
    }, 
    
    distribuirPedras: function() {
    
        for(jogador=0;jogador<4;jogador++) {
    //        console.log("Jogador: "+(jogador+1));
            for(i=0;i<7;i++) {
                while(this._pedra[rand = Math.floor(28 * Math.random())].jogador!=0);              
                this._pedra[rand].jogador = jogador;

//                console.log("  Pedra: "+rand);

            }
        }
    },

    arrumarMao: function() {
        context.font = "30px Arial";
        context.fillStyle = "red";

        
        context.textAlign = "center";        


        s= 500;
        for(i=0; i<28; i++) {

            if(pedras._pedra[i].jogador == 2) {
                x = pedras._pedra[i].x = s;
                y = pedras._pedra[i].y = 680
                this.draw(i, x, y);            

                    s+=70;
            }
            // else   
            //     console.log("jogador "+pedras._pedra[i].jogador)
        }

        // for(jogador=0;jogador<4; jogador++) {
        //     context.fillText("Jogador "+(jogador+1), 100, 50+(jogador*170));
        //     //console.log(jogador);

        //     var s;

        //      for(i=0;i<7;i++) {
        //          s+=i + ", "
                 
        //     //     draw(i, 100+(i*100), 50+(jogador*170));
        //      }
        //      console.log(s)

        // }

    },

    draw: function(i) {


        x = mouseX - width/2;
        y = mouseY - height/2;  

        draw(i, x, y)
    },

    draw: function(i, x, y) {

        radius = TAMANHO_PEDRA * 0.10;
        TAMANHO_PONTO = TAMANHO_PEDRA * 0.05;

        if(this._pedra[i].vertical) {
            height = TAMANHO_PEDRA;
            width = height/2;
        }
        else {
            width = TAMANHO_PEDRA;
            height = width/2;
        }



        context.fillStyle = cores.pedra; 

        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);      
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
    
        context.fill();
        context.stroke();

        //linha do meio      
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = cores.centro;
        if(this._pedra[i].vertical) {
            context.moveTo(x + width*0.1, y + height/2);
            context.lineTo(x + width - width*0.1, y + height/2);
        }
        else {
            context.moveTo(x + width/2, y + height*0.1);
            context.lineTo(x + width/2, y + height-(height*0.1) );
        }
        //context.fill();
        context.stroke();
        context.closePath();
        
        
        
        //circulo do meio
        context.beginPath();
        context.fillStyle = cores.centro;
        context.arc(x + width/2  , y + height/2 , TAMANHO_PEDRA * 0.03, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();

        
        //marcaçoes dos lados
        context.fillStyle = cores.ponto;
        this.drawLado1(i);
        this.drawLado2(i);


    },

    drawLado1PontoMeio: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + width/2  , y + height/4 , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + width/4  , y + height/2 , TAMANHO_PONTO, 0, 2 * Math.PI, false);

        context.fill();
    },

    drawLado1Ponto1: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + width/4, y + height/8, TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + width/8, y + height/4, TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();            
    },

    drawLado1Ponto2: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + (3 * width/4), y + height/8, TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + (3 * width/8), y + height/4, TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();            
    },    

    drawLado1Ponto3: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + width/4, y + (2 * height/8), TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + (2 * width/8), y + height/4, TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();            
    },   
    
    drawLado1Ponto4: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + (3 * width/4), y + (2 * height/8), TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + (2 * width/8), y + (3 * height/4), TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();            
    },    

    drawLado1Ponto5: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + width/4, y + (3 * height/8), TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + width/8, y + (3 * height/4), TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();            
    },      

    drawLado1Ponto6: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + (3 * width/4), y + (3 * height/8), TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + (3 * width/8), y + (3 * height/4), TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();            
    },    
    
    drawLado2PontoMeio: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + width/2  , y + 3 * (height/4) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + (3*width/4)  , y + height/2 , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();  
    },    

    drawLado2Ponto1: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + width/4  , y + 5 * (height/8) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + (5*width/8)  , y + height/4 , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();  
    },  
    
    drawLado2Ponto2: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + 3 * (width/4), y + 5 * (height/8) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + 7 * (width/8), y + height/4 , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();  
    }, 
    
    drawLado2Ponto3: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + width/4, y + 6 * (height/8) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + 6 * (width/8), y + height/4 , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();  
    }, 
    
    drawLado2Ponto4: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + 3 * (width/4), y + 6 * (height/8) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + 6 * (width/8), y + 3 * (height/4) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();  
    },     
    
    drawLado2Ponto5: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + width/4, y + 7 * (height/8) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + 5 * (width/8), y + 3 * (height/4) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();  
    },    
    
    drawLado2Ponto6: function(i) {
        context.beginPath();

        if(this._pedra[i].vertical)
            context.arc(x + 3 * (width/4), y + 7 * (height/8) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        else
            context.arc(x + 7 * (width/8), y + 3 * (height/4) , TAMANHO_PONTO, 0, 2 * Math.PI, false);
        
        context.fill();  
    },      
 

    drawLado1: function(i) {
        switch(this._pedra[i].lado1) {
            case 1:
                this.drawLado1PontoMeio(i); 
            break;

            case 2:
                this.drawLado1Ponto2(i);
                this.drawLado1Ponto5(i);
            break;            

            case 3:
                this.drawLado1PontoMeio(i);
                this.drawLado1Ponto2(i); 
                this.drawLado1Ponto5(i);
            break;     

            case 4:
                this.drawLado1Ponto1(i); 
                this.drawLado1Ponto2(i);
                this.drawLado1Ponto5(i);
                this.drawLado1Ponto6(i);
            break;                 
            
            case 5:
               this.drawLado1PontoMeio(i); 
                this.drawLado1Ponto1(i);
                this.drawLado1Ponto2(i);
                this.drawLado1Ponto5(i);
                this.drawLado1Ponto6(i);
            break; 
            
            case 6:
                this.drawLado1Ponto1(i); 
                this.drawLado1Ponto2(i);
                this.drawLado1Ponto3(i);
                this.drawLado1Ponto4(i);
                this.drawLado1Ponto5(i);
                this.drawLado1Ponto6(i);
            break;              

        }        

    },

    drawLado2: function(i) {
        switch(this._pedra[i].lado2) {
            case 1: 
                this.drawLado2PontoMeio(i); 
            break;

            case 2: 
                this.drawLado2Ponto2(i); 
                this.drawLado2Ponto5(i); 
            break;            

            case 3: 
                this.drawLado2PontoMeio(i); 
                this.drawLado2Ponto2(i); 
                this.drawLado2Ponto5(i); 
            break;

            case 4: 
                this.drawLado2Ponto1(i); 
                this.drawLado2Ponto2(i); 
                this.drawLado2Ponto5(i); 
                this.drawLado2Ponto6(i);
            break;                        
            
            case 5: 
                this.drawLado2PontoMeio(i); 
                this.drawLado2Ponto1(i); 
                this.drawLado2Ponto2(i); 
                this.drawLado2Ponto5(i); 
                this.drawLado2Ponto6(i);
            break;            

            case 6: 
                this.drawLado2Ponto1(i); 
                this.drawLado2Ponto2(i); 
                this.drawLado2Ponto3(i); 
                this.drawLado2Ponto4(i); 
                this.drawLado2Ponto5(i); 
                this.drawLado2Ponto6(i);
            break;                        
        }
    }



};

    
function onMouseClick(event) {
    pedraClicada = Math.floor(27 * Math.random());

    rect = canvas.getBoundingClientRect();
    
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    if(pedras._pedra[0].vertical) 
        pedras.gerarHorizontal();
    else
        pedras.gerar();

}

function onMouseMove(event) {
    
    rect = canvas.getBoundingClientRect();
    
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}


function main() {
    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";

    context = canvas.getContext("2d");
    document.body.appendChild(canvas);

    rect = canvas.getBoundingClientRect();

    

    document.addEventListener("mousedown", onMouseClick);
    document.addEventListener("mousemove", onMouseMove);


    pedras.gerar();

    pedras.distribuirPedras();



    run();

}

function run() {
    refresh();
    draw();

    window.requestAnimationFrame(run);

}

function refresh() {
    frames++;


}

function draw() {
    context.fillStyle = cores.mesa;
    context.fillRect(0, 0, LARGURA, ALTURA);

//    pedras.draw(pedraClicada); 

    pedras.arrumarMao();


}

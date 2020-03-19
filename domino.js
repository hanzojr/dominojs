var
    
    canvas, context, frames = 0, pedras, pedraClicada = 0, mouseX=100, mouseY=100, rect, mesa;


function onMouseClick(event) {
    pedraClicada = Math.floor(27 * Math.random());

    rect = canvas.getBoundingClientRect();
    
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

}

function onMouseMove(event) {
    
    rect = canvas.getBoundingClientRect();
    
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;


}


function domino() {
    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";

    context = canvas.getContext("2d");
    document.body.appendChild(canvas);

    rect = canvas.getBoundingClientRect();

    

    document.addEventListener("mousedown", onMouseClick);
    document.addEventListener("mousemove", onMouseMove);


    // pedras.gerar();

    // pedras.distribuirPedras();

    mesa = new Mesa();


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

 //  new Controle().draw();


    //new Pedra(6,6).draw(100, 100);

   // new Pedra();


  //  drawControle();

    mesa.showPedras();

    


}

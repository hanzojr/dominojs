var
    
    canvas, context, frames = 0, pedras, pedraClicada = 0, mouseX=100, mouseY=100, holdMouse=false, mesa;

// const pedra = {
//     AS: 'Ás',
//     DUQUE: 'Duque',
//     TERNO: 'Terno',
//     QUADRA: 'Quadra',            
//     QUINA: 'Quina',
//     SENA: 'Sena'
// }

function onMouseClick(event) {
    holdMouse = true;

    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;

    mesa.checkObjectClick();

}

function onMouseMove(event) {
  
    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;

    mesa.checkObjectMove();
}

function onMouseUp(event) {
    holdMouse = false;
    mesa.checkObjectRelease();
}

function onKeyDown(event) {
    mesa.checkKeyDown(event.code);
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
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener('keydown', onKeyDown);    


    // pedras.gerar();

    // pedras.distribuirPedras();



    mesa = new Mesa();

    mesa.showPedrasDemo();


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

   // new Pedra(6, 6).draw(new Ponto(100, 100));


    mesa.showPedras();

    mesa.showMousePosition();  



}

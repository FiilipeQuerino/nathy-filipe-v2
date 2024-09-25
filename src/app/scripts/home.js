// Data do casamento: 8 de Março de 2025, às 15:00
const casamentoData = new Date('March 8, 2025 15:00:00').getTime();

function atualizarCronometro() {
    const agora = new Date().getTime();
    const distancia = casamentoData - agora;

    // Cálculos de tempo
    const meses = Math.floor(distancia / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24)) % 30;
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Atualiza os elementos HTML
    document.getElementById("meses").innerText = meses < 10 ? '0' + meses : meses;
    document.getElementById("dias").innerText = dias < 10 ? '0' + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? '0' + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? '0' + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? '0' + segundos : segundos;


    if (distancia < 0) {
        clearInterval(cronometroInterval);
        document.getElementById("cronometro").innerHTML = "<h1>Já estamos casados!</h1>";
    }
}

// Atualiza o cronômetro a cada segundo
const cronometroInterval = setInterval(atualizarCronometro, 1000);


function confirmarPresenca() {
    const nome = document.getElementById("nome").value;
    if (nome) {
        alert(`Obrigado por confirmar sua presença, ${nome}!`);
    } else {
        alert("Por favor, insira seu nome.");
    }
}

function enviarRecado() {
    const mensagem = document.getElementById("mensagem").value;
    if (mensagem) {
        alert("Obrigado pelo recado! Ele foi enviado com sucesso.");
    } else {
        alert("Por favor, escreva uma mensagem antes de enviar.");
    }
}

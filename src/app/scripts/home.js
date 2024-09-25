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

function abrirMaps() {
    window.open("https://www.google.com/maps/search/?api=1&query=evento+local");
}

function abrir3D() {
    alert("A visualização 3D será aberta em breve!");
}

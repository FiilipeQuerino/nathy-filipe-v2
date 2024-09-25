// Função do Cronômetro
function iniciarCronometro() {
    const casamentoData = new Date('2025-03-08T15:00:00').getTime();
    setInterval(() => {
        const agora = new Date().getTime();
        const distancia = casamentoData - agora;

        const meses = Math.floor(distancia / (1000 * 60 * 60 * 24 * 30));
        const dias = Math.floor((distancia % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById('meses').innerText = meses;
        document.getElementById('dias').innerText = dias;
        document.getElementById('horas').innerText = horas;
        document.getElementById('minutos').innerText = minutos;
        document.getElementById('segundos').innerText = segundos;
    }, 1000);
}
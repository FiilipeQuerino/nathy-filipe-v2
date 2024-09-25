document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('rsvp-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const responseElement = document.querySelector('input[name="response"]:checked');

        if (!responseElement) {
            showToast('Por favor, selecione Sim ou Não.');
            return;
        }

        const response = responseElement.value.trim();
        localStorage.setItem('nome', name);
        localStorage.setItem('resposta', response);

        // Enviar dados para o Google Sheets
        enviarParaGoogleSheets(name, response);

        // Enviar mensagem para o WhatsApp
        const whatsappMessage = `Olá%2C+aqui+é+${name}+e+${response === 'Sim' ? 'irei comparecer' : 'não poderei comparecer'} ao casamento.`;
        abrirWhatsApp(whatsappMessage);
    });
});

// Função para enviar dados para o Google Sheets
function enviarParaGoogleSheets(name, response) {
    fetch('https://script.google.com/macros/s/AKfycbz3wi1TacxhCiNDu37bq_uV0HkMpzXYp8uUorTz83OAAJkoRXQM5HvZtKyu62uftPQN/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "response": response })
    })
    .then(() => {
        showToast('Confirmação enviada com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao enviar os dados para o Google Sheets:', error);
        showToast('Houve um erro ao enviar a confirmação. Por favor, tente novamente.');
    });
}

// Função para abrir o WhatsApp
function abrirWhatsApp(mensagem) {
    const whatsappUrl = `https://wa.me/5548996193227?text=${mensagem}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = whatsappUrl;
    } else {
        const newWindow = window.open(whatsappUrl, '_blank');
        if (newWindow) {
            newWindow.focus();
        } else {
            alert("Por favor, permita pop-ups para abrir o WhatsApp.");
        }
    }
}
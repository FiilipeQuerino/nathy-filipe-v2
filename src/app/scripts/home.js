document.addEventListener('DOMContentLoaded', function () {
    carregarDadosLocais(); // Carrega os dados salvos no Local Storage
    carregarProdutos(); // Carrega os produtos da lista de presentes
    checkCookies();    

    document.getElementById('rsvp-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const responseElement = document.querySelector('input[name="response"]:checked');

        if (!responseElement) {
            showToast('Por favor, selecione Sim ou Não.');
            return;
        }

        const response = responseElement.value.trim();

        // Salvar os dados no Local Storage
        localStorage.setItem('nome', name);
        localStorage.setItem('resposta', response);

        // Enviar dados para o Google Sheets
        enviarParaGoogleSheets(name, response);

        // Enviar mensagem para o WhatsApp
        const whatsappMessage = `Olá%2C+aqui+é+${name}+e+${response === 'Sim' ? 'irei comparecer' : 'não poderei comparecer'} ao casamento.`;
        abrirWhatsApp(whatsappMessage);
    });
});

// Função para abrir o WhatsApp em uma nova aba no desktop ou no aplicativo no celular
function abrirWhatsApp(mensagem) {
    const whatsappUrl = `https://wa.me/5548996193227?text=${mensagem}`;
    
    // Verificar se o usuário está em um dispositivo móvel
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Se for um dispositivo móvel, abre o app do WhatsApp
        window.location.href = whatsappUrl;
    } else {
        // Se for desktop, abre em uma nova aba
        const newWindow = window.open(whatsappUrl, '_blank');
        if (newWindow) {
            newWindow.focus();  // Garante que a nova aba receba foco
        } else {
            alert("Por favor, permita pop-ups para abrir o WhatsApp.");
        }
    }
}

// Função para carregar os produtos da lista de presentes
function carregarProdutos() {
    fetch('../data/products.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">R$${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="botao-pix" data-pix="${product.linkPix}">COMPRAR</button>
                    </div>
                `;

                // Adiciona o evento de clique no botão "COMPRAR"
                productCard.querySelector('.botao-pix').addEventListener('click', function() {
                    const pixCode = this.getAttribute('data-pix');
                    mostrarModalPix(pixCode); // Exibe o modal e copia o código
                });

                productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
            showToast('Erro ao carregar a lista de presentes.');
        });
}

// Função para exibir o modal com a mensagem e preparar o botão de copiar
function mostrarModalPix(pixCode) {
    const modal = document.getElementById('pix-modal');
    const modalText = document.getElementById('modal-pix-code');
    modalText.textContent = pixCode; // Exibe o código PIX no modal

    modal.style.display = 'block'; // Exibe o modal

    // Adiciona o evento do botão "Confirmar" para copiar o código
    document.getElementById('confirmar-pix').onclick = function() {
        copiarPix(pixCode); // Copia o código PIX
        modal.style.display = 'none'; // Fecha o modal após copiar
        showToast('Código PIX copiado. Cole no seu app bancário.');
    };
}

// Função para copiar o código PIX
function copiarPix(pixCode) {
    const tempInput = document.createElement('input');
    tempInput.value = pixCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

// Evento para fechar o modal clicando no "X"
document.getElementById('fechar-modal').onclick = function() {
    document.getElementById('pix-modal').style.display = 'none';
};

// Função para exibir mensagens de feedback (toast)
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Executa o carregamento dos produtos
document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos(); // Carrega os produtos da lista de presentes
});

// Função para exibir mensagens de feedback (toast)
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Executa o carregamento dos produtos
document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos(); // Carrega os produtos da lista de presentes
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

// Função para carregar dados salvos do Local Storage
function carregarDadosLocais() {
    const savedName = localStorage.getItem('nome');
    const savedResponse = localStorage.getItem('resposta');

    if (savedName) {
        document.getElementById('name').value = savedName;
    }

    if (savedResponse) {
        const radioButton = document.querySelector(`input[name="response"][value="${savedResponse}"]`);
        if (radioButton) {
            radioButton.checked = true;
        }
    }
}

// Função para exibir mensagens de feedback (toast)
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Função para verificar se o usuário já aceitou os cookies
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
}

// Função para aceitar cookies
document.getElementById('accept-cookies').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
});

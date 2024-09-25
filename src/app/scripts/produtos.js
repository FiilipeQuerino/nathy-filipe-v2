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

                productCard.querySelector('.botao-pix').addEventListener('click', function () {
                    const pixCode = this.getAttribute('data-pix');
                    copiarPix(pixCode); 
                });

                productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
            showToast('Erro ao carregar a lista de presentes.');
        });
}

// Função para copiar o código PIX
function copiarPix(pixCode) {
    const tempInput = document.createElement('input');
    tempInput.value = pixCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Código PIX copiado. Cole no seu app bancário.');
}
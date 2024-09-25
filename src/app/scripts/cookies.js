// Função para verificar se o usuário já aceitou os cookies
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
}

// Função para aceitar cookies
document.getElementById('accept-cookies').addEventListener('click', function () {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
});
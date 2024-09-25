document.addEventListener("DOMContentLoaded", function() {
    const inviteButton = document.querySelector(".button");

    inviteButton.addEventListener("mouseover", function() {
        inviteButton.style.color = "#2e8b57";
    });

    inviteButton.addEventListener("mouseleave", function() {
        inviteButton.style.color = "darkolivegreen";
    });

    inviteButton.addEventListener("click", function() {
        alert("Você será redirecionado para mais detalhes!");
    });
});

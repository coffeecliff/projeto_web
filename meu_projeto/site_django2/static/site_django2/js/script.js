function filterGames(category) {
    let games = document.querySelectorAll('.game');
    
    games.forEach(game => {
        if (category === 'all' || game.getAttribute('data-category') === category) {
            game.style.display = "block";
        } else {
            game.style.display = "none";
        }
    });
}


function searchGames() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let games = document.querySelectorAll('.game');

    games.forEach(game => {
        let title = game.querySelector('p').innerText.toLowerCase();
        
        if (title.includes(input)) {
            game.style.display = "block";
        } else {
            game.style.display = "none";
        }
    });
}

// Popup de login
document.addEventListener("DOMContentLoaded", function () {
    const userIcon = document.getElementById("userIcon");
    const loginPopup = document.getElementById("loginPopup");
    const closeBtn = document.querySelector(".close-btn");
    const emailInput = document.querySelector("#loginPopup input[type='email']");
    const passwordInput = document.querySelector("#loginPopup input[type='password']");

    userIcon.addEventListener("click", function () {
        loginPopup.style.display = "flex";
    });

    function closePopup() {
        loginPopup.style.display = "none";
        emailInput.value = "";
        passwordInput.value = "";
    }

    closeBtn.addEventListener("click", closePopup);

    window.addEventListener("click", function (e) {
        if (e.target === loginPopup) {
            closePopup();
        }
    });

    loginPopup.style.display = "none";
});

     
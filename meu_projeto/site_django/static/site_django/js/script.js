document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".sidebar button");
    const gamesContainer = document.querySelector(".games-grid");
    const categoryTitle = document.getElementById("category-title");
    const searchInput = document.getElementById("searchInput");
    let currentCategory = "TODOS OS JOGOS";
    let games = [];

    // === CONTROLE DE SLIDES DO CARROSSEL ===
    let slideIndex = 0;
    function moveSlide(step) {
        const slides = document.querySelectorAll(".carousel-img");
        slideIndex += step;
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        document.querySelector(".carousel").style.transform = `translateX(${-slideIndex * 338}px)`;
    }
    setInterval(() => moveSlide(1), 5000);

    // Buscar os jogos da API Django
    fetch("/projeto/api/jogos/")
        .then(response => response.json())
        .then(data => {
            data.forEach(jogo => {
                const link = document.createElement("a");
                link.className = "game-item";
                link.setAttribute("data-category", jogo.categoria.toUpperCase());
                if (jogo.link_url) {
                    link.setAttribute("href", jogo.link_url);
                    link.setAttribute("target", "_blank");
                } else {
                    link.setAttribute("href", "javascript:void(0);");
                }

                link.innerHTML = `
                    <img src="${jogo.imagem_url}" alt="${jogo.nome}" class="background-img">
                    <div class="game-title">${jogo.nome}</div>
                    <p class="game-description-popup">${jogo.descricao}</p>
                    <a href="#" target="_blank" class="game-button">Jogar Agora</a>
                `;

                // Hover com fade
                let hoverTimeout;
                const popup = link.querySelector(".game-description-popup");

                link.addEventListener("mouseenter", () => {
                    hoverTimeout = setTimeout(() => {
                        popup.style.opacity = "1";
                    }, 500);
                });

                link.addEventListener("mouseleave", () => {
                    clearTimeout(hoverTimeout);
                    popup.style.opacity = "0";
                });

                gamesContainer.appendChild(link);
            });

            games = document.querySelectorAll(".game-item");
            filterGames();
        })
        .catch(error => {
            console.error("Erro ao buscar os jogos:", error);
        });

    // Filtro por categoria
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            currentCategory = this.getAttribute("data-category");
            categoryTitle.textContent = currentCategory;
            searchInput.value = "";
            filterGames();
        });
    });

    const noResultsMessage = document.createElement("p");
    noResultsMessage.id = "no-results";
    noResultsMessage.textContent = "Sem resultados. Talvez ainda não tenhamos esse jogo!";
    noResultsMessage.style.display = "none";
    noResultsMessage.style.textAlign = "center";
    noResultsMessage.style.fontSize = "2.5rem";
    noResultsMessage.style.color = "#ff8c42";
    noResultsMessage.style.width = "100%";
    noResultsMessage.style.marginTop = "20px";
    gamesContainer.appendChild(noResultsMessage);

    // Filtro por busca
    searchInput.addEventListener("input", function () {
        filterGames();
    });

    function filterGames() {
        const searchQuery = searchInput.value.toLowerCase();
        let found = false;

        games.forEach(game => {
            const gameTitle = game.querySelector(".game-title").textContent.toLowerCase();
            const gameCategory = game.getAttribute("data-category").toUpperCase();

            const matchesCategory = currentCategory === "TODOS OS JOGOS" || gameCategory === currentCategory;
            const matchesSearch = gameTitle.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                game.style.display = "block";
                found = true;
            } else {
                game.style.display = "none";
            }
        });

        noResultsMessage.style.display = found ? "none" : "block";
    }

    // === FADE-OUT DAS MENSAGENS DE FEEDBACK ===
    const mensagens = document.querySelectorAll(".mensagem-popup");
    setTimeout(() => {
        mensagens.forEach(msg => {
            msg.classList.add("fade-out");
            setTimeout(() => {
                msg.style.display = "none";
            }, 1000);
        });
    }, 3000);

    // === POPUPS DE LOGIN/REGISTRO ===
    const userIcon = document.getElementById("userIcon");
    const popupOverlay = document.getElementById("popupOverlay");
    const optionPopup = document.getElementById("optionPopup");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    function closePopupOverlay() {
        popupOverlay.style.display = "none";
        const inputs = popupOverlay.querySelectorAll("input");
        inputs.forEach(input => input.value = "");
    }

    userIcon.addEventListener("click", () => {
        popupOverlay.style.display = "flex";
        optionPopup.style.display = "block";
        loginForm.style.display = "none";
        registerForm.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            closePopupOverlay();
        }
    });

    window.showLoginForm = () => {
        optionPopup.style.display = "none";
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    };

    window.showRegisterForm = () => {
        optionPopup.style.display = "none";
        registerForm.style.display = "block";
        loginForm.style.display = "none";
    };

    window.closePopup = () => {
        popupOverlay.style.display = "none";
        optionPopup.style.display = "none";
        loginForm.style.display = "none";
        registerForm.style.display = "none";
    };

    // === SCROLL TO TOP ===
    function toggleScrollToTopButton() {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (window.scrollY > 200) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    document.querySelector('.scroll-to-top').addEventListener('click', scrollToTop);
    window.addEventListener('scroll', toggleScrollToTopButton);

    // Botão login dentro do popup
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            popupOverlay.classList.add('active');
        });
    }

    // Botão de fechar popup (se existir)
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });
    }
});

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

                // Inserção do HTML incluindo o popup de descrição com fade
                link.innerHTML = `
                    <img src="${jogo.imagem_url}" alt="${jogo.nome}" class="background-img">
                    <div class="game-title">${jogo.nome}</div>
                    <p class="game-description-popup">${jogo.descricao}</p>
                    <a href="#" target="_blank" class="game-button">Jogar Agora</a>
                `;

                // Lógica de hover com delay e fade-in
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

            // Atualiza a variável games para filtro posterior
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
            searchInput.value = ""; // Limpa a pesquisa ao mudar a categoria
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
    noResultsMessage.style.width = "400%";
    noResultsMessage.style.marginTop = "20px";
    document.querySelector(".games-grid").appendChild(noResultsMessage);

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

    // Aplica fade-out após 3 segundos
    setTimeout(() => {
        mensagens.forEach(msg => {
            msg.classList.add("fade-out");

            // Após o fade, remove da tela
            setTimeout(() => {
                msg.style.display = "none";
            }, 1000); // tempo do fade (1s)
        });
    }, 3000); // espera 3s antes de começar a desaparecer

    // === NOVA LÓGICA DOS POPUPS ===
    const userIcon = document.getElementById("userIcon");
    const popupOverlay = document.getElementById("popupOverlay");
    const optionPopup = document.getElementById("optionPopup");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Função de fechar popup e limpar campos
    function closePopup() {
        popupOverlay.style.display = "none";

        // Limpa todos os inputs dentro dos popups
        const inputs = popupOverlay.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = "";
        });
    }

    // Clique no ícone do usuário
    userIcon.addEventListener("click", () => {
        popupOverlay.style.display = "flex";
        optionPopup.style.display = "block";
        loginForm.style.display = "none";
        registerForm.style.display = "none";
    });

    // Fecha ao clicar fora
    window.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Funções para abrir cada popup
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




    
// Função para mostrar o popup
function showPopup() {
    const popup = document.getElementById('popupOverlay');
    popup.classList.add('active');
}

// Função para fechar o popup
function closePopup() {
    const popup = document.getElementById('popupOverlay');
    popup.classList.remove('active');
}

// Função para exibir o botão de "scroll to top"
function toggleScrollToTopButton() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 200) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
}

    // Função para scroll suave até o topo
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    // Adiciona o evento para o botão de "scroll to top"
    document.querySelector('.scroll-to-top').addEventListener('click', scrollToTop);

    // Evento de fechamento do popup (ao clicar no botão de fechar)
    document.querySelector('.close-btn').addEventListener('click', closePopup);

    // Evento para quando o scroll da página for feito
    window.addEventListener('scroll', toggleScrollToTopButton);

    // Exemplo de como ativar o popup após um evento (como um clique em um botão de login)
    document.querySelector('.login-btn').addEventListener('click', () => {
        showPopup();
    });
});
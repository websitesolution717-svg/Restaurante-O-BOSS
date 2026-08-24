document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("open-menu");
    const closeBtn = document.getElementById("close-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // CONTROLO DE VISIBILIDADE DO MENU LATERAL (SLIDE IN / OUT)
    function toggleMenu() {
        sidebar.classList.toggle("open");
    }

    if (openBtn && closeBtn && sidebar) {
        openBtn.addEventListener("click", toggleMenu);
        closeBtn.addEventListener("click", toggleMenu);
    }

    // Fecha o menu ao clicar num link de ancoragem
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("open");
        });
    });
    

    // ANIMAÇÃO INTERATIVA AO ROLAR A PÁGINA (SCROLL REVEAL SUAVE)
    const animatableElements = document.querySelectorAll('.menu-item, .blog-card, .grid-two-cols, .premium-form');
    
    // Configura o estado inicial invisível para a animação
    animatableElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;

        animatableElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    // Executa uma vez ao carregar para mostrar elementos que já estão na tela
    revealOnScroll();

    // Ativa o evento no scroll da página
    window.addEventListener("scroll", revealOnScroll);
});



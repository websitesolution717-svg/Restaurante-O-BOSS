document.addEventListener("DOMContentLoaded", () => {
    // Inicializa os módulos do site com proteção de escopo
    initNavigationMenu();
    initPremiumScrollReveal();
    initReservationSystem();
});

/**
 * 1. CONTROLO DO MENU LATERAL (SLIDE IN / OUT)
 */
function initNavigationMenu() {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("open-menu");
    const closeBtn = document.getElementById("close-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!sidebar) return;

    const toggleMenu = () => {
        sidebar.classList.toggle("open");
    };

    if (openBtn) openBtn.addEventListener("click", toggleMenu);
    if (closeBtn) closeBtn.addEventListener("click", toggleMenu);

    // Fecha o menu ao clicar num link de ancoragem
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("open");
        });
    });
}



/**
 * 2. ANIMAÇÃO DE REVELAÇÃO (SCROLL REVEAL EM ALTA PERFORMANCE)
 */
function initPremiumScrollReveal() {
    const targets = document.querySelectorAll('.menu-item, .blog-card, .grid-two-cols, .premium-form');
    
    if (targets.length === 0) return;

    // Configura o estado inicial invisível para a animação
    targets.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.style.opacity = "1";
                target.style.transform = "translateY(0)";
                observer.unobserve(target); // Para de observar após animar
            }
        });
    }, observerOptions);

    targets.forEach(el => observer.observe(el));
}



/**
 * 3. SISTEMA DE RESERVAS INTEGRADO AO WHATSAPP
 */
function initReservationSystem() {
    const form = document.querySelector(".premium-form") || document.querySelector("form");
    if (!form) return;

    const nameInput = form.querySelector('input[type="text"]');
    const dateInput = form.querySelector('input[type="date"]');
    const timeInput = form.querySelector('input[type="time"]');
    const zoneSelect = form.querySelector('select');
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');

    // Impede a seleção de datas passadas no calendário
    if (dateInput) {
        const hoje = new Date().toISOString().split("T")[0];
        dateInput.min = hoje;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Recolha dos dados preenchidos
        const dadosReserva = {
            cliente: nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Cliente O Boss",
            data: dateInput ? dateInput.value : "Não especificada",
            horario: timeInput ? timeInput.value : "Não especificado",
            zona: zoneSelect ? zoneSelect.options[zoneSelect.selectedIndex].text : "Salão Principal"
        };

        // INSIRA AQUI O SEU NÚMERO REAL DE ANGOLA (Mantenha o 244)
        const SEU_NUMERO_WHATSAPP = "244937291459"; 

        // Formatação da mensagem para o WhatsApp
        const textoMensagem = encodeURIComponent(
            `*✨ NOVA RESERVA PREMIUM - O BOSS ✨*\n\n` +
            `• *Nome do Cliente:* ${dadosReserva.cliente}\n` +
            `• *Data Solicitada:* ${dadosReserva.data}\n` +
            `• *Horário:* ${dadosReserva.horario}\n` +
            `• *Mesa/Zona:* ${dadosReserva.zona}\n\n` +
            `_Aguardando confirmação de disponibilidade._`
        );

        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${SEU_NUMERO_WHATSAPP}&text=${textoMensagem}`;

        // Efeito visual de clique/carregamento no botão
        if (submitBtn) {
            submitBtn.innerText = "A redirecionar...";
            submitBtn.disabled = true;
        }

        // Substitui o formulário pelo ecrã de sucesso estilizado e abre o WhatsApp
        setTimeout(() => {
            form.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: #fff;">
                    <h2 style="color: #d4af37; margin-bottom: 15px;">✨ Quase Pronto, ${dadosReserva.cliente}!</h2>
                    <p style="margin-bottom: 10px;">Os dados da sua reserva para o dia <strong>${dadosReserva.data}</strong> foram gerados.</p>
                    <p style="color: #aaa; margin-bottom: 25px; font-size: 0.95rem;">Clique no botão abaixo caso o chat não abra automaticamente para concluir no WhatsApp.</p>
                    <a href="${urlWhatsApp}" 
                       target="_blank"
                       style="background: #25D366; color: white; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(37,211,102,0.3);">
                       Terminar Reserva no WhatsApp
                    </a>
                </div>
            `;
            
            // Abre o WhatsApp numa nova aba
            window.open(urlWhatsApp, '_blank');
        }, 600);
    });
}





































// Mobile Navigation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNavCloseBtn = document.querySelector('.mobile-nav-close');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

// Open mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

// Close mobile menu
mobileNavCloseBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
});

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        btn.classList.add('active');
        const tabId = btn.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Update active nav link
            document.querySelectorAll('.desktop-nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 64, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update desktop nav
            document.querySelectorAll('.desktop-nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

// Função para mostrar a mensagem bonita
function showToast(message, type = 'success') {
    // Cria o container se não existir
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    
    // Ícone dependendo do tipo
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Remove do HTML após a animação acabar (3 segundos)
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = "Enviando...";
        btn.disabled = true;

        fetch("https://formsubmit.co/ajax/baraujoramos@gmail.com", {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showToast('Mensagem enviada com sucesso!'); // Chamada da msg bonita
                contactForm.reset();
            } else {
                showToast('Ops! Algo deu errado.', 'error');
            }
        })
        .catch(error => {
            showToast('Erro de conexão.', 'error');
        })
        .finally(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
}

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();
// Sticky CTA - Show after scrolling
let lastScrollTop = 0;
const stickyCTA = document.getElementById('stickyCTA');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show sticky CTA after scrolling down 300px
    if (scrollTop > 300) {
        stickyCTA.classList.add('show');
    } else {
        stickyCTA.classList.remove('show');
    }
    
    lastScrollTop = scrollTop;
}, false);

// Email Modal Functions
function openEmailModal(type) {
    const modal = document.getElementById('emailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const formType = document.getElementById('formType');
    
    // Set form type
    formType.value = type;
    
    // Update modal content based on type
    switch(type) {
        case 'individual':
            modalTitle.textContent = 'Vamos entrar em contacto';
            modalSubtitle.textContent = 'Deixe o seu email e entraremos em contacto consigo em breve.';
            break;
        case 'business':
            modalTitle.textContent = 'Quero obter para a minha empresa';
            modalSubtitle.textContent = 'Deixe o seu email e entraremos em contacto consigo para discutir soluções empresariais.';
            break;
        case 'waiting-list':
            modalTitle.textContent = 'Vamos entrar em contacto';
            modalSubtitle.textContent = 'Deixe o seu email e entraremos em contacto consigo em breve.';
            break;
        default:
            modalTitle.textContent = 'Vamos entrar em contacto';
            modalSubtitle.textContent = 'Deixe o seu email e entraremos em contacto consigo em breve.';
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus on email input
    setTimeout(() => {
        document.getElementById('emailInput').focus();
    }, 100);
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('emailForm').reset();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('emailModal');
    if (event.target === modal) {
        closeEmailModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEmailModal();
    }
});

// Handle Email Form Submission
function handleEmailSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const name = document.getElementById('nameInput').value;
    const formType = document.getElementById('formType').value;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just log it and show a success message
    console.log('Form submitted:', {
        email: email,
        name: name || 'Não fornecido',
        type: formType
    });
    
    // Show success message
    const modalContent = document.querySelector('.modal-content');
    const originalContent = modalContent.innerHTML;
    
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 64px; margin-bottom: 20px;">✓</div>
            <h2 style="color: var(--primary-blue); margin-bottom: 15px;">Obrigado!</h2>
            <p style="color: var(--text-gray); margin-bottom: 30px;">
                A sua inscrição foi recebida com sucesso. Entraremos em contacto consigo em breve.
            </p>
            <button onclick="closeEmailModal()" class="btn-submit" style="width: 100%;">
                Fechar
            </button>
        </div>
    `;
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
        closeEmailModal();
        modalContent.innerHTML = originalContent;
    }, 3000);
    
    // Backend API com sheets
    fetch("/api/save", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            name: name,
            type: formType
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Guardado com sucesso:", data);
    })
    .catch(error => {
        console.error("Erro ao guardar:", error);
    });
    
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Feature descriptions data
const featureDescriptions = [
    {
        title: 'Câmara integrada',
        text: 'Filma a toma da medicação para garantir que foi efetuada corretamente, proporcionando segurança e tranquilidade à família. As filmagens estão acessíveis na app associada.'
    },
    {
        title: 'Medicação SOS',
        text: 'Capacidade de dispensar medicação de emergência quando necessário, através de um pedido simples na app.'
    },
    {
        title: 'Alertas para outros tipos de medicação',
        text: 'O dispensador também avisa para a toma de outro tipo de terapêuticas fora os comprimidos e cápsulas, nomeadamente injeções ou inaladores.'
    },
    {
        title: 'Comunicação com a família',
        text: 'Mantém a família informada sobre a toma da medicação em tempo real, proporcionando tranquilidade. Permite alertas de esquecimento para a app e análise de tendências.'
    },
    {
        title: 'Segurança garantida',
        text: 'O dispositivo está bloqueado, apenas permitindo acesso a quem possua o código de desbloqueio, prevenindo acessos inusitados.'
    },
    {
        title: 'Interface simplificada',
        text: 'Design pensado para ser facilmente utilizado, com apenas um botão e interações simples e intuitivas para todos os utilizadores.'
    }
];

// Toggle feature description
function toggleFeature(index) {
    const descriptionDiv = document.getElementById('featureDescription');
    const contentDiv = document.getElementById('featureContent');
    const buttons = document.querySelectorAll('.feature-btn');
    
    // If clicking the same button, close it
    if (descriptionDiv.style.display === 'block' && buttons[index].classList.contains('active')) {
        descriptionDiv.style.display = 'none';
        buttons[index].classList.remove('active');
        return;
    }
    
    // Update content
    contentDiv.innerHTML = `
        <h3>${featureDescriptions[index].title}</h3>
        <p>${featureDescriptions[index].text}</p>
    `;
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    buttons[index].classList.add('active');
    
    // Show description
    descriptionDiv.style.display = 'block';
    descriptionDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Toggle roll image
function toggleRollImage() {
    const dispenserImage = document.getElementById('dispenserImage');
    const button = document.getElementById('rollButton');
    const isShowingRoll = dispenserImage.src.includes('1.1');
    
    if (!isShowingRoll) {
        // Show roll image
        dispenserImage.src = 'Dispensador novo 1.1.png';
        dispenserImage.alt = 'Recarregamento do rolo';
        button.textContent = 'Ocultar rolo';
        dispenserImage.style.animation = 'fadeIn 0.5s ease';
    } else {
        // Show original image
        dispenserImage.src = 'Dispensador novo 1.2.png';
        dispenserImage.alt = 'Dispensador MedCaring';
        button.textContent = 'Ver rolo';
        dispenserImage.style.animation = 'fadeIn 0.5s ease';
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}


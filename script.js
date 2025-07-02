
// Smooth scroll para el botón de CTA
function scrollToSubscription() {
    document.getElementById('subscription').scrollIntoView({
        behavior: 'smooth'
    });
}

// Animaciones al hacer scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.about-card, .gallery-item, .testimonial, .plan');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Efecto hover para los botones de plan
function initializePlanButtons() {
    const planButtons = document.querySelectorAll('.plan .cta-button');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí puedes integrar con tu sistema de pagos
            alert('¡Gracias por tu interés! Próximamente implementaremos el sistema de suscripción.');
        });
    });
}

// Manejo de formulario de contacto (si se agrega en el futuro)
function initializeContactForm() {
    // Placeholder para futura implementación de formulario
    console.log('Sistema de contacto inicializado');
}

// Tracking de eventos (para Google Analytics o similar)
function trackEvent(eventName, properties = {}) {
    // Placeholder para tracking de eventos
    console.log(`Evento: ${eventName}`, properties);
}

// Función para lazy loading de imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        img.onload = () => {
            img.style.opacity = '1';
        };
        imageObserver.observe(img);
    });
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
    initializePlanButtons();
    initializeContactForm();
    initializeLazyLoading();
    
    // Track page load
    trackEvent('page_view', { page: 'landing' });
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('cta_click', { 
                button_text: button.textContent,
                section: button.closest('section').className
            });
        });
    });
});

// Función para optimizar la experiencia móvil
function optimizeMobileExperience() {
    // Detectar dispositivos móviles
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Ajustar comportamiento para móviles
        document.body.classList.add('mobile-device');
        
        // Optimizar scroll en móviles
        let touchStartY = 0;
        document.addEventListener('touchstart', e => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchmove', e => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchStartY - touchY;
            
            // Smooth scroll behavior en móviles
            if (Math.abs(touchDiff) > 5) {
                document.documentElement.style.scrollBehavior = 'smooth';
            }
        }, { passive: true });
    }
}

// Inicializar optimizaciones móviles
window.addEventListener('load', optimizeMobileExperience);
window.addEventListener('resize', optimizeMobileExperience);

// Función para manejar errores de carga de imágenes
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Placeholder en caso de error de carga
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRTZFNkU2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzc5OEM5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Imagen no disponible';
        });
    });
}

// Inicializar manejo de errores de imágenes
document.addEventListener('DOMContentLoaded', handleImageErrors);

/* ===================================
   KOHAT HUJRA RESTAURANT
   Ultra-Premium JavaScript
   =================================== */

// ===================================
// PRELOADER
// ===================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000);
});

// ===================================
// SCROLL PROGRESS BAR
// ===================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// PARTICLES EFFECT IN HERO
// ===================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(212, 175, 55, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ===================================
// ANIMATED COUNTERS
// ===================================
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 100 ? '%' : '+');
            }
        };
        
        updateCounter();
    });
}

window.addEventListener('scroll', () => {
    if (!counterAnimated) {
        const statsSection = document.querySelector('.stats-container');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounters();
                counterAnimated = true;
            }
        }
    }
});

// ===================================
// MENU CATEGORY TABS
// ===================================
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all categories
        menuCategories.forEach(cat => cat.classList.remove('active'));
        // Show selected category
        document.querySelector(`.menu-category[data-category="${category}"]`).classList.add('active');
    });
});

// ===================================
// PLATTER CATEGORY TABS
// ===================================
const platterTabs = document.querySelectorAll('.platter-tab');
const platterCategories = document.querySelectorAll('.platter-category');

platterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const platter = tab.getAttribute('data-platter');
        
        // Remove active class from all tabs
        platterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all categories
        platterCategories.forEach(cat => cat.classList.remove('active'));
        // Show selected category
        document.querySelector(`.platter-category[data-platter="${platter}"]`).classList.add('active');
    });
});

// ===================================
// FAQ ACCORDION
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// ORDER MODAL FUNCTIONALITY
// ===================================
const orderModal = document.getElementById('orderModal');
let currentOrderData = {};

function openOrderModal(name, urduName, price, image) {
    currentOrderData = { name, urduName, price, image };
    
    document.getElementById('modalImage').src = image;
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalTitleUrdu').textContent = urduName;
    document.getElementById('modalPrice').textContent = `Rs. ${price.toLocaleString()}`;
    
    // Reset form
    document.getElementById('quantity').value = 1;
    document.getElementById('spiceLevel').value = '';
    document.getElementById('specialNotes').value = '';
    
    updateTotalPrice();
    
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotalPrice();
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const total = currentOrderData.price * quantity;
    document.getElementById('totalPrice').textContent = `Rs. ${total.toLocaleString()}`;
}

function confirmOrder() {
    const quantity = document.getElementById('quantity').value;
    const spiceLevel = document.getElementById('spiceLevel').value;
    const specialNotes = document.getElementById('specialNotes').value;
    const total = currentOrderData.price * quantity;
    
    // Create WhatsApp message
    let message = `السلام علیکم\nAssalamualaikum,\n\nI want to place an order from Kohat Hujra Restaurant.\n\n`;
    message += `📋 *Order Details:*\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `Dish: ${currentOrderData.name}\n`;
    message += `${currentOrderData.urduName}\n\n`;
    message += `Quantity: ${quantity}\n`;
    message += `Price per item: Rs. ${currentOrderData.price.toLocaleString()}\n`;
    
    if (spiceLevel) {
        message += `Spice Level: ${spiceLevel}\n`;
    }
    
    if (specialNotes) {
        message += `Special Instructions: ${specialNotes}\n`;
    }
    
    message += `\n*Total Amount: Rs. ${total.toLocaleString()}*\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;
    message += `Customer Name: \n`;
    message += `Delivery Address: \n`;
    message += `Phone Number: \n\n`;
    message += `Delivery / Pickup: \n\n`;
    message += `Thank you! 🙏`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/923339665538?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Close modal
    closeOrderModal();
}

// ===================================
// PLATTER ORDER MODAL
// ===================================
function openPlatterModal(title, urduTitle, price, items) {
    currentOrderData = {
        name: title,
        urduName: urduTitle,
        price: price,
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop'
    };
    
    document.getElementById('modalImage').src = currentOrderData.image;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalTitleUrdu').textContent = urduTitle;
    document.getElementById('modalPrice').textContent = `Rs. ${price.toLocaleString()}`;
    
    // Reset form
    document.getElementById('quantity').value = 1;
    document.getElementById('spiceLevel').value = '';
    document.getElementById('specialNotes').value = `Platter includes:\n${items}`;
    
    updateTotalPrice();
    
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===================================
// LOADING IMAGES WITH LAZY LOADING
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// TESTIMONIALS AUTO SLIDER (OPTIONAL)
// ===================================
let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (window.innerWidth <= 992 && testimonialCards.length > 0) {
        testimonialCards.forEach((card, index) => {
            card.style.display = index === testimonialIndex ? 'block' : 'none';
        });
        
        testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    }
}

// Auto-rotate every 5 seconds on mobile
setInterval(rotateTestimonials, 5000);

// ===================================
// FORM VALIDATION (IF NEEDED)
// ===================================
function validateQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value < 1) {
        quantityInput.value = 1;
    }
}

// ===================================
// PREVENT RIGHT CLICK ON IMAGES (OPTIONAL)
// ===================================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
*/

// ===================================
// COPY PHONE NUMBER TO CLIPBOARD
// ===================================
function copyPhoneNumber() {
    const phoneNumber = '+923339665538';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        // Show a toast notification (you can customize this)
        alert('Phone number copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy phone number: ', err);
    });
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-aos]');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    // Close modal with ESC key
    if (e.key === 'Escape' && orderModal.classList.contains('active')) {
        closeOrderModal();
    }
    
    // Close mobile menu with ESC key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// DETECT TOUCH DEVICE
// ===================================
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
} else {
    document.body.classList.add('no-touch');
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Scroll-based operations
}));

// ===================================
// EXTERNAL LINKS HANDLING
// ===================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ===================================
// PRINT FUNCTIONALITY (OPTIONAL)
// ===================================
function printMenu() {
    window.print();
}

// ===================================
// LOCAL STORAGE FOR USER PREFERENCES
// ===================================
// Save last visited section
window.addEventListener('beforeunload', () => {
    const currentSection = document.querySelector('.nav-link.active');
    if (currentSection) {
        localStorage.setItem('lastSection', currentSection.getAttribute('href'));
    }
});

// Restore last visited section
window.addEventListener('load', () => {
    const lastSection = localStorage.getItem('lastSection');
    if (lastSection && lastSection !== '#home') {
        setTimeout(() => {
            const section = document.querySelector(lastSection);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 2500); // After preloader
    }
});

// ===================================
// ANALYTICS TRACKING (PLACEHOLDER)
// ===================================
function trackEvent(category, action, label) {
    // Integrate with Google Analytics or other tracking service
    console.log(`Event: ${category} - ${action} - ${label}`);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track important user actions
document.querySelectorAll('.btn-order, .btn-quick-order').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Order', 'Click', 'Order Button');
    });
});

document.querySelectorAll('.floating-whatsapp').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Contact', 'Click', 'WhatsApp Button');
    });
});

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can send errors to a logging service here
});

// ===================================
// SERVICE WORKER REGISTRATION (OPTIONAL)
// ===================================
// Uncomment to enable PWA capabilities
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
*/

// ===================================
// DYNAMIC YEAR IN FOOTER
// ===================================
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(element => {
    element.textContent = currentYear;
});

// ===================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ===================================
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', debounce(setViewportHeight));

// ===================================
// ONLINE/OFFLINE DETECTION
// ===================================
window.addEventListener('online', () => {
    console.log('Connection restored');
    // You can show a notification here
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    // You can show a notification here
});

// ===================================
// CUSTOM CURSOR (OPTIONAL - DESKTOP ONLY)
// ===================================
if (!isTouchDevice() && window.innerWidth > 992) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--rich-gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Expand cursor on clickable elements
    document.querySelectorAll('a, button, .btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--amber)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--rich-gold)';
        });
    });
}

// ===================================
// DYNAMIC GREETING BASED ON TIME
// ===================================
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
}

// You can use this in the hero or contact sections
const greeting = getGreeting();

// ===================================
// IMAGE OPTIMIZATION CHECKER
// ===================================
function checkImageLoading() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.error('Failed to load image:', this.src);
            // Replace with placeholder or default image
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23ddd" width="400" height="300"/><text fill="%23999" x="50%" y="50%" text-anchor="middle" dy=".3em">Image not available</text></svg>';
        });
    });
}

checkImageLoading();

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================
// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--rich-gold);
    color: var(--luxury-black);
    padding: 8px 16px;
    text-decoration: none;
    z-index: 100000;
    transition: top 0.3s;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🍽️ Kohat Hujra Restaurant', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%cWhere Tradition Meets Taste', 'color: #8B0000; font-size: 16px;');
console.log('%c📞 Order Now: +92 333 9665538', 'color: #FFD700; font-size: 14px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #D4AF37;');

// ===================================
// DEVELOPMENT MODE HELPERS
// ===================================
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

if (isDevelopment) {
    console.log('%c🔧 Development Mode Active', 'color: #00ff00; font-size: 14px;');
    
    // Add development helpers
    window.openModal = openOrderModal;
    window.closeModal = closeOrderModal;
    window.trackEvent = trackEvent;
}

// ===================================
// FINAL INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website fully loaded and interactive');
    
    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Initialize any third-party libraries here
    // Example: Initialize Swiper, AOS, etc.
});

// ===================================
// EXPORT FUNCTIONS (IF USING MODULES)
// ===================================
// If you're using ES6 modules, you can export functions
// export { openOrderModal, closeOrderModal, trackEvent };

console.log('%c✨ All systems ready!', 'color: #D4AF37; font-size: 12px; font-weight: bold;');
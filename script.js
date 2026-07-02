// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// MENU TABS FUNCTIONALITY
// ===================================

const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get target category
        const targetCategory = tab.getAttribute('data-category');
        
        // Hide all categories
        menuCategories.forEach(cat => cat.classList.remove('active'));
        
        // Show target category
        document.getElementById(targetCategory).classList.add('active');
    });
});

// ===================================
// PLATTER TABS FUNCTIONALITY
// ===================================

const platterTabs = document.querySelectorAll('.platter-tab');
const platterCategories = document.querySelectorAll('.platter-category');

platterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        platterTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get target platter category
        const targetPlatter = tab.getAttribute('data-platter');
        
        // Hide all categories
        platterCategories.forEach(cat => cat.classList.remove('active'));
        
        // Show target category
        document.getElementById(targetPlatter).classList.add('active');
    });
});

// ===================================
// ORDER MODAL FUNCTIONALITY
// ===================================

const modal = document.getElementById('orderModal');
const modalClose = document.querySelector('.modal-close');
const orderButtons = document.querySelectorAll('.btn-order');
const platterOrderButtons = document.querySelectorAll('.btn-platter-order');
const quantityInput = document.getElementById('quantity');
const qtyPlus = document.getElementById('qtyPlus');
const qtyMinus = document.getElementById('qtyMinus');
const confirmOrderBtn = document.getElementById('confirmOrder');

let currentOrder = {
    name: '',
    urdu: '',
    price: 0,
    quantity: 1
};

// Open modal for menu items
orderButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.menu-card');
        currentOrder.name = card.getAttribute('data-name');
        currentOrder.urdu = card.getAttribute('data-urdu');
        currentOrder.price = parseInt(card.getAttribute('data-price'));
        currentOrder.quantity = 1;
        
        openModal();
    });
});

// Open modal for platters
platterOrderButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        currentOrder.name = this.getAttribute('data-platter');
        currentOrder.urdu = '';
        currentOrder.price = parseInt(this.getAttribute('data-price'));
        currentOrder.quantity = 1;
        
        openModal();
    });
});

function openModal() {
    document.getElementById('modalDishName').textContent = currentOrder.name;
    document.getElementById('modalDishUrdu').textContent = currentOrder.urdu;
    document.getElementById('modalPrice').textContent = `PKR ${currentOrder.price.toLocaleString()}`;
    quantityInput.value = currentOrder.quantity;
    updateTotal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('orderNotes').value = '';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Quantity controls
qtyPlus.addEventListener('click', () => {
    let qty = parseInt(quantityInput.value);
    if (qty < 50) {
        quantityInput.value = qty + 1;
        currentOrder.quantity = qty + 1;
        updateTotal();
    }
});

qtyMinus.addEventListener('click', () => {
    let qty = parseInt(quantityInput.value);
    if (qty > 1) {
        quantityInput.value = qty - 1;
        currentOrder.quantity = qty - 1;
        updateTotal();
    }
});

function updateTotal() {
    const total = currentOrder.price * currentOrder.quantity;
    document.getElementById('totalAmount').textContent = `PKR ${total.toLocaleString()}`;
}

// Confirm order and send to WhatsApp
confirmOrderBtn.addEventListener('click', () => {
    const notes = document.getElementById('orderNotes').value;
    const total = currentOrder.price * currentOrder.quantity;
    
    let message = `*New Order from Website*\n\n`;
    message += `📦 *Item:* ${currentOrder.name}\n`;
    if (currentOrder.urdu) {
        message += `${currentOrder.urdu}\n`;
    }
    message += `💰 *Price:* PKR ${currentOrder.price.toLocaleString()}\n`;
    message += `🔢 *Quantity:* ${currentOrder.quantity}\n`;
    message += `💵 *Total:* PKR ${total.toLocaleString()}\n`;
    
    if (notes.trim()) {
        message += `\n📝 *Special Instructions:*\n${notes}`;
    }
    
    const whatsappUrl = `https://wa.me/923339665538?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closeModal();
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
// SCROLL TO TOP BUTTON
// ===================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

const images = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.add('fade-in');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// SECTION REVEAL ANIMATION
// ===================================

const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => sectionObserver.observe(section));

// ===================================
// PERFORMANCE: Disable hover on scroll
// ===================================

let scrollTimer;
window.addEventListener('scroll', () => {
    document.body.classList.add('disable-hover');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        document.body.classList.remove('disable-hover');
    }, 100);
}, { passive: true });

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
});

// ===================================
// CONSOLE BRANDING
// ===================================

console.log('%c🍖 Kohat Hujra Restaurant', 'color: #8B1538; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to our website! 🎉', 'color: #D4AF37; font-size: 14px;');
console.log('%cFor orders: +92 333 9665538', 'color: #666; font-size: 12px;');
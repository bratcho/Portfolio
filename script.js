// ============================================
// THEME MANAGEMENT SYSTEM
// ============================================

/**
 * Theme Management Module
 * Handles light/dark theme switching with localStorage persistence
 * and system preference detection
 */

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Theme detection and initialization
function initTheme() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        // Use saved preference
        applyTheme(savedTheme);
    } else {
        // Use system preference
        const theme = systemPrefersDark ? 'dark' : 'light';
        applyTheme(theme);
    }
}

// Apply theme to document
function applyTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('theme-dark');
        htmlElement.classList.remove('theme-light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeToggle.setAttribute('aria-pressed', 'true');
    } else {
        htmlElement.classList.add('theme-light');
        htmlElement.classList.remove('theme-dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeToggle.setAttribute('aria-pressed', 'false');
    }
    
    // Save preference
    localStorage.setItem('theme', theme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = htmlElement.classList.contains('theme-dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only apply if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize theme on load
initTheme();

// Theme toggle button event
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky Navbar with scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TYPED TEXT ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Full-Stack MERN Developer',
                'Web Developer',
                'UI/UX Enthusiast',
                'Problem Solver'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }
});

// ============================================
// AOS (Animate On Scroll) INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: function() {
                // Disable AOS on mobile if user prefers reduced motion
                return window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            }
        });
    }
});

// ============================================
// SWIPER INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper !== 'undefined') {
        const projectsSwiper = new Swiper('.projects-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            },
            // Respect reduced motion
            effect: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'slide' : 'slide',
        });
    }
});

// ============================================
// SKILL BARS ANIMATION
// ============================================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            
            // Animate progress bar
            setTimeout(() => {
                progressBar.style.width = width + '%';
            }, 200);
            
            skillObserver.unobserve(progressBar);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// FORM VALIDATION
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName(name) {
    if (name.trim() === '') {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    return '';
}

function validateEmail(email) {
    if (email.trim() === '') {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateSubject(subject) {
    if (subject.trim() === '') {
        return 'Subject is required';
    }
    if (subject.trim().length < 3) {
        return 'Subject must be at least 3 characters';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim() === '') {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters';
    }
    return '';
}

// Real-time validation
if (nameInput) {
    nameInput.addEventListener('blur', () => {
        const error = validateName(nameInput.value);
        if (nameError) nameError.textContent = error;
        if (error) {
            nameInput.style.borderColor = '#ef4444';
        } else {
            nameInput.style.borderColor = '#10b981';
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const error = validateEmail(emailInput.value);
        if (emailError) emailError.textContent = error;
        if (error) {
            emailInput.style.borderColor = '#ef4444';
        } else {
            emailInput.style.borderColor = '#10b981';
        }
    });
}

if (subjectInput) {
    subjectInput.addEventListener('blur', () => {
        const error = validateSubject(subjectInput.value);
        if (subjectError) subjectError.textContent = error;
        if (error) {
            subjectInput.style.borderColor = '#ef4444';
        } else {
            subjectInput.style.borderColor = '#10b981';
        }
    });
}

if (messageInput) {
    messageInput.addEventListener('blur', () => {
        const error = validateMessage(messageInput.value);
        if (messageError) messageError.textContent = error;
        if (error) {
            messageInput.style.borderColor = '#ef4444';
        } else {
            messageInput.style.borderColor = '#10b981';
        }
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        if (nameError) nameError.textContent = '';
        if (emailError) emailError.textContent = '';
        if (subjectError) subjectError.textContent = '';
        if (messageError) messageError.textContent = '';
        if (formSuccess) formSuccess.classList.remove('show');

        // Validate all fields
        const nameErr = validateName(nameInput.value);
        const emailErr = validateEmail(emailInput.value);
        const subjectErr = validateSubject(subjectInput.value);
        const messageErr = validateMessage(messageInput.value);

        // Display errors
        if (nameErr) {
            if (nameError) nameError.textContent = nameErr;
            nameInput.style.borderColor = '#ef4444';
        } else {
            nameInput.style.borderColor = '#10b981';
        }

        if (emailErr) {
            if (emailError) emailError.textContent = emailErr;
            emailInput.style.borderColor = '#ef4444';
        } else {
            emailInput.style.borderColor = '#10b981';
        }

        if (subjectErr) {
            if (subjectError) subjectError.textContent = subjectErr;
            subjectInput.style.borderColor = '#ef4444';
        } else {
            subjectInput.style.borderColor = '#10b981';
        }

        if (messageErr) {
            if (messageError) messageError.textContent = messageErr;
            messageInput.style.borderColor = '#ef4444';
        } else {
            messageInput.style.borderColor = '#10b981';
        }

        // If no errors, show success message
        if (!nameErr && !emailErr && !subjectErr && !messageErr) {
            if (formSuccess) {
                formSuccess.textContent = 'Message sent successfully! I will get back to you soon.';
                formSuccess.classList.add('show');
            }
            
            // Reset form
            contactForm.reset();
            
            // Reset border colors
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                if (input) input.style.borderColor = '';
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (formSuccess) formSuccess.classList.remove('show');
            }, 5000);
        }
    });
}

// ============================================
// PROJECT MODAL
// ============================================

const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const projectButtons = document.querySelectorAll('.project-btn');

// Project data
const projects = {
    1: {
        title: 'E-Commerce MERN Application',
        description: 'A complete e-commerce solution built with the MERN stack. Features include user authentication, product management, shopping cart, payment integration, and order tracking. The application provides a seamless shopping experience with real-time updates and secure payment processing.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Stripe API'],
        features: [
            'User authentication and authorization',
            'Product catalog with search and filters',
            'Shopping cart functionality',
            'Secure payment processing',
            'Order management system',
            'Admin dashboard'
        ],
        github: '#',
        live: '#'
    },
    2: {
        title: 'Task Manager',
        description: 'A comprehensive task management application with JWT authentication and full CRUD operations. Built with a modern UI and RESTful API architecture. Features include task categorization, priority levels, due dates, and team collaboration.',
        technologies: ['Express.js', 'JWT', 'MongoDB', 'React', 'Node.js'],
        features: [
            'User authentication with JWT',
            'Create, read, update, delete tasks',
            'Task categorization and tags',
            'Priority and due date management',
            'Team collaboration features',
            'Real-time updates'
        ],
        github: '#',
        live: '#'
    },
    3: {
        title: 'Blog Platform',
        description: 'A full-featured blog platform with comment system, categories, and advanced search functionality. The responsive interface is built with React and features a robust Node.js backend with MySQL database.',
        technologies: ['React', 'Node.js', 'MySQL', 'Express', 'JWT'],
        features: [
            'Blog post creation and editing',
            'Comment system with replies',
            'Category and tag management',
            'Advanced search functionality',
            'User profiles and authentication',
            'Responsive design'
        ],
        github: '#',
        live: '#'
    },
    4: {
        title: 'Analytics Dashboard',
        description: 'An interactive dashboard for data visualization with real-time charts and analytics. Features a RESTful API built with Express.js and a React frontend with smooth animations and responsive design.',
        technologies: ['React', 'Express.js', 'MongoDB', 'Chart.js', 'Node.js'],
        features: [
            'Real-time data visualization',
            'Interactive charts and graphs',
            'Data filtering and sorting',
            'Export functionality',
            'Customizable dashboard',
            'Responsive design'
        ],
        github: '#',
        live: '#'
    }
};

// Open modal
function openModal(projectId) {
    const project = projects[projectId];
    if (!project || !modalBody) return;

    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">${project.description}</p>
        
        <div style="margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 0.75rem; color: var(--text-primary);">Technologies Used:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${project.technologies.map(tech => 
                    `<span style="padding: 0.5rem 1rem; background: var(--bg-tertiary); color: var(--accent-primary); border-radius: 20px; font-size: 0.85rem; font-weight: 600;">${tech}</span>`
                ).join('')}
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 0.75rem; color: var(--text-primary);">Key Features:</h3>
            <ul style="list-style: none; padding-left: 0;">
                ${project.features.map(feature => 
                    `<li style="padding: 0.5rem 0; color: var(--text-secondary);"><i class="fas fa-check" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>${feature}</li>`
                ).join('')}
            </ul>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <a href="${project.live}" target="_blank" class="btn btn-primary" style="text-decoration: none;">
                <span>Live Demo</span>
                <i class="fas fa-external-link-alt"></i>
            </a>
            <a href="${project.github}" target="_blank" class="btn btn-secondary" style="text-decoration: none;">
                <span>View Code</span>
                <i class="fab fa-github"></i>
            </a>
        </div>
    `;

    if (projectModal) {
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal() {
    if (projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Event listeners
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });
}

// Project button clicks
projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project');
        if (projectId) {
            openModal(projectId);
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// ============================================
// DOWNLOAD CV BUTTON
// ============================================

const downloadCV = document.getElementById('downloadCV');
if (downloadCV) {
    downloadCV.addEventListener('click', (e) => {
        e.preventDefault();
        // You can add actual CV download functionality here
        alert('CV download feature coming soon. Please contact me directly for my CV.');
    });
}

// ============================================
// PROFILE IMAGE ERROR HANDLING
// ============================================

const profileImage = document.getElementById('profileImage');
if (profileImage) {
    profileImage.addEventListener('error', function() {
        // If image fails to load, use a placeholder
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e2e8f0" width="400" height="400"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="48" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EIA%3C/text%3E%3C/svg%3E';
    });
}

// ============================================
// GSAP ANIMATIONS (Optional enhancements)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-text > *');
        if (heroElements.length > 0) {
            gsap.from(heroElements, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    console.log('Portfolio initialized successfully!');
    
    // Update active nav link on load
    updateActiveNavLink();
});

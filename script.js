// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Loading Screen Animation
window.addEventListener('load', () => {
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initializeAnimations();
                    // Start matrix effect after loading is complete
                    startMatrixEffect();
                }, 500);
            }, 500);
        }
    }, 100);
});

// Theme Toggle Functionality
themeToggle.addEventListener('click', () => {
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll event listener
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    
    // Navbar hover effect and background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animated Counter for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation for stats section
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
                
                // Add staggered animation for project cards
                if (entry.target.classList.contains('projects-grid')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Add staggered animation for skill items
                if (entry.target.classList.contains('skills-grid') || entry.target.classList.contains('skills-categories-detailed')) {
                    const skills = entry.target.querySelectorAll('.skill-item');
                    skills.forEach((skill, index) => {
                        setTimeout(() => {
                            skill.style.opacity = '1';
                            skill.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .about-content, .about-stats, .projects-grid, .skills-content, .skills-categories-detailed, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
    
    // Initially hide project cards and skill items for animation
    const projectCards = document.querySelectorAll('.project-card');
    const skillItems = document.querySelectorAll('.skill-item');
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    skillItems.forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT!';
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-secondary);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 30px var(--shadow-color);
    `;
    
    if (type === 'success') {
        notification.style.borderColor = '#10b981';
    } else if (type === 'error') {
        notification.style.borderColor = '#ef4444';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Enhanced Matrix Rain Effect with Words and Numbers
function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    if (!matrixContainer) return;
    
    // Clear existing columns
    matrixContainer.innerHTML = '';
    
    // Expanded tech-related words and numbers for more variety
    const matrixWords = [
        'AWS', 'CLOUD', 'AI', 'ML', 'API', 'CODE', 'DATA', 'TECH', 'DEV', 'OPS',
        'PYTHON', 'JS', 'REACT', 'NODE', 'DOCKER', 'K8S', 'GIT', 'SQL', 'HTTP',
        '01', '10', '11', '00', '101', '110', '001', '111', '010', '100',
        'LAMBDA', 'S3', 'EC2', 'RDS', 'VPC', 'IAM', 'SQS', 'SNS', 'ECS', 'EKS',
        'TENSORFLOW', 'PYTORCH', 'KERAS', 'OPENCV', 'NUMPY', 'PANDAS', 'FLASK',
        'AZURE', 'GCP', 'KUBERNETES', 'TERRAFORM', 'JENKINS', 'ANSIBLE', 'NGINX',
        'REDIS', 'MONGODB', 'POSTGRES', 'MYSQL', 'ELASTICSEARCH', 'KAFKA', 'SPARK',
        'HADOOP', 'BLOCKCHAIN', 'QUANTUM', 'NEURAL', 'DEEP', 'LEARNING', 'VISION',
        'NLP', 'GPU', 'CPU', 'RAM', 'SSD', 'API', 'REST', 'GRAPHQL', 'WEBSOCKET',
        '1010', '1100', '0011', '1001', '0110', '1111', '0000', '1011', '0101'
    ];
    
    // Increase number of columns for denser effect
    const columns = Math.floor(window.innerWidth / 60);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        
        // Randomize column properties for more dynamic effect
        const fontSize = 10 + Math.random() * 6; // 10-16px
        const opacity = 0.4 + Math.random() * 0.4; // 0.4-0.8
        const speed = 6 + Math.random() * 10; // 6-16s
        const delay = Math.random() * 10; // 0-10s
        
        column.style.cssText = `
            position: absolute;
            left: ${i * 60}px;
            top: -100%;
            width: 60px;
            font-family: 'Orbitron', monospace;
            font-size: ${fontSize}px;
            color: #00d4ff;
            opacity: ${opacity};
            animation: matrix-fall ${speed}s linear infinite;
            animation-delay: ${delay}s;
            text-align: center;
            line-height: 1.6;
            text-shadow: 0 0 5px #00d4ff;
        `;
        
        let text = '';
        const wordsInColumn = 20 + Math.floor(Math.random() * 15); // 20-35 words
        for (let j = 0; j < wordsInColumn; j++) {
            const word = matrixWords[Math.floor(Math.random() * matrixWords.length)];
            // Add some random highlighting
            if (Math.random() < 0.1) {
                text += `<span style="color: #ffffff; text-shadow: 0 0 10px #ffffff;">${word}</span><br>`;
            } else if (Math.random() < 0.05) {
                text += `<span style="color: #3b82f6; text-shadow: 0 0 8px #3b82f6;">${word}</span><br>`;
            } else {
                text += word + '<br>';
            }
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
    }
    
    // Add periodic regeneration for continuous effect
    setTimeout(() => {
        if (matrixContainer.classList.contains('active')) {
            createMatrixRain();
        }
    }, 30000); // Regenerate every 30 seconds
}

// Start matrix after loading
function startMatrixEffect() {
    const matrixContainer = document.querySelector('.matrix-rain');
    if (matrixContainer) {
        createMatrixRain();
        matrixContainer.classList.add('active');
    }
}

// Particle System for Background
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--text-primary);
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${10 + Math.random() * 20}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Add CSS animations for particles and matrix
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 0.3; }
        90% { opacity: 0.3; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes matrix-fall {
        0% { transform: translateY(-100vh); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
    
    .matrix-column {
        pointer-events: none;
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .notification-close:hover {
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create enhanced background effects
    setTimeout(() => {
        createMatrixRain();
        createParticleSystem();
    }, 1000);
    
    // Removed glitch effect for professional appearance
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Toggle theme with Ctrl/Cmd + T
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const sections = ['home', 'about', 'projects', 'skills', 'contact'];
        const currentSection = window.location.hash.replace('#', '') || 'home';
        const currentIndex = sections.indexOf(currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        scrollToSection(sections[nextIndex]);
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const sections = ['home', 'about', 'projects', 'skills', 'contact'];
        const currentSection = window.location.hash.replace('#', '') || 'home';
        const currentIndex = sections.indexOf(currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        scrollToSection(sections[prevIndex]);
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll event
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
}, 100));

// Download Resume Function
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Vaishak_I_Kuppast_Resume.pdf';
    
    // Show notification that resume download would start
    showNotification('Resume download would start here. Please add your actual resume URL.', 'info');
    
    // Uncomment the following lines when you have an actual resume file
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Console Easter Egg
console.log(`
    ╔══════════════════════════════════════╗
    ║          WHYSHOCK PORTFOLIO          ║
    ║                                      ║
    ║    Welcome to the cyberpunk world!   ║
    ║                                      ║
    ║    Keyboard Shortcuts:               ║
    ║    • Ctrl/Cmd + T: Toggle theme      ║
    ║    • Ctrl + ↑/↓: Navigate sections   ║
    ║                                      ║
    ║    Built with ❤️ and lots of ☕      ║
    ╚══════════════════════════════════════╝
`);

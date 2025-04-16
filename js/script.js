// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
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

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // We're using Formspree for form handling, but we'll add some client-side validation
    contactForm.addEventListener('submit', function(e) {
        // Don't prevent default as we want the form to submit to Formspree
        
        // Get form values for validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            e.preventDefault(); // Prevent form submission if validation fails
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address');
            return;
        }
        
        // Store the message in local storage as a backup
        try {
            // Get existing messages
            let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
            
            // Add new message
            messages.push({
                name: name,
                email: email,
                subject: subject,
                message: message,
                date: new Date().toISOString()
            });
            
            // Save back to local storage
            localStorage.setItem('contactMessages', JSON.stringify(messages));
        } catch (error) {
            console.error('Error saving message to local storage:', error);
            // Don't prevent form submission if local storage fails
        }
        
        // If we get here, the form will submit to Formspree
        // The page will be redirected to the thank you page specified in the form's _next parameter
    });
}

// Typing effect for hero section
const typingElement = document.querySelector('.hero-text h2');
const originalText = typingElement ? typingElement.textContent.trim() : '';

function setupTypingEffect() {
    if (!typingElement || !originalText) return;

    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            typingElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Wait before restarting
            setTimeout(() => {
                typingElement.textContent = ''; // Reset text
                i = 0; // Reset index
                typeWriter(); // Restart effect
            }, 1500);
        }
    }

    // Start typing effect
    typingElement.textContent = ''; // Ensure it's cleared before starting
    typeWriter();
}

// Call function only once when page loads
document.addEventListener("DOMContentLoaded", setupTypingEffect);


// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-item, .project-card, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Add visible class to elements when they come into view
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add CSS for the reveal animation
const style = document.createElement('style');
style.textContent = `
    .skill-item, .project-card, .about-content, .contact-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-item.visible, .project-card.visible, .about-content.visible, .contact-content.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-item, .project-card {
        transition-delay: calc(var(--i, 0) * 0.1s);
    }
`;
document.head.appendChild(style);

// Set transition delay for grid items
document.querySelectorAll('.skill-item, .project-card').forEach((item, index) => {
    item.style.setProperty('--i', index % 4);
}); 
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll down button in header
    const scrollDownBtn = document.getElementById('scrollDown');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            document.querySelector('#portfolio').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Sticky Navigation
    const stickyNav = document.getElementById('stickyNav');
    const header = document.querySelector('header');
    
    // Using Intersection Observer for more robust sticky nav detection
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            stickyNav.classList.remove('visible');
        } else {
            stickyNav.classList.add('visible');
        }
    }, { threshold: 0 }); // Observe when header is completely out of view

    if (header) {
        observer.observe(header);
    }
    

    // Back to Top functionality
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'light') {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            // Default to dark if no theme is set
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }


        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
            }
        });
    }

    // Portfolio Card Hover Effect (setting CSS variables for radial gradient)
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            card.style.setProperty('--x', x + 'px');
            card.style.setProperty('--y', y + 'px');
        });
    });

    // Portfolio Search Functionality
    const portfolioSearchInput = document.getElementById('portfolioSearch');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (portfolioSearchInput) {
        portfolioSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            portfolioCards.forEach(card => {
                const title = card.querySelector('.portfolio-title').textContent.toLowerCase();
                const description = card.querySelector('.portfolio-description').textContent.toLowerCase(); // Get full text for search
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    }

    // "See More" / "See Less" functionality for portfolio descriptions
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const moreDescription = e.target.previousElementSibling;
            if (moreDescription.style.display === 'none') {
                moreDescription.style.display = 'inline';
                e.target.textContent = 'See Less';
            } else {
                moreDescription.style.display = 'none';
                e.target.textContent = 'See More';
            }
        });
    });
});
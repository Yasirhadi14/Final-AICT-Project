document.addEventListener('DOMContentLoaded', function() {
    const artworks = document.querySelectorAll('.artwork');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;
    let interval;

    // Create navigation dots
    artworks.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => navigateToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Navigation function
    function navigateToSlide(index) {
        // Remove active class from current artwork and dot
        artworks[currentIndex].classList.remove('active');
        dotsContainer.children[currentIndex].classList.remove('active');
        
        // Update current index
        currentIndex = index;
        
        // Add active class to new artwork and dot
        artworks[currentIndex].classList.add('active');
        dotsContainer.children[currentIndex].classList.add('active');
    }

    // Auto-rotation function
    function startAutoRotation() {
        interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % artworks.length;
            navigateToSlide(nextIndex);
        }, 5000); // Change slide every 5 seconds
    }

    // Start auto-rotation
    startAutoRotation();

    // Pause auto-rotation when hovering over the gallery
    const galleryContainer = document.querySelector('.featured-artwork');
    galleryContainer.addEventListener('mouseenter', () => clearInterval(interval));
    galleryContainer.addEventListener('mouseleave', startAutoRotation);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
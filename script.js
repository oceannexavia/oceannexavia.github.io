let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;
const prevButton = document.querySelector('.arrow.left');
const nextButton = document.querySelector('.arrow.right');

function showImage(index) {
    images.forEach((img, i) => {
        img.style.opacity = 0;
        img.style.transform = 'rotateY(180deg)';
        if (i === index) {
            img.style.opacity = 1;
            img.style.transform = 'rotateY(0deg)';
        }
    });

    // Update button visibility
    prevButton.style.display = index === 0 ? 'none' : 'block';
    nextButton.style.display = index === totalImages - 1 ? 'none' : 'block';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
}

// Initialize the first image
showImage(currentIndex);

// Bee animation using CSS keyframes
document.addEventListener('DOMContentLoaded', () => {
    const bees = document.querySelectorAll('.bee');
    const container = document.querySelector('.bee-container');
    // Simplified animations
    const animations = [
        'fly-left-to-right',
        'fly-right-to-left',
        'fly-top-to-bottom',
        'fly-bottom-to-top'
    ];

    bees.forEach(bee => {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Random animation name
        const animationName = animations[Math.floor(Math.random() * animations.length)];

        // Random duration (e.g., 6 to 12 seconds)
        const duration = Math.random() * 6 + 6;

        // Random delay (e.g., 0 to 5 seconds)
        const delay = Math.random() * 5;

        // Reset styles
        bee.style.animation = 'none'; // Clear previous animation
        bee.classList.remove('flipped'); // Remove flip class if present
        bee.style.transform = ''; // Reset transform

        // Set initial position and flip class based on animation
        if (animationName === 'fly-left-to-right') {
            bee.style.top = `${Math.random() * containerHeight}px`;
            bee.style.left = '-150px'; // Start off-screen left
        } else if (animationName === 'fly-right-to-left') {
            bee.style.top = `${Math.random() * containerHeight}px`;
            // Use a large fixed value to ensure it starts off-screen right
            bee.style.left = `${containerWidth + 150}px`;
            bee.classList.add('flipped'); // Add flip class
        } else if (animationName === 'fly-top-to-bottom') {
            bee.style.left = `${Math.random() * containerWidth}px`;
            bee.style.top = '-150px'; // Start off-screen top
        } else if (animationName === 'fly-bottom-to-top') {
            bee.style.left = `${Math.random() * containerWidth}px`;
            bee.style.top = `calc(100vh + 50px)`; // Start off-screen bottom
        }

        // Force reflow to apply initial styles before animation starts
        void bee.offsetWidth;

        // Apply new animation properties
        bee.style.animationName = animationName;
        bee.style.animationDuration = `${duration}s`;
        bee.style.animationDelay = `${delay}s`;
        // Re-apply infinite and linear timing which might be reset by setting 'animation: none'
        bee.style.animationIterationCount = 'infinite';
        bee.style.animationTimingFunction = 'linear';
    });
});

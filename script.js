let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;
const prevButton = document.querySelector('.arrow.left');
const nextButton = document.querySelector('.arrow.right');

// Create background container
const carousel = document.querySelector('.carousel');
const background = document.createElement('div');
background.className = 'carousel-background';
carousel.insertBefore(background, carousel.firstChild);

// Create background images
images.forEach((img, index) => {
    const bgImg = document.createElement('img');
    bgImg.src = img.src;
    if (index === 0) {
        bgImg.classList.add('active');
    }
    background.appendChild(bgImg);
});

const backgroundImages = document.querySelectorAll('.carousel-background img');

// Make sure all images are visible but with opacity 0
images.forEach(img => {
    img.style.display = 'block';
    img.style.opacity = '0';
});

function showImage(index) {
    // Show current image and hide others
    images.forEach((img, i) => {
        if (i === index) {
            img.classList.add('active');
            img.style.opacity = '1';
        } else {
            img.classList.remove('active');
            img.style.opacity = '0';
        }
    });

    // Update background images
    backgroundImages.forEach((bgImg, i) => {
        if (i === index) {
            bgImg.classList.add('active');
        } else {
            bgImg.classList.remove('active');
        }
    });

    // Update button visibility
    prevButton.style.display = index === 0 ? 'none' : 'block';
    nextButton.style.display = index === totalImages - 1 ? 'none' : 'block';
}

function nextImage() {
    if (currentIndex < totalImages - 1) {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }
}

// Initialize the first image
showImage(currentIndex);

// Bee animation using physics-based movement
document.addEventListener('DOMContentLoaded', () => {
    const bees = document.querySelectorAll('.bee');
    const container = document.querySelector('.bee-container');
    
    class Bee {
        constructor(element) {
            this.element = element;
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 2; // Random initial velocity
            this.vy = (Math.random() - 0.5) * 2;
            this.maxSpeed = 2 + Math.random() * 2; // Random max speed
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            
            // Random size variation
            const size = 20 + Math.random() * 20;
            this.element.style.width = `${size}px`;
            this.element.style.height = `${size}px`;
        }

        update() {
            // Add random acceleration
            this.vx += (Math.random() - 0.5) * 0.2;
            this.vy += (Math.random() - 0.5) * 0.2;

            // Limit speed
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > this.maxSpeed) {
                this.vx = (this.vx / speed) * this.maxSpeed;
                this.vy = (this.vy / speed) * this.maxSpeed;
            }

            // Update position
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges with some randomness
            if (this.x < 0 || this.x > window.innerWidth) {
                this.vx *= -1;
                this.x = Math.max(0, Math.min(this.x, window.innerWidth));
            }
            if (this.y < 0 || this.y > window.innerHeight) {
                this.vy *= -1;
                this.y = Math.max(0, Math.min(this.y, window.innerHeight));
            }

            // Update element position
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;

            // Update bee direction
            this.element.classList.toggle('flipped', this.vx < 0);
        }
    }

    // Create bee instances
    const beeInstances = Array.from(bees).map(bee => new Bee(bee));

    // Animation loop
    function animate() {
        beeInstances.forEach(bee => bee.update());
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        beeInstances.forEach(bee => {
            bee.x = Math.min(bee.x, window.innerWidth);
            bee.y = Math.min(bee.y, window.innerHeight);
        });
    });
});

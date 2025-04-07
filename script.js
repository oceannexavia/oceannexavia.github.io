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
        // Play music when navigating
        playBackgroundMusic();
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
        // Play music when navigating
        playBackgroundMusic();
    }
}

// Function to play background music
function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Playback prevented:', error);
        });
    }
}

// Initialize the first image
showImage(currentIndex);

// Make navigation buttons more transparent
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.arrow.left');
    const nextButton = document.querySelector('.arrow.right');
    
    if (prevButton && nextButton) {
        prevButton.style.opacity = '0.6';
        nextButton.style.opacity = '0.6';
        
        // Add hover effect to make them more visible when hovered
        prevButton.addEventListener('mouseenter', () => {
            prevButton.style.opacity = '1';
        });
        
        prevButton.addEventListener('mouseleave', () => {
            prevButton.style.opacity = '0.6';
        });
        
        nextButton.addEventListener('mouseenter', () => {
            nextButton.style.opacity = '1';
        });
        
        nextButton.addEventListener('mouseleave', () => {
            nextButton.style.opacity = '0.6';
        });
    }
});

// Initialize audio on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the audio element
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.5; // Set volume to 50%
});

// Bee animation using physics-based movement
document.addEventListener('DOMContentLoaded', () => {
    const bees = document.querySelectorAll('.bee');
    const container = document.querySelector('.bee-container');
    
    // Limit to only 2 bees
    if (bees.length > 2) {
        for (let i = 2; i < bees.length; i++) {
            bees[i].remove();
        }
    }
    
    class Bee {
        constructor(element, index) {
            this.element = element;
            this.index = index;
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 1; // Reduced initial velocity
            this.vy = (Math.random() - 0.5) * 1;
            this.maxSpeed = 1 + Math.random() * 0.5; // Reduced max speed
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            
            // Random size variation - increased size further
            const size = 50 + Math.random() * 50; // Increased from 40 + Math.random() * 40
            this.element.style.width = `${size}px`;
            this.element.style.height = `${size}px`;
            
            // Define the route waypoints (corners of the screen)
            this.waypoints = [
                { x: 50, y: 50 }, // Upper left corner
                { x: window.innerWidth - 50, y: 50 }, // Upper right corner
                { x: window.innerWidth - 50, y: window.innerHeight - 50 }, // Lower right corner
                { x: 50, y: window.innerHeight - 50 } // Lower left corner
            ];
            
            // Start with a random waypoint
            this.currentWaypointIndex = Math.floor(Math.random() * this.waypoints.length);
            this.targetWaypoint = this.waypoints[this.currentWaypointIndex];
            
            // Add a slight delay before starting to move (staggered start)
            this.delay = index * 1000; // 1 second delay between bees
            this.startTime = Date.now();
        }

        update(otherBee) {
            // Check if the bee should start moving
            if (Date.now() - this.startTime < this.delay) {
                return;
            }
            
            // Calculate direction to the current target waypoint
            const dx = this.targetWaypoint.x - this.x;
            const dy = this.targetWaypoint.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If we've reached the current waypoint, move to the next one
            if (distance < 30) {
                this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.waypoints.length;
                this.targetWaypoint = this.waypoints[this.currentWaypointIndex];
            }
            
            // Move towards the target waypoint
            const targetVx = dx * 0.01;
            const targetVy = dy * 0.01;
            
            // Smoothly adjust velocity towards target
            this.vx += (targetVx - this.vx) * 0.05;
            this.vy += (targetVy - this.vy) * 0.05;
            
            // Add very slight randomness to prevent completely straight lines
            this.vx += (Math.random() - 0.5) * 0.02;
            this.vy += (Math.random() - 0.5) * 0.02;
            
            // Limit speed
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > this.maxSpeed) {
                this.vx = (this.vx / speed) * this.maxSpeed;
                this.vy = (this.vy / speed) * this.maxSpeed;
            }

            // Update position
            this.x += this.vx;
            this.y += this.vy;

            // Update element position
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;

            // Update bee direction
            this.element.classList.toggle('flipped', this.vx < 0);
        }
    }

    // Create bee instances (only 2)
    const beeInstances = Array.from(bees).slice(0, 2).map((bee, index) => new Bee(bee, index));

    // Animation loop
    function animate() {
        // Update each bee with reference to the other bee
        if (beeInstances.length === 2) {
            beeInstances[0].update(beeInstances[1]);
            beeInstances[1].update(beeInstances[0]);
        } else if (beeInstances.length === 1) {
            beeInstances[0].update(null);
        }
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        // Update waypoints when window is resized
        beeInstances.forEach(bee => {
            bee.waypoints = [
                { x: 50, y: 50 }, // Upper left corner
                { x: window.innerWidth - 50, y: 50 }, // Upper right corner
                { x: window.innerWidth - 50, y: window.innerHeight - 50 }, // Lower right corner
                { x: 50, y: window.innerHeight - 50 } // Lower left corner
            ];
            
            // Update current target waypoint
            bee.targetWaypoint = bee.waypoints[bee.currentWaypointIndex];
            
            // Ensure bees stay within bounds
            bee.x = Math.min(bee.x, window.innerWidth);
            bee.y = Math.min(bee.y, window.innerHeight);
        });
    });
});

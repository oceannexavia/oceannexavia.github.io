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

// Full-screen functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the audio element
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.5; // Set volume to 50%
    
    // Function to request fullscreen
    function requestFullscreen() {
        const elem = document.documentElement;
        
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    
    // Function to check if the device is mobile
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Request fullscreen on mobile devices
    if (isMobileDevice()) {
        // Try to enter fullscreen mode
        requestFullscreen();
        
        // Add event listener for orientation change to re-enter fullscreen
        window.addEventListener('orientationchange', () => {
            setTimeout(requestFullscreen, 100);
        });
        
        // Prevent default touch behaviors that might exit fullscreen
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent pull-to-refresh
        document.body.style.overscrollBehavior = 'none';
        
        // Hide scrollbars
        document.body.style.overflow = 'hidden';
        
        // Add a button to re-enter fullscreen if it gets exited
        const fullscreenButton = document.createElement('button');
        fullscreenButton.textContent = 'Full Screen';
        fullscreenButton.style.position = 'fixed';
        fullscreenButton.style.bottom = '20px';
        fullscreenButton.style.left = '20px';
        fullscreenButton.style.zIndex = '1000';
        fullscreenButton.style.padding = '10px 20px';
        fullscreenButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        fullscreenButton.style.color = 'white';
        fullscreenButton.style.border = 'none';
        fullscreenButton.style.borderRadius = '5px';
        fullscreenButton.style.cursor = 'pointer';
        fullscreenButton.style.display = 'none'; // Hidden by default
        
        fullscreenButton.addEventListener('click', () => {
            requestFullscreen();
        });
        
        document.body.appendChild(fullscreenButton);
        
        // Show the button when fullscreen is exited
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                fullscreenButton.style.display = 'block';
            } else {
                fullscreenButton.style.display = 'none';
            }
        });
        
        document.addEventListener('webkitfullscreenchange', () => {
            if (!document.webkitFullscreenElement) {
                fullscreenButton.style.display = 'block';
            } else {
                fullscreenButton.style.display = 'none';
            }
        });
        
        document.addEventListener('mozfullscreenchange', () => {
            if (!document.mozFullScreenElement) {
                fullscreenButton.style.display = 'block';
            } else {
                fullscreenButton.style.display = 'none';
            }
        });
        
        document.addEventListener('MSFullscreenChange', () => {
            if (!document.msFullscreenElement) {
                fullscreenButton.style.display = 'block';
            } else {
                fullscreenButton.style.display = 'none';
            }
        });
        
        // Add instructions for adding to home screen
        const homeScreenInstructions = document.createElement('div');
        homeScreenInstructions.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; background-color: rgba(0,0,0,0.7); color: white; padding: 10px; border-radius: 5px; z-index: 1000; max-width: 80%; font-size: 14px;">
                <p>For the best experience, add this page to your home screen:</p>
                <p>1. Open your browser menu</p>
                <p>2. Select "Add to Home Screen"</p>
                <p>3. Launch from your home screen</p>
            </div>
        `;
        document.body.appendChild(homeScreenInstructions);
        
        // Hide instructions after 10 seconds
        setTimeout(() => {
            homeScreenInstructions.style.opacity = '0';
            homeScreenInstructions.style.transition = 'opacity 1s ease';
            setTimeout(() => {
                homeScreenInstructions.style.display = 'none';
            }, 1000);
        }, 10000);
    }
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
        }

        update(otherBee) {
            // Add random acceleration (reduced)
            this.vx += (Math.random() - 0.5) * 0.1;
            this.vy += (Math.random() - 0.5) * 0.1;

            // Add a slight tendency to move toward the center of the screen
            // This helps prevent bees from getting stuck at the edges
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const distFromCenterX = centerX - this.x;
            const distFromCenterY = centerY - this.y;
            const distFromCenter = Math.sqrt(distFromCenterX * distFromCenterX + distFromCenterY * distFromCenterY);
            
            // If bee is far from center, add a slight pull toward center
            if (distFromCenter > window.innerWidth / 3) {
                this.vx += distFromCenterX * 0.0005;
                this.vy += distFromCenterY * 0.0005;
            }

            // Independent roaming behavior - no chasing
            if (otherBee) {
                const dx = otherBee.x - this.x;
                const dy = otherBee.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If bees are very close, they'll move away from each other slightly
                if (distance < 80) {
                    this.vx -= dx * 0.001;
                    this.vy -= dy * 0.001;
                }
                
                // Occasionally change direction to explore
                if (Math.random() < 0.03) { // 3% chance each frame
                    // Add a random direction change
                    this.vx += (Math.random() - 0.5) * 2;
                    this.vy += (Math.random() - 0.5) * 2;
                }
            }

            // Occasionally add a random "jump" to break out of repetitive patterns
            if (Math.random() < 0.01) { // 1% chance each frame
                this.vx += (Math.random() - 0.5) * 2;
                this.vy += (Math.random() - 0.5) * 2;
            }

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
        beeInstances.forEach(bee => {
            bee.x = Math.min(bee.x, window.innerWidth);
            bee.y = Math.min(bee.y, window.innerHeight);
        });
    });
});

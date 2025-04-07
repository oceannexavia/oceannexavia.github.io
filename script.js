let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;

function showImage(index) {
    images.forEach((img, i) => {
        img.style.opacity = 0;
        img.style.transform = 'rotateY(180deg)';
        if (i === index) {
            img.style.opacity = 1;
            img.style.transform = 'rotateY(0deg)';
        }
    });
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

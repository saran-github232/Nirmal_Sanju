const images = [
    './images/WhatsApp Image 2026-02-12 at 1.39.04 PM.jpeg',
    './images/WhatsApp Image 2026-02-12 at 1.39.05 PM.jpeg',
    './images/WhatsApp Image 2026-02-12 at 1.39.06 PM (1).jpeg',
    './images/WhatsApp Image 2026-02-12 at 1.39.06 PM.jpeg',
    './images/WhatsApp Image 2026-02-12 at 1.39.07 PM.jpeg'
];

function nextSlide(slideId) {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show the requested slide
    const nextSlide = document.getElementById(`slide${slideId}`);
    if (nextSlide) {
        nextSlide.classList.add('active');
    }

    const music = document.getElementById('bgMusic');

    // Switch to second song on Success slide
    if (slideId === 4) {
        music.pause();
        music.src = 'song2.mp3';
        music.load();
        music.play().catch(error => console.log("Song 2 playback failed", error));
    }
}

// Global Music Autoplay Logic via Overlay
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('intro-overlay');
    const music = document.getElementById('bgMusic');
    music.volume = 0.5;

    overlay.addEventListener('click', () => {
        // Play music
        music.play().then(() => {
            console.log("Music started!");
        }).catch(err => {
            console.log("Music start failed:", err);
        });

        // Start photos
        setInterval(() => {
            showRandomPhoto('left');
            showRandomPhoto('right');
        }, 2000);

        // Fade out overlay
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 500);
    });
});

// Function to make the "No" button run away
function moveButton() {
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.container');
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate max possible positions within the container
    // Subtract button size to keep it fully inside
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    // Generate random position
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply new position
    // We use 'absolute' positioning relative to the container for the jump
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Function to create falling hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; 
    
    // Randomize position and animation properties
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7 seconds (Slower)
    heart.style.opacity = Math.random() * 0.5 + 0.3; // More transparent
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Start generating hearts (Slower rate)
setInterval(createHeart, 500);

// Function to show random photos
function showRandomPhoto(side) {
    const photo = document.createElement('img');
    photo.src = images[Math.floor(Math.random() * images.length)];
    photo.classList.add('floating-photo');
    
    let x, y;
    
    if (side === 'left') {
        // Left side (0-30% of width)
         x = Math.random() * (window.innerWidth * 0.3);
    } else {
        // Right side (70-100% of width)
         x = (window.innerWidth * 0.7) + Math.random() * (window.innerWidth * 0.3) - 150; // -150 for width
    }
    
    y = Math.random() * (window.innerHeight - 200);
    
    photo.style.left = `${x}px`;
    photo.style.top = `${y}px`;
    
    // Random rotation
    const rotation = (Math.random() - 0.5) * 20; // -10 to 10 deg
    photo.style.transform = `rotate(${rotation}deg)`;

    document.body.appendChild(photo);
    
    // Remove after animation (2.5s defined in CSS)
    setTimeout(() => {
        photo.remove();
    }, 2500);
}

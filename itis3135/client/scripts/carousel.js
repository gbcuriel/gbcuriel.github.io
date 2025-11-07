document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.getElementById('carousel-container');
    const track = document.getElementById('carousel-track');
    const slides = carouselContainer.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    if (!carouselContainer || !track || !slides.length || !prevButton || !nextButton) {
        console.error("Carousel elements not found. Check your HTML IDs.");
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    function showSlide(slideIndex) {
        if (slideIndex >= totalSlides) {
            currentSlide = 0;
        } else if (slideIndex < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = slideIndex;
        }

        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    nextButton.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', function () {
        prevSlide();
        resetAutoPlay();
    });

    carouselContainer.addEventListener('mouseenter', stopAutoPlay);

    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    showSlide(0);
    startAutoPlay();
});
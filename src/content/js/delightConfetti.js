import {delightContainer} from "./delightContainter";

/**
 * Confetti
 */

const confetti = require('canvas-confetti');

export const getConfetti = () => {
    let duration = 4000;
    let end = Date.now() + 800;

    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.width = '100%';
    confettiCanvas.style.height = '100%';

    // Get container, append the canvas, prepend to body
    const container = delightContainer({});
    container.append(confettiCanvas);
    document.body.prepend(container);

    const myConfetti = confetti.create(confettiCanvas, {
        resize:    true,
        useWorker: false
    });

    // Big one in the middle
    myConfetti({
        particleCount: 100,
        spread:        180,
        origin:        {x: 0.5, y: 0.6}
    });

    setTimeout(() => {
        myConfetti({
            particleCount: 400,
            spread:        400,
            origin:        {x: 0.5, y: 0.4}
        });
    }, 900);

    const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    const randomConfetti = setInterval(() => {
        let timeLeft = end - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(randomConfetti);
        }

        myConfetti({
            particleCount: 80,
            angle:         60,
            spread:        55,
            origin:        {x: randomInRange(0.1, 0.9), y: Math.random()}
        });

        myConfetti({
            particleCount: 80,
            angle:         120,
            spread:        55,
            origin:        {x: randomInRange(0.1, 0.9), y: Math.random()}
        });

    }, 100);

    // Cleanup after animation complete
    setTimeout(() => {
        myConfetti.reset();
        document.querySelector('.delightContainer')?.remove();
        document.querySelector('style[delight]')?.remove();
    }, duration);

};


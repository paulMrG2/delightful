/**
 * Delightful
 *
 * Delight: Canvas confetti
 *
 * Sources used
 * https://www.npmjs.com/package/canvas-confetti
 */

import {delightContainer} from "./delightContainter";

const confetti = require('canvas-confetti');

export const getConfetti = (duration) => {
    let end = Date.now() + 400;

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
        origin:        {x: 0.5, y: 0.6},
        particleCount: 100,
        spread:        180,
        ticks:         90
    });

    const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    const randomConfetti = setInterval(() => {
        let timeLeft = end - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(randomConfetti);
        }

        myConfetti({
            angle:         60,
            origin:        {x: randomInRange(0.1, 0.9), y: Math.random()},
            particleCount: 80,
            spread:        55,
            ticks:         90,
        });

        myConfetti({
            angle:         120,
            origin:        {x: randomInRange(0.1, 0.9), y: Math.random()},
            particleCount: 80,
            spread:        55,
            ticks:         90,
        });

    }, 100);

    // The finale - bigger one in the middle
    setTimeout(() => {
        myConfetti({
            origin:        {x: 0.5, y: 0.4},
            particleCount: 400,
            spread:        400,
            ticks:         90
        });
    }, 300);

    // Cleanup after animation complete
    setTimeout(() => {
        myConfetti.reset();
        document.querySelector('.delightContainer')?.remove();
        document.querySelector('style[delight]')?.remove();
    }, duration);

};


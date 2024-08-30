const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('rollButton');

let rolling = false;
let rollInterval;

function startRollingDice(dice) {
    if (!rolling) {
        rolling = true;
        gsap.to(dice, { duration: 0.2, scale: 0.9, ease: "power1.inOut" });
        rollInterval = setInterval(() => rollDice(dice), 50);
    }
}

function rollDice(dice) {
    const randomX = Math.random() * 360;
    const randomY = Math.random() * 360;
    const randomZ = Math.random() * 360;

    gsap.to(dice, {
        duration: 0.05,
        rotationX: randomX,
        rotationY: randomY,
        rotationZ: randomZ,
        ease: "none"
    });
}

function stopRollingDice(dice) {
    clearInterval(rollInterval);
    rolling = false;

    const outcome = Math.floor(Math.random() * 6) + 1;
    const rotations = {
        1: [0, 0],
        2: [-90, 0],
        3: [0, -90],
        4: [0, 90],
        5: [90, 0],
        6: [180, 0]
    };

    const [endRotationX, endRotationY] = rotations[outcome];
    const randomZ = Math.random() * 360;

    gsap.to(dice, {
        duration: 1,
        rotationX: endRotationX,
        rotationY: endRotationY,
        rotationZ: randomZ,
        scale: 1,
        ease: "bounce.out"
    });
}

rollButton.addEventListener('mousedown', () => {
    startRollingDice(dice1);
    startRollingDice(dice2);
});

rollButton.addEventListener('mouseup', () => {
    stopRollingDice(dice1);
    stopRollingDice(dice2);
});

rollButton.addEventListener('mouseleave', () => {
    if (rolling) {
        stopRollingDice(dice1);
        stopRollingDice(dice2);
    }
});
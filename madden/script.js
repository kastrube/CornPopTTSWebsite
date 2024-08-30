const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('rollButton');

let rolling = false;

function rollDie(die, startX) {
    const tl = gsap.timeline();
    const dieSize = 50; // Assuming the die is 50x50 pixels
    const rolls = Math.floor(Math.random() * 2) + 3; // 3 to 4 rolls
    let currentX = startX;

    // Initial lift
    tl.to(die, {
        duration: 0.6,
        y: -450.0,
        ease: "power1.out"
    });

    // Rolling animation
    for (let i = 0; i < rolls; i++) {
        tl.to(die, {
            duration: 0.2,
            x: currentX + dieSize,
            rotation: -10.0,
            ease: "power1.inOut"
        });
        currentX += dieSize;
    }

    // Final settle
    const finalRotation = Math.floor(Math.random() * 4) * 90;
    tl.to(die, {
        duration: 0.1,
        rotation: finalRotation,
        y: 0,
        ease: "bounce.out"
    });

    return { timeline: tl, finalX: currentX };
}

function startRollingDice() {
    if (!rolling) {
        rolling = true;

        const spacing = 20; // Spacing between dice
        const die1StartX = 0;
        const die2StartX = die1StartX + 50 + spacing; // 50 is the die size

        // Reset dice position
        gsap.set(dice1, { x: die1StartX, y: 0, rotation: 0 });
        gsap.set(dice2, { x: die2StartX, y: 0, rotation: 0 });

        const masterTimeline = gsap.timeline({
            onComplete: () => {
                rolling = false;
            }
        });

        const roll1 = rollDie(dice1, die1StartX);
        const roll2 = rollDie(dice2, die2StartX);

        masterTimeline.add(roll1.timeline, 0);
        masterTimeline.add(roll2.timeline, 0.05); // Slight delay for second die

        // Ensure proper final spacing
        masterTimeline.add(() => {
            const finalSpacing = Math.max(roll1.finalX, roll2.finalX) + spacing;
            gsap.to(dice2, { x: finalSpacing, duration: 0.4, ease: "power1.inOut" });
        });
    }
}

rollButton.addEventListener('click', startRollingDice);
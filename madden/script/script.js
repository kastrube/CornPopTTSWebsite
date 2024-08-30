const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('rollButton');

let rolling = false;

function rollDie(die) {
    const tl = gsap.timeline();
    const dieSize = 50; // Assuming the die is 50x50 pixels
    const rolls = Math.floor(Math.random() * 2) + 3; // 3 to 4 rolls

    for (let i = 0; i < rolls; i++) {
        tl.to(die, {
            duration: 0.25,
            rotation: 90,
            transformOrigin: "100% 100%",
            ease: "power1.inOut"
        })
        .set(die, {
            x: `+=${dieSize}`,
            rotation: 0,
            transformOrigin: "50% 50%"
        });
    }

    // Final rotation to random face
    const finalRotation = Math.floor(Math.random() * 4) * 90;
    tl.to(die, {
        duration: 0.25,
        rotation: finalRotation,
        transformOrigin: "50% 50%",
        ease: "power1.inOut",
        onComplete: () => {
            rolling = false;
        }
    });

    return tl;
}

function startRollingDice() {
    if (!rolling) {
        rolling = true;

        // Reset dice position
        gsap.set([dice1, dice2], { x: 0, rotation: 0 });

        const masterTimeline = gsap.timeline();

        masterTimeline.add(rollDie(dice1), 0);
        masterTimeline.add(rollDie(dice2), 0.15); // Slight delay for second die
    }
}

rollButton.addEventListener('click', startRollingDice);
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('rollButton');

function rollDice(dice) {
    const randomX = 720 + Math.floor(Math.random() * 360);
    const randomY = 720 + Math.floor(Math.random() * 360);
    const randomZ = 360 + Math.floor(Math.random() * 360);

    const outcome = Math.floor(Math.random() * 6) + 1;
    let endRotationX, endRotationY;
    switch (outcome) {
        case 1:
            endRotationX = 0;
            endRotationY = 0;
            break;
        case 2:
            endRotationX = -90;
            endRotationY = 0;
            break;
        case 3:
            endRotationX = 0;
            endRotationY = -90;
            break;
        case 4:
            endRotationX = 0;
            endRotationY = 90;
            break;
        case 5:
            endRotationX = 90;
            endRotationY = 0;
            break;
        case 6:
            endRotationX = 180;
            endRotationY = 0;
            break;
    }

    gsap.to(dice, {
        duration: 2,
        rotationX: randomX + endRotationX,
        rotationY: randomY + endRotationY,
        rotationZ: randomZ,
        ease: "power4.out",
    });
}

rollButton.addEventListener('click', () => {
    rollDice(dice1);
    rollDice(dice2);
});

const Num = document.getElementById('Num1');
const btn = document.getElementById('btnchck');
const shownum = document.getElementById('show');
const repeat = document.getElementById('clear');
const next = document.getElementById('go');
const switchLevel = document.getElementById('hard');
const label = document.getElementById('label');
let mini = 1, maxi = 100;
let random = getrandomnumber(1, 100);
let counter = 0;

repeat.addEventListener('click', () => {
    next.textContent = `Choose a number from 1 to 100`;
    random = getrandomnumber(1, 100);
    btn.disabled = false;
    shownum.disabled = false;
    Num.value = '';
    document.getElementById('ran').textContent = '';
    mini = 1;
    maxi = 100;
    counter = 0;
    document.getElementById('correct').textContent = "";
});

shownum.addEventListener('click', () => {
    document.getElementById('ran').textContent = random;
    btn.disabled = true;
    document.getElementById('correct').textContent = "You lose ❌";
    next.textContent = "Try again";
});

btn.addEventListener('click', () => {
    const guess = Number(Num.value);
    if ((!guess) || (guess < mini) || (guess > maxi)) {
        alert(`Enter a number from ${mini} to ${maxi}!`);
    }
    else if (guess > random) {
        maxi = guess;
        next.textContent = `Choose a number from ${mini} to ${guess}`;
    }
    else if (guess === random) {
        document.getElementById('correct').textContent = "Correct! ✅";
        next.textContent = `You guessed the secret number in ${counter} tries!`;
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
        });
        btn.disabled = true;
        shownum.disabled = true;
    }
    else {
        mini = guess;
        next.textContent = `Choose a number from ${guess} to ${maxi}`;
    }
    Num.value = '';
    Num.focus();
    counter++;
});

Num.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') btn.click();
});

function getrandomnumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
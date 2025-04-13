const countries = [
    { name: "Azərbaycan", flag: "https://flagcdn.com/w320/az.png" },
    { name: "Türkiyə", flag: "https://flagcdn.com/w320/tr.png" },
    { name: "Gürcüstan", flag: "https://flagcdn.com/w320/ge.png" },
    { name: "Rusiya", flag: "https://flagcdn.com/w320/ru.png" },
    { name: "Fransa", flag: "https://flagcdn.com/w320/fr.png" },
    { name: "Almaniya", flag: "https://flagcdn.com/w320/de.png" },
    { name: "İngiltərə", flag: "https://flagcdn.com/w320/gb.png" },
    { name: "ABŞ", flag: "https://flagcdn.com/w320/us.png" },
    { name: "İtaliya", flag: "https://flagcdn.com/w320/it.png" },
    { name: "İspaniya", flag: "https://flagcdn.com/w320/es.png" },
    { name: "Yaponiya", flag: "https://flagcdn.com/w320/jp.png" },
    { name: "Çin", flag: "https://flagcdn.com/w320/cn.png" },
    { name: "Hindistan", flag: "https://flagcdn.com/w320/in.png" },
    { name: "Braziliya", flag: "https://flagcdn.com/w320/br.png" },
    { name: "Argentina", flag: "https://flagcdn.com/w320/ar.png" },
    { name: "Meksika", flag: "https://flagcdn.com/w320/mx.png" },
    { name: "Misir", flag: "https://flagcdn.com/w320/eg.png" },
    { name: "Cənubi Koreya", flag: "https://flagcdn.com/w320/kr.png" },
    { name: "Ukrayna", flag: "https://flagcdn.com/w320/ua.png" },
    { name: "Kanada", flag: "https://flagcdn.com/w320/ca.png" },
    { name: "Polşa", flag: "https://flagcdn.com/w320/pl.png" },
    { name: "İsveç", flag: "https://flagcdn.com/w320/se.png" },
    { name: "Norveç", flag: "https://flagcdn.com/w320/no.png" },
    { name: "Finlandiya", flag: "https://flagcdn.com/w320/fi.png" },
    { name: "Danimarka", flag: "https://flagcdn.com/w320/dk.png" },
    { name: "Avstraliya", flag: "https://flagcdn.com/w320/au.png" },
    { name: "Yeni Zelandiya", flag: "https://flagcdn.com/w320/nz.png" },
    { name: "Çexiya", flag: "https://flagcdn.com/w320/cz.png" },
    { name: "Avstriya", flag: "https://flagcdn.com/w320/at.png" },
    { name: "Portuqaliya", flag: "https://flagcdn.com/w320/pt.png" },
    { name: "Yunanıstan", flag: "https://flagcdn.com/w320/gr.png" },
    { name: "İsrail", flag: "https://flagcdn.com/w320/il.png" },
    { name: "BƏƏ", flag: "https://flagcdn.com/w320/ae.png" },
    { name: "Səudiyyə Ərəbistanı", flag: "https://flagcdn.com/w320/sa.png" },
    { name: "İran", flag: "https://flagcdn.com/w320/ir.png" },
    { name: "Pakistan", flag: "https://flagcdn.com/w320/pk.png" },
    { name: "İndoneziya", flag: "https://flagcdn.com/w320/id.png" },
    { name: "Filippin", flag: "https://flagcdn.com/w320/ph.png" },
    { name: "Vyetnam", flag: "https://flagcdn.com/w320/vn.png" }
];

let score = 0;
let questionCount = 0;
let timer;
let timeLeft = 60;
let wrongAttempts = 0;
let usedCountries = [];

const flagImg = document.getElementById("flag-image");
const optionBtns = document.querySelectorAll(".option-btn");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.querySelector(".game-container");

const correctSound = new Audio("correct-answer.mp3");
const wrongSound = new Audio("wrong-answer.mp3");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        scoreDisplay.textContent = `Xal: ${score} | Vaxt: ${timeLeft}s | Səhv cəhdlər: ${wrongAttempts}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(false);
        }
    }, 1000);
}

function nextQuestion() {
    if (questionCount === 10 || wrongAttempts === 3) {
        clearInterval(timer);
        endGame(wrongAttempts < 3);
        return;
    }

    let options;
    let correct;

    do {
        options = shuffle([...countries]).slice(0, 4);  // YENİ seçim
        correct = options[Math.floor(Math.random() * options.length)];
    } while (usedCountries.includes(correct.name)); // Təkrarlanan ölkədən qaçın

    // Yeni sual gələn zaman bu ölkəni istifadə edilmişlərə əlavə et
    usedCountries.push(correct.name);

    flagImg.src = correct.flag;
    questionCount++;

    optionBtns.forEach((btn, index) => {
        btn.textContent = options[index].name;
        btn.disabled = false;
        btn.style.backgroundColor = "";
        btn.onclick = () => {
            if (options[index].name === correct.name) {
                score++;
                correctSound.play();  // Doğru cavab üçün səs oynat
            } else {
                wrongAttempts++;
                wrongSound.play();    // Səhv cavab üçün səs oynat
            }
            scoreDisplay.textContent = `Xal: ${score} | Vaxt: ${timeLeft}s | Səhv cəhdlər: ${wrongAttempts}`;
            optionBtns.forEach((b) => (b.disabled = true));
            setTimeout(nextQuestion, 500);
        };
    });
}

function endGame(won) {
    gameContainer.innerHTML = `
        <h1>${won ? "🎉 Qazandın!" : "😢 Uduzdun!"}</h1>
        <p>Yekun xal: ${score}/10</p>
        <p>Ümumi səhv cəhdlər: ${wrongAttempts}</p>
        <button onclick="location.reload()">Yenidən Oyna</button>
    `;
}

function startGame() {
    score = 0;
    questionCount = 0;
    timeLeft = 60;
    wrongAttempts = 0;
    scoreDisplay.textContent = `Xal: ${score} | Vaxt: ${timeLeft}s | Səhv cəhdlər: ${wrongAttempts}`;
    startTimer();
    nextQuestion();
}

let isPaused = false;

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

startBtn.onclick = () => {
    if (isPaused) {
        isPaused = false;
        startTimer();
    } else {
        startGame();
    }
};

stopBtn.onclick = () => {
    clearInterval(timer);
    isPaused = true;
};
w
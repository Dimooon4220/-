let score1 = 0;
let score2 = 0;

let seconds = 600;
let defaultTime = 600;

let timerInterval = null;

let period = 1;


// =========================
// РАХУНОК
// =========================

function changeScore(team, amount) {

    if (team === 1) {

        score1 += amount;

        if (score1 < 0) {
            score1 = 0;
        }

        document.getElementById("score1").textContent = score1;
    }

    if (team === 2) {

        score2 += amount;

        if (score2 < 0) {
            score2 = 0;
        }

        document.getElementById("score2").textContent = score2;
    }
}


// =========================
// ТАЙМЕР
// =========================

function updateTimer() {

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0");
}


// =========================
// СТАРТ
// =========================

function startTimer() {

    // Якщо таймер уже працює — нічого не робимо
    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {

        if (seconds > 0) {

            seconds--;

            updateTimer();

        } else {

            pauseTimer();

            // Звук завершення матчу
            playEndSound();
        }

    }, 1000);
}


// =========================
// ПАУЗА
// =========================

function pauseTimer() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;
    }
}


// =========================
// ДОДАТИ / ВІДНЯТИ ЧАС
// =========================

function adjustTime(amount) {

    pauseTimer();

    seconds += amount;

    // Не дозволяємо зробити час меншим за 0
    if (seconds < 0) {
        seconds = 0;
    }

    updateTimer();
}


// =========================
// СКИНУТИ ТІЛЬКИ ЧАС
// =========================

function resetTimer() {

    pauseTimer();

    seconds = defaultTime;

    updateTimer();
}


// =========================
// НАСТУПНИЙ ТАЙМ
// =========================

function nextPeriod() {

    pauseTimer();

    period++;

    seconds = defaultTime;

    document.getElementById("period").textContent =
        period + " ТАЙМ";

    updateTimer();
}


// =========================
// ПОВНИЙ СКИДАННЯ МАТЧУ
// =========================

function resetGame() {

    pauseTimer();

    score1 = 0;
    score2 = 0;

    period = 1;

    seconds = defaultTime;

    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";

    document.getElementById("period").textContent =
        "1 ТАЙМ";

    updateTimer();
}


// =========================
// ВИД СПОРТУ
// =========================

function setSport(name, button) {

    // Знімаємо активність з усіх кнопок
    document.querySelectorAll(".sport-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // Робимо натиснуту кнопку активною
    button.classList.add("active");

    // Оновлюємо напис унизу
    document.getElementById("sport").textContent = name;
}


// =========================
// ЗВУК КІНЦЯ ТАЙМУ
// =========================

function playEndSound() {

    try {

        const audioContext =
            new (window.AudioContext ||
            window.webkitAudioContext)();

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.frequency.value = 800;

        gain.gain.value = 0.2;

        oscillator.start();

        setTimeout(() => {
            oscillator.stop();
        }, 500);

    } catch (error) {

        console.log("Звук недоступний");

    }
}


// =========================
// ПОЧАТКОВИЙ ТАЙМЕР
// =========================

updateTimer();

document.addEventListener("DOMContentLoaded", () => {

    const firstSport = document.querySelector(".sport-btn");

    if (firstSport) {
        firstSport.classList.add("active");
    }

});
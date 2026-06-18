const songs = [
    { file: "Songs/shape-of-you.mp3", title: "Shape of You" },
    { file: "Songs/Incubus - Warning-trim.mp3", title: "Incubus" },
    { file: "Songs/Justin Bieber, Nicki Minaj – Beauty And A Beat (Lyrics)-trim.mp3", title: "Beauty And A Beat" },
    { file: "Songs/Rihanna - Work ft. Drake-trim.mp3", title: "Work" },
    { file: "Songs/PinkPantheress - Stateside + Zara Larsson (Official Audio)-trim.mp3", title: "Stateside + Zara Larsson" },
    { file: "Songs/Katy Perry - Last Friday Night (Lyrics)-trim.mp3", title: "Last Friday Night" },
    { file: "Songs/Zedd, Maren Morris, Grey - The Middle (Lyric Video)-trim.mp3", title: "The Middle"},
    { file: "Songs/Dua Lipa - Break My Heart (Official Video)-trim.mp3", title: "Break My Heart"},
    { file: "Songs/Dominic Fike _Babydoll_ (Official Audio)-trim.mp3", title: "Babydoll"},
    { file: "Songs/Charlie Puth - Attention [Official Video]-trim.mp3", title: "Attention"},
    { file: "Songs/Calvin Harris - Feels (Official Video) ft. Pharrell Williams, Katy Perry, Big Sean-trim.mp3", title: "Feels"},
    { file: "Songs/Billie Eilish - ocean eyes (Official Music Video)-trim.mp3", title: "ocean eyes"},
];

const audioPlayer = document.querySelector(".audio-player");
const nextBtn = document.querySelectorAll(".nav-button")[1];
const backBtn = document.querySelectorAll(".nav-button")[0];
const songCounter = document.querySelector(".navigation span");

let shuffledSongs = [];
let currentSongIndex = 0;

//Songs laden
function loadSong() {
    const song = shuffledSongs[currentSongIndex];
    audioPlayer.src = song.file;
    songCounter.textContent = `${currentSongIndex + 1}/${shuffledSongs.length}`;
}

const input = document.querySelector(".player-input input");
const addButton = document.querySelector(".add-player");
const playerList = document.querySelector(".player-list");

const players = [];

//Liste von Player-Namen
addButton.addEventListener("click", () => {

    const name = input.value.trim();
    if (name === "") {
        return;
    }
    players.push({
        name: name,
        score: 0
    });
   updatePlayerList(); 
    input.value = "";
});

//Songs mischen + Start
function startGame() {
    shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
    currentSongIndex = 0;
    loadSong();
}

//Next Button
nextBtn.addEventListener("click", () => {
    currentSongIndex++;

    if (currentSongIndex >= shuffledSongs.length ) {
        alert("Game finished!");
        return;
    }

    loadSong();
});

//Back Button
backBtn.addEventListener("click", () => {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = 0;
        return;
    }

    loadSong();
});

//Button ! click
const buzzBtn = document.querySelector(".buzz-button");
const answerButtons = document.querySelectorAll(".answer-button");

buzzBtn.addEventListener("click", () => {
    showAnswers();
});

function startCountdown() {

    let time = 5;
    countdown.textContent = time;
    const timer = setInterval(() => {
        time--;
        countdown.textContent = time;
        if (time <= 0) {
            clearInterval(timer);
            document.getElementById("answer-section").hidden = true;
        }
    }, 1000);
}

//Countdown
const countdown = document.querySelector(".countdown");

let correctAnswer = "";

//Answers zeigen
function showAnswers() {

    const answerSection = document.getElementById("answer-section");
    answerSection.hidden = false;
    const currentSong = shuffledSongs[currentSongIndex];
    correctAnswer = currentSong.title;

    // Alle falschen Songs sammeln
    const wrongAnswers = songs
        .filter(song => song.title !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    // Richtige + falsche Antwort
    const answers = [
        correctAnswer,
        wrongAnswers[0].title,
        wrongAnswers[1].title,
        wrongAnswers[2].title
    ];

    // Antworten nochmal mischen
    answers.sort(() => Math.random() - 0.5);

    // Auf die 4 Buttons schreiben
    answerButtons.forEach((button, index) => {
        button.textContent = answers[index];
    });

    startCountdown();
}

//Answer richtig/falsh
answerButtons.forEach(button => {
    button.addEventListener("click", () => {
        checkAnswer(button);

    });
});

function checkAnswer(clickedButton) {

    console.log("Geklickt:", clickedButton.textContent);
    console.log("Richtig:", correctAnswer);
    answerButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.style.border = "4px solid green";
        }
    });

    if (clickedButton.textContent !== correctAnswer) {
        clickedButton.style.border = "4px solid red";
    }
}

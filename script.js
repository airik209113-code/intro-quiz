const songs = [
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/shape-of-you.mp3", title: "Shape of You" },
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Incubus%20-%20Warning-trim.mp3", title: "Incubus" },
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Justin%20Bieber%2C%20Nicki%20Minaj%20-%20Beauty%20And%20A%20Beat%20(Lyrics)-trim.mp3", title: "Beauty And A Beat" },
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Rihanna%20-%20Work%20ft.%20Drake-trim.mp3", title: "Work" },
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/PinkPantheress%20-%20Stateside%20%2B%20Zara%20Larsson%20(Official%20Audio)-trim.mp3", title: "Stateside + Zara Larsson" },
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Katy%20Perry%20-%20Last%20Friday%20Night%20(Lyrics)-trim.mp3", title: "Last Friday Night" },
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Zedd%2C%20Maren%20Morris%2C%20Grey%20-%20The%20Middle%20(Lyric%20Video)-trim.mp3", title: "The Middle"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Dua%20Lipa%20-%20Break%20My%20Heart%20(Official%20Video)-trim.mp3", title: "Break My Heart"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Dominic%20Fike%20_Babydoll_%20(Official%20Audio)-trim.mp3", title: "Babydoll"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Charlie%20Puth%20-%20Attention%20%5BOfficial%20Video%5D-trim.mp3", title: "Attention"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Calvin%20Harris%20-%20Feels%20(Official%20Video)%20ft.%20Pharrell%20Williams%2C%20Katy%20Perry%2C%20Big%20Sean-trim.mp3", title: "Feels"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Billie%20Eilish%20-%20ocean%20eyes%20(Official%20Music%20Video)-trim.mp3", title: "ocean eyes"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Mabel%20-%20Mad%20Love%20(Official%20Video)-trim.mp3", title: "Mad Love"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Bruno%20Mars%20-%20That's%20What%20I%20Like%20%5BOfficial%20Music%20Video%5D-trim.mp3", title: "That's What I Like"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Lady%20Gaga%2C%20Bruno%20Mars%20-%20Die%20With%20A%20Smile%20(Official%20Music%20Video)-trim.mp3", title: "Die With A Smile"},
    { file: "https://github.com/airik209113-code/music-quiz/blob/5dfa4b70c086e6586c7a022be37ab375314083a2/Lady%20Gaga%20-%20Bad%20Romance%20(Official%20Music%20Video)-trim.mp3", title: "Bad Romance"},
];

const audioPlayer = document.querySelector(".audio-player");
const nextBtn = document.querySelectorAll(".nav-button")[1];
const backBtn = document.querySelectorAll(".nav-button")[0];
const songCounter = document.querySelector(".navigation span");

let shuffledSongs = [];
let currentSongIndex = 0;

let roundFinished = false;
let answerLocked = false;

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

function soloPlayer() {
    if (players.length === 0) {
        players.push({
            name: "Player 1",
            score: 0
        });
        updatePlayerList();
    }
}

//Songs mischen + Start
function startGame() {
    shuffledSongs = [...songs].sort(() => Math.random() - 0.5).slice(0, 10);
    currentSongIndex = 0;
    loadSong();
    buzzBtn.disabled = false;
}

//Next Button
nextBtn.addEventListener("click", () => {
    if (!roundFinished) return;

    currentSongIndex++;

    if (currentSongIndex >= shuffledSongs.length) {
        alert("Game finished!");
        showRanking();
        return;
    }

    loadSong();

    answerButtons.forEach(button => {
        button.style.border = "";
        button.disabled = false;
        button.textContent = "";
    });

    document.getElementById("answer-section").hidden = true;
    countdown.textContent = "";

    buzzBtn.disabled = false;
    roundFinished = false; // reset
    answerLocked = false;
});

//Back Button
backBtn.addEventListener("click", () => {
    currentSongIndex--;
    if (currentSongIndex < 0) currentSongIndex = 0;

    loadSong();

    document.getElementById("answer-section").hidden = true;
    answerButtons.forEach(button => {
        button.style.border = "";
        button.disabled = false;
        button.textContent = "";
    });

    countdown.textContent = "";
    buzzBtn.disabled = false;
});

//Button ! click
const buzzBtn = document.querySelector(".buzz-button");
const answerButtons = document.querySelectorAll(".answer-button");

buzzBtn.addEventListener("click", () => {
    soloPlayer();
    buzzBtn.disabled = true;
    showAnswers();
});

let correctAnswer = "";
let answerClicked = false;

let canGoNext = false;

//Answers zeigen
function showAnswers() {
    roundFinished = false;
    answerClicked = false;
    answerButtons.forEach(button => { button.style.border = ""; button.disabled = false;});

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
    for(let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = answers[i];
    }

    startCountdown();
}

answerButtons.forEach(button => {
    button.addEventListener("click", () => {
        checkAnswer(button);
    });
});

let wasCorrect = false;

const playerButtonsContainer = document.querySelector(".player-buttons");
const playerSelectSection = document.querySelector(".player-select-section");

//Answer richtig/falsh
function checkAnswer(clickedButton) {
    if (answerClicked) {
        return;
    }
    answerClicked = true;
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    clearInterval(timer);
    countdown.textContent = "";

    wasCorrect = clickedButton.textContent === correctAnswer;
    answerButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.style.border = "4px solid green";
        }
    });

    if (!wasCorrect) {
        clickedButton.style.border = "4px solid red";
    }

    roundFinished = true;

    setTimeout(() => {
        if (players.length === 0) {
            return;
        }
        if (players.length === 1) {
            if (wasCorrect) {
                players[0].score++;
            } else {
                players[0].score--;
            }
            updatePlayerList();
            return;
        }
        playerSelectSection.hidden = false;
        showPlayerButtons();
    }, 1500);

    canGoNext = true
}

//Wer hat gedrückt?
function showPlayerButtons() {

    playerButtonsContainer.innerHTML = "";
    players.forEach(player => {
        const btn = document.createElement("button");
        btn.textContent = player.name;
        btn.addEventListener("click", () => {
            if (wasCorrect) {
                player.score++;
            } else {
                player.score--;
            }
            updatePlayerList();
            playerSelectSection.hidden = true;
        });
        playerButtonsContainer.appendChild(btn);
    });
}

//Countdown
const countdown = document.querySelector(".countdown");

let timer;
function startCountdown() {
    clearInterval(timer);
    let time = 5;
    countdown.textContent = time;
    timer = setInterval(() => {
        time--;
        countdown.textContent = time;
        if (time <= 0) {
            wasCorrect = false;
            clearInterval(timer);
            roundFinished = true;
            document.getElementById("answer-section").hidden = true;
            playerSelectSection.hidden = false;
            showPlayerButtons();
        }
    }, 1000);
}

//updaten
function updatePlayerList() {
    playerList.innerHTML = "";
    players.forEach(player => {
        const li =
            document.createElement("li");
        li.textContent =
            `${player.name}: ${player.score} points`;
        playerList.appendChild(li);
    });
}

//Ranking
const rankingSection = document.querySelector(".ranking-section");
const rankingList = document.querySelector(".ranking-list");
function showRanking() {
    rankingSection.hidden = false;
    rankingList.innerHTML = "";
    const sortedPlayers = [...players];
    sortedPlayers.sort((a, b) => b.score - a.score);
    sortedPlayers.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} - ${player.score} Punkte`;
        rankingList.appendChild(li);
    });
}

startGame();

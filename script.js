const songs = [
    { file: "Songs/shape-of-you.mp3", title: "Shape of You" },
    { file: "Songs/Incubus - Warning-trim.mp3", title: "Incubus" },
    { file: "Songs/Justin Bieber, Nicki Minaj - Beauty And A Beat (Lyrics)-trim.mp3", title: "Beauty And A Beat" },
    { file: "Songs/Rihanna - Work ft. Drake-trim.mp3", title: "Work" },
    { file: "Songs/PinkPantheress - Stateside + Zara Larsson (Official Audio)-trim.mp3", title: "Stateside + Zara Larsson" },
    { file: "Songs/Katy Perry - Last Friday Night (Lyrics)-trim.mp3", title: "Last Friday Night" },
    { file: "Songs/Zedd, Maren Morris, Grey - The Middle (Lyric Video)-trim.mp3", title: "The Middle"},
    { file: "Songs/Dua Lipa - Break My Heart (Official Video)-trim.mp3", title: "Break My Heart"},
    { file: "Songs/Dominic Fike _Babydoll_ (Official Audio)-trim.mp3", title: "Babydoll"},
    { file: "Songs/Charlie Puth - Attention [Official Video]-trim.mp3", title: "Attention"},
    { file: "Songs/Calvin Harris - Feels (Official Video) ft. Pharrell Williams, Katy Perry, Big Sean-trim.mp3", title: "Feels"},
    { file: "Songs/Billie Eilish - ocean eyes (Official Music Video)-trim.mp3", title: "ocean eyes"},
    { file: "Songs/Mabel - Mad Love (Official Video)-trim.mp3", title: "Mad Love"},
    { file: "Songs/Bruno Mars - That's What I Like [Official Music Video]-trim.mp3", title: "That's What I Like"},
    { file: "Songs/Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video)-trim.mp3", title: "Die With A Smile"},
    { file: "Songs/Lady Gaga - Bad Romance (Official Music Video)-trim.mp3", title: "Bad Romance"},
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

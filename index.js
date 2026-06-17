const songs = [
    { file: "Songs/shape-of-you.mp3", title: "Shape of You" },
    { file: "Songs\Incubus - Warning-trim.mp3", title: "Incubus" },
    { file: "Songs\Justin Bieber, Nicki Minaj – Beauty And A Beat (Lyrics)-trim.mp3", title: "Beauty And A Beat" },
    { file: "Songs\Rihanna - Work ft. Drake-trim.mp3", title: "Work" },
    { file: "Songs/PinkPantheress - Stateside + Zara Larsson (Official Audio)-trim.mp3", title: "Stateside + Zara Larsson" },
    { file: "Songs/Katy Perry - Last Friday Night (Lyrics)-trim.mp3", title: "Last Friday Night" },
    { file: "Songs\Zedd, Maren Morris, Grey - The Middle (Lyric Video)-trim.mp3", title: "The Middle"},
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

//Songs mischen + Start
function startGame() {
    shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
    currentSongIndex = 0;
    loadSong();
}

//Next Button
nextBtn.addEventListener("click", () => {
    currentSongIndex++;

    if (currentSongIndex >= shuffledSongs.length) {
        alert("Game finished!");
        return;
    }

    loadSong();
});

startGame();

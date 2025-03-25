const playlist = [
    { title: "Song 1", artist: "Artist 1", category: "Pop", file: "song1.mp3" },
    { title: "Song 2", artist: "Artist 2", category: "Rock", file: "song2.mp3" },
    { title: "Song 3", artist: "Artist 3", category: "Jazz", file: "song3.mp3" },
    { title: "Song 4", artist: "Artist 4", category: "Classical", file: "song4.mp3" },
    // Add more songs here
];

let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeControl = document.getElementById('volumeControl');
const playlistContainer = document.getElementById('playlist');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');

document.addEventListener("DOMContentLoaded", () => {
    loadPlaylist();

    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    volumeControl.addEventListener('input', changeVolume);
    searchInput.addEventListener('input', filterPlaylist);
    categorySelect.addEventListener('change', filterPlaylist);
});

function loadPlaylist() {
    playlistContainer.innerHTML = '';

    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.dataset.index = index;
        li.addEventListener('click', () => playSong(index));
        playlistContainer.appendChild(li);
    });

    playSong(currentSongIndex);
}

function playSong(index) {
    const song = playlist[index];
    audioSource.src = song.file;
    audioPlayer.load(); // Reload the audio player
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
    isPlaying = true;

    const allSongs = playlistContainer.querySelectorAll('li');
    allSongs.forEach(songItem => songItem.classList.remove('selected'));
    allSongs[index].classList.add('selected');

    currentSongIndex = index;
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function prevSong() {
    currentSongIndex = (currentSongIndex === 0) ? playlist.length - 1 : currentSongIndex - 1;
    playSong(currentSongIndex);
}

function nextSong() {
    currentSongIndex = (currentSongIndex === playlist.length - 1) ? 0 : currentSongIndex + 1;
    playSong(currentSongIndex);
}

function changeVolume() {
    audioPlayer.volume = volumeControl.value;
}

function filterPlaylist() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const filteredSongs = playlist.filter(song => {
        const matchesSearch = song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'All' || song.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    renderPlaylist(filteredSongs);
}

function renderPlaylist(songs) {
    playlistContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.dataset.index = index;
        li.addEventListener('click', () => playSong(index));
        playlistContainer.appendChild(li);
    });
}

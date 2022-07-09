console.log("Welcome To Spotify");
// Initialize the variables
let songIndex = 0;
let songDuration = 0;
let audioElement = new Audio('./assets/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Tum Saath Ho", filePath: "./assets/songs/1.mp3", coverPath: "./assets/covers/1.jpg"},
    {songName: "Ae Dil Hai Mushkil", filePath: "./assets/songs/2.mp3", coverPath: "./assets/covers/2.jpg"},
    {songName: "Dhoka", filePath: "./assets/songs/3.mp3", coverPath: "./assets/covers/3.jpg"},
    {songName: "Dil Ko Karaar Aaya", filePath: "./assets/songs/4.mp3", coverPath: "./assets/covers/4.jpg"},
    {songName: "Filhaal 2 - Mohabbat", filePath: "./assets/songs/5.mp3", coverPath: "./assets/covers/5.jpg"},
    {songName: "Jinke Liye", filePath: "./assets/songs/6.mp3", coverPath: "./assets/covers/6.jpg"},
    {songName: "Khairiyat", filePath: "./assets/songs/7.mp3", coverPath: "./assets/covers/7.jpg"},
    {songName: "Mann Bharryaa 2", filePath: "./assets/songs/8.mp3", coverPath: "./assets/covers/8.jpg"},
    {songName: "Pachtaoge", filePath: "./assets/songs/9.mp3", coverPath: "./assets/covers/9.jpg"},
    {songName: "Ranjha", filePath: "./assets/songs/10.mp3", coverPath: "./assets/covers/10.jpg"},
    {songName: "Taaron Ke Shehar", filePath: "./assets/songs/11.mp3", coverPath: "./assets/covers/11.jpg"},
    {songName: "Teri Mitti", filePath: "./assets/songs/10.mp3", coverPath: "./assets/covers/12.jpg"},
    {songName: "Tu Hi Yaar Mera", filePath: "./assets/songs/13.mp3", coverPath: "./assets/covers/13.jpg"},
    {songName: "Tum Hi Ho", filePath: "./assets/songs/14.mp3", coverPath: "./assets/covers/14.jpg"},
    {songName: "Tumse Bhi Zyada", filePath: "./assets/songs/15.mp3", coverPath: "./assets/covers/15.jpg"},
];

audioElement.setAttribute("song-name", '1.mp3');

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioELement.play();

// Handle play/pause click
    masterPlay.addEventListener('click', () => {
        if(audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity  = 0;
        }
        makeAllPlays();
    });

    // seekBar.setMax(Assets.mediaPlayer.getDuration()/1000);

// Listen the Events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value  * audioElement.duration/100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if (audioElement.getAttribute("song-name") == ((+element.id + 1) + '.mp3')) {
            if(audioElement.paused) {
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
            else {
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            }
        }
        else {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        
        if (audioElement.getAttribute("song-name") != ((songIndex+1) + '.mp3')) {
            audioElement.src = './assets/songs/' + (songIndex+1) + '.mp3';
            masterSongName.innerText = songs[songIndex].songName;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.setAttribute("song-name", (songIndex+1) + '.mp3')
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        } else {
            masterPlay.click();
        }
        makeAllPlays();
    });
});

document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = './assets/songs/' + (songIndex+1) + '.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.setAttribute("song-name", (songIndex+1) + '.mp3')
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
});

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = './assets/songs/' + (songIndex+1) + '.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.setAttribute("song-name", (songIndex+1) + '.mp3');
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
});
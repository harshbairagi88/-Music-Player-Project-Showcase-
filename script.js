const start = document.querySelector("#start")
const music = document.querySelector("audio")
const previous = document.querySelector("#previous")
const forword = document.querySelector("#forword")
const initialTime = document.querySelector("#initial-time")
const finalTime = document.querySelector("#final-time")
const progressContainer = document.querySelector("#progress-container");
const progressBar = document.querySelector("input[type='range']");



start.addEventListener("click", function(){
    if(music.paused){
        music.play()
        start.classList.replace("ri-play-fill", "ri-pause-circle-fill");
    }
    else{
        music.pause()
        start.classList.replace("ri-pause-circle-fill","ri-play-fill");

    }
})



music.addEventListener("timeupdate", function(dets){
    const currentTimeInSeconds = Math.floor(dets.target.currentTime);
    const durationInSeconds = Math.floor(dets.target.duration);

    const formattedCurrentTime = formatTime(currentTimeInSeconds);
    const formattedDuration = formatTime(durationInSeconds);

    // Update the HTML elements
    initialTime.innerHTML = formattedCurrentTime;
    finalTime.innerHTML = formattedDuration;

    const progressPercentage = (currentTimeInSeconds / durationInSeconds) * 100;
    progressBar.value = progressPercentage;

})

progressContainer.addEventListener("input", function (event) {
    // Calculate the new time based on the position of the range input
    const newTimePercentage = event.target.value;
    const newTimeInSeconds = (newTimePercentage / 100) * music.duration;

    // Set the new time for the audio playback
    music.currentTime = newTimeInSeconds;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Use padStart to ensure two digits for minutes and seconds
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}
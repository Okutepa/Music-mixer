const draggableSVGs = document.querySelectorAll('.draggable-svg img');
const playZones = document.querySelectorAll('.dropzone');
const audioElement = document.getElementById('play-sound');
const audioSources = {};

function playAudio(trackRefs) {
    // Stop any previous audio
    audioElement.pause();
    audioElement.currentTime = 0;

    // Create an array to store audio elements
    const audioElements = [];

    // Iterate over each track reference and create an audio element for it
    trackRefs.forEach(trackRef => {
        const audioSrc = `audio/${trackRef}.mp3`;
        const audio = new Audio(audioSrc);
        audioElements.push(audio);
    });

    // Play all audio elements simultaneously
    audioElements.forEach(audio => {
        audio.play();
    });
}

function dragStart(event) {
    // Set the data being dragged (here, we'll use the 'trackref' attribute)
    event.dataTransfer.setData('text/plain', event.target.dataset.trackref);

    console.log('Dragged an audio')
}

function dragOver(event) {
    // Prevent default behavior to enable dropping
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    
    const trackRef = event.dataTransfer.getData('text/plain');

    // Create a new img element for the dropped track
    const droppedSVG = document.createElement('img');
    droppedSVG.src = `images/${trackRef}.svg`;
    droppedSVG.classList.add('spinning'); // Add spinning class
    event.target.appendChild(droppedSVG);

    // Create a new audio element for the dropped track
    const audioSrc = `audio/${trackRef}.mp3`;
    const newAudio = new Audio(audioSrc);
    newAudio.play();

    // Store the audio element in the corresponding play zone
    const playZoneId = event.currentTarget.id;
    if (!audioSources[playZoneId]) {
        audioSources[playZoneId] = [newAudio];
    } else {
        audioSources[playZoneId].push(newAudio);
    }
}

function playAudio(trackRef) {
    const audioSrc = `audio/${trackRef}.mp3`;
    audioElement.src = audioSrc;
    audioElement.play();
}


draggableSVGs.forEach(svg => {
    svg.addEventListener('dragstart', dragStart);
});


playZones.forEach(playZone => {
    playZone.addEventListener('dragover', dragOver);
    playZone.addEventListener('drop', drop);
});

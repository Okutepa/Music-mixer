const draggableSVGs = document.querySelectorAll('.draggable-svg img');
const playZones = document.querySelectorAll('.play-zone');
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
    const playZoneId = event.target.closest('.play-zone').id;

    // Create a new audio element for the dropped track
    const audioSrc = `audio/${trackRef}.mp3`;
    const newAudio = new Audio(audioSrc);
    
    // Play the new audio
    newAudio.play();

    // Store the audio element in the corresponding play zone
    if (!audioSources[playZoneId]) {
        audioSources[playZoneId] = [newAudio];
    } else {
        audioSources[playZoneId].push(newAudio);
    }

    // Create a smaller version of the dropped SVG
    const droppedSVG = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    droppedSVG.setAttributeNS(null, 'href', `images/${trackRef}.svg`); // Adjust the path accordingly
    droppedSVG.setAttributeNS(null, 'width', '50px'); // Set the width of the dropped SVG

    // Calculate the height to maintain the aspect ratio
    const originalWidth = 200; 
    const originalHeight = 300; 
    const scaledHeight = (50 / originalWidth) * originalHeight;
    droppedSVG.setAttributeNS(null, 'height', `${scaledHeight}px`); 

    droppedSVG.setAttributeNS(null, 'class', 'spinning'); 

    // Append the dropped SVG to the play zone
    event.target.appendChild(droppedSVG);
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

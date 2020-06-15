const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

// creates a random number for the game
function getRandomNumber () {
    return Math.floor(Math.random()* 100) + 1;
};
console.log("Number: ", randomNum);

// Initalize a speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// create a variable to work with the speech recognition object
let recognition = new window.SpeechRecognition();

// Start the game 
recognition.start();

// Listen for the result event
recognition.addEventListener('result', onSpeak);

// create onSpeak function
function onSpeak(e){
    const msg = e.results[0][0].transcript;
    console.log(msg);
    writeMessage(msg);
    checkNumber(msg);
};

// display msg to the screen
function writeMessage(msg){
    msgEl.innerHTML = `
    <div> You Said: </div>
    <span class="box"> ${msg} </span>
    `;
};

// check the msg agianst the number
function checkNumber(msg){
    const num = +msg;
    // check if a vaild number
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div> That is not a vaild number </div>';
        return;
    }
    // check if Number is in range
    if(num > 100 || num < 1) {
        msgEl.innerHTML += '<div> Your Number Must Be Between 1-100 </div>';
        return;
    }

    // check number against Randomly generated number
    if(num === randomNum){
        document.body.innerHTML = `
        <h2>Congrats! You Guessed the number <br></br>
        It was ${num} </h2>
        <button clas="play-again" id="play-again"> Play again </button>
        `;
    } else if(num > randomNum) {
        msgEl.innerHTML += '<div> Go Lower </div>';
    }else {
        msgEl.innerHTML += '<div> Go Higher </div>';
    }
};

// Allow user to continue to guess - End Speech Recognition
recognition.addEventListener('end', () => recognition.start());

// make the play again button work
document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
});
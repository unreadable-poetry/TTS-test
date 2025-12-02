const startBtn = document.getElementById('start');

// Initialize Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

// Start listening on button click
startBtn.addEventListener('click', () => {
recognition.start();
});

// Handle speech result
recognition.onresult = e => {
const text = e.results[0][0].transcript.trim();
handleCommand(text);
};

// Handle commands
function handleCommand(text) {
const cmd = text.toLowerCase();

if (cmd.includes('next step')) doNextStep();
else if (cmd.includes('repeat')) repeatStep();
else if (cmd.includes('explain')) callExplainAPI(text);
else speak("Command not recognized.");
}

// Example preset command functions
function doNextStep() {
speak("Moving to the next step.");
}

function repeatStep() {
speak("Repeating the last step.");
}

// Call API for explanation
async function callExplainAPI(userText) {
const body = { prompt: userText };

try {
const res = await fetch('[https://api.example.com/explain](https://api.example.com/explain)', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'X-RapidAPI-Key': 'YOUR_KEY_HERE',
'X-RapidAPI-Host': 'api-host-here'
},
body: JSON.stringify(body)
});
const data = await res.json();
const reply = data.reply || data.text || "No response from API.";
speak(reply);
} catch (err) {
console.error(err);
speak("Error calling API.");
}
}

// Speak text using TTS
function speak(text) {
const u = new SpeechSynthesisUtterance(text);
window.speechSynthesis.speak(u);
}

// Play audio file (if API returns URL)
function playAudio(url) {
const a = new Audio(url);
a.play();
}

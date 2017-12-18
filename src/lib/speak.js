export function speak(cb) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;

  const words = ["start", "pause", "stop", "go"];
  const grammar = `#JSGF V1.0; grammar commands; public <commands> = ${words.join(
    " | "
  )};`;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  //recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The [last] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object

    var last = event.results.length - 1;
    var match = event.results[last][0].transcript;

    switch (match) {
      case "start":
        cb.start();
        break;
      case "go":
        cb.start();
        break;
      case "pause":
        cb.pause();
        break;
      case "stop":
        cb.pause();
        break;
      default:
        console.log("failed match", match);
    }

    console.log("Confidence: " + event.results[0][0].confidence, match);
  };

  recognition.onspeechend = function() {
    recognition.stop();
    console.log("stop");
  };

  recognition.onend = function() {
    console.log("Speech recognition service disconnected");
    recognition.start();
  };

  recognition.onnomatch = function(event) {
    console.log("no match");
  };

  recognition.onerror = function(event) {
    console.log("onerror", event);
  };

  return recognition;
}

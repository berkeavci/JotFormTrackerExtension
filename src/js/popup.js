import "../css/popup.css";

console.log("Hello!");
var stateHolder = {};

function buttonChange(isRecording) {
  var recordButton = document.getElementById("record_btn");
  console.log(isRecording);
  if (isRecording) {
    recordButton.innerHTML = "Pause " + "<i class='fas fa-pause'></i>";
    // within the active tab, we send message to content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs);
      chrome.tabs.sendMessage(tabs[0].id,{ method: "Recording" });
    });
  } else {
    recordButton.innerHTML = "Play " + "<i class='fas fa-play'></i>";
  }
}
// Set Button State Storage
function setButtonStateOnStorage(stateHolder) {
    //console.log(stateHolder["buttonState"]);
    chrome.storage.sync.set(stateHolder, () => console.log("Saved"));
}


document.addEventListener("DOMContentLoaded", function () {
  let isRecording = false;
  var recordButton = document.getElementById("record_btn");
  console.log("Dom Content Loaded!")
  chrome.storage.sync.get("buttonState", function (data) {
    console.log(data["buttonState"]);
    isRecording = data["buttonState"];
    buttonChange(data["buttonState"]);
    recordButton.addEventListener("click", function () {
        console.log("Inside of a listener!");
      isRecording = !isRecording;
      stateHolder["buttonState"] = isRecording; 
      console.log(stateHolder["buttonState"]);
      setButtonStateOnStorage(stateHolder);
      buttonChange(isRecording);
    });
  });
});

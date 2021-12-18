import "../css/popup.css";
import Rx, { from, Subject, takeUntil } from "rxjs";
import { fromEvent } from "rxjs";
import { take } from 'rxjs/operators';

var stateHolder = {};
let isRecording = false;
let isRecordStopped = false;

const recordButton = document.getElementById("record_btn");
const stopButton = document.getElementById("stop_btn");
var startSub$ = fromEvent(recordButton, 'click');
var stopSub$ = fromEvent(stopButton, 'click');


function buttonChange(isRecording) {
  var recordButton = document.getElementById("record_btn");
  console.log(isRecording);
  if (isRecording) {
    recordButton.innerHTML = "Stop " + "<i class='fas fa-pause'></i>";
    // within the active tab, we send message to content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id, { method: "Recording" });
    });
  } else if (isRecordStopped == true){
    recordButton.innerHTML = "Play " + "<i class='fas fa-play'></i>";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log("Sending STOP message");
      chrome.tabs.sendMessage(tabs[0].id, { method: "Stopped"});
      isRecording = false;
      buttonChange(isRecording);
    });
    startSub$.unsubcribe();
  }
}
// Set Button State Storage
function setButtonStateOnStorage(stateHolder) {
  //console.log(stateHolder["buttonState"]);
  chrome.storage.sync.set(stateHolder, () => console.log("Saved"));
}
//takeUntil(stopSub$)
function startButtonSub() {
  console.log("Start Button Subbed");
  startSub$.
    subscribe((x) => {
    console.log("Inside of a listener!");
    console.log(x);
    isRecording = !isRecording;
    stateHolder["buttonState"] = isRecording;
    console.log(stateHolder["buttonState"]);
    setButtonStateOnStorage(stateHolder);
    buttonChange(isRecording);
  });
}

function stopButtonSub() {
  console.log("STOP BUTTON?");
  stopSub$.subscribe((x) => {
    console.log("Stop Button Clicked");
  });
  return true;
}

// chrome.commands.onCommand.addListener((command) => {
//   var message = "";
//   if(command === 'start'){
//     message = "Recording";
//     messageSender(message);
//   }else if (command === 'stop'){
//     message = "Stopped";
//     messageSender(message);
//   }
// });

function messageSender(message){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id, { method: message });
    });
}


document.addEventListener("DOMContentLoaded", function () {
  // var recordButton = document.getElementById("record_btn");
  // chrome.storage.sync.get("buttonState", function (data) {
  //   console.log(data["buttonState"]);
  //   isRecording = data["buttonState"];
  //   buttonChange(data["buttonState"]);
  //   startButtonSub();
  //   console.log(isRecording);
  //   //if(isRecording == false){ stopButtonSub(); }
    
  //   // recordButton.addEventListener("click", function () {
  //   //   console.log("Inside of a listener!");
  //   //   isRecording = !isRecording;
  //   //   stateHolder["buttonState"] = isRecording;
  //   //   console.log(stateHolder["buttonState"]);
  //   //   setButtonStateOnStorage(stateHolder);
  //   //   buttonChange(isRecording);
  //   // });
  // });
});

module.exports = {
  messageSender
}
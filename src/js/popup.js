import "../css/popup.css";

/* 
  Once, there was 300 line code that took 2 week to implement. Than, the system was unstable and useless so
  I've deleted everything. That two week will be remembered.
*/

function messageSender(message){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id, { method: message });
    });
}

module.exports = {
  messageSender
}


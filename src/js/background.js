console.log("Hello from background!");
var isRecord = false;


function messageSender(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { method: message });
  });
}



chrome.commands.onCommand.addListener((command) => {
  console.log("Command Catched!");
  var message = "";
  if (command === "start") {
    message = "Recording";
    isRecord = true;
    console.log(message);
    messageSender(message);
  } else if (command === "stop") {
    console.log(message);
    isRecord = false;
    message = "Stopped";
    messageSender(message);
  }
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(isRecord);
  if (changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, {
      method: "TabUpdated",
      state: isRecord ? "record" : "notrecording",
      url : tab.url
    });
  }
});

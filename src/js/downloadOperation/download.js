import { getCurrentDateandTime } from '../components/jsonNeccessaryFields'

function downloadFileFromText(filename, content) {
  console.log(content);
  var a = document.createElement("a");
  var blob = new Blob([content], { type: "text/json" });
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click(); // simulating a click on a download link
  //a.remove();
}

function exportInputs(contentValue) {
  console.log(contentValue);
  contentValue.created_date = getCurrentDateandTime();
  contentValue.extension = chrome.runtime.getManifest().version;
  contentValue.id = "randomID";
  downloadFileFromText("test.json", JSON.stringify(contentValue));
}

export {
  exportInputs
};
import { fromEvent, tap, finalize, ReplaySubject } from "rxjs";
import {
  takeUntil,
  delay
} from "rxjs/operators";

import { addDatatoJson, addRequestDoctoJson } from "./handleJson/jsonAddition"
import { exportInputs  } from "./downloadOperation/download"
import { localStorageSave, getLocalStorageData, storageClear } from "./handleLocalStorage/localStorageHandler"
import { shortcut } from "./components/shortcut";
import { records, temp_rec } from "./components/recordsPlaceHolder";

const stopShortcut$ = shortcut(["ControlLeft", "ShiftLeft", "KeyP"]); 
const formReqShortcut$ = shortcut(["ControlLeft", "ShiftLeft", "KeyR"]);

formReqShortcut$.pipe(tap(async(x) => 
{
  console.log("Form Data Requested");
  recordData = await addRequestDoctoJson(document, recordData);
  localStorageSave(recordData);
  console.log(recordData);
})).subscribe();
stopShortcut$.pipe(tap((x) => handleShortcut(x))).subscribe();

function handleShortcut(x) {
  storageClear();
  recordData = JSON.stringify(temp_rec);
  recordData = JSON.parse(recordData);
  numberOfInside = 0;
  console.log(x);
  console.log("Shortcut?????");
}

let numberOfInside = 0;
var documentClick$ = fromEvent(document, "click");
var docClicks = null;
let recordData = null;


// Starts from here
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  console.log("Listener Started");
  if (request.method == "Recording") {
    subtoDoc();
  } else if (request.method == "Stopped") {
    console.log("Stop Sign Clicked");
    stopSub();
  } else if (request.method == "TabUpdated") {
    if(request.state == "record") {
      subtoDoc();
    }
    recordData = await getLocalStorageData(records, numberOfInside);
    console.log(recordData);
  }
});

function subtoDoc() {
  docClicks = documentClick$.pipe(takeUntil(stopShortcut$), delay(600)).subscribe((x) => {
    clickActions(x);
  });
}
function stopSub() {
  console.log(recordData);
  exportInputs(recordData);
  recordData = JSON.stringify(temp_rec);
  recordData = JSON.parse(recordData);
  numberOfInside = 0;
}

async function clickActions(value) {
  console.log(recordData);
  let typeOfClickOperation = "";
  let inputValue = "";
  if (value.target instanceof HTMLInputElement) {
    typeOfClickOperation = "input";
    inputValue = await inputTracking(value);
    addDatatoJson(
      numberOfInside,
      value,
      recordData,
      typeOfClickOperation,
      inputValue
    );
  } else if (value.target instanceof HTMLAnchorElement) {
    typeOfClickOperation = "a";
    addDatatoJson(
      numberOfInside,
      value,
      recordData,
      typeOfClickOperation,
      inputValue
    );
  } else if (value.target instanceof HTMLButtonElement) {
    typeOfClickOperation = "button";
    addDatatoJson(
      numberOfInside,
      value,
      recordData,
      typeOfClickOperation,
      inputValue
    );
  } else if (value.target instanceof HTMLSpanElement){
    typeOfClickOperation = "span";
    addDatatoJson(
      numberOfInside,
      value,
      recordData,
      typeOfClickOperation,
      inputValue
    );
  }
  localStorageSave(recordData);
  numberOfInside++;
}


function inputTracking(value) {
  return new Promise((resolve, reject) => {
    var inputs = [];
    var dot = ".";
    var className = value.target.className;
    var query = dot.concat(className);
    var inputClass = document.querySelectorAll(query);
    var keyups$ = fromEvent(inputClass, "keyup");
    keyups$
      .pipe(
        takeUntil(documentClick$),
        finalize(() => {
          resolve(inputs[inputs.length - 1]);
        })
      )
      .subscribe((x) => {
        inputs.push(x.currentTarget.value);
      });
  });
}

export {
  subtoDoc
}
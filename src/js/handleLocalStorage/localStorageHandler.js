function isObjEmpty(obj) {
  for (var i in obj) return false;
  return true;
}

function storageClear() {
  chrome.storage.local.clear(function () {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
  chrome.storage.sync.clear();
}

function localStorageSave(data) {
  storageClear();
  var jsonfile = {};
  var key = "recordData",
    jsonData = JSON.stringify(data);
  jsonfile[key] = jsonData;
  chrome.storage.sync.set(jsonfile, function () {
    console.log("Saved", jsonData);
  });
}

function getLocalStorageData(records, numberOfInside) {
  return new Promise(function (resolve, reject){
  chrome.storage.sync.get("recordData", function (x) {
    console.log(x.recordData);
    if (!isObjEmpty(x)) {
      numberOfInside = 1;
      records = JSON.stringify(x["recordData"]);
      records = JSON.parse(JSON.parse(records));
      console.log(records);
      resolve(records);
    }
  });
  }).then( result => {
    return result;
  }).catch((err) => {
    console.log(err);
  });
}

export {
  localStorageSave,
  getLocalStorageData,
  storageClear
};

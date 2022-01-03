import { localStorageSave } from "../handleLocalStorage/localStorageHandler"

function isJsonAdded(records, url) {
  console.log(records.tests);
  if (records.tests[records.tests.length - 1].url == "no") {
      records.tests[records.tests.length - 1].url = url;
      localStorageSave(records);
      console.log(records);
      return records;
  } 
  else if(records.tests[records.tests.length - 1].url != url) {
    records.tests.push({
        data: "urlAddition",
        url: url,
        "isFormRequest": false
      });
      localStorageSave(records);
      console.log(records);
      return records;
  }
}

export { isJsonAdded };

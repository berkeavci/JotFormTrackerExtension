# JotForm Tracker Extension

This is chrome extension that records click `mousedown` events on browser. It can also save current DOM selectors; input, anchor and buttons. When click has stopped, it download json file that has data on record events and/or DOM selectors. It uses [Rxjs](https://github.com/ReactiveX/rxjs) library to handle subscription on click events and shortcuts. 

Webpack boilerplate used to to bring all dependencies into one and have an more efficient development to achieve better import statements, hot reload etc.


### Installation of Extension

1. Check if your Node.js version is >= 6.
2. Clone the repository.
3. Install [yarn](https://yarnpkg.com/lang/en/docs/install/).
4. Run `yarn`.
5. Run `yarn run start`
6. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.

> Build folder is enough to use extension. If developer mode needed, run `npm -i` to install dependencies then run `yarn run start` to start developing.

## How to use Extension?

### Shortcuts
   
* Start Recording.

        Command + Shift + S  
* Stop Recording. It clears json file and all the record data/states ( If records wanted to restart ).

        ControlLeft + Shift + P
 
* To download and Record. When hit, it immediately download the record and clears the data.

        Command + Shift + P
  
## JSON File Pattern

* Default Pattern 

```
{
    "id" : randomID,
    "created_date" : "YYYY-MM-DD HH:MM:SS",
    "extension" : 1.0.0,
    "tests" : [
        {
            "data" : selector,
            "target" : event.target,
            "parentElement" : event.target.parentElement,
            "type" : event.target.type,
            "value" : "" || event.target.value ( input value ),
            "url" : no || url,
            "isFormRequest" : false 
        }
    ]

}
```

* Url's that didn't catched during click event, catched via extension background.js 
``` 
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

```
[link-to-code](https://github.com/berkeavci/JotFormTrackerExtension/blob/73361703c453400573f214f0bb77ccf745b014c6/src/js/background.js#L30-L39)

* Url addition json format (as an example): 
``` 
    data : "urlAddition",
    "url" : "https://www.jotform.com/myforms"
```
* Formatted requested DOM content : 
``` 
    data : "a.example-class-name",
    "isFormRequest" : true,
    "type" : a
```




 




  
  
  

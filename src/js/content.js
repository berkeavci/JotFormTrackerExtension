//  var fs = require("browserify-fs");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Before If");
  if (request.method == "Recording") {
    console.log(request, sender, sendResponse);
    document.body.addEventListener("click", function(event){
        console.log("event: ", event.target.parentElement);
        
        fs.writeFile('userClickRecord.json', JSON.stringify(event.target.parentElement), 'utf8', (err,data)=>{
        console.log(err + "  " + data);
      });
        //console.log(event.target.className);
    })
    //.tagName.toLowerCase()
  }
});


// TODO: Search Puppeteer to integrate between Javascript code. 
Steps to reproduce:

TODOS :

- ![x] Configure start/stop button change and the idea of subs to that.
- ![x] Configure adding data to JSON
  - ![x] Test whole process with inputs, then put that json into puppeteer
      - [x] Concetanate string with "."
      - [x] Anchor and button input
- [x] Local Storage Solution for passing data on new page.
      ( https://stackoverflow.com/questions/54708537/pass-data-or-modify-extension-html-in-a-new-tab-window)
- [x] After addition make it downloanable
- [x] Command Line Application - [x] a key and test.json to test reading first - [x] repedeadly test the data pass on command line app via exec maybe? Search


# Updated FLow

      # Extension Part
             -> Extension will record every click, targetURL to json.  -- DONE
             -> ControlLeft + Shift + R = will make isFormReq to true and save every possible a, button, input
             ...So when dev request randomization of selector check the all the data will be placed.

      # Command Line Application Part 
             -> When test enters, application search for a, button and input counts IF IS FORM REQUEST TRUE. Then
             ...Gives the counts and ask for randomization. If no do test until isFormRequest. If yes, then in the order ask
             ...a, button and inputs percentages and save the data in the json file. on the code, do the test until formrequest. then read json and get the number of selectors randomization and check selectors randomly.              
- New TODO Area : 
      - Unsubcribe shortcut taps
      - Prevent Another request from ctrl + shift + r
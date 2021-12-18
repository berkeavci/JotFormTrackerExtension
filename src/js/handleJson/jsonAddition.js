function concatenateDataValues(data, typeOfClick, value, isReq) {
  // typeOfClick.data[typeOfElement];
  if (data != undefined) {
    data = data.toString().split(" ").join(".");
    typeOfClick += typeOfClick === 'class' ? "." : "#" ;
    data = data.replace(/^/, typeOfClick);
  }
  if (typeOfClick == "input." && isReq == false) {
    var typeHolder = `[type=${value.srcElement.attributes.type.nodeValue}]`; // input.class[type=text]
    data += typeHolder;
    return data;
  }
  if (typeOfClick == "input." && isReq) {
    var typeHolder = `[type=${value.attributes.type.nodeValue}]`;
  }

  return data;
}

function addDatatoJson(
  numberOfInside,
  value,
  records,
  typeOfClickOperation,
  inputValue
) {
  var selector;
  if (value.target.className != null) {
    selector = value.target.className;
  } else if (value.target.id != null) {
    selector = value.target.id;
  }
  let data = concatenateDataValues(
    selector,
    typeOfClickOperation,
    value,
    false,
  );
  let target = value.target == null ? "" : value.target;
  let parentElement =
    value.target.parentElement == null ? "" : value.target.parentElement;
  let urlName = value.target.href;

  if (numberOfInside > 0) {
    records.tests.push({
      data: data,
      target: target,
      parentElement: parentElement,
      type: typeOfClickOperation,
      value: inputValue,
      url: urlName,
      isFormRequest: "no",
    });
  } else {
    records.tests[numberOfInside].data = data;
    records.tests[numberOfInside].target = target.toString();
    records.tests[numberOfInside].parentElement = parentElement.toString();
    records.tests[numberOfInside].type = typeOfClickOperation;
    records.tests[numberOfInside].value = inputValue;
    records.tests[numberOfInside].url = urlName;
    records.tests[numberOfInside].url = "no";
  }
  console.log(records);
}

function preparationOfSelector(element, type) {
  if (element.className != "") {
    if (type == "input") {
      element = concatenateDataValues(
        element.className,
        type,
        element.type,
        true
      );
      return element;
    } else {
      element = concatenateDataValues(element.className, type, element, true);
      return element;
    }
  } else if (element.id != "") {
    element = concatenateDataValues(element.id, type, element);
  }
}

// Control + Shift + R
function pushRequestedDoc(nameOfElement, records, type) {
  Array.from(nameOfElement).forEach((element) => {
    var selec;
    if(element.className != null) selec = element.className; 
    else selec = element.id;
    element = concatenateDataValues(selec, type, element,true);
    //preparationOfSelector(element, type);
    records.tests.push({
      data: element,
      isFormRequest: "true",
      type: type,
    });
  });
  return records;
}

function addRequestDoctoJson(document, records) {
  var anchor = document.getElementsByTagName("a");
  records = pushRequestedDoc(anchor, records, "a");
  var button = document.getElementsByTagName("button");
  records = pushRequestedDoc(button, records, "button");
  var input = document.getElementsByTagName("input");
  records = pushRequestedDoc(input, records, "input");
  return records;
}

export { addDatatoJson, addRequestDoctoJson };

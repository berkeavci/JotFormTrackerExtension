import { isJsonAdded } from "./jsonCheck";

function concatenateDataValues(type, data, typeOfClick, value, isReq) {
  console.log(data);
  if (data != undefined && data != '') {
    data = data.toString().split(" ").join(".");
    typeOfClick += type === 'class' ? "." : "#" ;
    data = data.replace(/^/, typeOfClick);
  }
  if (typeOfClick == "input." && isReq == false) {
    var typeHolder = `[type=${value.srcElement.attributes.type.nodeValue}]`; // input.class[type=text]
    data += typeHolder;
    console.log(data);
    return data;
  }
  if (typeOfClick == "input." && isReq) {
    var typeHolder = `[type=${value.attributes.type.nodeValue}]`;
    data += typeHolder;
    return data; 
  }
  if (typeOfClick == "span"){ 
    var dataSet = value.target.attributes[0].nodeName;
    var dataType = value.target.attributes[0].nodeValue;
    var typeHolder = `[${dataSet}=${dataType}]`;
    data += typeHolder;
    typeOfClick += data;
    return typeOfClick;
  }
  console.log(data);
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
  var type;
  if (value.target.className != null) {
    selector = value.target.className;
    type = 'class';
  } else if (value.target.id != undefined) {
    selector = value.target.id;
    type = 'id';
  }
  let data = concatenateDataValues(
    type,
    selector,
    typeOfClickOperation,
    value,
    false,
  );
  
  let target = value.target == null ? "" : value.target;
  let parentElement =
    value.target.parentElement == null ? "" : value.target.parentElement;
  let urlName = (value.target.href === undefined || value.target.href === "") ? "no" : value.target.href;

  console.log(records);
  console.log(numberOfInside);
  if (records.tests.data != '') {
    console.log(urlName);
    records.tests.push({
      data: data,
      target: target,
      parentElement: parentElement,
      type: typeOfClickOperation,
      value: inputValue,
      url: urlName,
      isFormRequest: false,
    });
    
  } else {
    console.log(urlName);
    records.tests[numberOfInside].data = data;
    records.tests[numberOfInside].target = target
    records.tests[numberOfInside].parentElement = parentElement.toString();
    records.tests[numberOfInside].type = typeOfClickOperation;
    records.tests[numberOfInside].value = inputValue;
    records.tests[numberOfInside].url = urlName;
  }
  console.log(records);
}

// Control + Shift + R
function pushRequestedDoc(nameOfElement, records, type) {
  Array.from(nameOfElement).forEach((element) => {
    console.log(element);
    var selec;
    var elementVar;
    var typeOfClickedElement;
    if (element.id != ""){ 
      console.log(element.id);
      selec = element.id; 
      typeOfClickedElement = 'id';
      elementVar = concatenateDataValues(typeOfClickedElement,selec, type, element, true); 
    }
    else{
      console.log(element.class);
      selec = element.className;
      typeOfClickedElement = 'class';
      elementVar = concatenateDataValues(typeOfClickedElement,selec, type, element, true); 
    }
    //preparationOfSelector(element, type);
    records.tests.push({
      data: elementVar,
      isFormRequest: true,
      type: type,
    });
  });
  return records;
}

function addRequestDoctoJson(document, records) {
  console.log(records);
  var anchor = document.getElementsByTagName("a");
  records = pushRequestedDoc(anchor, records, "a");
  var button = document.getElementsByTagName("button");
  records = pushRequestedDoc(button, records, "button");
  var input = document.getElementsByTagName("input");
  records = pushRequestedDoc(input, records, "input");
  return records;
}

export { addDatatoJson, addRequestDoctoJson };

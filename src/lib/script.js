/*const inputField = document.getElementById("inputField");
const outputField = document.getElementById("outputField");
const submitButton = document.getElementById("submitButton");

function clear() {
    outputField.value = "";
}

function clean(text) {
    text = text.trim();
    text = text.toLowerCase();
    let regex = new RegExp(`${reg}${PREPS.join("\\s|(^|\\s)")}`,"gm");
    let regex2 = new RegExp("\\s+","gm");
    //storeText(regex,"rgx.text");
    text = text.replace(regex," ");
    text = text.replace(regex2," ");
    return text;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function push(text) {
    let currentText = outputField.value;
    sleep(100);
    outputField.value = currentText + "\n\n" + text;
}

async function onSubmit(globalEventHandler,mouseEvent) {
    clear();
    console.log(INDEX);
    let poem = inputField.value;
    let cleanedPoem = clean(poem);
    push(cleanedPoem);
}

submitButton.onclick = onSubmit;*/
/*const axios = require("axios");
const jsdom = require("jsdom");

let INDEX = require("./index.json");

const { storeData, storeText } = require("./util");

const { JSDOM } = jsdom;

const { JS_DIR, TX_DIR } = require("./config");

const url = "https://www.poetry.net/random.php";
const baseUrl = "https://www.poetry.net";

const TO_FETCH = 20;

async function getPage() {
    let pageData = await axios.default({
        method: "GET",
        baseURL: url,
    });
    let dom = new JSDOM(pageData.data, {
        url: url,
        referrer: baseUrl,
        contentType: "text/html; charset=UTF-8",
        runScripts: "dangerously"
    });
    //storeData(pageData.data,"page.html");
    let content = dom.window.document.getElementsByTagName("blockquote")[0].children[0].textContent.split("\n");
    let copyright = content[content.length - 1];
    let poem = {
        id: dom.window.document.getElementsByTagName("h1")[0].getElementsByTagName("a")[0].getAttribute("href").toString().split("/")[2],
        title: dom.window.document.getElementsByTagName("h1")[0].getElementsByTagName("a")[0].text,
        author: dom.window.document.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].text,
        copyright: copyright.toLowerCase().includes("copyright") ? content.pop() : null,
        content: content.join("\n"),
        url: `${baseUrl}${dom.window.document.getElementsByTagName("h1")[0].getElementsByTagName("a")[0].getAttribute("href")}`
    };
    //console.log(poem);
    let pathjs = `${JS_DIR}${poem.id}.json`;
    let pathtx = `${TX_DIR}${poem.id}.txt`;
    INDEX.push({
        author: poem.author,
        id: poem.id,
        pathjs: pathjs,
        pathtx: pathtx,
    });
    return storeData(poem, pathjs) && storeText(poem.content, pathtx);
}

async function run() {
    for (let i = 0; i < TO_FETCH; i++) {
        let success = await getPage();
        console.log(i, success);
    }
    return storeData(INDEX, "index.json");
}

run().then((ret) => {
    console.log("COMPLETED", ret);
}).catch((err) => {
    console.log("ERROR");
    console.error(err)
});*/
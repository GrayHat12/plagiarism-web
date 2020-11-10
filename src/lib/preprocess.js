/*let INDEX = require("./index.js");
const PREPS = require("./prepositions.json").preps;

const { fetchData, storeData, storeText } = require("./util");
const { PR_DIR } = require("./config");
//const PR_DIR = './src/lib/collected_poems/nprocessed/';
const reg = "\\,|\\.|\\;|\\:|\\(|\\)|\\t|\\`|\\~|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\*|\\-|\\_|\\=|\\+|\\{|\\[|\\}|\\]|\\<|\\>|\\/|\\?|\\\"|\\'|\\||\\n+|\\—|(^|\\s)";

let POEMDATA = {
    size: 0,
    values: {}
};

function push(data) {
    POEMDATA.values[POEMDATA.size] = data;
    POEMDATA.size += 1;
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

function findIndex(pattern,key,max) {
    let index = -1;
    for(let i=1;i<=max;i++) {
        if(pattern[i] === key){
            index = i;
        }
    }
    return index;
}

function getPieTable(pattern) {
    let table = [0];
    for(let i=1;i<pattern.length;i++) {
        let key = pattern[i];
        //let firstIndex = pattern.length - pattern.slice(0,i).reverse().findIndex((v,i,a) => v === key);
        //let firstIndex = findIndex(pattern,key,i);
        //console.log(typeof pattern);
        let firstIndex = pattern.findIndex((v,i,a) => v === key);
        table.push(firstIndex === -1 || firstIndex === i ? 0 : firstIndex);
    }
    return table;
}

function preprocess() {
    for (let i = 0; i < INDEX.length; i++) {
        let poemdata = INDEX[i].pathjs;//fetchData(INDEX[i].pathjs);
        let processedPoemData = {
            content: poemdata.content
        };
        processedPoemData["cleaned"] = clean(processedPoemData.content);
        processedPoemData["pattern"] = [null,...(processedPoemData["cleaned"].split(/\s|\n|\t/))];
        processedPoemData["pi"] = getPieTable(processedPoemData["pattern"]);
        let PATH = `${PR_DIR}${INDEX[i].id}.json`;
        INDEX[i]["pathpr"] = PATH;
        push(processedPoemData);
        storeData(processedPoemData,PATH);
    }
}

preprocess();
storeData(INDEX,"index.json");

module.exports = { clean };
*/
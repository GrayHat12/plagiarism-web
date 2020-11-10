export const INDEX = require("./index").default;
export const PREPS = require("./prepositions.json").preps;
export const config = require("./config");

export const reg = "\\,|\\.|\\;|\\:|\\(|\\)|\\t|\\`|\\~|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\*|\\-|\\_|\\=|\\+|\\{|\\[|\\}|\\]|\\<|\\>|\\/|\\?|\\\"|\\'|\\||\\n+|\\—|(^|\\s)";

export function clean(text) {
    text = text.trim();
    text = text.toLowerCase();
    let regex = new RegExp(`${reg}${PREPS.join("\\s|(^|\\s)")}`, "gm");
    let regex2 = new RegExp("\\s+", "gm");
    //storeText(regex,"rgx.text");
    text = text.replace(regex, " ");
    text = text.replace(regex2, " ");
    return text;
}

export function getPieTable(pattern) {
    let table = [null];
    for (let i = 1; i < pattern.length; i++) {
        let key = pattern[i];
        //console.log(typeof pattern);
        let firstIndex = pattern.findIndex((v, i, a) => v === key);
        table.push(firstIndex === -1 || firstIndex === i ? 0 : firstIndex);
    }
    return table;
}

export function preprocess(poem) {
    let cleaned = clean(poem);
    let pattern = [null, ...(cleaned.split(/\s|\n|\t/))];
    let poemData = {
        poem: poem,
        cleaned: cleaned,
        pattern: pattern,
        pi: getPieTable(pattern)
    };
    return poemData;
}

export function compare(poemProcessed, src) {
    let i = 1, j = 0;
    let patternFound = [];
    let maxj = 0;
    while (i < poemProcessed.pattern.length) {
        if (maxj < j) {
            maxj = j;
            patternFound = src.pattern.slice(1,maxj+1);
        }
        let string = poemProcessed.pattern[i];
        let pattern = src.pattern[j + 1];
        if (string === pattern) {
            i++;
            j++;
            continue;
        }
        else {
            j = src.pi[j];
            if (j === null) {
                i++;
                j = 0;
            }
            continue;
        }
    }
    return patternFound;
}

export function majorCompare(poemProcessed, src) {
    let pattern = [];
    let srcPattern = src.pattern;
    while(srcPattern.length > 1) {
        let currentPattern = compare(poemProcessed, {
            ...src,
            pattern : srcPattern
        });
        if (currentPattern.length > pattern.length) {
            pattern = currentPattern;
        }
        srcPattern.splice(1,1);
    }
    return pattern;
}

export function getModule(path) {
    return require(path);
}
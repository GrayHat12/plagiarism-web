/*const fs = require("fs");

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const storeText = (data, path) => {
    try {
        fs.writeFileSync(path, data);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const fetchData = (path) => {
    try {
        let sdata = fs.readFileSync(path, { encoding: "UTF-8" });
        return JSON.parse(sdata);
    } catch (err) {
        console.error(err);
        return null;
    }
}

const fetchText = (path) => {
    try {
        let sdata = fs.readFileSync(path, { encoding: "UTF-8" });
        return sdata;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    storeData,
    storeText,
    fetchText,
    fetchData,
}*/
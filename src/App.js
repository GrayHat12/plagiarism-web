import React from "react";
import styles from "./App.module.css";
import { INDEX, majorCompare, preprocess } from "./lib/exports";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends React.Component {
  state = {
    value: [""]
  }
  inputField = React.createRef();
  push = async (text, wait, decorate) => {
    await sleep(wait ? wait : 100);
    this.setState({
      value: [...this.state.value, decorate ? <div className={styles.color}>{text}</div> : text]
    });
  };
  pop = async (wait) => {
    await sleep(wait ? wait : 100);
    let popped = this.state.value.pop();
    this.setState({
      value: this.state.value
    });
    return popped;
  }
  clear = () => {
    this.setState({
      value: [""]
    });
  };
  onDetect = async () => {
    let text = this.inputField.current.value;
    this.clear();
    await this.push("Starting Detection", 50);
    await this.pop();
    await this.push("Cleaning Input", 150);
    await this.pop();
    await this.push("Generating Pattern", 300);
    await this.pop();
    await this.push("Generating Pi Table", 250);
    this.pop();
    let procesedData = preprocess(text);
    let threshold = 5;
    let matches=[]; //= [[], [], [], [], []];
    let matchedPoems = [];
    await this.push("Comparing with dataset", 300);
    for (let i = 0; i < INDEX.length; i++) {
      let poempath = INDEX[i].id;
      await this.push(`--> (${i + 1}/${INDEX.length}) ${poempath}`, 1);
      let srcpoem = INDEX[i].pathjs;
      let processedSrcPoem = preprocess(srcpoem.content);
      let compareResult = majorCompare(procesedData, processedSrcPoem);
      if (compareResult.length > threshold) {
        console.log(compareResult);
        matchedPoems.push(INDEX[i]);
        matches.push(compareResult);
        /*let length = compareResult.length;
        if (length > matches[0].length) {
          matches[0] = compareResult;
        } else if (length > matches[1].length) {
          matches[1] = compareResult;
        } else if (length > matches[2].length) {
          matches[2] = compareResult;
        } else if (length > matches[3].length) {
          matches[3] = compareResult;
        } else if (length > matches[4].length) {
          matches[4] = compareResult;
        }*/
      }
      await this.pop();
    }
    await this.push(`\n\nFOUND MATCHES ${matchedPoems.length} :\n\n`, 5);
    //console.log(matches);
    let output = text;
    let matchedLines = [];
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].length === 0) continue;
      let regex = new RegExp(matches[i].join("(\\W*\\s*[a-z]*){1,2}"), "gmi");
      let match = procesedData.poem.match(regex);
      console.log(match);
      matchedLines.push(match[0]);
      //let prev = procesedData.poem.indexOf(match[0]);
      //let string = <>{procesedData.poem.substring(0, prev)}<span className={styles.color}>{match[0]}</span>{procesedData.poem.substring(prev + match[0].length)}</>;
      //this.push(string, 10);
    }
    console.log(matchedLines);
    for (let i = 0; i < matchedLines.length; i++) {
      output = output.replace(matchedLines[i], `<span class="${styles.color}">${matchedLines[i]}</span>`);
    }
    await this.push(output, 5);
    await this.push("<br /><br />Matched Poems : ", 50);
    await this.push('---------------------------<br /><br />', 15);
    for (let i = 0; i < matchedPoems.length; i++) {
      console.log(matchedPoems[i]);
      await this.push(`Poem : <a target="_blank" href="https://www.poetry.net/poem/${matchedPoems[i].id}/">${matchedPoems[i].id}</a>`, 12);
      await this.push(`Author : ${matchedPoems[i].author}`, 12);
      await this.push('---------------------------<br /><br />', 15);
    }
  }
  render() {
    return (
      <>
        <h1>PLAGIARISM DETECTOR</h1>
        <div className={styles.grid}>
          <textarea ref={this.inputField} className={styles.inputField}></textarea>
          <code className={styles.outputField} dangerouslySetInnerHTML={{ __html: this.state.value.join("<br />") }}>

          </code>
        </div>
        <button onClick={this.onDetect} className={styles.submitButton}>DETECT</button>
      </>
    );
  }
}

export default App;
'use strict';
const fs = require('fs');
const jsonCountiesFolder = '../cik-lookup-data.txt'
const jsonDirWrite = '../cik-lookup-data.json'
function calcSplitter (files = [], totalSplits = 6) {
  const fileLength = files.length / totalSplits
  let results = []
  for (let i = 0; i < totalSplits; i++) {
    let result = files.slice(i * fileLength, fileLength * (i + 1))
    results.push(result)
  }
  return results
}
fs.readFile(jsonCountiesFolder, (err, data) => {
  if (err) throw console.log(err);
  var dataArr = data.toString('utf8').split(/\n/);
  console.log(typeof dataArr);
  let a = []
  dataArr.forEach(t => {
    let splText = t.split(/:*:/)
    let temp = {
      company_name: splText[0],
      cik_number: splText[1]
    }
    a.push(temp)
  })
  console.log(a.length) // 786880 items
  let totalFiles = calcSplitter(a, 40)
  totalFiles.forEach((file, index) => {
    fs.writeFile(`../cik/cik-${index}.json`, JSON.stringify(file), (err) => {
      if (err) {
        throw err;
      }
      console.log(`JSON data cik-${index}.json is saved.`);
    })
  })
   // todo: compact
  /*fs.writeFile(jsonDirWrite, JSON.stringify(a), (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  })*/

});


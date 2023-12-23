'use strict'
const fs = require('fs')
const faker = require('faker')
const jsonCountiesFolder = '../usconstitution.full.json'
fs.readFile(jsonCountiesFolder, (err, data) => {
  if (err) {
    throw console.log(err)
  }
  let arrData = JSON.parse(data)
  console.log(arrData)
  // var result = convertTreeToList(arrData);
  const result = generatorTreeToList([arrData])
  fs.writeFile(`../usconstitution.json`, JSON.stringify(result), (err) => {
    if (err) {
      throw err
    }
    console.log(`JSON tree to array is saved.`, JSON.stringify(result))
  })
})
const results = []
function generatorTreeToList(tree = [], parentId = null, initResults = []) {
  let results = [...initResults]
  for (let i = 0; i < tree.length; i++) {
    let t = { ...tree[i] }
    let id = faker.random.uuid()
    t['id'] = id
    t['parentId'] = parentId
    let hasChildren = t.children.length > 0
    let rs = { ...t }
    delete rs['children']
    results.push(rs)
    if (hasChildren) {
      generatorTreeToList([...t.children], id, results)
    }
  }
  return results
}

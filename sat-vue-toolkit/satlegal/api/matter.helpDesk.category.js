const data = [
  { id: 1, name: "Jury Duly", color: "E85B49", desc: "" },
  { id: 2, name: "Family and Medical Leave", color: "6D41CA", desc: "" },
  { id: 3, name: "Adverse Weather", color: "EA1E63", desc: "" },
  { id: 4, name: "Childbirth", color: "049588", desc: "" },
  { id: 5, name: "Personal Leave", color: "FE9501", desc: "" },
  { id: 6, name: "Business Trip", color: "000000", desc: "" },
  { id: 7, name: "Vacation", color: "F47F15", desc: "" },
  { id: 8, name: "Military Leave", color: "26B116", desc: "" },
  { id: 9, name: "Pregnancy", color: "5277C5", desc: "" }
]

async function getDataCategory() {
  return {
    results: data,
    count: data.length
  }
}

async function createCategory(req) {
  return {
    ...req,
    id: Math.random()
  };
}

async function updateCategory(req) {
  const results = data.find(x => x.id === req.rowId)
  return {
    ...results,
    [req.columnName]: results[req.columnName] = req.bodyRequest[req.columnName]
  }
}

async function removeCategory(req) {
  return req.id;
}

export default {
  getDataCategory,
  removeCategory,
  createCategory,
  updateCategory
}

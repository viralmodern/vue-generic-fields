import faker from 'faker'
export let taskModel = ({
  type = 'Checkbox',
  to_model = 'card.card',
  name = '',
}) => {
  let _pk = faker.random.uuid()
  return {
    pk: _pk,
    id: _pk,
    name: name || faker.name.title(),
    description: faker.lorem.words(),
    type: type || 'Checkbox',
    to_model: to_model || 'card.card',
  }
}

let BOARDS = [],
  LIST = [],
  TASKS = []
export function createBoard({ total = 6 }) {
  let _total = total || 10
  let boards = []
  let i = 0
  do {
    // code block to be executed
    boards.push({
      pk: faker.random.uuid(),
      title: faker.name.title(),
      name: faker.company.companyName(),
      description: faker.lorem.words(),
      archived: faker.random.boolean(),
    })
    i++
  } while (i < _total)
  return boards
}
// Math.floor(Math.random() * 12) + 1
export function randomPos(prefix = 0, total = 12) {
  return prefix + Math.floor(Math.random() * total)
}

export const createList = ({ total = 6, board }) => {
  let list = []
  let i = 0
  do {
    // code block to be executed
    let id = faker.random.uuid()
    list.push({
      id,
      pk: id,
      title: 'List ' + faker.name.title(),
      name: 'List ' + faker.name.findName(),
      board,
      archived: faker.random.boolean(),
      headerColor: faker.internet.color(),
    })
    i++
  } while (i < total)
  return list
}
const generateListBoard = ({ boards }) => {
  let list = []
  let i = 0
  do {
    // code block to be executed
    let total = randomPos(1)
    let items = createList({ total: total, board: boards[i] })
    list = [...list, ...items]
    i++
  } while (i < boards.length)
  return list
}
export const createMember = () => {
  return {
    pk: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.exampleEmail(),
  }
}
export const createLabel = () => {
  return {
    pk: faker.random.uuid(),
    name: faker.lorem.word(),
  }
}
export const generateMembers = (members) => {
  let i = 0,
    _members = []
  do {
    let member = createMember()
    _members.push(member)
    i++
  } while (i < members)
  return _members
}
const generateLabels = (labels) => {
  let i = 0,
    _labels = []
  do {
    let member = createLabel()
    _labels.push(member)
    i++
  } while (i < labels)
  return _labels
}
export const createTask = ({
  labels = 6,
  members = 4,
  board = null,
  list = null,
}) => {
  let id = faker.random.uuid()
  return {
    id,
    pk: id,
    name: faker.commerce.productName(),
    text: faker.name.jobTitle(),
    title: faker.name.title(),
    list,
    board,
    members: generateMembers(members),
    labels: generateLabels(labels),
  }
}
export function generateTask(total, list) {
  let i = 0,
    _tasks = []
  do {
    // let _list = list[randomPos()]
    let task = createTask({
      labels: randomPos(1, 16),
      members: randomPos(1, 10),
      // list: _list,
      // board: _list.board,
    })
    _tasks.push(task)
    i++
  } while (i < total)
  return _tasks
}
function generateItems(total) {
  let i = 0,
    _items = []
  do {
    i++
  } while (i < total)
  return _items
}

// BOARDS = createBoard({ total: 4 })
// LIST = generateListBoard({ boards: BOARDS })
// TASKS = generateTask(2000, LIST)

// import * as d3 from 'd3'

// window.d3 = d3
window.task = TASKS
window.faker = faker
/*
let taskByList = d3
  .nest()
  .key(function (task) {
    return task.board
  })
  .object(TASKS)
*/

export default { MOCK_BOARDS: BOARDS, MOCK_LIST: LIST, MOCK_TASKS: TASKS }

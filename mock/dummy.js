export const items_tracking = [
  {
    type_tracking: 1, // 1 || 2
    added_on: '2020-01-01 18:45',
    logged_by: {
      pk: 4,
      username: 'master',
      name: 'Bug JR',
      avatar: null
    },
    logged_for: null,
    taskboard: {
      pk: 5,
      description:
        'đầu tiên select taskboard nào trước, hoặc cho create new taskboard ngay tại đây'
    },
    description:
      'đầu tiên select taskboard nào trước, hoặc cho create new taskboard ngay tại đây',
    comment:
      'đầu tiên select taskboard nào trước, hoặc cho create new taskboard ngay tại đây',
    activities_code: 'A102',
    litigation_code: 'L320',
    source: '',
    start_time: '2020-01-15T10:14:17+07:00',
    end_time: '2020-01-15T11:14:17+07:00',
    duration: 1000,
    client: null,
    labels: [
      { pk: 1, text: 'discovery', color: 'red' },
      { pk: 3, text: 'taskboard created', color: 'pink' },
      { pk: 4, text: 'task created', color: 'primary' }
    ],
    billable: true,
    action: ''
  },
  {
    type_tracking: 2, // 1 || 2
    added_on: '2020-01-01 18:45',
    logged_by: {
      pk: 4,
      username: 'master',
      name: 'Bug JR',
      avatar: null
    },
    logged_for: null,
    taskboard: {
      pk: 5,
      description:
        'đầu tiên select taskboard nào trước, hoặc cho create new taskboard ngay tại đây'
    },
    description:
      'đầu tiên select taskboard nào trước, hoặc cho create new taskboard ngay tại đây',
    comment:
      'đầu tiên select taskboard nào trước, hoặc cho create new taskboard ngay tại đây',
    activities_code: 'A102',
    litigation_code: 'L320',
    source: '',
    start_time: '2020-01-15T10:14:17+07:00',
    end_time: '2020-01-15T11:14:17+07:00',
    duration: 1000,
    client: null,
    labels: [
      { pk: 1, text: 'discovery', color: 'red' },
      { pk: 3, text: 'taskboard created', color: 'pink' },
      { pk: 4, text: 'task created', color: 'primary' }
    ],
    billable: true,
    action: ''
  }
]
export const clients = [
  {
    text: 'Judge',
    value: 'judge'
  },
  {
    text: 'lawyer',
    value: 'lawyer'
  }
]

export const members = [
  {
    username: 'John',
    name: 'Robeto baggio',
    email: 'jkog@gmail.com',
    avatar: null,
    value: 'John',
    pk: 23456
  },
  {
    username: 'mazuke',
    name: 'Ronaldo',
    email: 'jkog@gmail.com',
    avatar: null,
    value: 'Ronaldo',
    pk: 897
  }
]

export const temp_note =
  '# Intro\n' +
  'http://google.com\n' +
  'Go ahead, play around with the editor! Be sure to check out **bold** and *italic* styling, or even [links](https://google.com). You **can** type the Markdown syntax, use the toolbar, or use shortcuts like `cmd-b` or `ctrl-b`.\n' +
  '\n' +
  '## Lists\n' +
  'Unordered lists can be started using the toolbar or by typing `* `, `- `, or `+ `. Ordered lists can be started by typing `1. `.\n' +
  '\n' +
  '#### Unordered\n' +
  '* Lists are a piece of cake\n' +
  '* They even auto continue as you type\n' +
  '* A double enter will end them\n' +
  '* Tabs and shift-tabs work too\n' +
  '\n' +
  '#### Ordered![](http://)\n' +
  '1. Numbered lists...\n' +
  '2. ...work too!\n' +
  '\n' +
  '## What about images?\n' +
  '![Yes](https://i.imgur.com/sZlktY7.png)'

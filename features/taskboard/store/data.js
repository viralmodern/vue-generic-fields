export const BOARDS_MOCK = [
  {
    id: 'd033c156-5972-4767-ceb0-8a91a5c282db',
    pk: 'd033c156-5972-4767-ceb0-8a91a5c282db',
    name: 'Project Tracker',
    description: 'This is a project tracker board',
    archived: false,
    color: 'pink',
    progress: 35,
    members: [1, 2, 3],
    lists: [
      {
        id: '4a62105f-6d1c-a84d-c7bc-5ee29a13afa3',
        pk: '4a62105f-6d1c-a84d-c7bc-5ee29a13afa3',
        name: 'To Do',
        headerColor: '#607d8b',
        archived: false,
        items: [
          {
            id: '6fb2c8e6-5980-9403-f847-51407ab4597a',
            pk: '6fb2c8e6-5980-9403-f847-51407ab4597a',
            text: 'Build the feature #1',
            labels: ['ls', 'lexus', '502']
          }
        ]
      }
    ]
  }
]
export const LIST_MOCK = [
  {
    id: '4a62105f-6d1c-a84d-c7bc-5ee29a13afa3',
    pk: '4a62105f-6d1c-a84d-c7bc-5ee29a13afa3',
    name: 'To Do',
    headerColor: '#607d8b',
    archived: false
  }
]
export const TASK_MOCK = [
  {
    id: '6fb2c8e6-5980-9403-f847-51407ab4597a',
    pk: '5972-4767-ceb0-8a91a5c282db',
    board: '',
    text: 'Build the feature #1',
    labels: ['ls', 'lexus', '502']
  }
]

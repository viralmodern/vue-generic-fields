export const dataIndexDetail = {
  indexDetail: {
    terminology: [
      { id: 1, terms: "terms 1", definitions: "definitions 1", page: 1 },
      { id: 2, terms: "terms 2", definitions: "definitions 2", page: 2 },
      { id: 3, terms: "terms 3", definitions: "definitions 3", page: 3 },
      { id: 4, terms: "terms 4", definitions: "definitions 4", page: 4 },
      { id: 5, terms: "terms 5", definitions: "definitions 5", page: 5 }
    ],
    hightLight: [
      {
        id: 1,
        page: 1,
        panel: true,
        listSupported: [1, 3],
        support: [
          {
            id: 11,
            name: "HightLight 1",
            list: [
              {
                id: 2,
                name: "hello 1",
                progress: 12,
                percent: 42,
                strength: 1,
                message: 4,
                characters: [2, 3]
              },
              {
                id: 3,
                name: "Haha",
                progress: 54,
                percent: 43,
                strength: 2,
                message: 2,
                characters: [3]
              },
              {
                id: 4,
                name: "conversion to 50%",
                progress: 95,
                percent: 74,
                strength: 3,
                message: 4,
                characters: [1, 2, 3]
              }
            ]
          }
        ]
      },
      {
        id: 5,
        page: 2,
        panel: false,
        listSupported: [1, 3, 4],
        support: [
          {
            id: 16,
            name: "HightLight 2",
            list: [
              {
                id: 7,
                name: "tested",
                progress: 36,
                percent: 57,
                strength: 2,
                message: 4,
                characters: [3]
              },
              {
                id: 8,
                name: "flow",
                progress: 94,
                percent: 68,
                strength: 3,
                message: 2,
                characters: [2, 3]
              },
              {
                id: 9,
                name: "Increase",
                progress: 65,
                percent: 14,
                strength: 1,
                message: 4,
                characters: [1, 3]
              }
            ]
          }
        ]
      }
    ],
    happened: [
      {
        id: 1,
        timeHappen: "2019-06-12T14:36:51.664Z",
        panel: true,
        support: [
          {
            id: 11,
            name: "Photo 1",
            list: [
              {
                id: 2,
                name: "name Photo 1",
                progress: 12,
                percent: 42,
                strength: 1,
                message: 4,
                characters: [2, 3]
              },
              {
                id: 3,
                name: "name Photo 2",
                progress: 54,
                percent: 43,
                strength: 2,
                message: 2,
                characters: [3]
              },
              {
                id: 4,
                name: "name Photo 3",
                progress: 95,
                percent: 74,
                strength: 3,
                message: 4,
                characters: [1, 2, 3]
              }
            ]
          }
        ]
      }
    ],
    audioDetail: [
      { id: 1, timeFrom: "05:03", timeEnd: "12:54", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", color: 1, },
      { id: 2, timeFrom: "02:06", timeEnd: "31:32", text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout", color: 2, },
      { id: 3, timeFrom: "04:41", timeEnd: "14:42", text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form", color: 3, },
      { id: 4, timeFrom: "01:54", timeEnd: "11:24", text: "All you have to do in your mutation method is change this new state object and then Vuex will commit the new state to the store when the method ends. Here we have a simple mutation setSnack that just sets the snack attribute to a passed parameter.", color: 4, },
      { id: 5, timeFrom: "08:32", timeEnd: "12:53", text: "Just add a created method that sets up the watcher. We use created here instead of mounted because it doesn’t need to be rerun if we leave this layout and come back to it.", color: 5, }
    ]
  },
  name: "Duy",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  presumption: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  probative: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
  relevant: 19,
  materiality: 15,
  admissibility: 30,
  veracity: 40,
  objectivity: 73,
  creator: 1,
  provided: 1,
  authored: [1, 2],
  originial: "2019-05-21T14:36:51.664Z",
  favorable: 3,
  underOath: false,
  disputed: false,
  tag: [1, 2, 4],
  characters: [1, 2, 3],
  relatedFacts: [1, 2],
  factorAffect: [],
  resultOfEvidence: [],
  exception: true,
  available: true,
  exceptionType: 2,
  worklog: [
    {
      id: 1,
      user: {
        name: "Smith Cain",
        avatar: {
          imageUrl:
            "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        }
      },
      createdDate: "2019-02-17T17:10:10.000Z",
      timeSpent: 450,
      comment: `- Implement UI
- Design avatar`
    },
    {
      id: 2,
      user: {
        name: "Smith Cain",
        avatar: {
          imageUrl:
            "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        }
      },
      createdDate: "2019-02-17T17:10:10.000Z",
      timeSpent: 450,
      comment: `- Implement UI
- Design avatar`
    }
  ],
  creataAt: "2019-05-21T14:36:51.664Z"
}

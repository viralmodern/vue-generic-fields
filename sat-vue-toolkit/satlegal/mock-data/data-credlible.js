const srcs = {
  1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
  2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
  3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
  4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
  5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
};
export const dataProjectBoard = {
  id: 1,
  status: "active",
  creator: "Mike",
  checkList: [
    {
      id: 2,
      type: "public",
      name: "Tasks for Samantha",
      totalItems: 5,
      finishedItems: 1
    },
    {
      id: 3,
      type: "private",
      name: "Tasks for Daniel",
      totalItems: 7,
      finishedItems: 2
    }
  ],
  board: {
    stages: ["Strength", "Weaknesses", "Opportunities", "Threats"],
    blocks: [
      {
        id: 0,
        status: "Strength",
        img: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        label: [
          {
            color: "primary"
          },
          {
            color: "secondary"
          }
        ],
        title: "Test",
        todo: [
          {
            date: "Dec 2, 2017"
          }
        ],
        members: [
          { id: 1, name: "Sandra Adams", group: "Group 1", avatar: null },
          { id: 2, name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
          { id: 3, name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
          { id: 4, name: "Tucker Smith", group: "Group 1", avatar: srcs[2] }
        ],
        viewer: true,
        attachment: 3,
        comments: 2
      },
      {
        id: 1,
        status: "Weaknesses",
        img: null,
        label: [
          {
            color: "primary"
          },
          {
            color: "secondary"
          },
          {
            color: "red"
          }
        ],
        title: "Test 2",
        todo: [
          {
            date: "Dec 2, 2017"
          }
        ],
        members: [
          { id: 5, name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
          { id: 6, name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
          { id: 7, name: "John Smith", group: "Group 2", avatar: srcs[1] },
          { id: 8, name: "Sandra Williams", group: "Group 2", avatar: srcs[3] }
        ],
        viewer: false,
        attachment: 0,
        comments: 1
      }
    ]
  }
};

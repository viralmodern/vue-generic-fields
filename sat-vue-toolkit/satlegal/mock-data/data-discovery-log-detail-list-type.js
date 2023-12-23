export const dataListType = {
  privilegeLog: [
    {
      id: 1,
      name: "Lorem Ipsum  privilege 1",
      startDate: "2019-01-17T17:10:10.000Z",
      endDate: "2019-04-17T17:10:10.000Z",
      description: "Description 1",
      tags: [1, 3],
      type: [2, 3],
      attachments: [1, 3],
    },
    {
      id: 2,
      name: "Lorem Ipsum privilege 2",

      startDate: "2019-01-17T17:10:10.000Z",
      endDate: "2019-04-17T17:10:10.000Z",
      description: "Description 1",
      tags: [1, 2],
      type: [2, 1],
      attachments: [4, 2],
    }
  ],
  chainOfCustody: [
    {
      id: 1,
      name: "Lorem Ipsum  chain 1",
      description: "Description ",
      date: "2019-02-17",
      time: "11:15",
      tags: [1, 3],
      releasedBy: 1
    },
    {
      id: 2,
      name: "Lorem Ipsum chain 2",
      description: "Description 1",
      date: "2019-02-17",
      time: "10:15",
      tags: [1, 2],
      releasedBy: 2
    }
  ],
  communicationLog: [
    {
      id: 1,
      name: "Lorem Ipsum 1",
      date: "2019-02-17",
      time: "03:15",
      from: 1,
      to: 2,
      description:
        "Description...",
      tags: [1, 2]
    },
    {
      id: 2,
      name: "Lorem Ipsum 2",
      date: "2019-02-10",
      time: "09:15",
      from: 2,
      to: 1,
      description:
        "Description...",
      tags: [1, 3]
    }
  ],
  exhibitLog: [
    {
      id: 1,
      name: "Lorem Ipsum 1",
      number: 1,
      source: 2,
      stage: 3,
      description:
        "Description...",
      tags: [2, 1]
    },
    {
      id: 2,
      name: "Lorem Ipsum 2",
      number: 3,
      source: 1,
      stage: 2,
      description:
        "Description...",
      tags: [2, 3]
    }
  ]
};

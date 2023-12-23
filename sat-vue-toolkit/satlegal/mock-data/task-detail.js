export default {
  dataLocation: [
    {
      id: 1,
      name: "	New York"
    },
    {
      id: 2,
      name: "Los Angeles"
    },
    {
      id: 1,
      name: "Chicago"
    }
  ],
  dataPeoples: [
    {
      id: 1,
      mission: "Asignee",
      user: {
        id: 121,
        imageUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
        fullName: "Phong Nguyen"
      }
    },
    {
      id: 2,
      mission: "Reporter",
      user: {
        id: 123,
        imageUrl: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        fullName: "Nguyen Phong"
      }
    }
  ],
  dataTaskDetailSelect: {
    favorable: [
      {
        id: 1,
        name: "Plaintiff"
      },
      {
        id: 2,
        name: "Defendant"
      },
      {
        id: 3,
        name: "No-party"
      }
    ],
    vulnerability: [
      {
        id: 1,
        name: "Very Low"
      },
      {
        id: 2,
        name: "Low"
      },
      {
        id: 3,
        name: "Medium"
      },
      {
        id: 4,
        name: "Medium"
      },
      {
        id: 5,
        name: "Critical"
      }
    ],
    treatment: [
      {
        id: 1,
        name: "Overruled"
      },
      {
        id: 2,
        name: "Questioned"
      },
      {
        id: 3,
        name: "Cautioned"
      },
      {
        id: 4,
        name: "Distinguished"
      },
      {
        id: 5,
        name: "Explained"
      },
      {
        id: 6,
        name: "Followed"
      }
    ],
    limitation: [
      {
        id: 1,
        name: "Reversed"
      },
      {
        id: 2,
        name: "Criticized"
      },
      {
        id: 3,
        name: "Statutory-related"
      }
    ]
  },
  dataTagsDetail: [
    {
      id: 1,
      text: "Client",
      color: "#9A4949"
    },
    {
      id: 2,
      text: "Fact Witness",
      color: "#2CA056"
    },
    {
      id: 3,
      text: "Character Witness",
      color: "#3E69EA"
    }
  ],
  taskDetail: {
    id: 1,
    title: "Brand new Swag conccept",
    code: "MRKT - 235",
    description:
      "We're planning the biggest Crush conference in 2019 <br/> Here you can take different graphics: <a href='https://vuetifyjs.com/en/components/tabs#tab'>Here</a>",
    projectDetail: {
      id: 100,
      name: "Marketing",
      avatar: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    },
    members: [
      {
        id: 2,
        isActive: true,
        avatar: {
          imageUrl:
            "https://trello-avatars.s3.amazonaws.com/5571e24a656b1b426f0071d75476f330/30.png",
          name: "Hieu Le",
          nickName: "HieuLeIT"
        },
        email: "hieule@gmail.com"
      },
      {
        id: 3,
        isActive: true,
        avatar: {
          imageUrl:
            "https://trello-avatars.s3.amazonaws.com/ef0b40cd29918761024597ce0502f136/30.png",
          name: "Pham Xuan Duy",
          nickName: "x_duy"
        },
        email: "xduy.pham@gmail.com"
      },
      {
        id: 4,
        isActive: true,
        avatar: {
          imageUrl:
            "https://trello-avatars.s3.amazonaws.com/26e8c76baa777aeed1c16aec5b980b56/30.png",
          name: "Nguyen van phong",
          nickName: "phongnguyen"
        },
        email: "phongnguyen@gmail.com"
      }
    ],
    locations: [
      {
        id: 1,
        name: "	New York"
      }
    ],
    selects: {
      limitation: {
        id: 2,
        name: "Statutory-related"
      },
      treatment: {
        id: 1,
        name: "Overruled"
      },
      vulnerability: {
        id: 1,
        name: "Very Low"
      },
      favorable: {
        id: 1,
        name: "Plaintiff"
      }
    },
    estimate: 100,
    feature: { id: 2, name: "Feature S" },
    compelete: { id: 3, name: "Compelete 85%" },
    statusWork: { id: 2, name: "Pendding" }
  },
  dataTagChips: [
    {
      id: 1,
      text: "comment"
    },
    {
      id: 2,
      text: "like"
    },
    {
      id: 3,
      text: "share"
    }
  ],
  taskTags: ["comment", "like", "share"],
  dataGroupTags: [
    {
      id: 1,
      name: "Meeting",
      tags: ["comment", "like", "share"]
    },
    {
      id: 2,
      name: "Coding",
      tags: ["comment", "like", "share"]
    }
  ],
  listNotes: [
    {
      id: 1,
      peopleWriter: "Thomas Harvey",
      avatar: "https://icons-for-free.com/free-icons/png/512/628292.png",
      title: "First Meeting Note",
      content:
        "<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum It is a long established fact that a reader will be distracted by the readable content of a page It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p> <p>The point of using Lorem Ipsum It is a long established fact that a reader will be distracted by the readable content of a page</p> ",
      createdAt: "2019-03-02T03:00:23.167Z"
    },
    {
      id: 2,
      peopleWriter: "Curtis Pearson",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7t8E0munLGTTq07ZVseEP5p1PCT9WtR8xCXfpTIIK3orUGxY",
      title: "Last Meeting Note 1",
      content:
        "<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum It is a long established fact that a reader will be distracted by the readable content of a page It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p> <p>The point of using Lorem Ipsum It is a long established fact that a reader will be distracted by the readable content of a page</p> ",
      createdAt: "2019-03-02T03:00:23.167Z"
    }
  ],
  dataSubTasks: [
    {
      id: 1,
      name: "Performance improvement",
      zoom: true,
      code: 1234,
      progress: 20,
      content: "It takes long time to load dashboard.",
      tags: [
        {
          id: 1,
          text: "Example Chip ",
          color: "#800000"
        },
        {
          id: 2,
          text: "Trevor Hansen",
          color: "#800080"
        },
        {
          id: 3,
          text: "ANZ Bank",
          color: "#008000"
        }
      ]
    },
    {
      id: 2,
      name: "Performance improvement",
      zoom: true,
      code: 1234,
      progress: 20,
      content: "It takes long time to load dashboard.",
      tags: [
        {
          id: 1,
          text: "Example Chip ",
          color: "#800000"
        },
        {
          id: 2,
          text: "Trevor Hansen",
          color: "#800080"
        },
        {
          id: 3,
          text: "ANZ Bank",
          color: "#008000"
        }
      ]
    },
    {
      id: 3,
      name: "Performance improvement",
      zoom: true,
      code: 1234,
      progress: 20,
      content: "It takes long time to load dashboard.",
      tags: [
        {
          id: 1,
          text: "Example Chip ",
          color: "#800000"
        },
        {
          id: 2,
          text: "Trevor Hansen",
          color: "#800080"
        },
        {
          id: 3,
          text: "ANZ Bank",
          color: "#008000"
        }
      ]
    }
  ],
  dataMemberProject: [
    {
      id: 2,
      isActive: true,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/5571e24a656b1b426f0071d75476f330/30.png",
        name: "Hieu Le",
        nickName: "HieuLeIT"
      },
      email: "hieule@gmail.com"
    },
    {
      id: 3,
      isActive: true,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/ef0b40cd29918761024597ce0502f136/30.png",
        name: "Pham Xuan Duy",
        nickName: "x_duy"
      },
      email: "xduy.pham@gmail.com"
    },
    {
      id: 4,
      isActive: true,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/26e8c76baa777aeed1c16aec5b980b56/30.png",
        name: "Nguyen van phong",
        nickName: "phongnguyen"
      },
      email: "phongnguyen@gmail.com"
    },
    {
      id: 5,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/448903e9117577719e6e0916ef7aa077/30.png",
        name: "Thuan Ho",
        nickName: "thuanhdo6"
      },
      email: "thuanho@gmail.com"
    },
    {
      id: 6,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/14df7f7d2677e9ffce6f3648d4d7a434/30.png",
        name: "Dang Dong Minh",
        nickName: "Dangdongminh"
      },
      email: "ddming@gmail.com"
    },
    {
      id: 7,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/aba17cf809db531be61e855cb4ae5bb7/30.png",
        name: "Nguyen Thanh Nam",
        nickName: "NamDev"
      },
      email: "namedev@gmail.com"
    },
    {
      id: 8,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/285e7079a00410b67f0f2809a1320669/30.png",
        name: "Phan quyen vuong",
        nickName: "vuong2017"
      },
      email: "vuong@gmail.com"
    }
  ],
  dataProjectGroup: [
    {
      id: 1,
      name: "Nguyễn",
      member: []
    }
  ],
  newComment: {
    user: {
      id: 1,
      fullName: "David Kendy",
      avatar:
        "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
    },
    mentions: [
      {
        id: 18091,
        name: "johnwilliams",
        displayName: "John Williams"
      },
      {
        id: 17801,
        name: "sarahash",
        displayName: "Sara Hashing"
      },
      {
        id: 17802,
        name: "steve_har",
        displayName: "Steve Harmiton"
      },
      {
        id: 17803,
        name: "david_jr",
        displayName: "David Gink"
      },
      {
        id: 17804,
        name: "roma_jang",
        displayName: "Roma Jangunor"
      }
    ],
    commentDate: "2019-01-20T17:00:00.000Z",
    userOnlineStatus: "online",
    comment:
      "Hi @sarahash,\nHere is latest version of today meeting.\nBig thanks to @johnwilliams for pulling it together."
  },
  ticketMessages: [
    {
      user: {
        id: 1,
        fullName: "Nguyen Phong",
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      mentions: [
        {
          id: 18091,
          name: "johnwilliams",
          displayName: "John Williams"
        },
        {
          id: 17801,
          name: "sarahash",
          displayName: "Sara Hashing"
        },
        {
          id: 17802,
          name: "steve_har",
          displayName: "Steve Harmiton"
        },
        {
          id: 17803,
          name: "david_jr",
          displayName: "David Gink"
        },
        {
          id: 17804,
          name: "roma_jang",
          displayName: "Roma Jangunor"
        }
      ],
      commentDate: "2019-01-20T17:00:00.000Z",
      userOnlineStatus: "busy",
      comment:
        "Hi @sarahash,\nHere is latest version of today meeting.\nBig thanks to @johnwilliams for pulling it together."
    },
    {
      user: {
        id: 1,
        fullName: "Nguyen Phong",
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      mentions: [
        {
          id: 18091,
          name: "johnwilliams",
          displayName: "John Williams"
        },
        {
          id: 17801,
          name: "sarahash",
          displayName: "Sara Hashing"
        },
        {
          id: 17802,
          name: "steve_har",
          displayName: "Steve Harmiton"
        },
        {
          id: 17803,
          name: "david_jr",
          displayName: "David Gink"
        },
        {
          id: 17804,
          name: "roma_jang",
          displayName: "Roma Jangunor"
        }
      ],
      commentDate: "2019-01-20T17:00:00.000Z",
      userOnlineStatus: "busy",
      comment:
        "Hi @sarahash,\nHere is latest version of today meeting.\nBig thanks to @johnwilliams for pulling it together."
    },
    {
      user: {
        id: 1,
        fullName: "Nguyen Phong",
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      mentions: [
        {
          id: 18091,
          name: "johnwilliams",
          displayName: "John Williams"
        },
        {
          id: 17801,
          name: "sarahash",
          displayName: "Sara Hashing"
        },
        {
          id: 17802,
          name: "steve_har",
          displayName: "Steve Harmiton"
        },
        {
          id: 17803,
          name: "david_jr",
          displayName: "David Gink"
        },
        {
          id: 17804,
          name: "roma_jang",
          displayName: "Roma Jangunor"
        }
      ],
      commentDate: "2019-01-20T17:00:00.000Z",
      userOnlineStatus: "busy",
      comment:
        "Hi @sarahash,\nHere is latest version of today meeting.\nBig thanks to @johnwilliams for pulling it together."
    },
    {
      user: {
        id: 1,
        fullName: "Nguyen Phong",
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      mentions: [
        {
          id: 18091,
          name: "johnwilliams",
          displayName: "John Williams"
        },
        {
          id: 17801,
          name: "sarahash",
          displayName: "Sara Hashing"
        },
        {
          id: 17802,
          name: "steve_har",
          displayName: "Steve Harmiton"
        },
        {
          id: 17803,
          name: "david_jr",
          displayName: "David Gink"
        },
        {
          id: 17804,
          name: "roma_jang",
          displayName: "Roma Jangunor"
        }
      ],
      commentDate: "2019-01-20T17:00:00.000Z",
      userOnlineStatus: "busy",
      comment:
        "Hi @sarahash,\nHere is latest version of today meeting.\nBig thanks to @johnwilliams for pulling it together."
    },
    {
      user: {
        id: 1,
        fullName: "Nguyen Phong",
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      mentions: [
        {
          id: 18091,
          name: "johnwilliams",
          displayName: "John Williams"
        },
        {
          id: 17801,
          name: "sarahash",
          displayName: "Sara Hashing"
        },
        {
          id: 17802,
          name: "steve_har",
          displayName: "Steve Harmiton"
        },
        {
          id: 17803,
          name: "david_jr",
          displayName: "David Gink"
        },
        {
          id: 17804,
          name: "roma_jang",
          displayName: "Roma Jangunor"
        }
      ],
      commentDate: "2019-01-20T17:00:00.000Z",
      userOnlineStatus: "busy",
      comment:
        "Hi @sarahash,\nHere is latest version of today meeting.\nBig thanks to @johnwilliams for pulling it together."
    }
  ],
  availableMentions: [
    {
      id: 18091,
      name: "johnwilliams",
      displayName: "John Williams"
    },
    {
      id: 17801,
      name: "sarahash",
      displayName: "Sara Hashing"
    },
    {
      id: 17802,
      name: "steve_har",
      displayName: "Steve Harmiton"
    },
    {
      id: 17803,
      name: "david_jr",
      displayName: "David Gink"
    },
    {
      id: 17804,
      name: "roma_jang",
      displayName: "Roma Jangunor"
    }
  ],
  listCheckbox: [
    {
      id: 1,
      groupName: "Prepare working space",
      list: [
        {
          id: 11,
          name: "Prepage tables",
          status: false
        },
        {
          id: 12,
          name: "Internet connection",
          status: false
        },
        {
          id: 13,
          name: "Wifi environment",
          status: false
        }
      ]
    },
    {
      id: 2,
      groupName: "Prepare car parking",
      list: [
        {
          id: 22,
          name: "Floor",
          status: false
        },
        {
          id: 23,
          name: "item 2",
          status: false
        },
        {
          id: 24,
          name: "item 3",
          status: false
        }
      ]
    }
  ],
  activities: [
    {
      id: 1,
      executor: {
        name: "Thuan Ho",
        imageUrl:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        department: {
          link: "/department/1902",
          name: "htactive"
        }
      },
      task: "#12 - Add some color scheme",
      executedDate: "2019-01-20T17:00:00.000Z",
      destinationObject: {
        type: "task",
        link: "/task/18921",
        title: "Something Messes up the text color in chrome"
      },
      action: {
        text: "Modify on",
        icon: { name: "create", color: "default" },
        changes: [
          {
            title: "Priority",
            from: "4",
            to: "3"
          },
          {
            title: "Status",
            from: "Todo",
            to: "Doing"
          }
        ]
      }
    },
    {
      id: 2,
      executor: {
        name: "Thuan Ho",
        imageUrl:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
        department: {
          link: "/department/1902",
          name: "htactive"
        }
      },
      task: "#12 - Add some color scheme",
      executedDate: "2019-01-20T17:00:00.000Z",
      destinationObject: {
        type: "task",
        link: "/task/18921",
        title: "Something Messes up the text color in chrome"
      },
      action: {
        text: "Modify on",
        icon: { name: "create", color: "default" },
        changes: [
          {
            title: "Priority",
            from: "4",
            to: "3"
          },
          {
            title: "Status",
            from: "Todo",
            to: "Doing"
          }
        ]
      }
    }
  ],
  files: [
    {
      id: 1,
      rate: false,
      name: "setup.exe",
      createAt: "2019-03-19T10:18:30.401Z"
    },
    {
      id: 2,
      coverPhoto: {
        imageUrl:
          "https://trello-attachments.s3.amazonaws.com/5c74a8d74ff73e3b335f39f3/612x427/cfcba96078a3abe447c267e2294a4e4b/image.png"
      },
      rate: true,
      name: "picture.png",
      createAt: "2019-03-19T10:18:30.401Z"
    },
    {
      id: 3,
      rate: false,
      name: "index.html",
      createAt: "2019-03-19T10:18:30.401Z"
    },
    {
      id: 4,
      rate: true,
      name: "sort.js",
      createAt: "2019-03-19T10:18:30.401Z"
    }
  ],
  worklogs: [
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
  dataLabels: [
    {
      id: 1981,
      color: "#7B84D8",
      text: "project",
      createAt: "2019-03-20T16:16:19.360Z"
    },
    {
      id: 1982,
      color: "#61bd4f",
      text: "table view",
      createAt: "2019-03-20T16:16:59.582Z"
    }
  ],
  dataListLabels: [
    {
      id: 1981,
      color: "#7B84D8",
      text: "project",
      createAt: "2019-03-20T16:16:19.360Z"
    },
    {
      id: 1982,
      color: "#61bd4f",
      text: "table view",
      createAt: "2019-03-20T16:16:59.582Z"
    },
    {
      id: 1983,
      color: "#61fadf",
      text: "kanban",
      createAt: "2019-03-20T16:17:13.856Z"
    },
    {
      id: 1984,
      color: "#31A09E",
      text: "tree view",
      createAt: "2019-03-20T16:17:24.950Z"
    },
    {
      id: 1985,
      color: "#064846",
      text: "project",
      createAt: "2019-03-20T16:17:35.151Z"
    }
  ],
  dataAttachment: [
    {
      id: 1,
      rate: false,
      name: "setup.exe",
      createAt: "2019-03-19T10:18:30.401Z"
    },
    {
      id: 2,
      coverPhoto: {
        imageUrl:
          "https://trello-attachments.s3.amazonaws.com/5c74a8d74ff73e3b335f39f3/612x427/cfcba96078a3abe447c267e2294a4e4b/image.png"
      },
      rate: true,
      name: "picture.png",
      createAt: "2019-03-19T10:18:30.401Z"
    },
    {
      id: 3,
      rate: false,
      name: "index.html",
      createAt: "2019-03-19T10:18:30.401Z"
    }
  ],
  dataPeoPleGroup: [
    {
      id: 2,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/5571e24a656b1b426f0071d75476f330/30.png",
        name: "Hieu Le",
        nickName: "HieuLeIT"
      },
      email: "hieule@gmail.com"
    },
    {
      id: 3,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/ef0b40cd29918761024597ce0502f136/30.png",
        name: "Pham Xuan Duy",
        nickName: "x_duy"
      },
      email: "xduy.pham@gmail.com"
    },
    {
      id: 4,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/26e8c76baa777aeed1c16aec5b980b56/30.png",
        name: "Nguyen van phong",
        nickName: "phongnguyen"
      },
      email: "phongnguyen@gmail.com"
    },
    {
      id: 5,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/448903e9117577719e6e0916ef7aa077/30.png",
        name: "Thuan Ho",
        nickName: "thuanhdo6"
      },
      email: "thuanho@gmail.com"
    },
    {
      id: 6,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/14df7f7d2677e9ffce6f3648d4d7a434/30.png",
        name: "Dang Dong Minh",
        nickName: "Dangdongminh"
      },
      email: "ddming@gmail.com"
    },
    {
      id: 7,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/aba17cf809db531be61e855cb4ae5bb7/30.png",
        name: "Nguyen Thanh Nam",
        nickName: "NamDev"
      },
      email: "namedev@gmail.com"
    },
    {
      id: 8,
      isActive: false,
      avatar: {
        imageUrl:
          "https://trello-avatars.s3.amazonaws.com/285e7079a00410b67f0f2809a1320669/30.png",
        name: "Phan quyen vuong",
        nickName: "vuong2017"
      },
      email: "vuong@gmail.com"
    }
  ],
  dataCitation: [
    {
      id: 1,
      caseName: "New York",
      court: "court",
      datePublished: "2019-03-06",
      slipOpinion: false,
      electronicDatabase: false,
      advancedInfo: "advanced Info",
      publicationInfo: "publication Info",
      pages: 1,
      annotation: "annotation",
      websiteTitle: "news",
      publisher: "publisher",
      url: "https://www.htactive.com",
      electronicallyPublished: "2019-03-06",
      dateAccessedOnline: "2019-03-02",
      location: "New York",
      database: "Mongodb",
      dateAccessedOnlineDatabase: "2019-02-06",
      searchType: "Path",
      searchTextOrUrl: "https://www.htactive.com"
    },
    {
      id: 2,
      caseName: "Los Angeles",
      court: "court",
      datePublished: "2019-03-06",
      slipOpinion: true,
      electronicDatabase: true,
      advancedInfo: "advanced Info",
      publicationInfo: "publication Info",
      pages: 2,
      annotation: "annotation",
      websiteTitle: "news",
      publisher: "publisher",
      url: "https://www.htactive.com",
      electronicallyPublished: "2019-03-06",
      dateAccessedOnline: "2019-03-02",
      location: "Los Angeles",
      database: "Mongodb",
      dateAccessedOnlineDatabase: "2019-02-06",
      searchType: "Url",
      searchTextOrUrl: "https://www.htactive.com"
    }
  ],
  itemsCompelete: [
    { id: 1, name: "Compelete 15%" },
    { id: 2, name: "Compelete 100%" },
    { id: 3, name: "Compelete 85%" },
    { id: 4, name: "Compelete 45%" },
    { id: 5, name: "Compelete 98%" }
  ],
  itemsFeature: [
    { id: 1, name: "Feature A" },
    { id: 2, name: "Feature S" },
    { id: 3, name: "Feature D" },
    { id: 4, name: "Feature F" },
    { id: 5, name: "Feature V" }
  ],
  itemsEstimate: [
    { id: 1, name: "2h" },
    { id: 2, name: "4h" },
    { id: 3, name: "16h" },
    { id: 4, name: "8h" },
    { id: 5, name: "16h" }
  ],
  itemsWorks: [
    { id: 1, name: "Doing" },
    { id: 2, name: "Pendding" },
    { id: 3, name: "Implement" },
    { id: 4, name: "Cancel" },
    { id: 5, name: "Verify" }
  ]
};

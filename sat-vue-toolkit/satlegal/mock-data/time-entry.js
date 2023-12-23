export const dataCurrentWeek = {
  id: 1,
  name: "Current Week",
  list: [
    {
      id: 11,
      name: "Max Riley",
      text: "Using Environment Variable",
      check: true,
      type: {
        text: "auth",
        color: "primary"
      },
      status: "In Process",
      time: "02:30",
      avatar:
        "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
    },
    {
      id: 12,
      name: "Scott Marsh",
      text: "Setup server at heroku",
      check: false,
      type: {
        text: "Dua to 28 Dec",
        color: "orange"
      },
      status: "Done",
      time: "10:30",
      avatar:
        "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
    },
    {
      id: 13,
      name: "Tyler Pearson",
      text: "Setup server at Github",
      check: false,
      type: {
        text: "Dua to 27 Dec",
        color: "red"
      },
      status: "Running",
      time: "10:30"
    }
  ]
};

export const dataListDate = [
  {
    id: 1,
    date: new Date(),
    list: [
      {
        id: 11,
        name: "Scott Marsh",
        hours: 10,
        minute: 30,
        text: "Milestone completed",
        type: {
          text: "auth",
          color: "primary"
        },
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        id: 12,
        name: "Kamron Neal",
        hours: 9,
        minute: 30,
        text: "Thi first phase has been completed",
        type: {
          text: "Dua to 30 Dec",
          color: "orange"
        },
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      }
    ],
    totalHours: 19,
    totalMinute: 0
  },
  {
    id: 2,
    date: new Date().setDate(new Date().getDate() - 1),
    list: [
      {
        id: 11,
        name: "Scott Marsh",
        hours: 20,
        minute: 10,
        text: "Milestone completed",
        type: {
          text: "auth",
          color: "primary"
        },
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        id: 12,
        name: "Kamron Neal",
        hours: 9,
        minute: 7,
        text: "Thi first phase has been completed",
        type: {
          text: "Dua to 30 Dec",
          color: "orange"
        },
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      }
    ],
    totalHours: 29,
    totalMinute: 17
  },
  {
    id: 3,
    date: new Date().setDate(new Date().getDate() - 2),
    list: [
      {
        id: 11,
        name: "Scott Marsh",
        hours: 20,
        minute: 10,
        text: "Milestone completed",
        type: {
          text: "auth",
          color: "primary"
        },
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        id: 12,
        name: "Kamron Neal",
        hours: 19,
        minute: 10,
        text: "Thi first phase has been completed",
        type: {
          text: "Dua to 30 Dec",
          color: "orange"
        },
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      }
    ],
    totalHours: 39,
    totalMinute: 20
  }
];

export const dataTimeEntriesHeatmap = [
  {
    date: "2018-9-22",
    count: 6
  },
  {
    date: "2018-9-21",
    count: 1
  },
  {
    date: "2019-1-21",
    count: 10
  },
  {
    date: "2019-1-26",
    count: 100
  },
  {
    date: "2019-1-27",
    count: 70
  }
];

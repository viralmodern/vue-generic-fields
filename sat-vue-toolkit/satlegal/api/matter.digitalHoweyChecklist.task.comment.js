import { sleep } from "./base";

async function getDataComment() {
  await sleep();
  return [
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
  ];
}

async function addComment(data) {
  await sleep();
  return data;
}
export default {
  getDataComment,
  addComment
};

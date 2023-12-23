export default {
  dataTableDocument: [
    {
      id: 1,
      title: "Performance Review",
      documentType: { name: "Performance Review", type: 1 },
      date: new Date(),
      characters: "Yahoo",
      description: "Description Performance Review",
      attachement: [
        {
          typeFile: 1,
          name: "skillA.pdf"
        },
        {
          typeFile: 2,
          name: "document.exl"
        }
      ]
    },
    {
      id: 2,
      title: "Transations",
      documentType: { name: "Transations", type: 2 },
      date: new Date(),
      characters: "hello kitty",
      description: "google",
      attachement: [
        {
          typeFile: 1,
          name: "acb.docx"
        }
      ]
    },
    {
      id: 3,
      title: "Email",
      documentType: { name: "Email", type: 3 },
      date: new Date(),
      characters: "zidane",
      description: "leeH",
      attachement: [
        {
          typeFile: 1,
          name: "google.js"
        },
        {
          typeFile: 2,
          name: "flutter.dart"
        },
        {
          typeFile: 3,
          name: "atom.html"
        },
        {
          typeFile: 4,
          name: "visual.php"
        },
        {
          typeFile: 5,
          name: "pl.jsx"
        },
        {
          typeFile: 6,
          name: "uname.tsx"
        }
      ]
    },
    {
      id: 4,
      title: "Letter",
      documentType: { name: "Letter", type: 4 },
      date: new Date(),
      characters: "murad",
      description: null
    },
    {
      id: 5,
      title: "Internal Memo",
      documentType: { name: "Internal Memo", type: 5 },
      date: new Date(),
      characters: "Lukaku",
      description: "Description Letter"
    },
    {
      id: 6,
      title: "Contract",
      documentType: { name: "Contract", type: 6 },
      date: new Date(),
      characters: "Ronaldo",
      description: "Description Contract",
      attachement: null
    },
    {
      id: 7,
      title: "Financial Statements",
      documentType: { name: "Financial Statements", type: 7 },
      date: new Date(),
      characters: "Messi",
      description: "Description Financial Statements"
    },
    {
      id: 8,
      title: "Audit",
      documentType: { name: "Audit", type: 8 },
      date: new Date(),
      characters: "vanphong",
      description: null
    },
    {
      id: 9,
      title: "Misc",
      documentType: { name: "Misc", type: 9 },
      date: new Date(),
      characters: "VuongPhan",
      description: null
    }
  ],
  dataGeneralInfo: {
    gender: "Male",
    birthday: "1990-03-10",
    locations: ["London, UK", "New York, UK"],
    aboutMe:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"
  },
  dataWork: {
    occupation: "Developer",
    skills: ["C#", "Javascript", "Python", "HTML", "CSS"],
    jobs: [
      {
        id: 1,
        workplace: "Self-Employed",
        startDate: "2010-03-10",
        endDate: "2019-02-10"
      },
      {
        id: 2,
        workplace: "Google",
        startDate: "2008-03-10",
        endDate: "2010-03-10"
      }
    ]
  },
  dataContact: {
    address: "460 Wild Horse Drive Rocklin, CA 95677",
    phones: ["(025) 656 - 5656", "(025) 656 - 2345"],
    website: "gmail.com",
    emails: ["mail@gmail.com", "mail@facebook.com"]
  },
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
  ]
};

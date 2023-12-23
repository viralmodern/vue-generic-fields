export const dataSectionExhibits = [
  {
    id: 1,
    name: "GETTING STARTED",
    list: [
      {
        id: 11,
        name: "Glossary",
        content: `<h2>Hi Glossary,</h2><p>this is a very <em>basic</em> example of tiptap.`
      },
      {
        id: 12,
        name: "Requirements",
        content: `<h2>Hi Requirements,</h2><p>this is a very <em>basic</em> example of tiptap.`
      },
      {
        id: 13,
        name: "Configuration",
        content: `<h2>Hi Configuration,</h2><p>this is a very <em>basic</em> example of tiptap.`
      },
      {
        id: 14,
        name: "Installation",
        content: `<h2>Hi Installation,</h2><p>this is a very <em>basic</em> example of tiptap.`
      },
      {
        id: 15,
        name: "Admin Account",
        content: `<h2>Hi Admin Account,</h2><p>this is a very <em>basic</em> example of tiptap.`
      }
    ]
  },
  {
    id: 2,
    name: "CREATE AN ACCOUNT",
    list: [
      {
        id: 22,
        name: "Permissions",
        content: `<h2>Hi Permissions,</h2><p>this is a very <em>basic</em> example of tiptap.`
      },
      {
        id: 23,
        name: "Usage",
        content: `<h2>Hi Usage,</h2><p>this is a very <em>basic</em> example of tiptap.`
      },
      {
        id: 24,
        name: "Restrictions",
        content: `<h2>Hi Restrictions,</h2><p>this is a very <em>basic</em> example of tiptap.`
      },
      {
        id: 25,
        name: "Adding Admins",
        content: `<h2>Hi Adding Admins,</h2><p>this is a very <em>basic</em> example of tiptap.`
      }
    ]
  }
];

export const dataSpreadsheet = [
  {
    id: 11,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        12: {
          cells: {
            0: { text: "Hi Glossary 1" },
            2: { text: "Hi Glossary 2" }
          }
        },
        2: {
          cells: {
            0: { text: "Hi Glossary", style: 0 },
            1: { text: "Hello" },
            2: { text: "Hi", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "yes", style: 0 }
          }
        }
      }
    }
  },
  {
    id: 12,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        1: {
          cells: {
            0: { text: "Hi Requirements 1" },
            2: { text: "Hi Requirements 2" }
          }
        },
        2: {
          cells: {
            0: { text: " Hi Requirements", style: 0 },
            1: { text: "Hello" },
            2: { text: "who", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "wait", style: 0 }
          }
        }
      }
    }
  },
  {
    id: 13,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        1: {
          cells: {
            0: { text: "Hi Configuration" },
            2: { text: "Hi Configuration 2" }
          }
        },
        2: {
          cells: {
            0: { text: "Hi s", style: 0 },
            1: { text: " a" },
            2: { text: " v", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "q", style: 0 }
          }
        }
      }
    }
  },
  {
    id: 14,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        1: {
          cells: {
            0: { text: "Rực rỡ 1" },
            2: { text: "Rực rỡ 2" }
          }
        },
        2: {
          cells: {
            0: {
              text: "Installation  ",
              style: 0
            },
            1: { text: "Installation" },
            2: { text: "a", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "q", style: 0 }
          }
        }
      }
    }
  },
  {
    id: 15,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        1: {
          cells: {
            0: { text: "Admin" },
            2: { text: "Account" }
          }
        },
        2: {
          cells: {
            0: { text: "Admin", style: 0 },
            1: { text: "Account" },
            2: { text: "Account", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "Admin", style: 0 }
          }
        }
      }
    }
  },
  {
    id: 22,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        1: {
          cells: {
            0: { text: "Permissions 1" },
            2: { text: "Permissions 2" }
          }
        },
        2: {
          cells: {
            0: { text: "Permissions", style: 0 },
            1: { text: "Hello" },
            2: { text: "let", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "var", style: 0 }
          }
        }
      }
    }
  },
  {
    id: 23,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        1: {
          cells: {
            0: { text: "Hi Usage" },
            2: { text: "Hi Usage 2" }
          }
        },
        2: {
          cells: {
            0: { text: " Usage", style: 0 },
            1: { text: "Hello Usage" },
            2: { text: "this", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "age", style: 0 }
          }
        }
      }
    }
  },
  {
    id: 24,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        1: {
          cells: {
            0: { text: "Restrictions 1" },
            2: { text: "Restrictions 2" }
          }
        },
        2: {
          cells: {
            0: { text: "Auto Restrictions", style: 0 },
            1: { text: "Hello" },
            2: { text: "haha", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "hehe", style: 0 }
          }
        }
      }
    }
  },
  {
    id: 25,
    objectSpreadsheet: {
      freeze: "C3",
      styles: [
        {
          bgcolor: "#f4f5f8",
          textwrap: true,
          color: "#900b09",
          border: {
            top: ["thin", "#0366d6"],
            bottom: ["thin", "#0366d6"],
            right: ["thin", "#0366d6"],
            left: ["thin", "#0366d6"]
          }
        }
      ],
      merges: ["C3:D4"],
      rows: {
        1: {
          cells: {
            0: { text: "Hi Adding Admins 1" },
            2: { text: "Adding 2" }
          }
        },
        2: {
          cells: {
            0: { text: "Admins", style: 0 },
            1: { text: "Hello" },
            2: { text: "haha", merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: "hehe", style: 0 }
          }
        }
      }
    }
  }
];

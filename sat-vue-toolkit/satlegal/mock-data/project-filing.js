export default {
  dataListGroup: [
    {
      id: 1,
      level: 1,
      name: "Pre-Closing",
      children: [
        {
          id: 2,
          name: "Term Sheet",
          owner: {
            name: "Peter Francis",
            avatar: {
              imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3kaC5bmDVq6msPnzgsy9y0Dw1Zs3tx1iJmxd4Fdv3f7VD_q0f"
            }
          },
          level: 2,
          status: "Finalizing",
          completed: 1,
          uncompleted: 4,
          groupId: 1,
          children: [
            {
              level: 3,
              id: 201,
              status: "Reviewing",
              name: "Subcompany A",
              owner: {
                name: "Scott Barker",
              },
              message: 1,
            },
            {
              level: 3,
              id: 202,
              status: "In Progress",
              name: "Subcompany B",
              owner: {
                name: "Ashton Davies",
              },
              message: 5,
            },
            {
              level: 3,
              id: 203,
              status: "Done",
              name: "Subcompany C",
              owner: {
                name: "Matthew Shaw",
              },
              message: 3,
            },
            {
              level: 3,
              id: 204,
              status: "In Progress",
              name: "Subcompany D",
              owner: {
                name: "Jadiel Bray",
              },
              message: 4,
            }
          ]
        }
      ]
    },
    {
      id: 3,
      level: 1,
      name: "Closing",
      children: [
        {
          level: 2,
          id: 301,
          name: "Board Consent",
          status: "Finalizing",
          completed: 0,
          uncompleted: 1,
          groupId: 3,
          owner: {
            name: "Deandre Cote",
            avatar: {
              imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnk2vl_RFDYB_g4v_kaaz7gsXLWQ6nJ1KKJlbVkdCM6ACrfL53"
            }
          },
          children: [
            {
              level: 3,
              id: 2221,
              name: "Purchase Agreement",
              status: "Finalizing",
              owner: {
                name: "Yousef Herman",
              },
              message: 10,
            }
          ]
        },
        {
          level: 2,
          id: 30123,
          name: "Purchase Agreement",
          status: "Done",
          completed: 1,
          uncompleted: 3,
          groupId: 3,
          owner: {
            name: "Yousef Herman",
            avatar: {
              imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRixB7u4OuU67fj4lfLRDosLWfFUf_eAdMYMfEoOqHTrBNPzcNC"
            }
          },
          children: [
            {
              level: 3,
              id: 2223,
              name: "Purchase Agreement",
              status: "In Progress",
              owner: {
                name: "Jadiel Bray",
              },
              message: 12,
            },
            {
              id: 467,
              level: 3,
              name: "Exhibit A Schedule of Purchasers",
              status: "Finalizing",
              owner: {
                name: "Ashton Davies",
              },
              message: 0,
            },
            {
              id: 468,
              level: 3,
              name: "Exhibit B Bill of Sale",
              status: "Done",
              owner: {
                name: "Leonardo Bennett",
              },
              message: 0,
            }
          ]
        },
        {
          level: 2,
          id: 3013,
          name: " Agreement",
          status: "Done",
          completed: 0,
          uncompleted: 0,
          groupId: 3,
          owner: {
            name: "Callan Ruiz",
            avatar: {
              imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRixB7u4OuU67fj4lfLRDosLWfFUf_eAdMYMfEoOqHTrBNPzcNC"
            }
          },
          children: []
        }
      ]
    },
  ],
  listTags: [
    {
      id: 11,
      text: "Frontend",
      color: "success"
    },
    {
      id: 22,
      text: "Backend",
      color: "red"
    },
    {
      id: 33,
      text: "API",
      color: "orange"
    },
    {
      id: 44,
      text: "Issue",
      color: "primary"
    },
    {
      id: 55,
      text: "Mobile",
      color: "blue"
    }
  ],
  filter: [
    {
      id: 1,
      name: "Starred",
      icon: "star"
    },
    {
      id: 2,
      name: "Priority",
      icon: "warning"
    },
    {
      id: 3,
      name: "Sheduled",
      icon: "av_timer"
    },
    {
      id: 4,
      name: "Today",
      icon: "today"
    },
    {
      id: 5,
      name: "Done",
      icon: "done"
    },
    {
      id: 6,
      name: "Deleted",
      icon: "delete_outline"
    }
  ]
}
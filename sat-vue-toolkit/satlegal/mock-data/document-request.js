export const dataDocumentAll = [
  {
    id: 1,
    clientName: 1,
    documentName: "Event Planner",
    description: "Event Planner job description Event Planner job description",
    citerias: "Event Planner job description Event Planner job description ",
    requester: {
      id: 2,
      name: "Member 2",
      avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    dueDate: "2019-05-30",
    lastActivity: "2019-02-25",
    progressList: [
      {
        id: Math.random(),
        progress: 20,
        color: "#3f51b5"
      },
      {
        id: Math.random(),
        progress: 10,
        color: "#f44336"
      },
      {
        id: Math.random(),
        progress: 30,
        color: "#9c27b0"
      },
      {
        id: Math.random(),
        progress: 5,
        color: "#4caf50"
      }
    ],
    items: [
      {
        id: 2,
        documentName: "Evenst Planner",
        dueDate: "2019-05-30",
        approvalStatus: {
          id: 1,
          name: "Approved",
          icon: "check",
          color: "success"
        },
        approvalDate: "2019-05-30",
        isReview: true,
        matter: 1,
        description:
          "Event Planner job description Event Planner job description"
      },
      {
        id: 3,
        documentName: "Evenat Planner",
        dueDate: "2019-05-15",
        approvalStatus: {
          id: 2,
          name: "Awaitting Approval",
          icon: "remove",
          color: "success"
        },
        approvalDate: "2019-05-10",
        isReview: false,
        matter: 2,
        description:
          "Event Planner job description Event Planner job description"
      }
    ]
  },
  {
    id: 2,
    clientName: 2,
    documentName: "Event Plannser 2",
    description: "Event Planner job description Event Planner job description",
    citerias: "Event Planner job description Event Planner job description ",
    requester: {
      id: 2,
      name: "Member 2",
      avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    dueDate: "2019-06-10",
    lastActivity: "2019-01-30",
    progressList: [
      {
        id: 4,
        progress: 10,
        color: "#3f51b5"
      },
      {
        id: 22,
        progress: 10,
        color: "#f44336"
      },
      {
        id: 12,
        progress: 20,
        color: "#9c27b0"
      },
      {
        id: 24,
        progress: 30,
        color: "#4caf50"
      }
    ],
    items: [
      {
        id: 22,
        documentName: "Event Planner 2",
        dueDate: "2019-04-30",
        approvalStatus: {
          id: 1,
          name: "Approved",
          icon: "check",
          color: "success"
        },
        matter: 1,
        approvalDate: "2019-05-30",
        isReview: true,
        description:
          "Event Planner job description Event Planner job description"
      },
      {
        id: 64,
        documentName: "Event Planner 2",
        dueDate: "2019-02-15",
        approvalStatus: {
          id: 3,
          name: "Status Negative",
          icon: "clear",
          color: "error"
        },
        matter: 2,
        approvalDate: "2019-05-10",
        isReview: true,
        description:
          "Event Planner job description Event Planner job description"
      }
    ]
  },
  {
    id: 123,
    clientName: 3,
    documentName: "Event Planner 3",
    description: "Event Planner job description Event Planner job description",
    citerias: "Event Planner job description Event Planner job description ",
    requester: {
      id: 2,
      name: "Member 2",
      avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    },
    dueDate: "2019-06-10",
    lastActivity: "2019-01-30",
    progressList: [
      {
        id: 53,
        progress: 10,
        color: "#3f51b5"
      },
      {
        id: 54,
        progress: 10,
        color: "#f44336"
      },
      {
        id: 66,
        progress: 20,
        color: "#9c27b0"
      },
      {
        id: 123,
        progress: 30,
        color: "#4caf50"
      }
    ],
    items: [
      {
        id: 98,
        documentName: "Event Planner 2",
        dueDate: "2019-04-30",
        approvalStatus: {
          id: 1,
          name: "Approved",
          icon: "check",
          color: "success"
        },
        approvalDate: "2019-05-30",
        isReview: true,
        matter: 1,
        description:
          "Event Planner job description Event Planner job description"
      }
    ]
  }
];

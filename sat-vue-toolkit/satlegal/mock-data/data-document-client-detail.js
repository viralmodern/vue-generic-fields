export const dataDocument = {
  id: 1,
  client: 1,
  documentName: "Event Planner",
  matter: 1,
  description: "Event Planner job description Event Planner job description",
  citerias: "Event Planner job description Event Planner job description ",
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
      name: "Event Planner",
      dueDate: "2019-05-30",
      requester: 1,
    },
    {
      id: 3,
      name: "Event Planner",
      dueDate: "2019-05-30",
      requester: 2,
    }
  ]
};

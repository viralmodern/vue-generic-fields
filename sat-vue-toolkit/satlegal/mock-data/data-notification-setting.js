export const dataNotification = [
  {
    id: 1,
    name: null,
    data: [
      {
        active: false,
        title: "Someone follows you.",
        subTitle: "You will receive an alert when someone follows you."
      },
      {
        active: true,
        title: "Someone mentions  you.",
        subTitle:
          "You will receive an alert when someone mentions you in their comments."
      },
      {
        active: false,
        title: "Someone sends you a message",
        subTitle: "You will receive an alert when someone sends you a message"
      }
    ]
  },
  {
    id: 2,
    name: "Team notifications",
    data: [
      {
        active: false,
        title: "Someone invite you to a team",
        subTitle: "You will receive an alert when you are invited to a team."
      },
      {
        active: true,
        title: "Someone updates a team",
        subTitle: "You will receive an alert when your team is updated."
      },
      {
        active: true,
        title: "Someone adds new project",
        subTitle:
          "You will receive an alert when your team creates new project."
      },
      {
        active: false,
        title: "Someone updates a project",
        subTitle:
          "You will receive an alert when a project is updated by your team."
      }
    ]
  },
  {
    id: 3,
    name: "Project notifications",
    data: [
      {
        active: false,
        title: "Someone adds new task",
        subTitle:
          "You will receive an alert when someone adds new task to your project."
      },
      {
        active: true,
        title: "Someone updates a task",
        subTitle:
          "You will receive an alert when someone updates a task on your project."
      }
    ]
  },
  {
    id: 4,
    name: "News & trending",
    data: [
      {
        active: true,
        title: "Top members this week",
        subTitle: null
      },
      {
        active: false,
        title: "Someone updates a task",
        subTitle: null
      }
    ]
  }
];

import { sleep } from "./base";

async function getDataAttachment() {
  await sleep();
  return [
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
  ];
}

async function addAttachment(data) {
  await sleep();
  return data;
}

async function updateAttachment(data) {
  await sleep();
  return data;
}

async function removeAttachment(id) {
  await sleep();
  return id;
}

export default {
  getDataAttachment,
  addAttachment,
  updateAttachment,
  removeAttachment
};

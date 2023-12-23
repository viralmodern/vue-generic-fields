import { sleep } from "./base";

async function getDataNotes() {
  await sleep();
  return [
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
  ];
}

async function addNotes(data) {
  await sleep();
  return data;
}

async function updateNotes(data) {
  await sleep();
  return data;
}

async function removeNotes(id) {
  await sleep();
  return id;
}

export default {
  getDataNotes,
  addNotes,
  updateNotes,
  removeNotes
};

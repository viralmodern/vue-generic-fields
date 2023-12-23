import { sleep } from "./base";

async function addNote() {
  await sleep();
  return {
    status: true,
    message: "Add note success!"
  };
}

async function removeNote() {
  await sleep();
  return {
    status: true,
    message: "Delete note success!"
  };
}

async function editNote() {
  await sleep();
  return {
    status: true,
    message: "Edit note success!"
  };
}

export default {
  addNote,
  removeNote,
  editNote
};

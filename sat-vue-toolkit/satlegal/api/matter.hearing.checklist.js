import { sleep } from "./base";

async function addGroupChecklist() {
  await sleep();
  return {
    status: true,
    message: "Add group checklist success!"
  };
}

async function deleteGroupChecklist() {
  await sleep();
  return {
    status: true,
    message: "Delete group checklist success!"
  };
}

async function addItemInGroupChecklist() {
  await sleep();
  return {
    status: true,
    message: "Add item in group checklist success!"
  };
}

async function removeItemInGroupChecklist() {
  await sleep();
  return {
    status: true,
    message: "Delete item in group checklist success!"
  };
}

async function checkItem() {
  await sleep();
  return {
    status: true,
    message: "Check item success!"
  };
}

export default {
  addGroupChecklist,
  deleteGroupChecklist,
  addItemInGroupChecklist,
  removeItemInGroupChecklist,
  checkItem
};

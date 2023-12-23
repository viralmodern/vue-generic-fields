import { sleep } from "./base";
import { dataCategories } from "../mock-data/data-billing-category";
async function getCategory() {
  await sleep();
  return dataCategories;
}
async function updateSettingCategory(data) {
  await sleep();
  return data;
}
async function deleteCategory(data) {
  await sleep();
  return data;
}
async function addCategory(data) {
  await sleep();
  return data;
}

export default {
  getCategory,
  updateSettingCategory,
  deleteCategory,
  addCategory
};

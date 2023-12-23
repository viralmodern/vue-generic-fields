import { sleep } from "./base";
import data from "../mock-data/users";
import { dataNotification } from "../mock-data/data-notification-setting";

async function listUserAdmin() {
  await sleep();
  const { userAdmin } = data;
  return {
    userAdmin,
    totals: 100
  };
}
async function getUserPermissionAdmin() {
  await sleep();
  const { userPremissionAdmin } = data;
  return userPremissionAdmin;
}
async function listRoleUser() {
  await sleep();
  const { roleUser } = data;
  return roleUser;
}
async function listCurrency() {
  await sleep();
  const { dataCurrency } = data;
  return dataCurrency;
}
async function listTimezone() {
  await sleep();
  const { dataTimezone } = data;
  return dataTimezone;
}

async function listDataNotifications() {
  await sleep();
  return dataNotification;
}
export default {
  listUserAdmin,
  listRoleUser,
  getUserPermissionAdmin,
  listCurrency,
  listTimezone,
  listDataNotifications
};

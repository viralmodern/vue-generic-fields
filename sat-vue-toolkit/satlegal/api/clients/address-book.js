import { get, post, remove, patch } from "../base";
import {
  formatQuery,
} from "../../utils";

async function getDataAddressBook({ searchObject = {}, pk }) {
  const url = `/api/clients/${pk}/address-books/`;
  const options = {
    params: formatQuery(searchObject)
  };
  const result = await get(url, options);
  return result
}

async function updateAddressBook({ idParams, body }) {
  const mapBody = {
    ...body
  }
  const result = await patch(`/api/clients/${idParams.clientId}/address-books/${idParams.pk}/`, mapBody);
  return result;
}

async function postAddressBook({ clientId, body }) {
  const result = await post(`/api/clients/${clientId}/address-books/`, body)
  return result
}

async function removeAddressBook({ pk, clientId }) {
  const result = await remove(
    `/api/clients/${clientId}/address-books/${pk}/`
  );
  return result;
}




export default {
  getDataAddressBook,
  updateAddressBook,
  removeAddressBook,
  postAddressBook,
};

import axios from "axios";
import {getSESSION, SESSION} from "../utils";
let VuexStore = null;
export const getStore = store => (VuexStore = store);
let setToken = () => {
    let token = getSESSION(SESSION.TOKEN)
    if (token) {
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`
    }
}
async function get(url, options) {
    setToken()
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (e) {
    showMessage(e);
    throw e;
  }
}

async function post(url, data) {
    setToken()
  try {
    const response = await axios.post(url, data);
    VuexStore.commit("ht_store/snackbar/setMessages", ['Create new data successfully!']);
    return response.data;
  } catch (e) {
    showMessage(e);
    throw e;
  }
}

async function patch(url, data) {
    setToken()
  try {
    const response = await axios.patch(url, data);
    VuexStore.commit("ht_store/snackbar/setMessages", ['Update data successfully!']);
    return response.data;
  } catch (e) {
    showMessage(e);
    throw e;
  }
}

async function put(url, data) {
    setToken()
  try {
    const response = await axios.put(url, data);
    VuexStore.commit("ht_store/snackbar/setMessages", ['Update data successfully!']);
    return response.data;
  } catch (e) {
    showMessage(e);
    throw e;
  }
}

async function remove(url, data) {
    setToken()
  try {
    const response = await axios.delete(url, data);
    VuexStore.commit("ht_store/snackbar/setMessages", ['Delete data successfully!']);
    return response.data;
  } catch (e) {
    showMessage(e);
    throw e;
  }
}

function showMessage(e) {
  if (e.response) {
    const erorrs = e.response.data;
    let messages = [];
    Object.keys(erorrs).forEach(key => {
      if (Array.isArray(erorrs[key])) {
        erorrs[key].forEach(key2 => {
          messages = [...messages, key2];
        });
        return;
      } else if (Array.isArray(erorrs[key][0])) {
        erorrs[key][0].forEach(key2 => {
          messages = [...messages, key2];
        });
        return;
      } else {
        messages = [...messages, erorrs[key]];
        return;
      }
    });
    VuexStore.commit("ht_store/snackbar/setMessages", messages);
  } else {
    VuexStore.commit("ht_store/snackbar/setMessages", ["An unknown error"]);
  }
}

async function sleep(time = 500) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}

export { get, post, patch, remove,put, sleep };

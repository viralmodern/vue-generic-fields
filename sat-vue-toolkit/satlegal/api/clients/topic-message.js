import { get, post, remove } from "../base";
import { getFormData2 } from "@/sat-vue-toolkit/satlegal/utils"


async function getDataTopicMessage({ idParams, searchObject }) {
  const url = `/api/clients/${idParams.clientId}/communication-topics/${idParams.clientMessageId}/messages/`;
  const options = {
    params: searchObject
  }
  const result = await get(url, options);
  return result;
}

async function addTopicMessage({ idParams, body }) {
  const url = `/api/clients/${idParams.clientId}/communication-topics/${idParams.clientMessageId}/messages/`;
  const result = await post(
    url,
    getFormData2(body)
  );
  return result;
}


async function removeTopicMessage(data) {
  const url =`/api/clients/${data.clientId}/communication-topics/${data.clientMessageId}/messages/${data.messageId}/`
  const result = await remove(url);
  return result;
}



export default {
  getDataTopicMessage,
  addTopicMessage,
  removeTopicMessage,
};

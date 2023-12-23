import { get, post, patch, remove } from "../base";
import { getFormData2, formatQuery, cloneDeep, getFieldNullAble } from "@/sat-vue-toolkit/satlegal/utils";

const mockData = [{
  id: 1,
  first_name: 'Vuong',
  last_name: 'Phan',
  message_source: 1,
  sender: 1,
  message_recipients: [],
  message_time: new Date().toISOString(),
  original_message: "hello chao ban",
  matter: 10,
  message_status: 1,
  last_update: new Date().toISOString(),
  attachments: [],
  message_tags: [],
  is_check_client_rivilege: false,
  total_message: 10,
  flag: true,
  bookmarked_pk: 1,
},
{
  id: 2,
  first_name: 'Hai',
  last_name: 'Nguyen',
  message_source: 2,
  sender: 1,
  message_recipients: [],
  message_time: new Date().toISOString(),
  original_message: "hello chao ban oi",
  matter: 10,
  message_status: 1,
  last_update: new Date().toISOString(),
  attachments: [],
  message_tags: [],
  is_check_client_rivilege: false,
  total_message: 10,
  flag: true,
  bookmarked_pk: 1,
}]

function mapResult(data) {
  return data.map(x => {
    x.attachments = [];
    x.matter = 10;
    x.message_source = 1;
    return x;
  });
}

// function mapObjectResult2(x) {
//   const result = {
//     ...x,
//     time: "01:20"
//   };
//   return result;
// }

// function mapDataGetNotes(data) {
//   return {
//     id: data.pk,
//     title: data.title,
//     content: data.text,
//     creator: data.creator,
//     createdAt: data.created
//   };
// }

// function mapDataAddUpdateNotes(data) {
//   return {
//     title: data.name,
//     text: data.content
//   };
// }

async function getDataClientMessage({ idParams, searchObject = {} }) {
  const url = `/api/clients/communication-topics/`;
  const options = {
    params: formatQuery(searchObject)
  };
  // const group = {};
  // Array.isArray(searchObject.group_items) &&
  //   searchObject.group_items.forEach(key => {
  //     group[key] = {
  //       pk: +key,
  //       results: [],
  //       totals: 0,
  //       next: null
  //     };
  //   });
  const result = await get(url, options);
  // if (!searchObject.ungroup) {
  //   for (let key in result) {
  //     result[key] = {
  //       pk: +key,
  //       results: mapResult(result[key].results),
  //       totals: result[key].count || 0,
  //       next: result[key].next
  //     };
  //   }
  //   return { ...group, ...result };
  // }
  // return {
  //   all: {
  //     pk: "all",
  //     results: mapResult(result.results),
  //     totals: result.count,
  //     next: result.next
  //   }
  // };
  return {
    all : {
      pk: "all",
      results: mapResult(result.results),
      totals: result.count,
      next: null
    }
  }
}

async function getClientMessageDetail({ clientId, clientMessageId }) {
  return await get(`/api/clients/${clientId}/communication-topics/${clientMessageId}/`)
}

async function addClientMessage({ idParams, body }) {
  const url = `/api/clients/${idParams.clientId}/communication-topics/`;
  const result = await post(url, body);
  return result;
}

async function updateClientMessage({ idParams, body }) {

  const url = `/api/clients/${idParams.clientId}/communication-topics/${idParams.clientMessageId}`;
  const result = await patch(url, body);
  return result;
}

async function removeClientMessage(data) {
  const url = `/api/clients/${data.clientId}/communication-topics/${data.clientMessageId}`;
  const result = await remove(url);
  return result;
}


// attachment
async function addAttachmentClientMessage({ idParams, body }) {
  // const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.ClientMessageId}/attachments/`;
  // const result = await post(url, getFormData2(body));
  // return result;
}

async function updateAttachmentClientMessage({ idParams, body }) {
  // const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.ClientMessageId}/attachments/${idParams.attachmentId}`;
  // const result = await patch(url, getFormData2(body));
  // return result;
}

async function removeAttachmentClientMessage(data) {
  // const url = `/api/matters/${data.matterId}/request-sets/${data.requestSetId}/tasks/${data.ClientMessageId}/attachments/${data.attachmentId}`;
  // const result = await remove(url);
  // return result;
}


export default {
  getDataClientMessage,
  getClientMessageDetail,
  addClientMessage,
  updateClientMessage,
  removeClientMessage,
  // attachments
  addAttachmentClientMessage,
  updateAttachmentClientMessage,
  removeAttachmentClientMessage,
};

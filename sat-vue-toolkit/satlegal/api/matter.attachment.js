import { sleep, get, post } from "./base";
async function getListAttachment() {
  const dataApi = await get('/api/matters/19/testimonies/4/attachments/');
  return dataApi.results;
}
async function createAttachment(data) {
  const dataCreate = {
    files : data.files
  };
  const dataApi = await post('/api/matters/19/testimonies/4/attachments/', dataCreate);
  return dataApi;
}
async function deleteAttachment(data) {
  await sleep();
  return data.id;
}
export default {
  getListAttachment,
  createAttachment,
  deleteAttachment
};

import { sleep } from "./base";
import { dataDocumentAll } from "../mock-data/document-request";
async function getDataDocumentRequestAll(data) {
  // eslint-disable-next-line
  console.log("listDocumentRequestAll", data.documentId);
  await sleep();
  if (data.filterRequest.type) {
    const items = dataDocumentAll.map(x => ({
      ...x,
      items: x.items.filter(x1 => x1.isReview)
    }));
    return items;
  } else {
    return dataDocumentAll;
  }
}

export default { getDataDocumentRequestAll };

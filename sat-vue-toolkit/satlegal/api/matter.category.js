import { dataCategory } from "../mock-data/data-matter-category";
import { members } from "../mock-data/data-workspace-member";
import { sleep } from "./base"

async function getDataCategory() {
  await sleep();
  const results = dataCategory.map(x => {
    return {
      ...x, children: x.children.map(y => {
        return { ...y, creator: members.filter(t => t.id === y.creator)[0] }
      })
    }
  })
  return results
}

export default {
  getDataCategory
}

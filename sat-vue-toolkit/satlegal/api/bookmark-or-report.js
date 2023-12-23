import { post, remove } from "./base";

async function update({ endpoint, value, data = {} }) {
  let result = {};
  if (value) {
    result = await remove(endpoint);
  } else {
    result = await post(endpoint, data)
  }
  return result;
}

export default { update }
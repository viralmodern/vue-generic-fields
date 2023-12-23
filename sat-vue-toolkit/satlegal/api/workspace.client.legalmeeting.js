import { get } from "./base";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
  }
}


async function getClients() {
  const result = await get(`/api/clients/`)
  return {
    results: mapResult(result.results),
    totals: result.count,
    next: result.next
  };
}
export default {
  getClients
};

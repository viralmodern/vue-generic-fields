import { get, post, patch, remove } from "./base";
// import { wishlist } from "../mock-data/matter.wishlist";

async function getDataWishList({ matterId, toolboxId, page }) {
  const { results, count } = await get(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/wishlists/`,
    {
      params: {
        page
      }
    }
  );
  const dataMap = results.map(x => {
    return {
      id: x.pk,
      name: x.name,
      tags: x.tags.map(x => x.pk),
      description: x.desc,
      characters: []
    };
  });
  return {
    results: dataMap,
    count
  };
}

async function addWishList({ idParams, body }) {
  const bodyMap = {
    name: body.name,
    desc: body.description,
    tags: body.tags
  };
  const result = await post(`/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/wishlists/`, bodyMap);
  return {
    id: result.pk,
    name: result.name,
    tags: result.tags.map(x => x.pk),
    description: result.desc,
    characters: []
  };
}

async function updateWishList({ idParams, body }) {
  const bodyMap = {
    name: body.wishname,
    desc: body.description,
    characters: body.characters,
    tags: body.tags
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/wishlists/${
      idParams.wishlistId
    }/`,
    bodyMap
  );
  return result;
}

async function removeWishList({matterId, toolboxId, wishlistId}) {
  const result = await remove(`/api/matters/${matterId}/toolboxes/${toolboxId}/wishlists/${wishlistId}/`);
  return result;
}

export default {
  getDataWishList,
  addWishList,
  updateWishList,
  removeWishList
};

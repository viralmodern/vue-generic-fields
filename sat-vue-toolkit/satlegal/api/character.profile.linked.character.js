import { sleep } from "./base";
import { dataLinkedCharacter } from "../mock-data/data-profile-linked-character";

async function getDataLinkedCharacter() {
  await sleep();
  return dataLinkedCharacter;
}

export default {
  getDataLinkedCharacter
}

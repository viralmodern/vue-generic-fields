import { sleep } from "./base";
import data from "../mock-data/project.contacts.js";

async function getDataContacts() {
    await sleep();
    const { dataContacts } = data;
    return {
        dataContacts,
        totals: dataContacts.length
    }
}

export default {
    getDataContacts

};

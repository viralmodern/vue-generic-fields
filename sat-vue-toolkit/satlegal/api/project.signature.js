import { sleep } from "./base";
import data from "../mock-data/project-signature";

async function getDataListContract() {
    await sleep();
    return {
        contracts: data.contracts,
        totals: data.contracts.length
    }
}

async function getDataReleasedSignatures() {
    await sleep();
    const { listSignatured } = data
    return listSignatured
}

export default {
    getDataListContract,
    getDataReleasedSignatures
};

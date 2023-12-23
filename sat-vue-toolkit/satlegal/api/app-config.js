// import { get } from "./base";
import appConfig from "../mock-data/appConfigsMockData";

async function getDataAppConfig() {
  const url = "/api/app-configs/";
  // const result = await get(url);
  // return result;
  return appConfig;
}

export default {
  getDataAppConfig
};

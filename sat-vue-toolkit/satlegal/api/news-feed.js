import { sleep } from './base';
import news from '../mock-data/news-feed'
async function getProjectNewsFeeds() {
  await sleep();
  return news;
}
export default { getProjectNewsFeeds };

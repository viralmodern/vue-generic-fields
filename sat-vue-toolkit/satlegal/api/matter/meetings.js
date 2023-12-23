import { post, get, remove, patch } from "../base";
import {
  formatQuery,
} from "../../utils";
import moment from "moment"
function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapClient2(data) {
  return data.filter(x => x.user === null).map(y => y.client.pk);
}

function mapProgress(member_join, member_un_join, unknown_status) {
  return [
    {
      id: Math.random(),
      name: 'Member Join',
      progress: member_join,
      color: "#3f51b5"
    },
    {
      id: Math.random(),
      name: 'Member Un Join',
      progress: member_un_join,
      color: "#f44336"
    },
    {
      id: Math.random(),
      name: 'Unknown Status',
      progress: unknown_status,
      color: "#4caf50"
    }
  ]
}

function statusMeeting(to_time, from_time, status) {
  const date = moment.utc(new Date()).format();
  if (status === 1) {
    if (moment(to_time).isBefore(date) && moment(date).isBefore(from_time)) {
      return "In Meeting"
    } else {
      return "Active"
    }
  }
  return "Cancelled"
}

function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
    members: x.members.map(x => x.user).filter(Boolean),
    client: mapClient2(x.members),
    status: statusMeeting(x.to_time, x.from_time, x.status),
    color: '#' + x.color,
    inviteProgress: mapProgress(x.member_join, x.member_un_join, x.unknown_status),
    totalProgress: x.member_join + x.member_un_join + x.unknown_status
  };
}

async function getDataMeeting({ searchObject = {} }) {
  const url = `/api/legal-meetings/`
  const options = {
    params: formatQuery(searchObject)
  };
  const group = {};
  Array.isArray(searchObject.group_items) &&
    searchObject.group_items.forEach(key => {
      group[key] = {
        pk: +key,
        results: [],
        totals: 0,
        next: null
      };
    });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      const results = mapResult(result[key].results);
      result[key] = {
        pk: +key,
        results,
        totals: result[key].count || 0,
        next: result[key].next
      };
    }
    return { ...group, ...result };
  }
  return {
    all: {
      pk: "all",
      results: mapResult(result.results),
      totals: result.count,
      next: result.next
    }
  };
}

async function addMeeting({ body }) {
  const url = `/api/legal-meetings/`;
  const bodyMap = {
    ...body,
  };
  const result = await post(url, bodyMap);
  return mapObjectResult(result);
}

async function updateMeeting({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  if (body.characters) {
    bodyMap.characters = body.characters.map(x => x.id);
  }
  const result = await patch(
    `/api/legal-meetings/${idParams.meetingId}/`,
    bodyMap
  );
  return result;
}

async function removeMeeting({ meetingId }) {
  const result = await remove(`/api/legal-meetings/${meetingId}/`);
  return result;
}

// bookmark
async function addBookmarkMeeting({ idParams }) {
  const url = `/api/legal-meetings/${idParams.meetingId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkMeeting({ idParams }) {
  const url = `/api/legal-meetings/${idParams.meetingId}/bookmarks/`;
  const result = await remove(url);
  return result;
}
//members-clients
async function addMembersMeeting({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  const url = `/api/legal-meetings/${idParams.meetingId}/members/`;
  const result = await post(url, bodyMap);
  return result;
}

async function removeMembersMeeting({ idParams, keyDel, valueDel }) {
  const url = `/api/legal-meetings/${idParams.meetingId}/members/${keyDel}/${valueDel}/`;
  const result = await remove(url);
  return result;
}
async function removeClientsMeeting({ idParams, isRemove }) {
  const url = `/api/legal-meetings/${idParams.meetingId}/members/client/${isRemove}/`;
  const result = await remove(url);
  return result;
}

// Labels
async function labelsWorkSpace() {
  const result = await get('api/workspace-tagables/?type=1');
  return result.results || [];
}

async function addLableWorkSpace(body) {
  const mapBody = { ...body, color: body.color.replace("#", "") }
  const results = await post('/api/workspace-tagables/', mapBody);
  return results;
}

async function updateLableWorkSpace(body) {
  const mapBody = { ...body, color: body.color.replace("#", "") }
  const result = await patch(`/api/workspace-tagables/${mapBody.id}/`, mapBody);
  return result;
}

async function removeLableWorkSpace(id) {
  const result = await remove(`/api/workspace-tagables/${id}/`);
  return result;
}


export default {
  getDataMeeting,
  addMeeting,
  updateMeeting,
  removeMeeting,
  //bookmark
  addBookmarkMeeting,
  removeBookmarkMeeting,
  //members-clients
  addMembersMeeting,
  removeMembersMeeting,
  removeClientsMeeting,
  // labels
  labelsWorkSpace,
  addLableWorkSpace,
  removeLableWorkSpace,
  updateLableWorkSpace,
}

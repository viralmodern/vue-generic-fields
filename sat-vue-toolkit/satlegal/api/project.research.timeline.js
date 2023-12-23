import { get, post, patch, remove } from "./base";

async function getDataResearchTimeline({ page, matterId }) {
  const result = await get(`/api/matters/${matterId}/timelines/`, {
    params: {
      page
    }
  })
  return result;
}

async function getDetailTimeLine(request) {
  return await get(`/api/matters/${request.matterId}/timelines/${request.timelineId}/`)
}

async function addNewTimeline(request) {
  return await post(`/api/matters/${request.matterId}/timelines/`, request)
}

async function updateTimelineDetail(request) {
  return await patch(`/api/matters/${request.matterId}/timelines/${request.timelineId}/`, request.body)
}

async function updateMembers(req) {
  if (req.type === 'remove') {
    return await remove(`/api/matters/${req.matterId}/timelines/${req.timelineId}/members/${req.userId}/`)
  } else if(req.type === 'add') {
    return await post(`/api/matters/${req.matterId}/timelines/${req.timelineId}/members/`, { members: req.userId })
  }
}

export default {
  getDataResearchTimeline,
  addNewTimeline,
  getDetailTimeLine,
  updateTimelineDetail,
  updateMembers,
};

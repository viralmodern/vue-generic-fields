import { get, patch, post, remove } from "./base";

async function getDataCheckList(req) {
  var labels = req.labels ? `?labels=${req.labels}&` : '?';
  var page = req.page || 1;
  var starred = req.starred ? `starred=${req.starred}&` : "";
  var is_removed = req.is_removed ? `is_removed=${req.is_removed}&` : "";
  var done = req.done ? `done=${req.done}&` : "";
  var scheduled = req.scheduled ? `scheduled=${req.scheduled}&` : "";
  var marked_priority = req.marked_priority ? `marked_priority=${req.marked_priority}&` : "";
  var deadline = req.today ? `deadline=today&` : "";
  var title = req.title ? `title=${req.title}&` : "";

  var res = await get(`/api/matters/${req.matterId}/depositions/${req.depositionId}/todos/${labels}${starred}${is_removed}${done}${scheduled}${marked_priority}${deadline}${title}page=${page}`);

  var results = {
    ...res,
    resp: (res.results || []).map(x => {
      return {
        ...x,
        members: x.creator,
        starred: x.starred,
        done: x.done,
        modified: x.modified || new Date().toISOString(),
        comments: x.comments
      }
    })
  }
  return results;
}

async function updateLabels(req) {
  return req;
}

async function updateCheckList(req) {
  return patch(`/api/matters/${req.matterId}/depositions/${req.depositionId}/todos/${req.pk}/`, req)
}

async function getDetailCheckList(req) {
  const resp = await get(`/api/matters/${req.matterId}/depositions/${req.depositionId}/todos/${req.checklistId}/`);
  const comments = await get(`/api/matters/${req.matterId}/depositions/${req.depositionId}/todos/${req.checklistId}/comments/`)
  return {
    ...resp,
    modified: resp.modified || new Date().toISOString(),
    members: resp.creator,
    comments
  }
}

async function createdNewTask(req) {
  return await post(`/api/matters/${req.matterId}/depositions/${req.depositionId}/todos/`, req)
}

async function sendComment(req) {
  return await post(`/api/matters/${req.matterId}/depositions/${req.depositionId}/todos/${req.checklistId}/comments/`, req.body)
}

async function updateStar(req) {
  if (req.starred) {
    return await post(`api/matters/${req.matterId}/depositions/${req.depositionId}/todos/${req.taskId}/star`);
  } else {
    return await remove(`api/matters/${req.matterId}/depositions/${req.depositionId}/todos/${req.taskId}/star`);
  }
}

async function removeTask(req) {
  return await remove(`/api/matters/${req.matterId}/depositions/${req.depositionId}/todos/${req.taskId}/`)
}

export default {
  getDataCheckList,
  updateCheckList,
  getDetailCheckList,
  updateLabels,
  createdNewTask,
  sendComment,
  updateStar,
  removeTask
}

import { get, remove, patch, post } from "./base";

async function getDataFactsReSearch(request) {
  const data = await get(`/api/matters/${request.matterId}/facts/?page=${request.page}`);
  const results = data.results.map(x => {
    return {
      id: x.pk,
      dateTime: {
        from: x.time,
        to: x.time
      },
      creator: x.creator,
      subjectMatter: x.subjects.map(sub => sub.pk),
      title: x.name,
      characters: x.characters.map(c => c.character.pk),
      causeOfActions: x.cause_of_actions || "",
      location: 2, //thieu,
      type: x.type,
      disputed: x.dispute,
      issue: x.issues.map(x => x.pk),
      label: x.tags.map(lab => lab.pk),
      linkedRecords: [],
      reliefSought: x.relief_sought || "",
      favorable: x.favorable,
      important: x.important,
      relevant: x.relevant,
      createAt: x.created,
      interpretation: x.interpretation,
      notes: x.total_notes,
      attachment: x.total_attachments,
      status: {
        id: 1,
        name: "type 1",
        color: "blue"
      },
    }
  })
  const dataFactsReSearch = { dataTableFacts: results, totals: data.count };
  return dataFactsReSearch
}
async function createFactsItem(req) {
  var x = await post(`/api/matters/${req.matterId}/facts/`, req.body)
  return {
    ...x,
    id: x.pk,
    dateTime: {
      from: x.time,
      to: x.time
    },
    subjectMatter: x.subjects.map(sub => sub.pk),
    title: x.name,
    characters: x.characters.map(c => c.character.pk),
    causeOfActions: x.cause_of_actions || "",
    location: 2,
    disputed: x.dispute,
    issue: x.issues.map(x => x.pk),
    label: x.tags.map(lab => lab.pk),
    linkedRecords: [],
    reliefSought: x.relief_sought || "",
    createAt: x.created,
    notes: x.total_notes,
    attachment: x.total_attachments,
    status: {
      id: 1,
      name: "type 1",
      color: "blue"
    },
  }
}

async function removeFacts(facts) {
  return await remove(`/api/matters/${facts.matterId}/facts/${facts.id}/`)
}

async function updateFacts(req) {
  return await patch(`/api/matters/${req.matterId}/facts/${req.taskId}/`, req.body)
}

async function createNoteFact(req) {
  return await post(`/api/matters/${req.matterId}/facts/${req.taskId}/notes/`, req.body)
}
async function removeNoteFact(req) {
  return await remove(`/api/matters/${req.matterId}/facts/${req.taskId}/notes/${req.noteId}/`)
}
async function getNoteFacts(req) {
  return await get(`/api/matters/${req.matterId}/facts/${req.taskId}/notes/`)
}
async function editNoteFact(req) {
  return await patch(`/api/matters/${req.matterId}/facts/${req.taskId}/notes/${req.noteId}/`, req.body)
}

async function removeFactAttachment(req) {
  return await remove(`/api/matters/${req.matterId}/facts/${req.taskId}/attachments/${req.attachmentId}/`)
}
async function getFactAttachment(req) {
  return await get(`/api/matters/${req.matterId}/facts/${req.taskId}/attachments/`)
}
async function createFactAttachment(req) {
  return await post(`/api/matters/${req.matterId}/facts/${req.taskId}/attachments/`, req.formData)
}

async function getCommentFacts(req) {
  return await get(`/api/matters/${req.matterId}/facts/${req.taskId}/comments/`)
}

async function sendCommentFacts(req) {
  return await post(`/api/matters/${req.matterId}/facts/${req.taskId}/comments/`, req.body)
}

async function getDataFactsDetail(req) {
  return await get(`/api/matters/${req.matterId}/facts/${req.factId}/`)
}

// support
async function getSupportFacts(req) {
  const response = await get(`/api/matters/${req.matterId}/facts/${req.factId}/supports/?page=${req.page}`);
  return {
    results: response.results.map(x => {
      return {
        ...x,
        id: x.pk,
        list: x.items.map(m => ({
          ...m,
          id: m.pk,
          characters: m.characters.map(r => r.pk)
        }))
      }
    }),
    count: response.count
  }
}
async function postSupportFacts(req) {
  return await post(`/api/matters/${req.matterId}/facts/${req.factId}/supports/`, req.body)
}
async function updateSupportFacts(req) {
  return await patch(`/api/matters/${req.matterId}/facts/${req.factId}/supports/${req.supportId}/`, req.body)
}
async function removeSupportFacts(req) {
  return await remove(`/api/matters/${req.matterId}/facts/${req.factId}/supports/${req.supportId}/`)
}
//Sub
async function postSubFactsSupport(req) {
  return await post(`/api/matters/${req.matterId}/facts/${req.factId}/supports/${req.supportId}/items/`, req.body);
}
async function updateSubFactsSupport(req) {
  return await patch(`/api/matters/${req.matterId}/facts/${req.factId}/supports/${req.supportId}/items/${req.itemId}/`, req.body);
}
async function removeSubFactsSupport(req) {
  return await remove(`/api/matters/${req.matterId}/facts/${req.factId}/supports/${req.supportId}/items/${req.itemId}/`);
}
async function updateCharactersSupport(req) {
  if (req.type === 'remove') {
    return await remove(`/api/matters/${req.matterId}/facts/${req.factId}/supports/${req.supportId}/items/${req.itemId}/characters/${req.characterId}/`)
  } else if(req.type === 'add') {
    return await post(`/api/matters/${req.matterId}/facts/${req.factId}/supports/${req.supportId}/items/${req.itemId}/characters/`, { characters: req.characterId })
  }
}

export default {
  getDataFactsReSearch,
  createFactsItem,
  removeFacts,
  updateFacts,
  createNoteFact,
  removeNoteFact,
  getNoteFacts,
  editNoteFact,
  getCommentFacts,
  sendCommentFacts,
  getDataFactsDetail,

  removeFactAttachment,
  getFactAttachment,
  createFactAttachment,

  getSupportFacts,
  postSupportFacts,
  updateSupportFacts,
  removeSupportFacts,

  postSubFactsSupport,
  updateSubFactsSupport,
  removeSubFactsSupport,
  updateCharactersSupport,
};

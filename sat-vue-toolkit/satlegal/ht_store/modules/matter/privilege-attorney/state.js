export const initDataPrivilegeAttorneyDetail = {
  actors: [],
  bookmarked_pk: null,
  client_privilege_type: null,
  confidentiality: null,
  created: "",
  date_tagged_after: null,
  date_tagged_before: "",
  document_attachment: "",
  document_date: "",
  document_desc: "",
  document_labels: [],
  document_name: "",
  entry_name: "",
  flag: false,
  import_date: null,
  is_communication: false,
  is_confidential: false,
  is_legal_related: false,
  issues: [],
  labels: [],
  matter: null,
  modified: "",
  pk: null,
  privilege_checks: [],
  privilege_justification: [],
  privilege_labels: [],
  redaction: null,
  responsive: null,
  review_status: null,
  reviewers: [],
  subject_matter: "",
  tags: [],
  total_comments: 0,
  total_log_time: 0,
  valid_characters: [],
  withheld_reason: ""
}

export default {
  dataPrivilegeAttorney: [],
  dataPrivilegeAttorneyDetail: {...initDataPrivilegeAttorneyDetail},
  isLoadingGet: false,
  totals: 0,
  //comments
  dataComment: [],
  dataCommentFeedback: [],
  countComment: 0,
  countCommentFeedback: 0,
  actionComment: {},
  actionCommentFeedback: {},
  dataRequestItem: [],
};
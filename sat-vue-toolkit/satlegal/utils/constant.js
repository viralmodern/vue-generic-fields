export const USER_ROLE = {
  ADMIN: 1,

}

export const PROJECT_ROLE = {
  ADMIN: 1
}

export const NAME_GETTER_DATA_SUBJECTS = "ht_store/matter/subjects/dataSubjects";
export const NAME_GETTER_DATA_ISSUES = "ht_store/matter/issues/dataIssues";
export const NAME_GETTER_DATA_SOURCE = "ht_store/matter/source/dataSource";
export const NAME_GETTER_DATA_TAG = "ht_store/matter/tag/dataTag";
export const NAME_GETTER_DATA_LABELS = "ht_store/matter/labels/dataLabels";
export const NAME_GETTER_DATA_OBJECTION_TYPE = "ht_store/matter/objectiontype/dataObjectionTypes";
export const NAME_GETTER_DATA_GOALS = "ht_store/matter/goals/dataGoals";
export const NAME_GETTER_DATA_SOURCEPROCEEDING = "ht_store/matter/deposition/proceeding/dataSource";
export const NAME_GETTER_DATA_CHARACTER = "ht_store/matter/character2/dataAllCharacter";
export const NAME_GETTER_DATA_DOCUMENT_LABEL = "ht_store/matter/labelDocument/dataDocumentLabel";
export const NAME_GETTER_DATA_PRIVILEGE_LABEL = "ht_store/matter/privilegeLabel/dataPrivilegeLabel";

export const NAME_GETTER_DATA_RISKAREA = "ht_store/matter/riskAreas/dataRiskArea";
export const NAME_GETTER_DATA_RISKSOURCE = "ht_store/matter/riskSource/dataRiskSource";
export const TYPE_COMMENT = "comment";
export const TYPE_FEEDBACK = "feedback";
export const NAME_CLIENTS = "ht_store/clients/clientsCommon/dataClients"
export const NAME_LABELS_CLIENTS = "ht_store/clients/clientsCommon/dataLabelsWorkSpace"
export const NAME_LABELS_MEETING = "ht_store/matter/meeting/dataLabelsWorkSpace"


// app configs
export const APP_CONFIGS_CONSTANTS = {
  //choices
  NA: "NA",
  FACT_TYPE: "Fact.Type",
  FAVORABLE_AND_PROVIDEDBY: "FavorableAndProvidedBy",
  COMMON_LEVEL: "CommonLevel",

  CHARACTER_FAVORABLE: "Character.Favorable",
  CHARACTER_DISCLOSE_BY: "Character.DisclosedBy",
  CHARACTER_AVAILABILITY: "Character.CharacterAvailability",
  CHARACTER_DISCLOSEDBY: "Character.DisclosedBy",
  CHARACTER_POSITION: "Character.CharacterPosition",
  CHARACTER_LOCATED: "Character.CharacterLocated",
  CHARACTER_SERVED: "Character.CharacterServed",

  PRIVILLEGEDETAIL: "PrivilegeDetail.LogType",
  DEPOSITION_METHOD: "Deposition.DepositionMethod",
  DEPOSITION_PRIORITY: "Deposition.DepositionPriority",
  DEPOSITION_TYPE: "Deposition.DeponentType",
  MATTER_DOCKET_ENTRY: "MatterDocketEntry.FiledBy",
  MATTER_DOCKET_ENTRY_TYPE: "MatterDocketEntry.DocketEntryType",

  PRIVILEGE_CONFIDENTIALITY: "PrivilegeLog.Confidentiality",
  PRIVILEGE_JUSTIFICATION: "PrivilegeLog.PrivilegeJustification",
  PRIVILEGE_RESPONSIVE: "PrivilegeLog.Responsive",
  PRIVILEGE_REVIEWSTATUS: "PrivilegeLog.ReviewStatus",
  PRIVILEGE_REDACTION: "PrivilegeLog.Redaction",
  PRIVILEGE_ATTORNEY_CLIENT_PRIVILEGE_TYPE: "PrivilegeLog.AttorneyClientPrivilegeType",
  PRIVILEGE_CHECK: "Privilege.Check",
  REQUEST_FROM: "RequestSet.RequestFrom",

  CLIENT_CLIENTTYPE: "Client.ClientType",
  CLIENT_EMAILTYPE: "Client.EmailType",
  CLIENT_PHONETYPE: "Client.PhoneType",
  CLIENT_ADDRESSTYPE: "ClientAddress.AddressType",
  CLIENTSTATUS_STATUSTYPE: "Client.ClientStatus",
  CLIENTS_CREDIBILITY: "CommonLevel",
  MESSAGE_STATUS: "MessageStatus",
  MESSAGE_SOURCE: "MessageSource",
  ATTORNEY_CLIENT_PRIVILEGE: "AttorneyClientPrivilege",
  CLIENTS_ADDRESS_BOOK: "ClientAddressBook.ClientAddressBookRelationship",
  CLIENTS_DOCUMENT_STATUS: "DocumentRequest.DocumentRequestStatus",

  LENGTH_OF_TIME_SINCE_WITNESS: "Length_Of_Time_Since_Witness",
  CLOSE_WITNESS: "Close_Witness",
  ELAPSED_SINCE: "Elapsed_Since",
  //system
  FACT_RELATED: 'Fact',
  DEPOSITION_RELATED: 'Deposition',
  CHARACTER_RELATED: 'Character',
  REQUEST_SET_RELATED: 'RequestSet',
  REQUEST_SET_ITEM_RELATED: 'RequestItem',
  EVIDENCE_RELATED: 'Evidence',
  DEPOSITION_EXHIBIT_RELATED: 'DepositionExhibit',
  RESPONSIVE: 'RequestDocument.Responsive',
  REVIEWSTATUS: 'PrivilegeLog.ReviewStatus',
  REDACTION: 'PrivilegeLog.Redaction',
  DOCKET_RELATED: 'MatterDocketEntry',
  RISK_RELATED: 'Risk',
  MEETING_TYPE: 'SatlegalMeeting.MeetingType',
  SUBPOENA_SERVICE_STATUS: 'Subpoena.ServiceStatus',
  SUBPOENA_HARDNESS: 'Subpoena.Hardness',
  SUBPOENA_RESPONSE_STATUS: 'Subpoena.ResponseStatus',
  SUBPOENA_SERVICE_METHOD: 'Subpoena.HowSubpoenaServed',
  PRIVILEGE_RELATED: 'PrivilegeLog',
  SUBPOENA_STATE: 'USStateChoices',
  SUBPOENA_COUNTRY: 'CountryChoices',
  //hard code

  TESTIMONY_CONCLUSION: 'Testimony.Conclusion',
  TESTIMONY_WITNESSPRACTICABILITY: 'Testimony.WitnessPracticability',
  TESTIMONY_WITNESSCOMPELLABILITY: 'Testimony.WitnessCompellability',
  TESTIMONY_WITNESSCOMPETENCY:'Testimony.WitnessCompetency',
  TESTIMONY_WITNESSCONNECTIONTODISPUTES: 'Testimony.WitnessConnectionToDisputes',
  TESTIMONY_WITNESSIMMUNITY: 'Testimony.WitnessImmunity',
  TESTIMONY_WITNESSGEOGRAPHICAL:'Testimony.WitnessGeographical',
}

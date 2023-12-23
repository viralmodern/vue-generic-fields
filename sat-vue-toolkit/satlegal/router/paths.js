const NotFound404 = () =>
    import(/* webpackChunkName: "NotFound404" */ "../views/helpers/NotFound404");
const Detail = () =>
    import(/* webpackChunkName: "Detail" */ "../views/projects/Detail");
const AnnouncementHome = () =>
    import(
        /* webpackChunkName: "AnnouncementHome" */ "../views/announcement/Home"
        );
const Taskboard = () =>
    import(
        /* webpackChunkName: "Taskboard" */ "../views/projects/taskboard/Home"
        );
const Citations = () =>
    import(/* webpackChunkName: "Citations" */ "../views/citations/Home");

// const Strategies = () =>
//   import(/* webpackChunkName: "Strategies" */ "../views/strategies/Home");
// const Premises = () =>
//   import(
//     /* webpackChunkName: "Premises" */ "../views/strategies/premises/Home"
//   );

const Category = () =>
    import(/* webpackChunkName: "Category" */ "../views/category/Home");
const HomeIssueDetail = () =>
    import(
        /* webpackChunkName: "HomeIssueDetail" */ "../views/citations/HomeIssueDetail"
        );
const DetailCitation = () =>
    import(
        /* webpackChunkName: "DetailCitation" */ "../views/citations/DetailCitation"
        );
const HomeBoard = () =>
    import(
        /* webpackChunkName: "HomeBoard" */ "../views/projects/taskboard/HomeBoard"
        );
const CardDetail = () =>
    import(
        /* webpackChunkName: "CardDetail" */ "../views/projects/taskboard/CardDetail"
        );
const Contacts = () =>
    import(/* webpackChunkName: "Contacts" */ "../views/projects/contacts/Home");
const ContactDetail = () =>
    import(
        /* webpackChunkName: "ContactDetail" */ "../views/projects/contacts/Detail"
        );
const ProjectOverviewResources = () =>
    import(
        /* webpackChunkName: "ProjectOverviewResources" */ "../views/projects/overview/Resources"
        );
const ProjectOverviewResourcesProject = () =>
    import(
        /* webpackChunkName: "ProjectOverviewResourcesProject" */ "../views/projects/overview/ResourcesProject"
        );
const ProjectOverviewResourcesTeam = () =>
    import(
        /* webpackChunkName: "ProjectOverviewResourcesTeam" */ "../views/projects/overview/ResourcesTeam"
        );
const CreateNewProject = () =>
    import(
        /* webpackChunkName: "CreateNewProject" */ "../views/projects/CreateProject"
        );
const KitchenSink = () =>
    import(/* webpackChunkName: "KitchenSink" */ "../views/KitchenSink");
const KitchenSink2 = () =>
    import(/* webpackChunkName: "KitchenSink2" */ "../views/KitchenSink2");
const KitchenSink3 = () =>
    import(/* webpackChunkName: "KitchenSink3" */ "../views/KitchenSink3");
const KitchenSink4 = () =>
    import(/* webpackChunkName: "KitchenSink4" */ "../views/KitchenSink4");
const Setting = () =>
    import(/* webpackChunkName: "Setting" */ "../views/setting/Home.vue");
const AdminSetting = () =>
    import(
        /* webpackChunkName: "AdminSetting" */ "../views/setting/HomeAdmin.vue"
        );
const Overview = () =>
    import(/* webpackChunkName: "Overview" */ "../views/overview/List");
const DocumentRequest = () =>
    import(
        /* webpackChunkName: "DocumentRequest" */ "../views/document/DocumentRequest"
        );
const DocumentRequestAll = () =>
    import(
        /* webpackChunkName: "DocumentRequestAll" */ "../views/document/DocumentRequestAll"
        );
const DocumentRequestReview = () =>
    import(
        /* webpackChunkName: "DocumentRequestReview" */ "../views/document/DocumentRequestReview"
        );
const FactsComponent = () =>
    import(/* webpackChunkName: "FactsComponent" */ "../views/CAF/Fact/Facts");
const SummaryComponent = () =>
    import(
        /* webpackChunkName: "SummaryComponent" */ "../views/research/Summary"
        );
const TimelineComponent = () =>
    import(
        /* webpackChunkName: "TimelineComponent" */ "../views/research/Timeline"
        );
const CharacterComponent = () =>
    import(
        /* webpackChunkName: "CharacterComponent" */ "../views/research/Character"
        );
const ListCharacter = () =>
    import(
        /* webpackChunkName: "ListCharacter" */ "@/sat-vue-toolkit/satlegal/views/CAF/Character/ListCharacter"
        );
const RelationShipMap = () =>
    import(
        /* webpackChunkName: "RelationShipMap" */ "@/sat-vue-toolkit/satlegal/ht_components/list/RelationShipMap"
        );

const HomeCharacterRelated = () =>
    import(
        /* webpackChunkName: "HomeCharacterRelated" */ "../views/CAF/Character/HomeCharacterRelated"
        );
const TimelineDetail = () =>
    import(
        /* webpackChunkName: "TimelineDetail" */ "../views/research/timeline/TimelineDetail"
        );
const GoalsCharacter = () =>
    import(
        /* webpackChunkName: "GoalsCharacter" */ "../views/research/detail-character/GoalsCharacter"
        );
// Hi, sign in to your company
const Index = () =>
    import(/* webpackChunkName: "Index" */ "../donga/views/Index");
const SignIn = () =>
    import(/* webpackChunkName: "SignIn" */ "../donga/views/auth/SignIn");
const CreateProject = () =>
    import(
        /* webpackChunkName: "CreateProject" */ "../donga/views/auth/CreateWorkSpace"
        );
const ResetPassword = () =>
    import(
        /* webpackChunkName: "ResetPassword" */ "../donga/views/auth/ResetPassword"
        );
const ChangePassword = () =>
    import(
        /* webpackChunkName: "ChangePassword" */ "../donga/views/auth/ResetPasswordConfirm"
        );
const SetSubdomainToken = () =>
    import(
        /* webpackChunkName: "SetSubdomainToken" */ "../donga/components/auth/SetSubdomainToken"
        );

const InviteMembers = () =>
    import(
        /* webpackChunkName: "InviteMembers" */ "../donga/views/auth/InviteMembers"
        );
const JoinInvite = () =>
    import(/* webpackChunkName: "JoinInvite" */ "../donga/views/auth/JoinInvite");

const HomeFactDetail = () =>
    import(
        /* webpackChunkName: "HomeFactDetail" */ "../views/research/HomeFactDetail"
        );
const CharacterDetail = () =>
    import(
        /* webpackChunkName: "CharacterDetail" */ "../views/research/CharacterDetail"
        );
const Activity = () =>
    import(
        /* webpackChunkName: "Activity" */ "../views/research/detail-character/Activity"
        );
const Mapping = () =>
    import(
        /* webpackChunkName: "Mapping" */ "../views/research/detail-character/Mapping"
        );
const AboutCharacter = () =>
    import(
        /* webpackChunkName: "AboutCharacter" */ "../views/research/detail-character/About"
        );
const NotesCharacter = () =>
    import(
        /* webpackChunkName: "NotesCharacter" */ "../views/research/detail-character/NotesCharacter"
        );
const DocumentCharacter = () =>
    import(
        /* webpackChunkName: "DocumentCharacter" */ "../views/research/detail-character/DocumentCharacter"
        );
const CredibilitiesCharacter = () =>
    import(
        /* webpackChunkName: "CredibilitiesCharacter" */ "../views/research/detail-character/CredibilitiesCharacter"
        );

const ClientComponent = () =>
    import(
        /* webpackChunkName: "ClientComponent" */ "../views/client/ClientComponent"
        );
const ChatLayout = () =>
    import(
        /* webpackChunkName: "ChatLayout" */ "../views/client/chat/ChatLayout"
        );
const ClientDetail = () =>
    import(/* webpackChunkName: "ClientDetail" */ "../views/client/ClientDetail");
const ChatMessaging = () =>
    import(
        /* webpackChunkName: "ChatMessaging" */ "../views/client/chat/content/ChatMessaging"
        );
const OverViewClient = () =>
    import(
        /* webpackChunkName: "OverViewClient" */ "../ht_components/client-detail/tabs/Overview"
        );
const MatterClient = () =>
    import(
        /* webpackChunkName: "MatterClient" */ "../ht_components/client-detail/tabs/Matter"
        );
const BillingClient = () =>
    import(
        /* webpackChunkName: "BillingClient" */ "../ht_components/client-detail/tabs/Billing"
        );
const MeetingClient = () =>
    import(
        /* webpackChunkName: "MeetingClient" */ "../ht_components/client-detail/tabs/Meeting"
        );
const NoteClient = () =>
    import(
        /* webpackChunkName: "NoteClient" */ "../ht_components/client-detail/tabs/Note"
        );
const TimeClient = () =>
    import(
        /* webpackChunkName: "TimeClient" */ "../ht_components/client-detail/tabs/Time"
        );
const MessageClient = () =>
    import(
        /* webpackChunkName: "MessageClient" */ "../ht_components/client-detail/tabs/Message"
        );
const DocumentClient = () =>
    import(
        /* webpackChunkName: "DocumentClient" */ "../ht_components/client-detail/tabs/Document"
        );
const AddressBookClient = () =>
    import(
        /* webpackChunkName: "AddressBookClient" */ "../ht_components/client-detail/tabs/AddressBook"
        );

const SummaryDiscovery = () =>
    import(
        /* webpackChunkName: "SummaryDiscovery" */ "../views/discovery/Summary"
        );
const PrivilegeEntry = () =>
    import(/* webpackChunkName: "PrivilegeEntry" */ "../views/CAF/PrivilegeLogs/PrivilegeEntry/index");
const PrivilegeAttorneyEntry = () =>
    import(/* webpackChunkName: "PrivilegeAttorneyEntry" */ "../views/CAF/PrivilegeLogs/PrivilegeAttorneyEntry");
const Log = () =>
    import(/* webpackChunkName: "Log" */ "../views/discovery/Log");
const RiskManagement = () =>
    import(/* webpackChunkName: "RiskManagement" */ "../views/CAF/Risk/RiskManagement.vue");
const RiskRegister = () =>
    import(/* webpackChunkName: "RiskRegister" */ "../views/CAF/Risk/Detail/Register/index");
const RiskActionEntry = () =>
    import(/* webpackChunkName: "RiskRegister" */ "../views/CAF/Risk/Detail/ActionEntry/index");
const SubpoenaManagement = () =>
    import(/* webpackChunkName: "RiskManagement" */ "../views/CAF/Subpoena/SubpoenaManagement.vue");
const SubpoenaSet = () =>
    import(/* webpackChunkName: "SubpoenaSet" */ "../views/CAF/Subpoena/Detail/SubpoenaSet/index");
const SubpoenaDetail = () =>
    import(
        /* webpackChunkName: "SubpoenaDetail" */ "../views/CAF/Subpoena/Detail/SubpoenaSet/Detail/index"
        );
const SubpoenaProduction = () =>
    import(/* webpackChunkName: "SubpoenaProduction" */ "../views/CAF/Subpoena/Detail/SubpoenaSet/Detail/SubpoenaProduction/index");
const SubpoenaDefiAndInstrucs = () =>
    import(/* webpackChunkName: "SubpoenaDefiAndInstrucs" */ "../views/CAF/Subpoena/Detail/SubpoenaSet/Detail/SubpoenaDefiAndInstrucs/index");
const ProductionEntries = () =>
    import(/* webpackChunkName: "RiskRegister" */ "../views/CAF/Subpoena/Detail/ProductionEntries/index");
const LogDetail = () =>
    import(/* webpackChunkName: "LogDetail" */ "../views/discovery/LogDetail");
const IndexDiscovery = () =>
    import(
        /* webpackChunkName: "IndexDiscovery" */ "../views/discovery/IndexDiscovery"
        );
const ToolBox = () =>
    import(/* webpackChunkName: "ToolBox" */ "../views/discovery/ToolBox");
const Evidences = () =>
    import(/* webpackChunkName: "Evidences" */ "../views/discovery/Evidences");
const DiscoveryStatus = () =>
    import(
        /* webpackChunkName: "DiscoveryStatus" */ "../views/discovery/DiscoveryStatus"
        );
const Deposition = () =>
    import(
        /* webpackChunkName: "Deposition" */ "../views/CAF/Deposition/Deposition"
        );
const HomeDepositionDetail = () =>
    import(
        /* webpackChunkName: "HomeDepositionDetail" */ "../views/deposition/HomeDepositionDetail"
        );
const Checklist = () =>
    import(
        /* webpackChunkName: "Checklist" */ "../views/deposition/CheckListComp"
        );
const PostDeposition = () =>
    import(
        /* webpackChunkName: "PostDeposition" */ "../views/deposition/PostDeposition"
        );
const CheckListDetail = () =>
    import(
        /* webpackChunkName: "CheckListDetail" */ "../ht_components/deposition/checklist/detail/Home"
        );
const OverviewDeposition = () =>
    import(
        /* webpackChunkName: "OverviewDeposition" */ "../views/deposition/Overview"
        );
const HomeDeposition = () =>
    import(
        /* webpackChunkName: "HomeDeposition" */ "../views/deposition/HomeDeposition"
        );
const Proceeding = () =>
    import(/* webpackChunkName: "Proceeding" */ "../views/CAF/Deposition/Detail/Proceesding");
const Preparation = () =>
    import(
        /* webpackChunkName: "Preparation" */ "../views/deposition/Preparation.vue"
        );
const PreparationOld = () =>
    import(
        /* webpackChunkName: "PreparationOld" */ "../views/deposition/PreparationOld.vue"
        );
const PreparationKeyPleading = () =>
    import(
        /* webpackChunkName: "PreparationKeyPleading" */ "../views/CAF/Deposition/Detail/PreparationKeyPleading"
        );
const PreparationRFP = () =>
    import(
        /* webpackChunkName: "PreparationKeyPleading" */ "../views/CAF/Deposition/Detail/PreparationRFP/index"
        );
const AffidavitStatement = () =>
    import(
        /* webpackChunkName: "AffidavitStatement" */ "../views/CAF/Deposition/Detail/AffidavitStatement"
        );
const DepositionExhibit = () =>
    import(
        /* webpackChunkName: "DepositionExhibit" */ "../views/CAF/Deposition/Detail/DepositionExhibit"
        );
const WrittenArticle = () =>
    import(
        /* webpackChunkName: "WrittenArticle" */ "../views/CAF/Deposition/Detail/WrittenArticle"
        );
const GivenDeposition = () =>
    import(
        /* webpackChunkName: "GivenDeposition" */ "../views/CAF/Deposition/Detail/GivenDeposition/index"
        );
const Authoritative = () =>
    import(
        /* webpackChunkName: "Authoritative" */ "../views/CAF/Deposition/Detail/preparation/type2/Authoritative"
        );
const Information = () =>
    import(
        /* webpackChunkName: "Information" */ "../views/CAF/Deposition/Detail/Information/index"
        );
const Published = () =>
    import(
        /* webpackChunkName: "Published" */ "../views/CAF/Deposition/Detail/Published/index"
        );
const Correspondence = () =>
    import(
        /* webpackChunkName: "Correspondence" */ "../views/CAF/Deposition/Detail/Correspondence"
        );
const DraftsPrepared = () =>
    import(
        /* webpackChunkName: "Published" */ "../views/CAF/Deposition/Detail/DraftsPrepared"
        );
const DaubertTest = () =>
    import(
        /* webpackChunkName: "DaubertTest" */ "../views/CAF/Deposition/Detail/DaubertTest/index"
        );
const PreparationFact = () =>
    import(
        /* webpackChunkName: "PreparationFact" */ "../views/CAF/Deposition/Detail/PreparationFact"
        );
const PriorExperience = () =>
    import(
        /* webpackChunkName: "PriorExperience" */ "../views/CAF/Deposition/Detail/preparation/type2/PriorExperience"
        );

const PriorEmployment = () =>
    import(
        /* webpackChunkName: "PriorEmployment" */ "../views/CAF/Deposition/Detail/preparation/type2/PriorEmployment"
        );

const DetailRequestTask = () =>
    import(
        /* webpackChunkName: "DetailRequestTask" */ "../ht_components/discovery-status/request-task/detail/DetailRequestTask"
        );
const LayoutDetail = () =>
    import(
        /* webpackChunkName: "LayoutDetail" */ "../ht_components/discovery-status/LayoutDetail"
        );
const HomeEvidencesDetail = () =>
    import(
        /* webpackChunkName: "HomeEvidencesDetail" */ "../views/discovery/HomeEvidencesDetail"
        );
const DiscoveryIndexDetail = () =>
    import(
        /* webpackChunkName: "DiscoveryIndexDetail" */ "../views/discovery/DiscoveryIndexDetail"
        );
const HomeToolBoxDetail = () =>
    import(
        /* webpackChunkName: "HomeToolBoxDetail" */ "../views/discovery/HomeToolBoxDetail"
        );
const Billing = () =>
    import(/* webpackChunkName: "Billing" */ "../views/billing/Billing");
const Summary = () =>
    import(/* webpackChunkName: "Summary" */ "../views/billing/Summary");
const Invoice = () =>
    import(/* webpackChunkName: "Invoice" */ "../views/billing/Invoice");
const InvoiceDetail = () =>
    import(
        /* webpackChunkName: "InvoiceDetail" */ "../views/billing/InvoiceDetail"
        );
const Expense = () =>
    import(/* webpackChunkName: "Expense" */ "../views/billing/Expense");
const Payment = () =>
    import(/* webpackChunkName: "Payment" */ "../views/billing/Payment");
const Timesheet = () =>
    import(/* webpackChunkName: "Timesheet" */ "../views/billing/Timesheet");
const BillingSetting = () =>
    import(/* webpackChunkName: "BillingSetting" */ "../views/billing/Setting");
const HomeBuilder = () =>
    import(/* webpackChunkName: "HomeBuilder" */ "../views/billing/HomeBuilder");
const MeetingAgenda = () =>
    import(
        /* webpackChunkName: "MeetingAgenda" */ "../ht_components/client-detail/meeting/MeetingAgenda"
        );
const MeetingWeekly = () =>
    import(
        /* webpackChunkName: "MeetingWeekly" */ "../ht_components/client-detail/meeting/MeetingWeekly"
        );

//portal
const HomePortal = () =>
    import(/* webpackChunkName: "HomePortal" */ "../views/portal/Home");
const HomeFeedPortal = () =>
    import(/* webpackChunkName: "HomeFeedPortal" */ "../views/portal/HomeFeed");
const DocumentRequestPortal = () =>
    import(
        /* webpackChunkName: "DocumentRequestPortal" */ "../views/portal/DocumentRequest"
        );
const MeetingPortal = () =>
    import(/* webpackChunkName: "MeetingPortal" */ "../views/portal/Meeting");
const BillingPortal = () =>
    import(/* webpackChunkName: "BillingPortal" */ "../views/portal/Billing");
const MatterPortal = () =>
    import(/* webpackChunkName: "MatterPortal" */ "../views/portal/Matter");
const MatterPortalDetail = () =>
    import(
        /* webpackChunkName: "MatterPortalDetail" */ "../views/portal/MatterDetail"
        );
const MeetingAgendaPortal = () =>
    import(
        /* webpackChunkName: "MeetingAgendaPortal" */ "../ht_components/portal-meeting/MeetingAgendaPortal"
        );
const MeetingWeeklyPortal = () =>
    import(
        /* webpackChunkName: "MeetingWeeklyPortal" */ "../ht_components/portal-meeting/MeetingWeeklyPortal"
        );
const InboxPortal = () =>
    import(/* webpackChunkName: "InboxPortal" */ "../views/portal/Inbox");
const InboxPortalDetail = () =>
    import(
        /* webpackChunkName: "InboxPortalDetail" */ "../views/portal/InboxDetail"
        );
const ProfilePortal = () =>
    import(/* webpackChunkName: "ProfilePortal" */ "../views/portal/Profile");
const AddressBookPortal = () =>
    import(
        /* webpackChunkName: "AddressBookPortal" */ "../views/portal/AddressBook"
        );
const InvoicePortalDetail = () =>
    import(
        /* webpackChunkName: "InvoicePortalDetail" */ "../views/portal/InvoicePortalDetail"
        );
const HomePortalBuilder = () =>
    import(
        /* webpackChunkName: "HomePortalBuilder" */ "../views/portal/HomePortalBuilder"
        );

//Patient
const ProfilePartient = () =>
    import(
        /* webpackChunkName: "ProfilePartient" */ "../views/partient/ProfilePartient"
        );
const ProfilePartientDetail = () =>
    import(
        /* webpackChunkName: "ProfilePartientDetail" */ "../views/partient/ProfilePartientDetail"
        );
const PartientAgreement = () =>
    import(
        /* webpackChunkName: "PartientAgreement" */ "../views/partient/PartientAgreement"
        );
const PartientDetailAgreement = () =>
    import(
        /* webpackChunkName: "PartientDetailAgreement" */ "../views/partient/PartientDetailAgreement"
        );
const CommunicationDetail = () =>
    import(
        /* webpackChunkName: "CommunicationDetail" */ "../views/partient/CommunicationDetail"
        );
const ProfileMedicationLog = () =>
    import(
        /* webpackChunkName: "ProfileMedicationLog" */ "../views/partient/ProfileMedicationLog"
        );
const ProfileCommunication = () =>
    import(
        /* webpackChunkName: "ProfileMedicationLog" */ "../views/partient/ProfileCommunication"
        );
const PartientPrescribes = () =>
    import(
        /* webpackChunkName: "PartientPrescribes" */ "../views/partient/PartientPrescribes"
        );
const PatientPrescribesDetail = () =>
    import(
        /* webpackChunkName: "PatientPrescribesDetail" */ "../views/partient/PatientPrescribesDetail"
        );
const ProfileSymptomLog = () =>
    import(
        /* webpackChunkName: "ProfileSymptomLog" */ "../views/partient/ProfileSymptomLog"
        );
const ProfileSymptomLogTableView = () =>
    import(
        /* webpackChunkName: "ProfileSymptomLogTableView" */ "../views/partient/ProfileSymptomLogTableView"
        );
const ProfileSymptomLogGantt = () =>
    import(
        /* webpackChunkName: "ProfileSymptomLogGantt" */ "../views/partient/ProfileSymptomLogGantt"
        );
const ProfileSymptomLogAbsenceLog = () =>
    import(
        /* webpackChunkName: "ProfileSymptomLogAbsenceLog" */ "../views/partient/ProfileSymptomLogAbsenceLog"
        );
const ProfileTreatmentLog = () =>
    import(
        /* webpackChunkName: "ProfileTreatmentLog" */ "../views/partient/ProfileTreatmentLog"
        );
const ProfileFollowUp = () =>
    import(
        /* webpackChunkName: "ProfileFollowUp" */ "../views/partient/ProfileFollowUp"
        );

const MedWarPartient = () =>
    import(
        /* webpackChunkName: "MedWarPartient" */ "../views/partient/med-war/MedWarPartient"
        );
const MedWarPartientNegligence = () =>
    import(
        /* webpackChunkName: "MedWarPartientNegligence" */ "../views/partient/med-war/MedWarPartientNegligence"
        );
const MedWarPartientDetail = () =>
    import(
        /* webpackChunkName: "MedWarPartientDetail" */ "../views/partient/med-war/MedWarPartientDetail"
        );
const MedWarPartientInjury = () =>
    import(
        /* webpackChunkName: "MedWarPartientInjury" */ "../views/partient/med-war/MedWarPartientInjury"
        );
const InjuryPartientDetail = () =>
    import(
        /* webpackChunkName: "InjuryPartientDetail" */ "../views/partient/med-war/InjuryPartientDetail"
        );
const MedWarPractice = () =>
    import(
        /* webpackChunkName: "MedWarPractice" */ "../views/partient/med-war/MedWarPractice"
        );

import TestimonyRoutes from "./modules/testimony";

const References = () =>
    import(
        /* webpackChunkName: "References" */ "../views/references/TableReferences"
        );
const DetailReferences = () =>
    import(
        /* webpackChunkName: "DetailReferences" */ "../views/references/DetailReferences"
        );
const MedWarPracticeDetail = () =>
    import(
        /* webpackChunkName: "MedWarPracticeDetail" */ "../views/partient/med-war/MedWarPracticeDetail"
        );

const MatterService = () =>
    import(
        /* webpackChunkName: "MatterService" */ "../views/service/MatterService"
        );
const Allservice = () =>
    import(/* webpackChunkName: "Allservice" */ "../views/service/Allservice");
const ByService = () =>
    import(/* webpackChunkName: "ByService" */ "../views/service/ByService");

const HomeDigitalHowey = () =>
    import(
        /* webpackChunkName: "HomeDigitalHowey" */ "../views/digital-howey/HomeDigitalHowey"
        );
// const HomeBoardDigitalHowey = () =>
//   import(
//     /* webpackChunkName: "HomeBoardDigitalHowey" */ "../views/digital-howey/HomeBoardDigitalHowey"
//   );
const CardDetailDigitalHowey = () =>
    import(
        /* webpackChunkName: "CardDetailDigitalHowey" */ "../ht_components/digital-howey/CardDetailDigitalHowey"
        );

//Plaintiff
const Plaintiff = () =>
    import(/* webpackChunkName: "Plaintiff" */ "../views/plaintiff/Home");
const AllPlaintiff = () =>
    import(
        /* webpackChunkName: "AllPlaintiff" */ "../views/plaintiff/AllPlaintiff"
        );
const ByKYCStatus = () =>
    import(
        /* webpackChunkName: "ByKYCStatus" */ "../views/plaintiff/ByKYCStatus"
        );
const ByAcquireSource = () =>
    import(
        /* webpackChunkName: "ByAcquireSource" */ "../views/plaintiff/ByAcquireSource"
        );
const ByPlaintiffGroup = () =>
    import(
        /* webpackChunkName: "ByPlaintiffGroup" */ "../views/plaintiff/ByPlaintiffGroup"
        );

// Helpdesk
const HelpdeskView = () =>
    import(/* webpackChunkName: "HelpdeskView" */ "../views/helpdesk/View/Home");

// Static Reuse
const staticReuse = () =>
    import(/* webpackChunkName: "staticReuse" */ "../views/static-reuse/index");
const staticReusePagination = () =>
    import(
        /* webpackChunkName: "staticReusePagination" */ "../views/static-reuse/static-pagination"
        );


const HomeClientMessage = () =>
    import(/* webpackChunkName: "HomeClientMessage" */ "../views/client-message/HomeClientMessage");
// CAF
const Meetings = () =>
    import(/* webpackChunkName: "Meetings" */ "../views/CAF/Meetings/index");
const Docket = () =>
    import(/* webpackChunkName: "Docket" */ "../views/CAF/Docket/index");
const DocketRelated = () =>
    import(
        /* webpackChunkName: "DocketRelated" */ "../views/CAF/Docket/DocketRelated"
        );
const EvidencesSlickGrid = () =>
    import(
        /* webpackChunkName: "EvidencesSlickGrid" */ "../views/CAF/Evidences/EvidencesSlickGrid/index"
        );
const ChainCustodySlickGrid = () =>
    import(
        /* webpackChunkName: "ChainCustodySlickGrid" */ "../views/CAF/Evidences/ChainCustodySlickGrid"
        );
// Request Set
const Status = () =>
    import(/* webpackChunkName: "Status" */ "../views/CAF/Status/index");
const RequestSet = () =>
    import(
        /* webpackChunkName: "RequestSet" */ "../views/CAF/Status/RequestSetSlickGrid"
        );
const RequestSetDetail = () =>
    import(
        /* webpackChunkName: "RequestSetDetail" */ "../views/CAF/Status/RequestSetDetail/index"
        );
const RequestSetTask = () =>
    import(
        /* webpackChunkName: "RequestSetTask" */ "../views/CAF/Status/RequestSetTask"
        );

const HomeRequestSetExpense = () =>
    import(
        /* webpackChunkName: "HomeRequestSetExpense" */ "../views/CAF/Status/HomeRequestSetExpense"
        );

const RequestSetItems = () =>
    import(
        /* webpackChunkName: "RequestSetItems" */ "../views/CAF/Status/RequestSetDetail/RequestSetItems"
        );
const RequestSetItemDocument = () =>
    import(
        /* webpackChunkName: "RequestSetItemDocument" */ "../views/CAF/Status/RequestSetItemDetail/RequestSetItemDocument"
        );
const RequestSetDocument = () =>
    import(
        /* webpackChunkName: "RequestSetDocument" */ "../views/CAF/Status/RequestSetDetail/RequestSetDocument"
        );
const RequestSetDefinition = () =>
    import(
        /* webpackChunkName: "RequestSetDefinition" */ "../views/CAF/Status/RequestSetDetail/RequestSetDefinition"
        );
const RequestSetTaskDetail = () =>
    import(
        /* webpackChunkName: "RequestSetTaskDetail" */ "../views/CAF/Status/RequestSetDetail/RequestSetTaskDetail"
        );

const RequestSetExpenseDetail = () =>
    import(
        /* webpackChunkName: "RequestSetExpenseDetail" */ "../views/CAF/Status/RequestSetDetail/RequestSetExpenseDetail"
        );

const RequestSetItemElement = () =>
    import(
        /* webpackChunkName: "RequestSetItemElement" */ "../views/CAF/Status/RequestSetDetail/RequestSetItemElement"
        );

const Clients = () =>
    import(
        /* webpackChunkName: "Clients" */ "../views/CAF/Clients/index"
        );
const HomeUi = () => import(
    /* webpackChunkName: "HomeUi" */ "../views/ui/Index"
    );
const UIMatters = () => import(
    /* webpackChunkName: "UIMatters" */ "../views/ui/AllMatters"
    );

const DocketEntries = () => import(
    /* webpackChunkName: "DocketEntries" */ "../views/ui/DocketEntries"
    );
const ExpenseEntries = () => import(
    /* webpackChunkName: "ExpenseEntries" */ "../views/ui/expense"
    );
const TimelinesMatterGeneral = () => import(
    /* webpackChunkName: "TimelinesMatterGeneral" */ "../views/ui/time-tracking/TimelinesMatterGeneral"
    );
const TimeEntriesMatter = () => import(
    /* webpackChunkName: "TimeEntriesMatter" */ "../views/ui/time-tracking/TimeEntriesMatter"
    );
const TimeTaskBoardMatter = () => import(
    /* webpackChunkName: "TimeTaskBoardMatter" */ "../views/ui/time-tracking/TimeTaskBoardMatter"
    );
const Facts = () => import(
    /* webpackChunkName: "AllFacts" */ "../views/ui/AllFacts"
    );
const FactVersion = () => import(
    /* webpackChunkName: "FactVersion" */ "../views/ui/AllFactVersion"
    );
const AllCharacters = () => import(
    /* webpackChunkName: "AllCharacters" */ "../views/ui/AllCharacters"
    );
const AllCharactersRelated = () => import(
    /* webpackChunkName: "AllCharactersRelated" */ "../views/ui/AllCharactersRelated"
    );

const AllCharactersRelationshipMap = () => import(
    /* webpackChunkName: "AllCharactersRelationshipMap" */ "../views/ui/AllCharactersRelationshipMap"
    );







const LAYOUT = {
    NotLoggedIn: "NotLoggedIn",
    Project: "ProjectLoggedIn",
    Portal: "PortalLayout"
};
export default [


    {
        path: "/portal",
        name: "Portal",
        component: HomePortal,
        meta: {
            layout: LAYOUT.Portal
        },
        children: [
            {
                name: "HomeFeedPortal",
                path: "home-feed",
                component: HomeFeedPortal,
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                name: "DocumentRequestPortal",
                path: "document-request",
                component: DocumentRequestPortal,
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                name: "MeetingPortal",
                path: "meeting",
                component: MeetingPortal,
                meta: {
                    layout: LAYOUT.Portal
                },
                redirect: {
                    name: "MeetingAgendaPortal"
                },
                children: [
                    {
                        path: "agenda",
                        name: "MeetingAgendaPortal",
                        component: MeetingAgendaPortal,
                        meta: {
                            layout: LAYOUT.Portal
                        }
                    },
                    {
                        path: "weekly",
                        name: "MeetingWeeklyPortal",
                        component: MeetingWeeklyPortal,
                        meta: {
                            layout: LAYOUT.Portal
                        }
                    }
                ]
            },
            {
                name: "BillingPortal",
                path: "billing",
                component: BillingPortal,
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                path: "billing/detail/:id",
                name: "PortalInvoiceDetail",
                component: InvoicePortalDetail,
                children: [
                    {
                        path: "builder",
                        name: "PortalInvoiceDetailBuilder",
                        component: HomePortalBuilder,
                        meta: {
                            layout: LAYOUT.Portal
                        }
                    }
                ],
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                name: "MatterPortal",
                path: "matter",
                component: MatterPortal,
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                name: "MatterPortalDetail",
                path: "matter/:idMatter",
                component: MatterPortalDetail,
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                name: "InboxPortal",
                path: "inbox",
                component: InboxPortal,
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                name: "InboxPortalDetail",
                path: "inbox/:idInbox",
                component: InboxPortalDetail,
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                name: "ProfilePortal",
                path: "profile",
                component: ProfilePortal,
                meta: {
                    layout: LAYOUT.Portal
                }
            },
            {
                name: "AddressBookPortal",
                path: "address-book",
                component: AddressBookPortal,
                meta: {
                    layout: LAYOUT.Portal
                }
            }
        ]
    },
    {
        name: "clients",
        path: "/clients",
        component: Clients,
        meta: {
            layoutType: "project-detail"
        }
    },
    {
        path: "/meetings",
        name: "meeting",
        component: Meetings,
        meta: {
            layoutType: "project-detail"
        }
    },
    {path: "*", component: NotFound404},
    {
        path: "/",
        name: "index",
        component: Index,
        meta: {layout: LAYOUT.NotLoggedIn}
    },
    {
        path: "/signin",
        name: "signin",
        component: SignIn,
        meta: {layout: LAYOUT.NotLoggedIn}
    },
    {
        path: "/settings",
        name: "Setting",
        component: Setting,
        meta: {
            layoutType: "setting"
        }
    },
    {
        path: "/settings/admin",
        name: "AdminSetting",
        component: AdminSetting,
        meta: {
            layoutType: "setting"
        }
    },
    {
        path: "/reset-password",
        name: "forgot-password",
        component: ResetPassword,
        meta: {layout: LAYOUT.NotLoggedIn}
    },
    {
        path: "/password-reset/confirm/:uid/:token", // DO NOT CHANGE THIS PATH
        name: "password_reset_confirm",
        component: ChangePassword,
        meta: {layout: LAYOUT.NotLoggedIn}
    },
    {
        path: "/create-workspace",
        name: "createworkspace",
        component: CreateProject,
        meta: {layout: LAYOUT.NotLoggedIn}
    },
    {
        path: "/set-token",
        name: "set-token",
        component: SetSubdomainToken,
        meta: {layout: LAYOUT.NotLoggedIn}
    },

    {
        path: "/invite-members",
        name: "inviteMembers",
        component: InviteMembers,
        meta: {layout: LAYOUT.NotLoggedIn}
    },

    {
        path: "/join/invite/:key",
        name: "join-invite",
        component: JoinInvite,
        meta: {layout: LAYOUT.NotLoggedIn}
    },
    {
        path: "/home",
        name: "home"
    },
    {
        path: "/client-message",
        name: "HomeClientMessage",
        component: HomeClientMessage
    },
    {
        path: "/project/create",
        name: "CreateProject",
        component: CreateNewProject
    },
    {
        path: "/project/:projectId",
        name: "Detail",
        component: Detail,
        children: [
            {
                path: 'ui',
                name: 'ui.home',
                component: HomeUi,

                children: [
                    {
                        path: 'matters',
                        name: 'ui.matters',
                        component: UIMatters
                    },
                    {
                        path: 'docket',
                        name: 'ui.DocketEntries',
                        component: DocketEntries
                    },
                    {
                        path: 'expense',
                        name: 'ui.expenseEntries',
                        component: ExpenseEntries
                    },
                    {
                        path: 'timelines-matter',
                        name: 'ui.TimelinesMatter',
                        component: TimelinesMatterGeneral
                    },
                    {
                        path: 'time-entries-matter',
                        name: 'ui.time-entries-matter',
                        component: TimeEntriesMatter
                    },
                    {
                        path: 'time-taskboard-matter',
                        name: 'ui.time-taskboard-matter',
                        component: TimeTaskBoardMatter
                    },
                    {
                        path: 'facts',
                        name: 'ui.facts',
                        component: Facts
                    },
                    {
                        path: 'fact-version',
                        name: 'ui.fact-version',
                        component: FactVersion
                    },
                    {
                        path: 'characters',
                        name: 'ui.characters',
                        component: AllCharacters
                    },
                    {
                        path: 'characters-related',
                        name: 'ui.characters.related',
                        component: AllCharactersRelated
                    },
                    {
                        path: 'characters-relationship-map',
                        name: 'ui.characters.relationship.map',
                        component: AllCharactersRelationshipMap
                    },


                ]
            },
            // CAF
            {
                path: "docket",
                name: "docket",
                component: Docket
            },
            {
                path: "evidences-slick-grid",
                name: "evidencesSlickGrid",
                component: EvidencesSlickGrid
            },
            {
                path: "chain-of-custody-slick-grid",
                name: "ChainCustodySlickGrid",
                component: ChainCustodySlickGrid
            },
            {
                path: "docket-related",
                name: "DocketRelated",
                component: DocketRelated
            },
            {
                path: "citations",
                name: "citations",
                component: Citations,
                meta: {
                    layoutType: "project-detail"
                },
                children: [
                    {
                        path: "issue/detail/:idIssue",
                        name: "issueDetail",
                        component: HomeIssueDetail
                    },
                    {
                        name: "detailCitation",
                        path: "detail/:citationId",
                        component: DetailCitation
                    }
                ]
            },
            {
                path: "patient",
                name: "HomePartient",
                component: ProfilePartient,
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                path: "patient/detail/:id",
                name: "ProfilePartientDetail",
                component: ProfilePartientDetail,
                redirect: {
                    name: "PartientAgreement"
                },
                children: [
                    {
                        path: "agreement",
                        name: "PartientAgreement",
                        component: PartientAgreement,
                        children: [
                            {
                                path: ":idAgreement",
                                name: "PartientDetailAgreement",
                                component: PartientDetailAgreement
                            }
                        ]
                    },
                    {
                        path: "prescribes",
                        name: "PartientPrescribes",
                        component: PartientPrescribes,
                        children: [
                            {
                                path: ":idPrescribes",
                                name: "PatientPrescribesDetail",
                                component: PatientPrescribesDetail
                            }
                        ]
                    },
                    {
                        path: "medication-log",
                        name: "ProfileMedicationLog",
                        component: ProfileMedicationLog
                    },
                    {
                        path: "symptom-log",
                        name: "ProfileSymptomLog",
                        component: ProfileSymptomLog,
                        redirect: {
                            name: "ProfileSymptomLogTableView"
                        },
                        children: [
                            {
                                path: "tableview",
                                name: "ProfileSymptomLogTableView",
                                component: ProfileSymptomLogTableView
                            },
                            {
                                path: "gantt",
                                name: "ProfileSymptomLogGantt",
                                component: ProfileSymptomLogGantt
                            },
                            {
                                path: "absence-log",
                                name: "ProfileSymptomLogAbsenceLog",
                                component: ProfileSymptomLogAbsenceLog
                            }
                        ]
                    },
                    {
                        path: "treatment-log",
                        name: "ProfileTreatmentLog",
                        component: ProfileTreatmentLog
                    },
                    {
                        path: "follow-log",
                        name: "ProfileFollowUp",
                        component: ProfileFollowUp
                    },
                    {
                        path: "communication",
                        name: "Communication",
                        component: ProfileCommunication,
                        children: [
                            {
                                path: ":idCommunication",
                                name: "CommunicationDetail",
                                component: CommunicationDetail
                            }
                        ]
                    }
                ]
            },
            {
                path: "med-war",
                name: "MedWarPartient",
                component: MedWarPartient,
                redirect: {
                    name: "MedWarPartientNegligence"
                },
                meta: {
                    layoutType: "project-detail"
                },
                children: [
                    {
                        path: "negligence",
                        name: "MedWarPartientNegligence",
                        component: MedWarPartientNegligence,
                        children: [
                            {
                                path: "detail/:id",
                                name: "MedWarPartientDetail",
                                component: MedWarPartientDetail
                            }
                        ]
                    },
                    {
                        path: "injury",
                        name: "MedWarPartientInjury",
                        component: MedWarPartientInjury,
                        children: [
                            {
                                path: "detail/:id",
                                name: "InjuryPartientDetail",
                                component: InjuryPartientDetail
                            }
                        ]
                    },
                    {
                        path: "practice",
                        name: "MedWarPractice",
                        component: MedWarPractice,
                        children: [
                            {
                                path: "detail/:id",
                                name: "MedWarPracticeDetail",
                                component: MedWarPracticeDetail
                            }
                        ]
                    }
                ]
            },
            // {
            //   path: "strategies",
            //   name: "strategies",
            //   redirect: {
            //     name: "Premises"
            //   },
            //   component: Strategies,
            //   children: [
            //     {
            //       path: "premises",
            //       name: "Premises",
            //       component: Premises
            //     }
            //   ]
            // },
            ...TestimonyRoutes,
            {
                path: "references",
                name: "references",
                component: References
            },
            {
                path: "references/detail/:id",
                name: "DetailReferences",
                component: DetailReferences
            },
            {
                path: "plaintiff",
                name: "Plaintiff",
                component: Plaintiff,
                redirect: {
                    name: "AllPlaintiff"
                },
                children: [
                    {
                        path: "all-plaintiff",
                        name: "AllPlaintiff",
                        component: AllPlaintiff
                    },
                    {
                        path: "by-kyc-status",
                        name: "ByKYCStatus",
                        component: ByKYCStatus
                    },
                    {
                        path: "by-acquire-source",
                        name: "ByAcquireSource",
                        component: ByAcquireSource
                    },
                    {
                        path: "by-plaintiff-group",
                        name: "ByPlaintiffGroup",
                        component: ByPlaintiffGroup
                    }
                ]
            },
            // {
            //   name: "DigitalHoweyChecklistDefault",
            //   path: "digital-howey-checklist",
            //   component: HomeBoardDigitalHowey
            // },
            {
                name: "Helpdesk",
                path: "helpdesk/:type?",
                component: HelpdeskView
            },
            {
                name: "DigitalHoweyChecklist",
                path: "digital-howey-checklist/:id/:type",
                component: HomeDigitalHowey,
                children: [
                    {
                        name: "CardDetail",
                        path: "card/:cardId",
                        component: CardDetailDigitalHowey,
                        meta: {
                            layoutType: "project-detail"
                        }
                    }
                ],
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                path: "overview",
                name: "overview",
                component: Overview,
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                name: "discovery-summary",
                path: "discovery-summary",
                component: SummaryDiscovery
            },
            {
                name: "evidences",
                path: "discovery-evidences/:groupType?",
                component: Evidences,
                children: [
                    {
                        name: "detail",
                        path: "detail/:evidenceId",
                        component: HomeEvidencesDetail
                    }
                ]
            },
            {
                name: "discoveryStatus",
                path: "discovery-status/:type?",
                component: DiscoveryStatus,
                children: [
                    {
                        name: "detailRequestTask",
                        path: ":requestId/tasks/:taskId",
                        component: DetailRequestTask
                    },
                    {
                        name: "detail",
                        path: "detail/:requestId",
                        component: LayoutDetail
                    }
                ]
            },
            {
                name: "Status",
                path: "status",
                component: Status,
                children: [
                    {
                        name: "RequestSet",
                        path: "request-set",
                        component: RequestSet
                    },
                    {
                        name: "RequestSetDetail",
                        path: "request-set/detail/:requestSetId",
                        component: RequestSetDetail,
                        redirect: {
                            name: "RequestSetItems"
                        },
                        children: [
                            {
                                name: "RequestSetItems",
                                path: "request-set-item",
                                component: RequestSetItems,
                            },
                            {
                                name: "RequestSetItemsDetail",
                                path: "request-set-item/:requestItemId/document",
                                component: RequestSetItemDocument,
                            },
                            {
                                name: "RequestSetDefinition",
                                path: "request-set-definition",
                                component: RequestSetDefinition
                            },
                            {
                                name: "RequestSetDocument",
                                path: "request-set-document",
                                component: RequestSetDocument
                            },
                            {
                                name: "RequestSetTaskDetail",
                                path: "request-set-task",
                                component: RequestSetTaskDetail
                            },
                            {
                                name: "RequestSetExpenseDetail",
                                path: "request-set-expense",
                                component: RequestSetExpenseDetail
                            },
                            {
                                name: "RequestSetItemElement",
                                path: "request-set-item-element",
                                component: RequestSetItemElement
                            },
                        ]
                    },
                    {
                        name: "RequestSetTask",
                        path: "request-task",
                        component: RequestSetTask
                    },
                    {
                        name: "HomeRequestSetExpense",
                        path: "home-request-set-expense",
                        component: HomeRequestSetExpense
                    }
                ]
            },
            {
                name: "discoveryDeposition",
                path: "discovery-deposition",
                component: Deposition
            },
            {
                name: "detailDeposition",
                path: "discovery-deposition/detail/:depositionId",
                redirect: {
                    name: "depositionOverview"
                },
                component: HomeDepositionDetail,
                children: [
                    {
                        name: "depositionOverview",
                        path: "overview",
                        component: OverviewDeposition
                    },
                    {
                        name: "depositionChecklist",
                        path: "checklist",
                        component: Checklist,
                        children: [
                            {
                                name: "detail",
                                path: "detail/:checklistId",
                                component: CheckListDetail
                            }
                        ]
                    },
                    {
                        name: "depositionPreparation",
                        path: "preparation",
                        component: Preparation,
                        children: [
                            {
                                name: "DepositionKeyPleading",
                                path: "key-pleading",
                                component: PreparationKeyPleading
                            },
                            {
                                name: "DepositionRFP",
                                path: "request-for-production",
                                component: PreparationRFP
                            },
                            {
                                name: "DepositionKeyPleading",
                                path: "key-pleading",
                                component: PreparationKeyPleading
                            },
                            {
                                name: "AffidavitStatement",
                                path: "affidavit-statement",
                                component: AffidavitStatement
                            },
                            {
                                name: "DepositionFactChronology",
                                path: "fact",
                                component: PreparationFact
                            },
                            {
                                name: "DepositionPriorExperience",
                                path: "prior-experience",
                                component: PriorExperience
                            },
                            {
                                name: "DepositionPriorEmployment",
                                path: "prior-employment",
                                component: PriorEmployment
                            },
                            {
                                name: "WrittenArticle",
                                path: "written-article",
                                component: WrittenArticle
                            },
                            {
                                name: "DepositionExhibit",
                                path: "exhibit-slickgrid",
                                component: DepositionExhibit
                            },
                            {
                                name: "GivenDeposition",
                                path: "given-deposition",
                                component: GivenDeposition
                            },
                            {
                                name: "authoritative",
                                path: "authoritative",
                                component: Authoritative
                            },
                            {
                                name: "Information",
                                path: "information-and-Document-expert-witness-has-received",
                                component: Information
                            },
                            {
                                name: "Published",
                                path: "published",
                                component: Published
                            },
                            {
                                name: "Correspondence",
                                path: "correspondence",
                                component: Correspondence
                            },
                            {
                                name: "DraftsPrepared",
                                path: "drafts-prepared",
                                component: DraftsPrepared
                            },
                            {
                                name: "DaubertTest",
                                path: "daubert-test",
                                component: DaubertTest
                            }
                        ]
                    },
                    {
                        name: "depositionPreparationOld",
                        path: "preparation-old",
                        component: PreparationOld
                    },
                    {
                        name: "proceeding",
                        path: "proceeding",
                        component: Proceeding
                    },
                    {
                        name: "depositionOverview",
                        path: "overview",
                        component: Checklist
                    },
                    {
                        name: "depositionDeposition",
                        path: "deposition",
                        component: HomeDeposition
                    },
                    {
                        name: "depositionPostDeposition",
                        path: "post-deposition",
                        component: PostDeposition
                    }
                ]
            },
            {
                name: "risk-management",
                path: "risk-management",
                component: RiskManagement,
                children: [
                    {
                        name: "RiskRegister",
                        path: "register",
                        component: RiskRegister
                    },
                    {
                        name: "riskActionEntry",
                        path: "detail/:riskActionId/action-entry",
                        component: RiskActionEntry
                    },
                ]
            },
            {
                name: "subpoena",
                path: "subpoena",
                component: SubpoenaManagement,
                children: [
                    {
                        name: "SubpoenaSet",
                        path: "subpoena-set",
                        component: SubpoenaSet,
                    },
                    {
                        name: "SubpoenaDetail",
                        path: "detail/:subpoenaId",
                        component: SubpoenaDetail,
                        redirect: {
                            name: "SubpoenaProduction"
                        },
                        children: [
                            {
                                name: "SubpoenaProduction",
                                path: "subpoena-produciton",
                                component: SubpoenaProduction,
                            },
                            {
                                name: "SubpoenaDefiAndInstrucs",
                                path: "subpoena-defi-and-strucs",
                                component: SubpoenaDefiAndInstrucs,
                            }
                        ]
                    },
                    {
                        name: "ProductionEntries",
                        path: "production-entries",
                        component: ProductionEntries
                    },
                ]
            },
            {
                name: "discovery-log",
                path: "discovery-log",
                component: Log
            },
            {
                name: "discovery-log-detail",
                path: "discovery-log/detail/:logId",
                component: LogDetail
            },
            {
                name: "privilege-logs",
                path: "privilege-logs",
                component: PrivilegeEntry,
            },
            {
                name: "privilege-attorney-logs",
                path: "privilege-attorney-logs",
                component: PrivilegeAttorneyEntry,
            },
            {
                name: "discovery-index",
                path: "discovery-index",
                component: IndexDiscovery,
                children: [
                    {
                        name: "detail",
                        path: "detail/:indexId",
                        component: DiscoveryIndexDetail
                    }
                ],
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                name: "discovery-toolBox",
                path: "discovery-toolBox",
                component: ToolBox
            },
            {
                name: "detailToolbox",
                path: "discovery-toolBox/detail/:toolBoxId",
                component: HomeToolBoxDetail
            },
            {
                name: "facts",
                path: "facts/:listType?/:groupType?",
                component: FactsComponent,
                children: [
                    {
                        name: "factDetail",
                        path: "detail/:factId",
                        component: HomeFactDetail
                    }
                ],
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                name: "summary",
                path: "summary",
                component: SummaryComponent,
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                path: "character",
                component: CharacterComponent,
                name: 'CharacterLayout',
                meta: {
                    layoutType: "project-detail"
                },
                children: [
                    {
                        name: "character-related",
                        path: "character-related",
                        component: HomeCharacterRelated
                    },
                    {
                        name: "character",
                        path: "",
                        component: ListCharacter
                    },
                    {
                        name: "characterRelationship",
                        path: "relationship",
                        component: RelationShipMap,
                    },
                ]
            },
            {
                name: "characterDetail",
                path: "character/:characterId",
                redirect: {
                    name: "about"
                },
                component: CharacterDetail,
                children: [
                    {
                        name: "about",
                        path: "about",
                        component: AboutCharacter
                    },
                    {
                        name: "activity",
                        path: "activity/:listType?",
                        component: Activity
                    },
                    {
                        name: "goals",
                        path: "goals",
                        component: GoalsCharacter
                    },
                    {
                        name: "notes",
                        path: "notes",
                        component: NotesCharacter
                    },
                    {
                        name: "documents",
                        path: "documents",
                        component: DocumentCharacter
                    },
                    {
                        name: "credibility",
                        path: "credibility",
                        component: CredibilitiesCharacter
                    },
                    {
                        name: "mapping",
                        path: "mapping",
                        component: Mapping
                    }
                ],
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                name: "timeline",
                path: "timeline",
                component: TimelineComponent,
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                name: "TimelineDetail",
                path: "timeline/detail/:timelineId",
                component: TimelineDetail,
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                name: "ProjectTaskBoard",
                path: "taskboard/:id/:type",
                component: Taskboard,
                children: [
                    {
                        name: "CardDetail",
                        path: "card/:cardId",
                        component: CardDetail,
                        meta: {
                            layoutType: "project-detail"
                        }
                    }
                ],
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                path: "contacts",
                name: "contacts",
                component: Contacts,
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                path: "contacts/:id",
                name: "ContactDetail",
                component: ContactDetail,
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                path: "resource-overview",
                name: "ProjectResourceOverview",
                component: ProjectOverviewResources,
                redirect: {
                    name: "ProjectResourceOverviewTeam"
                },
                children: [
                    {
                        path: "team",
                        name: "ProjectResourceOverviewTeam",
                        component: ProjectOverviewResourcesTeam,
                        meta: {
                            layoutType: "project-detail"
                        }
                    },
                    {
                        path: "project",
                        name: "ProjectResourceOverviewProject",
                        component: ProjectOverviewResourcesProject,
                        meta: {
                            layoutType: "project-detail"
                        }
                    }
                ],
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                path: "document-requests",
                name: "ProjectDocumentRequest",
                component: DocumentRequest,
                redirect: {
                    name: "ProjectDocumentRequestAll"
                },
                children: [
                    {
                        path: "all",
                        name: "ProjectDocumentRequestAll",
                        component: DocumentRequestAll,
                        meta: {
                            layoutType: "project-detail"
                        }
                    },
                    {
                        path: "review",
                        name: "ProjectDocumentRequestReview",
                        component: DocumentRequestReview,
                        meta: {
                            layoutType: "project-detail"
                        }
                    }
                ],
                meta: {
                    layoutType: "project-detail"
                }
            },
            {
                name: "ProjectTaskBoardDefault",
                path: "taskboard",
                component: HomeBoard
            },
            {
                name: "MatterService",
                path: "service",
                component: MatterService,
                redirect: {
                    name: "Allservice"
                },
                children: [
                    {
                        name: "Allservice",
                        path: "all-service",
                        component: Allservice
                    },
                    {
                        name: "ByService",
                        path: ":type",
                        component: ByService
                    }
                ]
            }
        ],
        meta: {
            layoutType: "project-detail"
        }
    },
    {
        path: "/category",
        name: "category",
        component: Category,
        meta: {
            layoutType: "category"
        }
    },
    {
        path: "/client",
        name: "client",
        component: ClientComponent,
        children: [
            {
                path: "chat",
                name: "chat",
                component: ChatLayout,
                redirect: {
                    name: "ChatMessaging"
                },
                children: [
                    {
                        path: "messaging/:uuid?",
                        name: "ChatMessaging",
                        component: ChatMessaging,
                        meta: {
                            layoutType: "message"
                        }
                    }
                ],
                meta: {
                    layoutType: "message"
                }
            },
            {
                path: "profile/:id",
                name: "detailClient",
                component: ClientDetail,
                redirect: {
                    name: "OverViewClient"
                },
                children: [
                    {
                        path: "overview",
                        name: "OverViewClient",
                        component: OverViewClient,
                        meta: {
                            layoutType: "clientDetail"
                        }
                    },
                    {
                        path: "matter",
                        name: "MatterClient",
                        component: MatterClient,
                        meta: {
                            layoutType: "clientDetail"
                        }
                    },
                    {
                        path: "time",
                        name: "TimeClient",
                        component: TimeClient,
                        meta: {
                            layoutType: "clientDetail"
                        }
                    },
                    {
                        path: "billing",
                        name: "BillingClient",
                        component: BillingClient,
                        meta: {
                            layoutType: "clientDetail"
                        }
                    },
                    {
                        path: "meeting",
                        name: "MeetingClient",
                        component: MeetingClient,
                        meta: {
                            layoutType: "clientDetail"
                        },
                        redirect: {
                            name: "MeetingAgenda"
                        },
                        children: [
                            {
                                path: "agenda",
                                name: "MeetingAgenda",
                                component: MeetingAgenda
                            },
                            {
                                path: "weekly",
                                name: "MeetingWeekly",
                                component: MeetingWeekly
                            }
                        ]
                    },
                    {
                        path: "note",
                        name: "NoteClient",
                        component: NoteClient,
                        meta: {
                            layoutType: "clientDetail"
                        }
                    },
                    {
                        path: "message",
                        name: "MessageClient",
                        component: MessageClient,
                        meta: {
                            layoutType: "clientDetail"
                        }
                    },
                    {
                        path: "document-request",
                        name: "DocumentClient",
                        component: DocumentClient,
                        meta: {
                            layoutType: "clientDetail"
                        }
                    },
                    {
                        path: "address-books",
                        name: "AddressBookClient",
                        component: AddressBookClient,
                        meta: {
                            layoutType: "clientDetail"
                        }
                    }
                ]
            }
        ],
        meta: {
            layoutType: "message"
        }
    },
    {
        path: "/announcements",
        name: "AnnouncementHome",
        component: AnnouncementHome
    },
    {
        path: "/kitchen-sink",
        name: "kitchen-sink",
        component: KitchenSink
    },
    {
        path: "/kitchen-sink-2",
        name: "kitchen-sink-2",
        component: KitchenSink2
    },
    {
        path: "/kitchen-sink-3",
        name: "kitchen-sink-3",
        component: KitchenSink3
    },
    {
        path: "/kitchen-sink-4",
        name: "kitchen-sink-4",
        component: KitchenSink4
    },
    {
        path: "/document-requests",
        name: "DocumentRequest",
        component: DocumentRequest,
        redirect: {
            name: "DocumentRequestAll"
        },
        children: [
            {
                path: "all",
                name: "DocumentRequestAll",
                component: DocumentRequestAll,
                meta: {
                    layoutType: "document-request"
                }
            },
            {
                path: "review",
                name: "DocumentRequestReview",
                component: DocumentRequestReview,
                meta: {
                    layoutType: "document-request"
                }
            }
        ],
        meta: {
            layoutType: "document-request"
        }
    },
    {
        path: "/billings",
        name: "Billing",
        component: Billing,
        redirect: {
            name: "BillingSummary"
        },
        children: [
            {
                path: "summary",
                name: "BillingSummary",
                component: Summary,
                meta: {
                    layoutType: "billing"
                }
            },
            {
                path: "invoice",
                name: "BillingInvoice",
                component: Invoice,
                meta: {
                    layoutType: "billing"
                }
            },
            {
                path: "payment",
                name: "BillingPayment",
                component: Payment,
                meta: {
                    layoutType: "billing"
                }
            },
            {
                path: "expense",
                name: "BillingExpense",
                component: Expense,
                meta: {
                    layoutType: "billing"
                }
            },
            {
                path: "timesheet",
                name: "BillingTimesheet",
                component: Timesheet,
                meta: {
                    layoutType: "billing"
                }
            },
            {
                path: "setting",
                name: "BillingSetting",
                component: BillingSetting,
                meta: {
                    layoutType: "billing"
                }
            },
            {
                path: "invoice/detail/:id",
                name: "BillingInvoiceDetail",
                component: InvoiceDetail,
                children: [
                    {
                        path: "builder",
                        name: "InvoiceDetailBuilder",
                        component: HomeBuilder
                    }
                ],
                meta: {
                    layoutType: "billing"
                }
            }
        ],
        meta: {
            layoutType: "billing"
        }
    },

    // static
    {
        path: "/static-reuse",
        name: "static-reuse",
        component: staticReuse
    },
    {
        path: "/static-reuse-pagination",
        name: "static-reuse-pagination",
        component: staticReusePagination
    }
];

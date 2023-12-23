import user from "./modules/user";
import layout from "./modules/layout";
import task from "./modules/task";
import mention from "./modules/mention";
import newsFeed from "./modules/news-feed";
import project from "./modules/project";
import members from "./modules/members";
import leftMenu from "./modules/left-menu";
import announcement from "./modules/announcement";
import auth from "./modules/auth";
import projectBoard from "./modules/project-board";
import slick from "./modules/slick";
import adminSetting from "./modules/admin-setting";
import setting from "./modules/setting";
import matter from "./modules/matter";
import document from "./modules/document";
import clientPortal from "./modules/client-portal";
import snackbar from "./modules/snackbar";
import clients from "./modules/clients"
import bookmarkOrReport from "./modules/bookmark-or-report-common/"
// DongA
import projectDetail from "./modules/projectdetail";
import workspace from "./modules/workspace";

export default {
  namespaced: true,
  modules: {
    user,
    task,
    layout,
    mention,
    newsFeed,
    project,
    members,
    leftMenu,
    announcement,
    projectBoard,
    slick,
    auth,
    adminSetting,
    setting,
    matter,
    document,
    clientPortal,
    snackbar,
    clients,
    bookmarkOrReport,
    // DongA
    projectDetail,
    workspace
  },
};

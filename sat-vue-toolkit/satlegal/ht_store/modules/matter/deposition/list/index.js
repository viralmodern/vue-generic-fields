import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";

import keyPleading from "../keypleading";
import affidavitStatement from "../affidavitStatement";
import writtenarticl from "../writtenarticl";
import givenDeposition from "../givenDeposition";
import authoritative from "../authoritative";
import information from "../information";
import daubertTest from "../daubertTest";
import fact from "../fact";
import RFP from "../requestForProduction";
import exhibitSlickgrid from "../exhibitSlickgrid";
import priorExperience from "../priorExperience";
import priorEmployment from "../priorEmployment";
import published from "../published";
import correspondence from "../correspondence";
import draftsPrepare from "../draftsPrepare";
import proceeding from "../proceeding"

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  modules: {
    keyPleading,
    affidavitStatement,
    fact,
    RFP,
    exhibitSlickgrid,
    priorExperience,
    priorEmployment,
    writtenarticl,
    givenDeposition,
    authoritative,
    information,
    published,
    correspondence,
    draftsPrepare,
    proceeding,
    daubertTest,
  }
};

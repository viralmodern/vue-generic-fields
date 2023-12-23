import keyPleadings from "./matter.discovery.deposition.preparation.keyPleadings";
import factChronology from "./matter.discovery.deposition.preparation.factChronology";
import requestForProduction from "./matter.discovery.deposition.preparation.requestForProduction";
import exhibits from "./matter.discovery.deposition.preparation.exhibits";
import affidavitStatement from "./matter.discovery.deposition.preparation.affidavitStatement";
import priorStatement from "./matter.discovery.deposition.preparation.priorStatement";

import priorExperience from "./matter.discovery.deposition.preparation.priorExperience";

import publication from "./matter.discovery.deposition.preparation.publication";
import correspondence from "./matter.discovery.deposition.preparation.correspondence";
import given from "./matter.discovery.deposition.preparation.given";
import written from "./matter.discovery.deposition.preparation.written";
import authoriative from "./matter.discovery.deposition.preparation.authoriative";
import infoAndDoc from "./matter.discovery.deposition.preparation.infoAndDoc";
import rendered from "./matter.discovery.deposition.preparation.rendered";
import invoice from "./matter.discovery.deposition.preparation.invoice";
import draft from "./matter.discovery.deposition.preparation.draft";
import testimony from "./matter.discovery.deposition.preparation.testimony";
import employment from "./matter.discovery.deposition.preparation.employment";

import expertMethod from "./matter.discovery.deposition.preparation.expertMethod";
import expertOpinion from "./matter.discovery.deposition.preparation.expertOpinion";

const state = {};
const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    keyPleadings,
    factChronology,
    requestForProduction,
    exhibits,
    affidavitStatement,
    priorStatement,

    priorExperience,
    given,
    written,
    authoriative,
    infoAndDoc,
    rendered,

    publication,
    correspondence,
    invoice,
    draft,
    testimony,
    employment,
    expertMethod,
    expertOpinion
  }
};

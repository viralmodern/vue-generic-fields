import api from "../../api/matter";
import hearing from "./matter.hearing";
import character from "./matter.character";
import location from "./matter.location";
import note from "./matter.note";
import attachment from "./matter.attachment";
import type from "./matter.type";
import discovery from "./matter.discovery";
import wishlist from "./matter.wishlist";
import document from "./matter.document";
import briefcase from "./matter.briefcase";
import citations from "./matter.citations";
import category from "./matter.category";
import partient from "./matter.partient";
import linkedCharacter from "./matter.profile.linked.character";
import strategies from "./matter.strategies";
import members from "./matter.members";
import RACI from "./matter.RACI";
import service from "./matter.service";
import digitalHowey from "./matter-digital-howey-checklist";
import plaintiff from "./matter.plaintiff";
import digitalHoweyChecklist from "./matter.digitalHoweyChecklist";
import tags from "./matter.tags";
import tag from "./matter.tag";
import labels from "./matter.labels";
import subjects from "./matter.subjects";
import issues from "./matter.issues";
import riskAreas from "./matter.riskAreas";
import riskSource from "./matter.riskSource";
import objectiontype from "./matter.objectiontype";
import goals from "./matter.goals";
import references from "./matter.references";
import source from "./matter.source";
import evidenceDeviceType from "./matter.evidenceDeviceType";
import facts from "./matter/facts";
import docket from "./matter/docket";
import meeting from "./matter/meeting";
import character2 from "./matter/character";
import evidences from "./matter/evidences";
import evidencesCustody from "./matter/evidences-custody";
import deposition from "./matter/deposition/list";
import requestStatus from "./matter/requestStatus";
import partialInfoCharacter from "./partialAllCharacters";
import privilege from "./matter/privilege";
import labelDocument from "./matter.labels.document";
import privilegeLabel from "./matter.privilegeLabel";
import risk from "./matter/risk";
import subpoena from "./matter/subpoena";
import privilegeAttorney from "./matter/privilege-attorney";
import testimony from "./matter/testimony";

import helpDesk from "./matter.helpDesk";

const state = {
  dataMatter: [],
  filterMatter: {}
};

const getters = {
  dataMatter: state => {
    const filter = Object.keys(state.filterMatter);
    const dataMatterMap = state.dataMatter.map(x => ({
      id: x.pk,
      creator: 1,
      description: x.description,
      startDate: x.start,
      endDate: x.end,
      members: x.members,
      title: x.name,
      type: 1
    }));
    if (filter.length > 0) {
      let dataMatter = dataMatterMap.slice();
      let { filterMatter } = state;
      filter.forEach(key => {
        if (Array.isArray(filterMatter[key])) {
          dataMatter = dataMatter.filter(x =>
            filterMatter[key].includes(x[key])
          );
        } else {
          if (key === "title") {
            dataMatter = dataMatter.filter(x => {
              return (
                x[key]
                  .toLowerCase()
                  .indexOf(filterMatter[key].toLowerCase()) !== -1
              );
            });
            return;
          }
          dataMatter = dataMatter.filter(x => x[key] === filterMatter[key]);
        }
      });
      return dataMatter;
    }
    return dataMatterMap;
  },
  hasFilter() {
    return Object.keys(state.filterMatter).length > 0;
  }
};

const actions = {
  async getDataMatterRequest({ commit }) {
    commit("getDataMatter", await api.getDataMatter());
  },
  async addDataMatterRequest({ commit }, data) {
    const result = await api.addDataMatter(data);
    commit("addDataMatter", result);
    return result;
  },
  filterMatterRequest({ commit }, filter) {
    commit("filterMatter", filter);
  }
};

const mutations = {
  getDataMatter(state, data) {
    state.dataMatter = data;
  },
  addDataMatter(state, data) {
    data.id = state.dataMatter.length + 1;
    state.dataMatter.unshift(data);
  },
  filterMatter(state, { name, value }) {
    state.filterMatter = JSON.parse(
      JSON.stringify({ ...state.filterMatter, [name]: value })
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    hearing,
    character,
    location,
    note,
    attachment,
    type,
    discovery,
    wishlist,
    document,
    briefcase,
    citations,
    category,
    partient,
    linkedCharacter,
    strategies,
    members,
    RACI,
    service,
    digitalHowey,
    plaintiff,
    digitalHoweyChecklist,
    tag,
    tags,
    labels,
    subjects,
    issues,
    riskAreas,
    riskSource,
    objectiontype,
    goals,
    source,
    evidenceDeviceType,
    helpDesk,
    references,
    facts,
    docket,
    meeting,
    character2,
    evidences,
    evidencesCustody,
    deposition,
    requestStatus,
    partialInfoCharacter,
    privilege,
    labelDocument,
    privilegeLabel,
    risk,
    subpoena,
    privilegeAttorney,
    testimony
  }
};

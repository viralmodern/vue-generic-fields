import moment from "moment";
import project from './project.resources.project';
import team from './project.resources.team';
const state = {
  type: 1,
  weekYear: {
    week: parseInt(moment(new Date()).format("W")),
    year: new Date().getFullYear()
  },
  monthYear: {
    month: parseInt(moment(new Date()).format("M")) - 1,
    year: new Date().getFullYear()
  },
  dayMonthYear: {
    day: new Date().getDate(),
    month: parseInt(moment(new Date()).format("M")) - 1,
    year: new Date().getFullYear()
  }
};

const getters = {
  weekYear: state => state.weekYear,
  monthYear: state => state.monthYear,
  dayMonthYear: state => state.dayMonthYear,
  startDate: state => {
    switch (state.type) {
      case 1:
        //week
        return moment()
          .year(state.weekYear.year)
          .week(state.weekYear.week)
          .startOf("isoWeek").format('YYYY-MM-DD');
      case 2:
        //month
        return moment([state.monthYear.year, state.monthYear.month, 1])
          .format('YYYY-MM-DD');
    }
  },
  endDate: (state, getters) => {
    const st = moment(getters.startDate);
    if (state.type === 1) {
      // week
      return st.add(6, 'day').format('YYYY-MM-DD');
    }
    if (state.type === 2) {
      // month
      return st.add(1, 'month').add(-1, 'day').format('YYYY-MM-DD');
    }
  },
  type: state => state.type
};

const actions = {
};

const mutations = {
  updateTimespan(state, { startDate, type }) {
    // type: 0 - day, 1 - week, 2 - month
    state.startDate = startDate;
    state.type = type;
  },
  updateWeekYear(state, { week, year }) {
    state.weekYear.week = week;
    state.weekYear.year = year;
  },
  updateMonthYear(state, { month, year }) {
    state.monthYear.month = month;
    state.monthYear.year = year;
  },
  updateDayMonthYear(state, { day, month, year }) {
    state.dayMonthYear.day = day;
    state.dayMonthYear.month = month;
    state.dayMonthYear.year = year;
  },
  updateType(state, type) {
    state.type = type;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    project,
    team
  }
};

import _ from "lodash";

export default {
  getDataAddressBook(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataAdressBook = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataAdressBook.concat(data.results);
      const results = _.uniqBy(mergeTasks, "pk"); //remove duplicates
      state.dataAdressBook = results;
      state.totals = data.count;
    }
  },
  updateAddressBook(state, data) {
    state.dataAdressBook = state.dataAdressBook.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data.body };

      }
      return x;
    });
  },
  update(state, { result }) {
    state.dataAdressBook = state.dataAdressBook.map(x => {
      if (x.pk === result.pk) {
        return { ...x, ...result };
      }
      return x;
    });
  },
  postAddressBook(state, data) {
    state.dataAdressBook.push(data);
    state.totals++;
  },
  removeAddressBook(state, pk) {
    state.dataAdressBook = state.dataAdressBook.filter(
      x => x.pk !== pk
    );
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  },
};

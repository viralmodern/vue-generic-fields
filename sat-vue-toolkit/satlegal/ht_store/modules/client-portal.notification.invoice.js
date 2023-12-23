
const state = {
    invoices: [
        {
            id: 12,
            title: "Invoice #12",
            status: "Pending"
        },
        {
            id: 13,
            title: "Invoice #13",
            status: "Done"
        },
        {
            id: 14,
            title: "Invoice #14",
            status: "Cancel"
        }]
};

const getters = {
    invoices: state => state.invoices
};

const actions = {
};

const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

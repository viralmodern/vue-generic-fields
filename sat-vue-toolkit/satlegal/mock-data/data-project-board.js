export const dataFilter = {
  filterByStatus: ["Active", "InActive"],
  filterByTaskName: ["Test", "Test 1", "Test 2"],
  filterByTaskId: ["001", "002", "003", "004"],
  filterByTaskList: [],
  filterByAssignedTo: ["Mike", "Sandra Adams", "Ali Connors"],
  filterByDueDate: [],
  filterByTaskDate: ["12/02/2019", "12/03/2019"],
  filterByCreator: ["Mike", "Sandra Adams", "Ali Connors", "Trevor Hansen"],
  filterByPriority: []
};
export const dataProjectBoard = {
  id: 1,
  status: 'active',
  creator: 'Mike',
  checkList: [
    {
      id: 2,
      type: 'public',
      name: 'Tasks for Samantha',
      totalItems: 5,
      finishedItems: 1
    },
    {
      id: 3,
      type: 'private',
      name: 'Tasks for Daniel',
      totalItems: 7,
      finishedItems: 2
    }
  ]
}

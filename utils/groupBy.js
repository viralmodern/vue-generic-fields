import _ from 'lodash'
//group by matter
export const groupByTypes = (val) =>{
  let x = []
  _.forEach(val, (i) => x = [...x, ...i.types])
  return _.uniqBy(x, 'pk')
};

export const groupByClients = (val) => {
  let x = []
  _.forEach(val, (i) => x = [...x, ...i.clients])
  return _.uniqBy(x, 'clientID')
};
export const groupByJurisdiction = (val) => {
  try {
    return val.jurisdiction.full_name
  } catch (e) {
    return 'No Jurisdiction'
  }
}

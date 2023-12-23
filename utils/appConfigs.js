import _ from 'lodash';

const choiceDescriptions = {
  'Workspace.MemberRole': {
    1: {
      description: 'Owner has access to everything.', //'owner',
      color: 'warning'
    },
    2: {
      description: 'Admin has access to everything except billing.', // 'admin',
      color: 'primary'
    },
    3: {
      description: 'Staff can manage the documentation and has rights to Publish contents.',// 'staff',
      color: 'default'
    },
    4: {
      description: 'Employee Writer can add or update articles, but cannot publish.', //'employee'
      color: 'default'
    },
  }
};
export const ROLES = {
  OWNER: 1,
  ADMIN: 2,
  STAFF: 3,
  EMPLOYEE: 4,
}
export function getChoicesWithDescriptions(choices, key) {
  return choices.find(cf => _.keys(cf)[0] === key)[key].map((choice) => {
    choice['detail'] = choiceDescriptions[key][choice.value];
    return choice;
  });
}

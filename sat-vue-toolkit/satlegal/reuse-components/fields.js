export const fields_action = [
  {
    text: '',
    align: 'left',
    sortable: false,
    value: 'drop',
    class: 'sticky_head',
    none_action: true,
    active: true,
    pos: 0
  },
  {
    text: '',
    align: 'left',
    sortable: false,
    value: 'link',
    class: 'sticky_link',
    none_action: true,
    active: true,
    pos: 1
  },
  {text: 'Actions', value: 'action', none_action: true, active: true, pos: 25} // N/A
]

export const fields = [
  {
    text: 'Name',
    align: 'left',
    sortable: true,
    value: 'name',
    class: 'sticky_name',
    active: true,
    pos: 2
  },
  {text: 'Created By ', value: 'creator', active: true, pos: 3},
  {text: 'Court District', value: 'courtID', active: true, pos: 4},
  {text: 'Members', value: 'members', active: true, pos: 5}, // N/A
  {text: 'Progress', value: 'progress', active: true, pos: 6}, // N/A
  {text: 'Docket Number', value: 'docket_number', active: true, pos: 7}, // N/A
  {text: 'Priority', value: 'priority', active: true, pos: 8}, // done
  {text: 'Lead Attorneys', value: 'lead_attorneys', active: true, pos: 9}, // N/A
  {text: 'Matter Type ', value: 'types', active: true, pos: 10},
  {text: 'Start Date', value: 'start_date', active: true, pos: 11},
  {text: 'Time Est. ', value: 'est_time', active: true, pos: 12},
  {text: 'Total Time Logged', value: 'total_time', active: true, pos: 13},
  {
    text: 'Total Billable Hours',
    value: 'total_hours',
    active: true,
    pos: 14
  }, // N/A
  {text: 'Risk Level', value: 'risk_level', active: true, pos: 15},
  {text: 'Matter Stage', value: 'stage', active: true, pos: 16},
  {text: 'Total Expense ', value: 'total_expense', active: true, pos: 17},
  {text: 'Judge', value: 'judge', active: true, pos: 18}, // N/A
  {text: 'Date Filed', value: 'date_filled', active: true, pos: 19},
  {text: 'Jury Demand', value: 'jury_demand', active: true, pos: 20},
  {text: 'Client', value: 'clients', active: true, pos: 21},
  {text: 'Activate', value: 'activate', active: true, pos: 22},
  {text: 'Next Court Date', value: 'complaints', active: true, pos: 23}, // N/A
  {text: 'Time tracking', value: 'time_tracked', active: true, pos: 24} // N/A
]
//  priority, types, risk_level, jury_demand, activate, jury_demand, jurisdiction, clients, stage
export const groupTypes = {
  priority: {
    value: 'priority',
    text: 'Priority',
    groups: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      15,
      14,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28
    ]
  },
  types: {
    value: 'types',
    text: 'Types',
    groups: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      15,
      14,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28
    ]
  },
  stage: {
    value: 'stage',
    text: 'Matter stage',
    groups: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },

  risk_level: {
    value: 'risk_level',
    text: 'Risk level',
    groups: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      15,
      14,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28
    ]
  },
  jury_demand: {
    value: 'jury_demand',
    text: 'Jury demand',
    groups: [0, true, false]
  },
  activate: {
    value: 'activate',
    text: 'Active',
    groups: [0, true, false]
  },
  jurisdiction: {
    value: 'jurisdiction',
    text: 'jurisdiction',
    groups: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      15,
      14,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28
    ]
  },
  clients: {
    value: 'clients',
    text: 'Clients',
    groups: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      15,
      14,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28
    ]
  },
  ungroup: {
    value: 'ungroup',
    text: 'None',
    groups: [0]
  }
}

export const COLORS = [
  '#FF5252',
  '#EA80FC',
  '#2196F3',
  '#B39DDB',
  '#009688',
  '#00ACC1',
  '#03A9F4',
  '#81C784',
  '#689F38',
  '#AFB42B',
  '#EEFF41',
  '#FFF176',
  '#FFC107',
  '#FF9800',
  '#795548',
  '#607D8B',
  '#9E9E9E',
  '#212121'
]

export const ALL_CAF = [
  //  todo: default
  {
    text: 'Search',
    path: 'Search',
    color: COLORS[10],
    activate: true,
    caf_type: 'default'
  },
  {
    text: 'Notifications',
    path: 'Search',
    color: COLORS[4],
    activate: true,
    caf_type: 'default'
  },
  {
    text: 'Case Cover',
    path: 'Case Cover',
    color: COLORS[9],
    activate: true,
    caf_type: 'default'
  },
  {
    text: 'Reminders',
    path: 'Reminders',
    color: COLORS[9],
    activate: true,
    caf_type: 'default'
  },
  {
    text: 'Bookmarks',
    path: 'Bookmarks',
    color: COLORS[9],
    activate: true,
    caf_type: 'default'
  },
  {
    text: 'Calendar',
    path: 'Bookmarks',
    color: COLORS[9],
    activate: true,
    caf_type: 'default'
  },

  //  todo: Case Investigation
  {
    text: 'Investigation Case Management',
    path: 'Investigation Case Management',
    featured: true,
    color: COLORS[1],
    caf_type: 'Case Investigation'
  },
  {
    text: 'Simple Taskboard',
    path: 'Simple Taskboard',
    color: COLORS[2],
    activate: true,
    caf_type: 'Case Investigation'
  },
  {
    text: 'Simple Calendar',
    path: 'Simple Calendar',
    color: COLORS[3],
    featured: true,
    activate: true,
    caf_type: 'Case Investigation'
  },
  {
    text: 'Simple Timeline',
    path: 'Simple Timeline',
    color: COLORS[4],
    activate: true,
    caf_type: 'Case Investigation'
  },
  // todo: Pleadings
  {
    text: 'Simple Docket',
    path: 'Simple Docket',
    color: COLORS[5],
    caf_type: 'Pleadings'
  },
  {
    text: 'Advanced Docket',
    path: 'Advanced Docket',
    color: COLORS[6],
    featured: true,
    caf_type: 'Pleadings'
  },
  {
    text: 'Complaint Analysis',
    path: 'Order Management',
    color: COLORS[7],
    caf_type: 'Pleadings'
  },
  {
    text: 'Motion',
    path: 'Motion',
    color: COLORS[8],
    caf_type: 'Pleadings'
  },
  {
    text: 'Exhibit Logs',
    path: 'Exhibit Logs',
    featured: true,
    color: COLORS[9],
    caf_type: 'Pleadings'
  },
  {
    text: 'Characters',
    path: 'Characters',
    color: COLORS[10],
    caf_type: 'Pleadings'
  },
  // todo: Pretrials
  {
    text: 'Evidences',
    path: 'Evidences',
    color: COLORS[11],
    caf_type: 'Pretrials'
  },
  {
    text: 'Hearsay',
    path: 'Hearsay',
    color: COLORS[12],
    caf_type: 'Pretrials'
  },
  {
    text: 'Testimony',
    path: 'Testimony',
    color: COLORS[13],
    caf_type: 'Pretrials'
  },
  {
    text: 'Factual Analysis',
    path: 'Factual Analysis',
    color: COLORS[14],
    caf_type: 'Pretrials'
  },
  {
    text: 'Legal Analysis (Citations)',
    path: 'Legal Analysis (Citations)',
    color: COLORS[15],
    caf_type: 'Pretrials'
  },
  {
    text: 'Request of Production',
    path: 'Request of Production',
    color: COLORS[16],
    caf_type: 'Pretrials'
  },
  {
    text: 'Request of Admission',
    path: 'Request of Admission',
    color: COLORS[17],
    caf_type: 'Pretrials'
  },
  {
    text: 'Interrogatories',
    path: 'Interrogatories',
    color: COLORS[1],
    featured: true,
    caf_type: 'Pretrials'
  },
  {
    text: 'Privilege Log',
    path: 'Privilege Log',
    color: COLORS[2],
    caf_type: 'Pretrials'
  },
  {
    text: 'Deposition Management',
    path: 'Deposition Management',
    color: COLORS[3],
    caf_type: 'Pretrials'
  },
  {
    text: 'Expert Witness',
    path: '',
    color: COLORS[4],
    caf_type: 'Pretrials'
  },
  {
    text: 'Subpoena Management',
    path: '',
    color: COLORS[5],
    caf_type: 'Pretrials'
  },
  {
    text: 'Discovery Request Status',
    path: '',
    color: COLORS[6],
    caf_type: 'Pretrials'
  },
  {
    text: 'Discovery Protocol',
    path: '',
    color: COLORS[7],
    caf_type: 'Pretrials'
  },
  // todo: Document Management
  {
    text: 'Disclosure Folder',
    path: '',
    color: COLORS[8],
    caf_type: 'Document Management'
  },
  {
    text: 'DMS - Docs Available to Opposing Counsel',
    path: '',
    featured: true,
    color: COLORS[1],
    caf_type: 'Document Management'
  },
  {
    text: 'DMS - Docs Production Received from Opposing Counsel',
    path: '',
    color: COLORS[9],
    caf_type: 'Document Management'
  },
  {
    text: 'DMS - All upload attachments',
    path: '',
    color: COLORS[17],
    caf_type: 'Document Management'
  },

  // todo: Trials
  {
    text: 'Jury Selection',
    path: '',
    color: COLORS[8],
    caf_type: 'Trials'
  },
  {
    text: 'Opening Statements',
    path: '',
    color: COLORS[9],
    caf_type: 'Trials'
  },
  {
    text: 'Plaintiff Evidence Presentation',
    path: '',
    color: COLORS[10],
    caf_type: 'Trials'
  },
  {
    text: 'Witness Direct Examination',
    path: '',
    color: COLORS[11],
    caf_type: 'Trials'
  },
  {
    text: 'Witness Cross Examination',
    path: '',
    featured: true,
    color: COLORS[12],
    caf_type: 'Trials'
  },
  {
    text: 'Plaintiff Rebuttals',
    path: '',
    color: COLORS[13],
    caf_type: 'Trials'
  },
  {
    text: 'Defendant Evidence Presentation',
    path: '',
    color: COLORS[14],
    caf_type: 'Trials'
  },
  {
    text: 'Closing Arguments',
    path: '',
    color: COLORS[15],
    caf_type: 'Trials'
  },
  // todo: Case Managements
  {
    text: 'Project Management',
    path: 'Project Management',
    color: COLORS[1],
    caf_type: 'Case Managements'
  },
  {
    text: 'Time Tracking',
    path: 'Time Tracking',
    activate: true,
    color: COLORS[2],
    caf_type: 'Case Managements'
  },
  {
    text: 'Billing',
    path: 'Billing',
    color: COLORS[3],
    caf_type: 'Case Managements'
  },
  {
    text: 'Resource Management',
    path: 'Resource Management',
    color: COLORS[4],
    featured: true,
    caf_type: 'Case Managements'
  },
  {
    text: 'Contact List',
    path: 'Contact List',
    color: COLORS[5],
    caf_type: 'Case Managements'
  },
  {
    text: 'Discussion',
    path: 'Discussion',
    color: COLORS[6],
    caf_type: 'Case Managements'
  },
  {
    text: 'Case Miscs',
    path: 'Case Miscs',
    color: COLORS[7],
    caf_type: 'Case Managements'
  },
  {
    text: 'Expense Entries',
    path: 'Expense Entries',
    color: COLORS[8],
    activate: true,
    caf_type: 'Case Managements'
  },
  // todo: Settlements
  {
    text: 'Decision Analysis',
    path: '',
    color: COLORS[16],
    caf_type: 'Settlements'
  },

  // todo: Appeals
  {
    text: 'coming soon 2',
    path: '',
    color: COLORS[16],
    caf_type: 'Appeals'
  },
  // todo: Document Request
  {
    text: 'coming soon 1',
    path: '',
    color: COLORS[16],
    caf_type: 'Document Request'
  },
  // todo: Risk Management
  {
    text: 'coming soon 3',
    path: '',
    color: COLORS[16],
    caf_type: 'Risk Management'
  }
]
export const countAllCaf = (list) => {
  let count = 0
  list.forEach((l) => {
    count += l.children.length
  })
  return count
}

export const ACTIVITIES_CODE = [
  {
    code: 'A101',
    text: 'Plan and prepare for'
  },
  {
    code: 'A102',
    text: 'Research'
  },
  {
    code: 'A103',
    text: 'Draft/revise'
  },
  {
    code: 'A104',
    text: 'Review/analyze'
  },
  {
    code: 'A105',
    text: 'Communicate (in firm)'
  },
  {
    code: 'A106',
    text: 'Communicate (with client)'
  },
  {
    code: 'A107',
    text: 'Communicate (other outside counsel)'
  },
  {
    code: 'A108',
    text: 'Communicate (other external)'
  },
  {
    code: 'A109',
    text: 'Appear for/attend'
  },
  {
    code: 'A110',
    text: 'Manage data/files'
  },
  {
    code: 'A111',
    text: 'Other'
  }
]
export const getCodeFields = ({code, list}) => {
  try {
    // console.log('getActivitiesCode',list.find(ac => ac.code === code))
    return list.find((ac) => ac.code === code) || {text: 'N/A'}
  } catch (e) {
    return false
  }
}
export const getCodeFieldsTree = ({code, list}) => {
  try {
    let TreeModel = require('tree-model')
    let tree = new TreeModel()
    let root = tree.parse({id: 7489, children: list})
    return root.all(function (node) {
      return node.model.id === code
    })
  } catch (e) {
    return []
  }
}

export const EXPENSES_CODE = [
  {
    code: 'E101',
    text: 'Copying'
  },
  {
    code: 'E102',
    text: 'Outside printing'
  },
  {
    code: 'E103',
    text: 'Word processing'
  },
  {
    code: 'E104',
    text: 'Facsimile'
  },
  {
    code: 'E105',
    text: 'Telephone'
  },
  {
    code: 'E106',
    text: 'Online research'
  },
  {
    code: 'E107',
    text: 'Delivery services/messengers'
  },
  {
    code: 'E108',
    text: 'Postage'
  },
  {
    code: 'E109',
    text: 'Local travel'
  },
  {
    code: 'E110',
    text: 'Out-of-town travel'
  },
  {
    code: 'E111',
    text: 'Meals'
  },
  {
    code: 'E112',
    text: 'Court fees'
  },
  {
    code: 'E113',
    text: 'Subpoena fees'
  },
  {
    code: 'E114',
    text: 'Witness fees'
  },
  {
    code: 'E115',
    text: 'Deposition transcripts'
  },
  {
    code: 'E116',
    text: 'Trial transcripts'
  },
  {
    code: 'E117',
    text: 'Litigation support vendors'
  },
  {
    code: 'E118',
    text: 'Litigation support vendors'
  },
  {
    code: 'E119',
    text: 'Experts'
  },
  {
    code: 'E120',
    text: 'Private investigators'
  },
  {
    code: 'E121',
    text: 'Arbitrators/mediators'
  },
  {
    code: 'E122',
    text: 'Local counsel'
  },
  {
    code: 'E123',
    text: 'Other professionals'
  },
  {
    code: 'E124',
    text: 'Other'
  }
]

export const TAX = [
  {
    code: '0',
    text: 'No Tax'
  },
  {
    code: '5',
    text: '5.00%'
  },
  {
    code: '10',
    text: '10.00%'
  },
  {
    code: '18',
    text: '18.00%'
  }
]

export const PAID_STATUS = [
  {text: 'Disputed', color: 'warning', code: 1},
  {text: 'Unpaid', color: 'cyan', code: 2},
  {text: 'Paid', color: 'primary', code: 3},
  {text: 'N/A', color: '#000000', code: 0}
]
export const BILLABLE = [
  {text: 'Recurring', color: 'warning', code: 1},
  {text: 'Not-invoiced', color: 'cyan', code: 2},
  {text: 'Invoiced', color: 'primary', code: 3},
  {text: 'Non-billable', color: 'indigo', code: 4},
  {text: 'Billable', color: 'success', code: 5},
  {text: 'N/A', color: '#000000', code: 0}
]
export const LITIGATION_CODE = [
  {
    id: 'L100',
    name: 'L100 Case Assessment, Development and Administration',
    children: [
      {
        id: 'L110',
        value: 'L110',
        name: 'L110 Fact Investigation/Development'
      },
      {
        id: 'L120',
        value: 'L120',
        name: 'L120 Analysis/Strategy'
      },
      {
        id: 'L130',
        value: 'L130',
        name: 'L130 Experts/Consultants'
      },
      {
        id: 'L140',
        value: 'L140',
        name: 'L140 Document/File Management'
      },
      {
        id: 'L150',
        value: 'L150',
        name: 'L150 Budgeting'
      },
      {
        id: 'L160',
        value: 'L160',
        name: 'L160 Settlement/Non-Binding ADR'
      },
      {
        id: 'L190',
        value: 'L190',
        name: 'L190 Other Case Assessment, Development and Administration'
      }
    ]
  },
  {
    id: 'L200',
    name: 'L200 Pre-Trial Pleadings and Motions',
    children: [
      {
        id: 'L210',
        name: 'L210 Pleading'
      },
      {
        id: 'L220',
        name: 'L220 Preliminary Injunctions/Provisional Remedies'
      },
      {
        id: 'L230',
        name: 'L230 Court Mandated Conferences'
      },
      {
        id: 'L240',
        name: 'L240 Dispositive Motions'
      },
      {
        id: 'L250',
        name: 'L250 Other Written Motions and Submissions'
      },
      {
        id: 'L260',
        name: 'L260 Class Action Certification and Notice'
      }
    ]
  },
  {
    id: 'L300',
    name: 'L300 Discovery',
    children: [
      {
        id: 'L310',
        name: 'L310 Written Discovery'
      },
      {
        id: 'L320',
        name: 'L320 Document Production'
      },
      {
        id: 'L330',
        name: 'L330 Depositions'
      },
      {
        id: 'L340',
        name: 'L340 Expert Discovery'
      },
      {
        id: 'L350',
        name: 'L350 Discovery Motions'
      },
      {
        id: 'L390',
        name: 'L390 Other Discovery'
      }
    ]
  },
  {
    id: 'L400',
    name: 'L400 Trial Preparation and Trial',
    children: [
      {
        id: 'L410',
        name: 'L410 Fact Witnesses'
      },
      {
        id: 'L420',
        name: 'L420 Expert Witnesses'
      },
      {
        id: 'L430',
        name: 'L430 Written Motions and Submissions'
      },

      {
        id: 'L440',
        name: 'L440 Other Trial Preparation and Support'
      },
      {
        id: 'L450',
        name: 'L450 Trial and Hearing Attendance'
      },
      {
        id: 'L460',
        name: 'L460 Post-Trial Motions and Submissions'
      },
      {
        id: 'L470',
        name: 'L470 Enforcement'
      }
    ]
  },
  {
    id: 'L500',
    name: 'L500 Appeal',
    children: [
      {
        id: 'L510',
        name: 'L510 Appellate Motions and Submissions'
      },
      {
        id: 'L520',
        name: 'L520 Appellate Briefs'
      },
      {
        id: 'L530',
        name: 'L530 Oral Argument'
      }
    ]
  }
]

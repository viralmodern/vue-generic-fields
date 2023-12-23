export const appConfigs = {
  expenseCategory: [
    {
      id: 1,
      label: "Copying",
      code: "E101"
    },
    {
      id: 2,
      label: "Outside printing",
      code: "E102"
    },
    {
      id: 3,
      label: "Word processing",
      code: "E103"
    },
    {
      id: 4,
      label: "Facsimile",
      code: "E104"
    },
    {
      id: 5,
      label: "Telephone",
      code: "E105"
    },
    {
      id: 6,
      label: "Online research",
      code: "E106"
    },
    {
      id: 7,
      label: "Delivery services/messengers",
      code: "E107"
    },
    {
      id: 8,
      label: "Postage",
      code: "E108"
    },
    {
      id: 9,
      label: "Local travel",
      code: "E109"
    },
    {
      id: 10,
      label: "Out-of-town travel",
      code: "E110"
    },
    {
      id: 11,
      label: "Meals",
      code: "E111"
    },
    {
      id: 12,
      label: "Courtfees",
      code: "E112"
    },
    {
      id: 13,
      label: "Subpoena fees",
      code: "E113"
    },
    {
      id: 14,
      label: "Witness fees",
      code: "E114"
    },
    {
      id: 15,
      label: "Deposition transcripts",
      code: "E115"
    },
    {
      id: 16,
      label: "Trial transcripts",
      code: "E116"
    },
    {
      id: 17,
      label: "Trial exhibits",
      code: "E117"
    },
    {
      id: 18,
      label: "Litigation support vendors",
      code: "E118"
    },
    {
      id: 19,
      label: "Experts",
      code: "E119"
    },
    {
      id: 20,
      label: "Private investigators",
      code: "E120"
    },
    {
      id: 21,
      label: "Arbitrators/mediators",
      code: "E121"
    },
    {
      id: 22,
      label: "Local counsel",
      code: "E122"
    },
    {
      id: 23,
      label: "Other professionals",
      code: "E123"
    },
    {
      id: 24,
      label: "Other",
      code: "E124"
    }
  ],
  evidenceType: [
    {
      value: 1,
      name: "Evidences"
    },
    {
      value: 2,
      name: "Hearsay"
    },
    {
      value: 3,
      name: "Testimony"
    }
  ],
  RACI: [
    {
      value: 1,
      name: "Responsible",
      color: "#ccd43f"
    },
    {
      value: 2,
      name: "Accountable",
      color: "#3b57a5"
    },
    {
      value: 3,
      name: "Consulted",
      color: "#327e5a"
    },
    {
      value: 4,
      name: "Informed",
      color: "#ca3019"
    }
  ],
  symptomType: [
    { value: 1, name: "Symptom Absent", color: "grey" },
    { value: 2, name: "Symptom Mild", color: "lime" },
    { value: 3, name: "Symtom Severe", color: "red" }
  ],
  requestType: [
    { value: 1, name: "Request of Production", color: "#673AB7" },
    { value: 2, name: "Request of Admission", color: "#009688" },
    { value: 3, name: "Set of Interrogatory", color: "#2196F3" }
  ],

  listPriority: [
    { value: 1, name: "very low", color: "#673AB7" },
    { value: 2, name: "low", color: "#009688" },
    { value: 3, name: "normal", color: "#2196F3" },
    { value: 4, name: "high", color: "#EA80FC" },
    { value: 5, name: "very high", color: "#D500F9" }
  ],

  responseStatus: [
    { value: 1, name: "awaiting response", color: "#673AB7" },
    { value: 2, name: "received response", color: "#009688" },
    { value: 3, name: "analyzing response", color: "#2196F3" },
    { value: 4, name: "disputing response", color: "#EA80FC" },
    { value: 5, name: "done response", color: "#D500F9" },
    { value: 6, name: "in-progress response", color: "#80DEEA" },
    { value: 7, name: "objected response", color: "#E1BEE7" }
  ],

  requestStatus: [
    { value: 1, name: "new request", color: "#673AB7" },
    { value: 2, name: "disputing request", color: "#009688" },
    { value: 3, name: "received request", color: "#2196F3" },
    { value: 4, name: "in-progress request", color: "#EA80FC" },
    { value: 5, name: "done request", color: "#D500F9" },
    { value: 6, name: "awaiting request", color: "#80DEEA" },
    { value: 7, name: "objected request", color: "#E1BEE7" }
  ],

  responseContentType: [
    { value: 1, name: "Admit", color: "#673AB7" },
    { value: 2, name: "Deny", color: "#009688" },
    { value: 3, name: "Objected", color: "#2196F3" }
  ],
  litigationType: [
    {
      id: 1,
      code: "L100",
      title: "Case Assessment, Development and Administration"
    },
    {
      id: 2,
      code: "L200",
      title: " Pre-Trial Pleadings and Motions"
    },
    {
      id: 3,
      code: "L300",
      title: " Discovery"
    },
    {
      id: 4,
      code: "L400",
      title: " Trial Preparation and Trial"
    },
    {
      id: 5,
      code: "L500",
      title: " Appeal"
    }
  ],

  litigationCode: [
    {
      id: 1,
      code: "L100",
      name: " Case Assessment, Development and Administration",
      type: 1,
      keyName: "litigation"
    },
    {
      id: 2,
      code: "L110",
      name: " Fact Investigation/Development",
      type: 1,
      keyName: "litigation"
    },
    {
      id: 3,
      code: "L120",
      name: " Analysis/Strategy",
      type: 1,
      keyName: "litigation"
    },
    {
      id: 4,
      code: "L130",
      name: " Experts/Consultants",
      type: 1,
      keyName: "litigation"
    },
    {
      id: 5,
      code: "L140",
      name: " Document/File Management",
      type: 1,
      keyName: "litigation"
    },
    {
      id: 6,
      code: "L150",
      name: " Budgeting",
      type: 1,
      keyName: "litigation"
    },
    {
      id: 7,
      code: "L160",
      name: " Settlement/Non-Binding ADR",
      type: 1,
      keyName: "litigation"
    },
    {
      id: 8,
      code: "L190",
      name: " Other Case Assessment, Development and Administration",
      type: 1,
      keyName: "litigation"
    },
    {
      id: 9,
      code: "L210",
      name: " Pleading",
      type: 2,
      keyName: "litigation"
    },
    {
      id: 10,
      code: "L220",
      name: " Preliminary Injunctions/Provisional Remedies",
      type: 2,
      keyName: "litigation"
    },
    {
      id: 11,
      code: "L230",
      name: " Court Mandated Conferences",
      type: 2,
      keyName: "litigation"
    },
    {
      id: 12,
      code: "L240",
      name: " Dispositive Motions",
      type: 2,
      keyName: "litigation"
    },
    {
      id: 13,
      code: "L250",
      name: " Other Written Motions and Submissions",
      type: 2,
      keyName: "litigation"
    },
    {
      id: 14,
      code: "L260",
      name: " Class Action Certification and Notice",
      type: 2,
      keyName: "litigation"
    },

    {
      id: 15,
      code: "L310",
      name: " Written Discovery",
      type: 3,
      keyName: "litigation"
    },
    {
      id: 16,
      code: "L320",
      name: " Document Production",
      type: 3,
      keyName: "litigation"
    },
    {
      id: 17,
      code: "L330",
      name: " Depositions",
      type: 3,
      keyName: "litigation"
    },
    {
      id: 18,
      code: "L340",
      name: " Expert Discovery",
      type: 3,
      keyName: "litigation"
    },
    {
      id: 19,
      code: "L350",
      name: " Discovery Motions",
      type: 3,
      keyName: "litigation"
    },
    {
      id: 20,
      code: "L390",
      name: " Other Discovery",
      type: 3,
      keyName: "litigation"
    },

    {
      id: 21,
      code: "L410",
      name: " Fact Witnesses",
      type: 4,
      keyName: "litigation"
    },
    {
      id: 22,
      code: "L420",
      name: " Expert Witnesses",
      type: 4,
      keyName: "litigation"
    },
    {
      id: 23,
      code: "L430",
      name: " Written Motions and Submissions",
      type: 4,
      keyName: "litigation"
    },
    {
      id: 24,
      code: "L440",
      name: " Other Trial Preparation and Support",
      type: 4,
      keyName: "litigation"
    },
    {
      id: 25,
      code: "L450",
      name: " Trial and Hearing Attendance",
      type: 4,
      keyName: "litigation"
    },
    {
      id: 26,
      code: "L460",
      name: " Post-Trial Motions and Submissions",
      type: 4,
      keyName: "litigation"
    },
    {
      id: 27,
      code: "L470",
      name: " Enforcement",
      type: 4,
      keyName: "litigation"
    }
  ],

  activitiesCode: [
    {
      id: 1,
      code: "A101",
      name: " Plan and prepare for",
      keyName: "activities"
    },
    {
      id: 2,
      code: "A102",
      name: " Research",
      keyName: "activities"
    },
    {
      id: 3,
      code: "A103",
      name: " Draft/revise",
      keyName: "activities"
    },
    {
      id: 4,
      code: "A104",
      name: " Review/analyze",
      keyName: "activities"
    },
    {
      id: 5,
      code: "A105",
      name: " Communicate (in firm)",
      keyName: "activities"
    },
    {
      id: 6,
      code: "A106",
      name: " Communicate (with client)",
      keyName: "activities"
    },
    {
      id: 7,
      code: "A107",
      name: " Communicate (other outside counsel)",
      keyName: "activities"
    },
    {
      id: 8,
      code: "A108",
      name: " Communicate (other external)",
      keyName: "activities"
    },
    {
      id: 9,
      code: "A109",
      name: " Appear for/attend",
      keyName: "activities"
    },
    {
      id: 10,
      code: "A110",
      name: " Manage data/files",
      keyName: "activities"
    },
    {
      id: 11,
      code: "A111",
      name: " Other",
      keyName: "activities"
    }
  ],

  expenseCode: [
    {
      id: 1,
      code: "E101",
      title: " Copying"
    },
    {
      id: 2,
      code: "E102",
      title: " Outside printing"
    },
    {
      id: 3,
      code: "E103",
      title: " Word processing"
    },
    {
      id: 4,
      code: "E104",
      title: " Facsimile"
    },
    {
      id: 5,
      code: "E105",
      title: " Telephone"
    },
    {
      id: 6,
      code: "E106",
      title: " Online research"
    },
    {
      id: 7,
      code: "E107",
      title: " Delivery services/messengers"
    },
    {
      id: 8,
      code: "E108",
      title: " Postage"
    },
    {
      id: 9,
      code: "E109",
      title: " Local travel"
    },
    {
      id: 10,
      code: "E110",
      title: " Out-of-town travel"
    },
    {
      id: 11,
      code: "E111",
      title: " Meals"
    },
    {
      id: 12,
      code: "E112",
      title: " Court fees"
    },
    {
      id: 13,
      code: "E113",
      title: " Subpoena fees"
    },
    {
      id: 14,
      code: "E114",
      title: " Witness fees"
    },
    {
      id: 15,
      code: "E115",
      title: " Deposition transcripts"
    },
    {
      id: 16,
      code: "E116",
      title: " Trial transcripts"
    },
    {
      id: 17,
      code: "E117",
      title: " Trial exhibits"
    },
    {
      id: 18,
      code: "E118",
      title: " Litigation support vendors"
    },
    {
      id: 19,
      code: "E119",
      title: " Experts"
    },
    {
      id: 20,
      code: "E120",
      title: " Private investigators"
    },
    {
      id: 21,
      code: "E121",
      title: " Arbitrators/mediators"
    },
    {
      id: 22,
      code: "E122",
      title: " Local counsel"
    },
    {
      id: 23,
      code: "E123",
      title: " Other professionals"
    },
    {
      id: 24,
      code: "E124",
      title: " Other"
    }
  ],
  taskStatus: [
    {
      value: 1,
      name: "new",
      color: "#8BC34A"
    },
    {
      value: 2,
      name: "in-progress",
      color: "#0091EA"
    },
    {
      value: 3,
      name: "done",
      color: "#FF5722"
    }
  ],
  deponentType: [
    {
      value: 1,
      name: "Plaintiff",
      color: "#8BC34A"
    },
    {
      value: 2,
      name: "Defendant",
      color: "#0091EA"
    },
    {
      value: 3,
      name: "Non-party Witness",
      color: "#FF5722"
    },
    {
      value: 4,
      name: "Expert Witness",
      color: "#E1BEE7"
    }
  ],
  destroyedType: [
    {
      value: null,
      name: "N/A",
      color: "#8BC34A"
    },
    {
      value: 1,
      name: "Destroyed before subpoena",
      color: "#0091EA"
    },
    {
      value: 2,
      name: "Destroyed after subpoena",
      color: "#FF5722"
    },
    {
      value: 3,
      name: "Available but unlocated",
      color: "#E1BEE7"
    }
  ],
  factTypes: [
    {
      id: 1,
      name: "Ultimate",
      color: "#8BC34A"
    },
    {
      id: 2,
      name: "Evidentiary",
      color: "#0091EA"
    }
  ],
  favorableType: [
    {
      value: 1,
      name: "Ultimate",
      color: "#8BC34A"
    },
    {
      value: 2,
      name: "Evidentiary",
      color: "#0091EA"
    }
  ],
  typeReferences: [
    {
      value: 1,
      name: "Publication",
      color: "#8BC34A"
    },
    {
      value: 2,
      name: "Research",
      color: "#0091EA"
    },
    {
      value: 3,
      name: "Peer review",
      color: "#AA0000"
    },
    {
      value: 4,
      name: "Misc",
      color: "#FFFF33"
    }
  ],
  depositionMethod: [
    {
      value: 1,
      name: "Videotaped",
      color: "#0091EA"
    },
    {
      value: 2,
      name: "Audio",
      color: "#FF5722"
    },
    {
      value: 3,
      name: "Telephone",
      color: "#009688"
    },
    {
      value: 4,
      name: "Videoconference",
      color: "#CDDC39"
    }
  ],
  depositionPriority: [
    {
      value: 1,
      name: "No automatic priority",
      color: "#0091EA"
    },
    {
      value: 2,
      name: "Scheduling order may be available ",
      color: "#FF5722"
    },
    {
      value: 3,
      name: "Local custom and rule ",
      color: "#009688"
    },
  ],
  itemStatus: [
    {
      id: 1,
      name: "Open",
      color: "success",
      icon: "open_in_new",
      keyName: "status"
    },
    {
      id: 2,
      name: "In Progress",
      color: "primary",
      icon: "amp_stories",
      keyName: "status"
    },
    { id: 3, name: "Closed", color: "error", icon: "cancel", keyName: "status" }
  ],
  factType: [
    {
      id: 0,
      name: "N/A",
      color: "grey"
    },
    {
      id: 1,
      name: "Client-related",
      color: "warning"
    },
    {
      id: 2,
      name: "Matter-related",
      color: "yellow"
    },
    {
      id: 3,
      name: "Firm-related",
      color: "success"
    }
  ],
  level: [
    {
      id: 1,
      name: "Very low",
      color: "warning"
    },
    {
      id: 2,
      name: "Low",
      color: "yellow"
    },
    {
      id: 3,
      name: "Normal",
      color: "success"
    },
    {
      id: 4,
      name: "High",
      color: "primary"
    },
    {
      id: 5,
      name: "Very high",
      color: "red"
    }
  ],
  factBolean: [
    {
      id: true,
      name: "Yes",
      color: "success"
    },
    {
      id: false,
      name: "No",
      color: "grey"
    }
  ],
  favorableFact: [
    {
      id: 1,
      name: "Plaintiff",
      color: "red"
    },
    {
      id: 2,
      name: "Defendant",
      color: "green"
    },
    {
      id: 3,
      name: "Non-parties",
      color: "primary"
    }
  ],
  position: [
    {
      id: 1,
      name: "Adverse",
      color: "warning"
    },
    {
      id: 2,
      name: "Hostile independent",
      color: "yellow"
    },
    {
      id: 3,
      name: "Neutral",
      color: "success"
    },
    {
      id: 4,
      name: "Friendly",
      color: "primary"
    },
    {
      id: 5,
      name: "Opposing",
      color: "red"
    }
  ],
  located: [
    {
      id: 1,
      name: "Located",
      color: "warning"
    },
    {
      id: 2,
      name: "Unable to Locate",
      color: "yellow"
    }
  ],
  availablility: [
    {
      id: 1,
      name: "Destroyed before subpoena",
      color: "warning"
    },
    {
      id: 2,
      name: "Destroyed after subpoena",
      color: "yellow"
    },
    {
      id: 3,
      name: "Available but unlocated",
      color: "green"
    }
  ],
  action_status: [
    {
      id: 1,
      name: "New",
      color: "warning"
    },
    {
      id: 2,
      name: "In Progress",
      color: "blue"
    },
    {
      id: 3,
      name: "Closed",
      color: "red"
    }
  ],
  served: [
    {
      id: 1,
      name: "Unable to Serve",
      color: "warning"
    },
    {
      id: 2,
      name: "Served",
      color: "yellow"
    }
  ],
  favorableEvidences: [
    {
      id: 1,
      name: "Plaintiff",
      color: "red"
    },
    {
      id: 2,
      name: "Defendant",
      color: "green"
    },
    {
      id: 3,
      name: "Non-parties",
      color: "primary"
    }
  ],
  whoWin: [
    {
      id: 1,
      name: "Plaintiff",
      color: "red"
    },
    {
      id: 2,
      name: "Defendant",
      color: "green"
    },
  ],
  disputed: [
    {
      id: "False",
      name: "No",
    },
    {
      id: "True",
      name: "Yes",
    },
  ],
  docketDocument: [
    { id: null, name: "N/A", color: "grey" },
    { id: 1, name: "Main Document", color: "green" },
    { id: 2, name: "Attachment", color: "blue" }
  ],
  typeDocket: [
    { id: 1, name: "Motion", color: "orange" },
    { id: 2, name: "Order", color: "red" },
    { id: 3, name: "Notice", color: "green" },
    { id: 4, name: "Certificate", color: "blue" },
    { id: null, name: "N/A", color: "grey" }
  ],
  docketEntryByField: [
    { id: null, name: "N/A", color: "grey" },
    { id: 1, name: "Court Order", color: "green" },
    { id: 2, name: "Defendant", color: "blue" },
    { id: 3, name: "Plaintiff", color: "red" }
  ],
  characterType: [
    {
      id: 1,
      name: "Expert witness",
      color: "orange"
    },
    {
      id: 2,
      name: "Fact witness",
      color: "#FF5722"
    },
    {
      id: 3,
      name: "Plaintiff",
      color: "#D4E157"
    },
    {
      id: 4,
      name: "Plaintiff counsel",
      color: "success"
    },
    {
      id: 5,
      name: "Defendant counsel",
      color: "primary"
    },
    {
      id: 6,
      name: "Defendant",
      color: "red"
    }
  ],
  priority: [
    { id: 1, name: "Very urgent", color: 'teal' },
    { id: 2, name: "Urgent", color: 'orange' },
    { id: 3, name: "Normal", color: 'primary' },
    { id: 4, name: "Low Priority", color: 'cyan' }
  ],
  type: [
    { id: 1, name: "Client-Related", color: 'indigo' },
    { id: 2, name: "Matter-Related", color: 'blue' },
    { id: 3, name: "Firm-Related", color: 'deep-purple' }
  ],
  status: [
    { id: 1, name: "In Meeting", color: 'purple' },
    { id: 2, name: "Cancelled ", color: 'pink' },
    { id: 3, name: "Active", color: 'red' }
  ],
  potential_consequence: [
    { id: 1, name: "No Significant", color: 'teal' },
    { id: 2, name: "Minor", color: 'amber' },
    { id: 3, name: "Moderate", color: 'blue-grey' },
    { id: 4, name: "Major", color: 'orange darken-3' },
    { id: 5, name: "Servere", color: 'green accent-4' }
  ],
  likelihood: [
    { id: 1, name: "Rare", color: 'pink darken-1' },
    { id: 2, name: "Unlikely", color: 'purple darken-3' },
    { id: 3, name: "Possible", color: 'red accent-2' },
    { id: 4, name: "Likely", color: 'blue' },
    { id: 5, name: "Almost Certain", color: 'cyan' }
  ],
  severity: [
    { id: 1, name: "Neglible", color: 'green accent-4' },
    { id: 2, name: "Manageable", color: 'blue-grey darken-1' },
    { id: 3, name: "Medium", color: 'red accent-2' },
    { id: 4, name: "Critical", color: 'deep-orange darken-1' },
    { id: 5, name: "Catastrophic", color: 'yellow accent-2' }
  ],
  priority_risk: [
    { id: 1, name: "Very Low", color: 'red darken-1' },
    { id: 2, name: "Low", color: 'blue' },
    { id: 3, name: "Normal", color: 'cyan' },
    { id: 4, name: "High", color: 'pink accent-2' },
    { id: 5, name: "Very High", color: 'deep-orange' }
  ],
  status_risk: [
    { id: 1, name: "Active", color: 'pink' },
    { id: 2, name: "Observed", color: 'blue' },
    { id: 3, name: "Monitoring", color: 'red' },
    { id: 4, name: "Closed", color: 'grey darken-2' },
  ],
  who_at_risk: [
    { id: 1, name: "Plaintiff", color: 'deep-orange' },
    { id: 2, name: "Defendant", color: 'brown' },
    { id: 3, name: "No-Parties", color: 'blue-grey' },
    { id: 4, name: "Law Firm", color: 'amber' },
    { id: 5, name: "Opponent Counsel", color: 'green' },
  ],
  level_risk: [
    { id: 1, name: "Very low", color: "warning" },
    { id: 2, name: "Low", color: "yellow" },
    { id: 3, name: "Normal", color: "success" },
    { id: 4, name: "High", color: "primary" },
    { id: 5, name: "Very high", color: "red" }
  ],
  direction: [
    { id: 1, name: "Decreasing", color: 'blue darken-4' },
    { id: 2, name: "Increasing", color: 'brown' },
    { id: 3, name: "Stable", color: 'light-blue ' },
  ],
  frequency: [
    { id: 1, name: "Hourly", color: 'blue darken-4' },
    { id: 2, name: "Daily", color: 'light-green accent-2' },
    { id: 3, name: "Weekly", color: 'lime darken-4' },
    { id: 4, name: "Monthly", color: 'green darken-4' },
    { id: 5, name: "Quarterly", color: 'amber' },
    { id: 6, name: "Annually", color: 'orange' },
  ],
  detectability: [
    { id: 1, name: "Very low", color: "warning" },
    { id: 2, name: "Low", color: "yellow" },
    { id: 3, name: "Normal", color: "success" },
    { id: 4, name: "High", color: "primary" },
    { id: 5, name: "Very high", color: "red" }
  ],
  criticality: [
    { id: 1, name: "Seriousness Unknown", color: 'blue-grey' },
    { id: 2, name: "Relatively Unimportant", color: 'brown' },
    { id: 3, name: "Moderately Severe", color: 'orange ' },
    { id: 4, name: "Very Severe", color: 'light-blue' },
    { id: 5, name: "Case Fatal", color: 'amber accent-2' },
  ],
  owner: [
    { id: 1, name: "Plaintiff", color: 'warning' },
    { id: 2, name: "Defendant", color: 'amber' },
    { id: 3, name: "No-parties", color: 'orange ' },
    { id: 4, name: "Law firm", color: 'primary' },
    { id: 5, name: "Opponent counsel", color: 'light-green accent-2' },
  ],
  service_status: [
    { id: 1, name: "New", color: 'blue-grey' },
    { id: 2, name: "Processing", color: 'brown' },
    { id: 3, name: "Successfully Served in Person", color: 'orange ' },
    { id: 4, name: "Failed Served", color: 'light-blue' },
    { id: 5, name: "Improper Process Service", color: 'amber accent-2' },
    { id: 6, name: "Done", color: 'red' },
  ],
  hardness: [
    { id: 1, name: "Skip Tracing Needed", color: "warning" },
    { id: 2, name: "Hard to Find", color: "yellow" },
    { id: 3, name: "Easy to Locate", color: "success" },
    { id: 4, name: "Unknown Status", color: "primary" },
  ],
  response_status: [
    { id: 1, name: "Awaiting Response", color: 'deep-orange' },
    { id: 2, name: "Deny Producing", color: 'brown' },
    { id: 3, name: "Delay Producing", color: 'blue-grey' },
    { id: 4, name: "890 - Other Statutory Action", color: 'amber' },
    { id: 5, name: "Unknown Status", color: 'green' },
  ],
};

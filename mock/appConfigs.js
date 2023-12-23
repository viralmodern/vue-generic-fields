export const appConfigsMatters = {
  choices: [
    {
      FavorableAndProvidedBy: [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        },
        {
          value: 3,
          label: 'Non Party'
        }
      ]
    },
    {
      CommonLevel: [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'GenericReportModel.ReportReasonChoices': [
        {
          value: 's',
          label: 'Spam'
        }
      ]
    },
    {
      'Workspace.MemberRole': [
        {
          value: 1,
          label: 'Owner'
        },
        {
          value: 2,
          label: 'Admin'
        },
        {
          value: 3,
          label: 'Staff'
        },
        {
          value: 4,
          label: 'Employee'
        },
        {
          value: 5,
          label: 'Client'
        }
      ]
    },
    {
      'Client.ClientType': [
        {
          value: 'i',
          label: 'Individual'
        },
        {
          value: 'c',
          label: 'Corporation'
        }
      ]
    },
    {
      'Client.ClientStatus': [
        {
          value: 1,
          label: 'Activate'
        },
        {
          value: 2,
          label: 'Inactivate'
        }
      ]
    },
    {
      'Client.EmailType': [
        {
          value: 'h',
          label: 'Home'
        },
        {
          value: 'w',
          label: 'Work'
        },
        {
          value: 'o',
          label: 'Other'
        }
      ]
    },
    {
      'Client.PhoneType': [
        {
          value: 'h',
          label: 'Home'
        },
        {
          value: 'w',
          label: 'Work'
        },
        {
          value: 'o',
          label: 'Other'
        }
      ]
    },
    {
      'Client.WebsiteType': [
        {
          value: 'w',
          label: 'Work'
        },
        {
          value: 'o',
          label: 'Other'
        }
      ]
    },
    {
      'ClientAddress.AddressType': [
        {
          value: 'h',
          label: 'Home'
        },
        {
          value: 'w',
          label: 'Work'
        },
        {
          value: 'b',
          label: 'Billing'
        },
        {
          value: 'o',
          label: 'Other'
        }
      ]
    },
    {
      'ClientAddressBook.ClientAddressBookRelationship': [
        {
          value: 1,
          label: 'Spouse'
        },
        {
          value: 2,
          label: 'Colleague'
        },
        {
          value: 3,
          label: 'Children'
        },
        {
          value: 4,
          label: 'Friend'
        },
        {
          value: 5,
          label: 'Legal Counsel'
        },
        {
          value: 6,
          label: 'Opponent Counsel'
        }
      ]
    },
    {
      'CommunicationTopic.CommunicationTopicStatus': [
        {
          value: 'o',
          label: 'Open'
        },
        {
          value: 'c',
          label: 'Close'
        },
        {
          value: 'a',
          label: 'Archive'
        }
      ]
    },
    {
      'DocumentRequest.DocumentRequestStatus': [
        {
          value: 1,
          label: 'Sent'
        },
        {
          value: 2,
          label: 'Viewed'
        },
        {
          value: 3,
          label: 'Progressing'
        },
        {
          value: 4,
          label: 'Awaiting Approval'
        },
        {
          value: 5,
          label: 'Approved'
        },
        {
          value: 6,
          label: 'Negative Status'
        }
      ]
    },
    {
      'DocumentRequestFile.FileUploadStatus': [
        {
          value: 4,
          label: 'Awaiting Approval'
        },
        {
          value: 5,
          label: 'Approved'
        },
        {
          value: 6,
          label: 'Negative Status'
        }
      ]
    },
    {
      'Project.Visibility': [
        {
          value: 1,
          label: 'Private'
        },
        {
          value: 2,
          label: 'Public'
        }
      ]
    },
    {
      'Project.MemberRole': [
        {
          value: 1,
          label: 'Owner'
        },
        {
          value: 2,
          label: 'Admin'
        },
        {
          value: 3,
          label: 'Normal'
        }
      ]
    },
    {
      'Contact.Role': [
        {
          value: 1,
          label: 'Project Lead'
        },
        {
          value: 2,
          label: 'Team Member'
        },
        {
          value: 3,
          label: 'Contact Person'
        }
      ]
    },
    {
      'Matter.Priority': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'Matter.RiskLevel': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'Matter.MatterStage': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'Preparation'
        },
        {
          value: 3,
          label: 'Pre Trial'
        },
        {
          value: 4,
          label: 'Discovery'
        },
        {
          value: 5,
          label: 'Awaiting Decision'
        },
        {
          value: 6,
          label: 'Trial'
        },
        {
          value: 7,
          label: 'Appeal'
        },
        {
          value: 8,
          label: 'Done'
        }
      ]
    },
    {
      'MatterDocketEntry.FiledBy': [
        {
          value: 1,
          label: 'N/A'
        },
        {
          value: 2,
          label: 'Court Order'
        },
        {
          value: 3,
          label: 'Defendant'
        },
        {
          value: 4,
          label: 'Plaintiff'
        }
      ]
    },
    {
      'MatterDocketEntry.DocketEntryType': [
        {
          value: 1,
          label: 'Motion'
        },
        {
          value: 2,
          label: 'Order'
        },
        {
          value: 3,
          label: 'Notice'
        },
        {
          value: 4,
          label: 'Certificate'
        },
        {
          value: 5,
          label: 'N/A'
        }
      ]
    },
    {
      'MatterDocketEntryDocument.DocumentType': [
        {
          value: 1,
          label: 'N/A'
        },
        {
          value: 2,
          label: 'Main Document'
        },
        {
          value: 3,
          label: 'Attachment'
        }
      ]
    },
    {
      'MatterLabelAndTag.Type': [
        {
          value: 'label',
          label: 'Label'
        },
        {
          value: 'tag',
          label: 'Tag'
        },
        {
          value: 'legal-issue',
          label: 'Legal Issue'
        },
        {
          value: 'goal',
          label: 'Goal'
        },
        {
          value: 'subject',
          label: 'Subject'
        },
        {
          value: 'hazard',
          label: 'Risk Hazard'
        },
        {
          value: 'strategy',
          label: 'Strategy'
        },
        {
          value: 'root-cause',
          label: 'Root Cause'
        },
        {
          value: 'risk-area',
          label: 'Risk Area'
        },
        {
          value: 'risk-category',
          label: 'Risk Category'
        },
        {
          value: 'risk-source',
          label: 'Risk Source'
        },
        {
          value: 'objection',
          label: 'Objection'
        },
        {
          value: 'fact-source',
          label: 'Fact Source'
        },
        {
          value: 'proceeding-source',
          label: 'Proceeding Source'
        },
        {
          value: 'evidence_device_type',
          label: 'Evidence Device Type'
        },
        {
          value: 'document-label',
          label: 'Document Label'
        },
        {
          value: 'privilege-label',
          label: 'Privilege Label'
        }
      ]
    },
    {
      'WorkspaceTagable.WorkspaceTagableType': [
        {
          value: 1,
          label: 'Meeting Label'
        },
        {
          value: 2,
          label: 'Client Label'
        },
        {
          value: 3,
          label: 'Client Communication Label'
        }
      ]
    },
    {
      'Court.Jurisdiction': [
        {
          value: 'F',
          label: 'Federal Appellate'
        },
        {
          value: 'FD',
          label: 'Federal District'
        }
      ]
    },
    {
      'Clause.Visibility': [
        {
          value: 1,
          label: 'Private'
        },
        {
          value: 2,
          label: 'Public'
        }
      ]
    },
    {
      'Hearing.HearingType': [
        {
          value: 1,
          label: 'Arraignment'
        },
        {
          value: 2,
          label: 'Bond Hearing'
        },
        {
          value: 3,
          label: 'Contested'
        },
        {
          value: 4,
          label: 'Ex Parte'
        },
        {
          value: 5,
          label: 'Jury Trial'
        },
        {
          value: 6,
          label: 'Mitigation'
        },
        {
          value: 7,
          label: 'Motion'
        },
        {
          value: 8,
          label: 'Non Jury Trial'
        },
        {
          value: 9,
          label: 'Other Hearing'
        },
        {
          value: 10,
          label: 'Prelim Appearance'
        },
        {
          value: 11,
          label: 'Pretrial'
        },
        {
          value: 12,
          label: 'Review Hearing'
        },
        {
          value: 13,
          label: 'Show Cause'
        },
        {
          value: 14,
          label: 'Misc'
        }
      ]
    },
    {
      'HearingMember.MemberRole': [
        {
          value: 1,
          label: 'Owner'
        },
        {
          value: 2,
          label: 'Normal'
        }
      ]
    },
    {
      'TimelineMember.MemberRole': [
        {
          value: 1,
          label: 'Owner'
        },
        {
          value: 2,
          label: 'Normal'
        }
      ]
    },
    {
      'Fact.Type': [
        {
          value: 1,
          label: 'Ultimate'
        },
        {
          value: 2,
          label: 'Evidentiary'
        }
      ]
    },
    {
      'SupportItem.Strength': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Medium'
        },
        {
          value: 4,
          label: 'Strong'
        },
        {
          value: 5,
          label: 'Very Strong'
        }
      ]
    },
    {
      'Toolbox.Type': [
        {
          value: 1,
          label: 'Wish List'
        },
        {
          value: 2,
          label: 'Request Of Production'
        },
        {
          value: 3,
          label: 'Request Of Admission'
        },
        {
          value: 4,
          label: 'Deposition'
        },
        {
          value: 5,
          label: 'Set Of Interrogatory'
        }
      ]
    },
    {
      'Hearsay.ExceptionTypeDeclarantYes': [
        {
          value: 1,
          label: 'Spontaneous Excited Or Contemporaneous Utterances'
        },
        {
          value: 2,
          label: 'Past Recollection Recorded'
        },
        {
          value: 3,
          label: 'Public Records And Reports'
        },
        {
          value: 4,
          label: 'Business Records'
        },
        {
          value: 5,
          label: 'Learned Writing Commercial Publications'
        },
        {
          value: 6,
          label: 'Ancient Documents'
        },
        {
          value: 7,
          label: 'Reputation'
        },
        {
          value: 8,
          label: 'Miscellaneous'
        }
      ]
    },
    {
      'Hearsay.ExceptionTypeDeclarantNo': [
        {
          value: 9,
          label: 'Former Testimony'
        },
        {
          value: 10,
          label: 'Dying Declarations'
        },
        {
          value: 11,
          label: 'Declarations Against Interest'
        },
        {
          value: 12,
          label: 'Statement Of Pedigree'
        },
        {
          value: 13,
          label: 'Forfeiture By Wrongdoing'
        },
        {
          value: 14,
          label: 'Prior Statements Of Available Witness'
        },
        {
          value: 15,
          label: 'Residual Catch All'
        }
      ]
    },
    {
      'TestimonyWitness.PartyWitness': [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        }
      ]
    },
    {
      'Character.Gender': [
        {
          value: 'M',
          label: 'Male'
        },
        {
          value: 'F',
          label: 'Female'
        }
      ]
    },
    {
      'Character.CharacterType': [
        {
          value: 1,
          label: 'Client'
        },
        {
          value: 2,
          label: 'Expert Witness'
        },
        {
          value: 3,
          label: 'Fact Witness'
        },
        {
          value: 4,
          label: 'Eye Witness'
        },
        {
          value: 5,
          label: 'Character Witness'
        },
        {
          value: 6,
          label: 'Prosecution Witness'
        },
        {
          value: 7,
          label: 'Defense Witness'
        },
        {
          value: 8,
          label: 'Chance Witness'
        },
        {
          value: 9,
          label: 'Judge'
        },
        {
          value: 10,
          label: 'Defending Counsel'
        },
        {
          value: 11,
          label: 'Opposing Counsel'
        },
        {
          value: 12,
          label: 'Plaintiff'
        },
        {
          value: 13,
          label: 'Defendant'
        },
        {
          value: 14,
          label: 'Jury'
        }
      ]
    },
    {
      'Character.DisclosedBy': [
        {
          value: 1,
          label: 'Defendant'
        },
        {
          value: 2,
          label: 'Plaintiff'
        },
        {
          value: 3,
          label: 'Non Parties'
        }
      ]
    },
    {
      'Character.CharacterServed': [
        {
          value: 1,
          label: 'Able'
        },
        {
          value: 2,
          label: 'Served'
        }
      ]
    },
    {
      'Character.CharacterPosition': [
        {
          value: 1,
          label: 'Adverse'
        },
        {
          value: 2,
          label: 'Hostile'
        },
        {
          value: 3,
          label: 'Independent'
        },
        {
          value: 4,
          label: 'Neutral'
        },
        {
          value: 5,
          label: 'Friendly'
        },
        {
          value: 6,
          label: 'Opposing'
        }
      ]
    },
    {
      'Character.CharacterAvailability': [
        {
          value: 1,
          label: 'Available'
        },
        {
          value: 2,
          label: 'Unavailable'
        }
      ]
    },
    {
      'Character.CharacterLocated': [
        {
          value: 1,
          label: 'Located'
        },
        {
          value: 2,
          label: 'Unable To Locate'
        }
      ]
    },
    {
      'Character.Favorable': [
        {
          value: 'P',
          label: 'Plaintiff'
        },
        {
          value: 'D',
          label: 'Defendant'
        },
        {
          value: 'N',
          label: 'No Party'
        }
      ]
    },
    {
      'CharacterCredibility.CredibilityType': [
        {
          value: 'S',
          label: 'Strength'
        },
        {
          value: 'W',
          label: 'Weakness'
        },
        {
          value: 'O',
          label: 'Opportunity'
        },
        {
          value: 'T',
          label: 'Threat'
        }
      ]
    },
    {
      'CharacterCredibility.Favorable': [
        {
          value: 'P',
          label: 'Plaintiff'
        },
        {
          value: 'D',
          label: 'Defendant'
        },
        {
          value: 'N',
          label: 'No Party'
        }
      ]
    },
    {
      'CharacterRelationship.RelationshipType': [
        {
          value: 1,
          label: 'Weak'
        },
        {
          value: 2,
          label: 'Normal'
        },
        {
          value: 3,
          label: 'Strong'
        },
        {
          value: 4,
          label: 'Very Strong'
        }
      ]
    },
    {
      'Log.Type': [
        {
          value: 1,
          label: 'Privilege'
        },
        {
          value: 2,
          label: 'Chain Custody'
        },
        {
          value: 3,
          label: 'Communication'
        },
        {
          value: 4,
          label: 'Exhibit'
        }
      ]
    },
    {
      'PrivilegeDetail.LogType': [
        {
          value: 1,
          label: 'Attorney Work Product'
        },
        {
          value: 2,
          label: 'Privilege Against Self Incrimination'
        },
        {
          value: 3,
          label: 'Marriage Communication'
        },
        {
          value: 4,
          label: 'Spousal Privilege'
        },
        {
          value: 5,
          label: 'Law Enforcement'
        },
        {
          value: 6,
          label: 'Psycho Therapist Patient'
        },
        {
          value: 7,
          label: 'Parental And Filial'
        },
        {
          value: 8,
          label: 'Clay Person'
        }
      ]
    },
    {
      'AttackPlan.Type': [
        {
          value: 1,
          label: 'Conviction'
        },
        {
          value: 2,
          label: 'Bad Act'
        },
        {
          value: 3,
          label: 'Reputations'
        },
        {
          value: 4,
          label: 'Inconsistent Statement'
        },
        {
          value: 5,
          label: 'Bias'
        },
        {
          value: 6,
          label: 'Defect'
        },
        {
          value: 7,
          label: 'Contradictions'
        }
      ]
    },
    {
      'ConvictionDetail.Type': [
        {
          value: 1,
          label: 'Felony'
        },
        {
          value: 2,
          label: 'Misdemeanor'
        }
      ]
    },
    {
      'ConvictionDetail.CrimenFalsi': [
        {
          value: 1,
          label: 'Perjury'
        },
        {
          value: 2,
          label: 'False Statement'
        },
        {
          value: 3,
          label: 'Criminal Fraud'
        },
        {
          value: 4,
          label: 'Embezzlement'
        },
        {
          value: 5,
          label: 'False Pretense'
        },
        {
          value: 6,
          label: 'Counterfeiting'
        },
        {
          value: 7,
          label: 'Forgery'
        },
        {
          value: 8,
          label: 'False Tax Return'
        },
        {
          value: 9,
          label: 'Misc'
        }
      ]
    },
    {
      'DefectDetail.Type': [
        {
          value: 1,
          label: 'Mental'
        },
        {
          value: 2,
          label: 'Sensory'
        }
      ]
    },
    {
      LegalLitigationCode: [
        {
          value: 'L100',
          label: 'L100 Case Assessment, Development and Administration'
        },
        {
          value: 'L110',
          label: 'L110 Fact Investigation/Development'
        },
        {
          value: 'L120',
          label: 'L120 Analysis/Strategy'
        },
        {
          value: 'L130',
          label: 'L130 Experts/Consultants'
        },
        {
          value: 'L140',
          label: 'L140 Document/File Management'
        },
        {
          value: 'L150',
          label: 'L150 Budgeting'
        },
        {
          value: 'L160',
          label: 'L160 Settlement/Non-Binding ADR'
        },
        {
          value: 'L190',
          label: 'L190 Other Case Assessment, Development and Administration'
        },
        {
          value: 'L200',
          label: 'L200 Pre-Trial Pleadings and Motions'
        },
        {
          value: 'L210',
          label: 'L210 Pleading'
        },
        {
          value: 'L220',
          label: 'L220 Preliminary Injunctions/Provisional Remedies'
        },
        {
          value: 'L230',
          label: 'L230 Court Mandated Conferences'
        },
        {
          value: 'L240',
          label: 'L240 Dispositive Motions'
        },
        {
          value: 'L250',
          label: 'L250 Other Written Motions and Submissions'
        },
        {
          value: 'L260',
          label: 'L260 Class Action Certification and Notice'
        },
        {
          value: 'L300',
          label: 'L300 Discovery'
        },
        {
          value: 'L310',
          label: 'L310 Written Discovery'
        },
        {
          value: 'L320',
          label: 'L320 Document Production'
        },
        {
          value: 'L330',
          label: 'L330 Depositions'
        },
        {
          value: 'L340',
          label: 'L340 Expert Discovery'
        },
        {
          value: 'L350',
          label: 'L350 Discovery Motions'
        },
        {
          value: 'L390',
          label: 'L390 Other Discovery'
        },
        {
          value: 'L400',
          label: 'L400 Trial Preparation and Trial'
        },
        {
          value: 'L410',
          label: 'L410 Fact Witnesses'
        },
        {
          value: 'L420',
          label: 'L420 Expert Witnesses'
        },
        {
          value: 'L430',
          label: 'L430 Written Motions and Submissions'
        },
        {
          value: 'L440',
          label: 'L440 Other Trial Preparation and Support'
        },
        {
          value: 'L450',
          label: 'L450 Trial and Hearing Attendance'
        },
        {
          value: 'L460',
          label: 'L460 Post-Trial Motions and Submissions'
        },
        {
          value: 'L470',
          label: 'L470 Enforcement'
        },
        {
          value: 'L500',
          label: 'L500 Appeal'
        },
        {
          value: 'L510',
          label: 'L510 Appellate Motions and Submissions'
        },
        {
          value: 'L520',
          label: 'L520 Appellate Briefs'
        },
        {
          value: 'L530',
          label: 'L530 Oral Argument'
        }
      ]
    },
    {
      LegalActivitiesCode: [
        {
          value: 'A101',
          label: 'A101 Plan and prepare for'
        },
        {
          value: 'A102',
          label: 'A102 Research'
        },
        {
          value: 'A103',
          label: 'A103 Draft/revise'
        },
        {
          value: 'A104',
          label: 'A104 Review/analyze'
        },
        {
          value: 'A105',
          label: 'A105 Communicate (in firm)'
        },
        {
          value: 'A106',
          label: 'A106 Communicate (with client)'
        },
        {
          value: 'A107',
          label: 'A107 Communicate (other outside counsel)'
        },
        {
          value: 'A108',
          label: 'A108 Communicate (other external)'
        },
        {
          value: 'A109',
          label: 'A109 Appear for/attend'
        },
        {
          value: 'A110',
          label: 'A110 Manage data/files'
        },
        {
          value: 'A111',
          label: 'A111 Other'
        }
      ]
    },
    {
      LegalExpenseCode: [
        {
          value: 'E101',
          label: 'E101 Copying'
        },
        {
          value: 'E102',
          label: 'E102 Outside printing'
        },
        {
          value: 'E103',
          label: 'E103 Word processing'
        },
        {
          value: 'E104',
          label: 'E104 Facsimile'
        },
        {
          value: 'E105',
          label: 'E105 Telephone'
        },
        {
          value: 'E106',
          label: 'E106 Online research'
        },
        {
          value: 'E107',
          label: 'E107 Delivery services/messengers'
        },
        {
          value: 'E108',
          label: 'E108 Postage'
        },
        {
          value: 'E109',
          label: 'E109 Local travel'
        },
        {
          value: 'E110',
          label: 'E110 Out-of-town travel'
        },
        {
          value: 'E111',
          label: 'E111 Meals'
        },
        {
          value: 'E112',
          label: 'E112 Court fees'
        },
        {
          value: 'E113',
          label: 'E113 Subpoena fees'
        },
        {
          value: 'E114',
          label: 'E114 Witness fees'
        },
        {
          value: 'E115',
          label: 'E115 Deposition transcripts'
        },
        {
          value: 'E116',
          label: 'E116 Trial transcripts'
        },
        {
          value: 'E117',
          label: 'E117 Trial exhibits'
        },
        {
          value: 'E118',
          label: 'E118 Litigation support vendors'
        },
        {
          value: 'E119',
          label: 'E119 Experts'
        },
        {
          value: 'E120',
          label: 'E120 Private investigators'
        },
        {
          value: 'E121',
          label: 'E121 Arbitrators/mediators'
        },
        {
          value: 'E122',
          label: 'E122 Local counsel'
        },
        {
          value: 'E123',
          label: 'E123 Other professionals'
        },
        {
          value: 'E124',
          label: 'E124 Other'
        }
      ]
    },
    {
      'RequestSet.Priority': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'RequestSet.RequestSetType': [
        {
          value: 1,
          label: 'For Production'
        },
        {
          value: 2,
          label: 'For Admission'
        },
        {
          value: 3,
          label: 'Interrogatories'
        }
      ]
    },
    {
      'RequestSet.RequestFrom': [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        }
      ]
    },
    {
      'RequestItem.Priority': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'RequestItem.ResponseStatus': [
        {
          value: 1,
          label: 'Awaiting'
        },
        {
          value: 2,
          label: 'Received'
        },
        {
          value: 3,
          label: 'Analyzing'
        },
        {
          value: 4,
          label: 'Disputing'
        },
        {
          value: 5,
          label: 'Done'
        },
        {
          value: 6,
          label: 'In Progress'
        },
        {
          value: 7,
          label: 'Objected'
        }
      ]
    },
    {
      'RequestItem.RequestStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'Disputing'
        },
        {
          value: 3,
          label: 'Received'
        },
        {
          value: 4,
          label: 'In Progress'
        },
        {
          value: 5,
          label: 'Done'
        },
        {
          value: 6,
          label: 'Awaiting'
        },
        {
          value: 7,
          label: 'Objected'
        }
      ]
    },
    {
      'RequestItem.ResponseContent': [
        {
          value: 1,
          label: 'Admit'
        },
        {
          value: 2,
          label: 'Deny'
        },
        {
          value: 3,
          label: 'Objected'
        }
      ]
    },
    {
      'RequestDocument.Confidentiality': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'RequestDocument.Privilege': [
        {
          value: 1,
          label: 'Attorney Work Product'
        },
        {
          value: 2,
          label: 'Attorney Client Privilege'
        },
        {
          value: 3,
          label: 'Privilege Against Self Incrimination'
        },
        {
          value: 4,
          label: 'Marriage Communication'
        },
        {
          value: 5,
          label: 'Spousal Privilege'
        },
        {
          value: 6,
          label: 'Law Enforcement'
        },
        {
          value: 7,
          label: 'Psycho Therapist Patient'
        },
        {
          value: 8,
          label: 'Parental And Filial'
        },
        {
          value: 9,
          label: 'Clay Person'
        }
      ]
    },
    {
      'RequestDocument.Redaction': [
        {
          value: 1,
          label: 'None'
        },
        {
          value: 2,
          label: 'Without Explanation'
        },
        {
          value: 3,
          label: 'With Explanation'
        }
      ]
    },
    {
      'RequestDocument.Responsive': [
        {
          value: 1,
          label: 'Further Review'
        },
        {
          value: 2,
          label: 'Not Responsive'
        },
        {
          value: 3,
          label: 'Responsive'
        },
        {
          value: 4,
          label: 'Defect'
        }
      ]
    },
    {
      'RequestDocument.ReviewStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'In Process'
        },
        {
          value: 3,
          label: 'Reviewed'
        }
      ]
    },
    {
      'RequestSetTask.TaskStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'In Progress'
        },
        {
          value: 3,
          label: 'Done'
        }
      ]
    },
    {
      'Service.Type': [
        {
          value: 1,
          label: 'Subpoena'
        },
        {
          value: 2,
          label: 'Request For Admission'
        },
        {
          value: 3,
          label: 'Request For Production'
        },
        {
          value: 4,
          label: 'Interrogatories'
        },
        {
          value: 5,
          label: 'Deposition'
        }
      ]
    },
    {
      'Service.Status': [
        {
          value: 1,
          label: 'Initiating Sent'
        },
        {
          value: 2,
          label: 'In Service'
        },
        {
          value: 3,
          label: 'Served'
        },
        {
          value: 4,
          label: 'Done'
        }
      ]
    },
    {
      'GenesisComplaintTab.Priority': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'GenesisComplaintTab.Likelihood': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'GenesisComplaintTab.DismissStatus': [
        {
          value: 1,
          label: 'Judge Granted'
        },
        {
          value: 2,
          label: 'Judge Partially Granted'
        },
        {
          value: 3,
          label: 'Judge Dismissed'
        }
      ]
    },
    {
      'GenesisComplaintTab.DisputeStatus': [
        {
          value: 1,
          label: 'Entirely Disputed'
        },
        {
          value: 2,
          label: 'Partially Disputed'
        },
        {
          value: 3,
          label: 'No Disputed'
        }
      ]
    },
    {
      'GenesisComplaintTab.ComplaintStatus': [
        {
          value: 1,
          label: 'Filed'
        },
        {
          value: 2,
          label: 'Do Not Filed'
        },
        {
          value: 3,
          label: 'Continue To Litigate'
        },
        {
          value: 4,
          label: 'Agree To Settle'
        }
      ]
    },
    {
      'Deposition.DeponentType': [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        },
        {
          value: 3,
          label: 'Non Party'
        },
        {
          value: 4,
          label: 'Expert Witness'
        }
      ]
    },
    {
      'Deposition.DepositionPriority': [
        {
          value: 1,
          label: 'No Automatic Priority'
        },
        {
          value: 2,
          label: 'Scheduling Order May Be Available'
        },
        {
          value: 3,
          label: 'Local Custom And Rule'
        }
      ]
    },
    {
      'Deposition.DepositionMethod': [
        {
          value: 1,
          label: 'Videotaped'
        },
        {
          value: 2,
          label: 'Audio'
        },
        {
          value: 3,
          label: 'Telephone'
        },
        {
          value: 4,
          label: 'Video Conference'
        }
      ]
    },
    {
      'DepositionTodo.Priority': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'DepositionRequestForProdDocs.Destroyed': [
        {
          value: 1,
          label: 'Before'
        },
        {
          value: 2,
          label: 'After'
        },
        {
          value: 3,
          label: 'Available Unlocated'
        }
      ]
    },
    {
      'PriorEmployment.TestimonySide': [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        },
        {
          value: 3,
          label: 'No Party'
        }
      ]
    },
    {
      'PriorEmployment.WhoWin': [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        },
        {
          value: 3,
          label: 'No Party'
        }
      ]
    },
    {
      'Subpoena.ServiceStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'Processing'
        },
        {
          value: 3,
          label: 'Successful Served'
        },
        {
          value: 4,
          label: 'Failed Served'
        },
        {
          value: 5,
          label: 'Improper Process Service'
        },
        {
          value: 6,
          label: 'Done'
        },
        {
          value: 7,
          label: 'Archive'
        }
      ]
    },
    {
      'Subpoena.ResponseStatus': [
        {
          value: 1,
          label: 'Awaiting Response'
        },
        {
          value: 2,
          label: 'Deny Producing'
        },
        {
          value: 3,
          label: 'Delay Producing'
        },
        {
          value: 4,
          label: 'Other Statutory Action'
        },
        {
          value: 5,
          label: 'Unknown Status'
        }
      ]
    },
    {
      'Subpoena.Hardness': [
        {
          value: 1,
          label: 'Skip Tracing Needed'
        },
        {
          value: 2,
          label: 'Hard To Find'
        },
        {
          value: 3,
          label: 'Easy To Locate'
        },
        {
          value: 4,
          label: 'Unknown Status'
        }
      ]
    },
    {
      'Subpoena.HowSubpoenaServed': [
        {
          value: 1,
          label: 'Personal Delivery'
        },
        {
          value: 2,
          label: 'Certified Mail To Last Known Address Awaiting Return Receipt'
        },
        {
          value: 3,
          label: 'Certified Mail To Last Known Address Rejected Request'
        },
        {
          value: 4,
          label: 'Certified Mail To Last Known Address Return Request Received'
        },
        {
          value: 5,
          label: 'Email To Last Known Email Address'
        }
      ]
    },
    {
      'SubpoenaRequest.Priority': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'SubpoenaRequest.ResponseStatus': [
        {
          value: 1,
          label: 'Awaiting'
        },
        {
          value: 2,
          label: 'Received'
        },
        {
          value: 3,
          label: 'Analyzing'
        },
        {
          value: 4,
          label: 'Disputing'
        },
        {
          value: 5,
          label: 'Done'
        },
        {
          value: 6,
          label: 'In Progress'
        },
        {
          value: 7,
          label: 'Objected'
        }
      ]
    },
    {
      'SubpoenaRequest.RequestStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'Disputing'
        },
        {
          value: 3,
          label: 'Received'
        },
        {
          value: 4,
          label: 'In Progress'
        },
        {
          value: 5,
          label: 'Done'
        },
        {
          value: 6,
          label: 'Awaiting'
        },
        {
          value: 7,
          label: 'Objected'
        }
      ]
    },
    {
      'SubpoenaRequest.ResponseContent': [
        {
          value: 1,
          label: 'Admit'
        },
        {
          value: 2,
          label: 'Deny'
        },
        {
          value: 3,
          label: 'Objected'
        }
      ]
    },
    {
      'Risk.PotentialConsequence': [
        {
          value: 1,
          label: 'Not Significant'
        },
        {
          value: 2,
          label: 'Minor'
        },
        {
          value: 3,
          label: 'Moderate'
        },
        {
          value: 4,
          label: 'Major'
        },
        {
          value: 5,
          label: 'Severe'
        }
      ]
    },
    {
      'Risk.Likelihood': [
        {
          value: 1,
          label: 'Rare'
        },
        {
          value: 2,
          label: 'Unlikely'
        },
        {
          value: 3,
          label: 'Possible'
        },
        {
          value: 4,
          label: 'Likely'
        },
        {
          value: 5,
          label: 'Almost Certain'
        }
      ]
    },
    {
      'Risk.Severity': [
        {
          value: 1,
          label: 'Neglible'
        },
        {
          value: 2,
          label: 'Manageable'
        },
        {
          value: 3,
          label: 'Medium'
        },
        {
          value: 4,
          label: 'Critical'
        },
        {
          value: 5,
          label: 'Catastrophic'
        }
      ]
    },
    {
      'Risk.Status': [
        {
          value: 1,
          label: 'Active'
        },
        {
          value: 2,
          label: 'Observed'
        },
        {
          value: 3,
          label: 'Monitoring'
        },
        {
          value: 4,
          label: 'Closed'
        }
      ]
    },
    {
      'Risk.ActionPlan': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'Open'
        },
        {
          value: 3,
          label: 'Closed'
        }
      ]
    },
    {
      'Risk.WhoAtRisk': [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        },
        {
          value: 3,
          label: 'No Parties'
        },
        {
          value: 4,
          label: 'Law Firm'
        },
        {
          value: 5,
          label: 'Opponent Counsel'
        }
      ]
    },
    {
      'Risk.Owner': [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        },
        {
          value: 3,
          label: 'No Parties'
        },
        {
          value: 4,
          label: 'Law Firm'
        }
      ]
    },
    {
      'Risk.RiskDirection': [
        {
          value: 1,
          label: 'Stable'
        },
        {
          value: 2,
          label: 'Desc'
        },
        {
          value: 3,
          label: 'Asc'
        }
      ]
    },
    {
      'Risk.Frequency': [
        {
          value: 1,
          label: 'Hourly'
        },
        {
          value: 2,
          label: 'Daily'
        },
        {
          value: 3,
          label: 'Weekly'
        },
        {
          value: 4,
          label: 'Monthly'
        },
        {
          value: 5,
          label: 'Quarterly'
        },
        {
          value: 6,
          label: 'Annually'
        }
      ]
    },
    {
      'Risk.Criticality': [
        {
          value: 1,
          label: 'Seriousness Unknown'
        },
        {
          value: 2,
          label: 'Relatively Unimportant'
        },
        {
          value: 3,
          label: 'Moderately Severe'
        },
        {
          value: 4,
          label: 'Very Severe'
        },
        {
          value: 5,
          label: 'Fatal'
        }
      ]
    },
    {
      'Risk.ContingencyPlanStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'Open'
        },
        {
          value: 3,
          label: 'Closed'
        }
      ]
    },
    {
      'Risk.SourceOfRisk': [
        {
          value: 1,
          label: 'Plaintiff'
        },
        {
          value: 2,
          label: 'Defendant'
        },
        {
          value: 3,
          label: 'No Parties'
        },
        {
          value: 4,
          label: 'Law Firm'
        }
      ]
    },
    {
      'Risk.ProbabilityOfOccurrence': [
        {
          value: 1,
          label: 'Rare'
        },
        {
          value: 2,
          label: 'Unlikely'
        },
        {
          value: 3,
          label: 'Possible'
        },
        {
          value: 4,
          label: 'Likely'
        },
        {
          value: 5,
          label: 'Frequent'
        }
      ]
    },
    {
      'RiskAction.ActionStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'In Process'
        },
        {
          value: 3,
          label: 'Closed'
        }
      ]
    },
    {
      'Questionnaire.QuestionStatus': [
        {
          value: 1,
          label: 'Initiating'
        },
        {
          value: 2,
          label: 'Sent'
        },
        {
          value: 3,
          label: 'Reviewing'
        },
        {
          value: 4,
          label: 'Evaluating'
        },
        {
          value: 5,
          label: 'Done'
        }
      ]
    },
    {
      'Expense.BillableStatus': [
        {
          value: 1,
          label: 'Billable'
        },
        {
          value: 2,
          label: 'On Billable'
        },
        {
          value: 3,
          label: 'Invoiced'
        },
        {
          value: 4,
          label: 'Not Invoiced'
        },
        {
          value: 5,
          label: 'Recurring'
        }
      ]
    },
    {
      'Expense.PaidStatus': [
        {
          value: 1,
          label: 'Paid'
        },
        {
          value: 2,
          label: 'Unpaid'
        },
        {
          value: 3,
          label: 'Disputed'
        }
      ]
    },
    {
      'SatlegalMeeting.MeetingType': [
        {
          value: 1,
          label: 'Client Related'
        },
        {
          value: 2,
          label: 'Matter Related'
        },
        {
          value: 3,
          label: 'Firm Related'
        }
      ]
    },
    {
      'SatlegalMeeting.MeetingStatus': [
        {
          value: 1,
          label: 'Active'
        },
        {
          value: 2,
          label: 'Cancelled'
        }
      ]
    },
    {
      'SatlegalMeetingMember.MeetingMemberStatus': [
        {
          value: 1,
          label: 'Join'
        },
        {
          value: 2,
          label: 'Nope'
        }
      ]
    },
    {
      'PrivilegeLog.Confidentiality': [
        {
          value: 1,
          label: 'Very Low'
        },
        {
          value: 2,
          label: 'Low'
        },
        {
          value: 3,
          label: 'Normal'
        },
        {
          value: 4,
          label: 'High'
        },
        {
          value: 5,
          label: 'Very High'
        }
      ]
    },
    {
      'PrivilegeLog.Responsive': [
        {
          value: 1,
          label: 'Further Review'
        },
        {
          value: 2,
          label: 'Not Responsive'
        },
        {
          value: 3,
          label: 'Responsive'
        },
        {
          value: 4,
          label: 'Defect'
        }
      ]
    },
    {
      'PrivilegeLog.PrivilegeJustification': [
        {
          value: 1,
          label: 'Attorney Work Product'
        },
        {
          value: 2,
          label: 'Attorney Client Privilege'
        },
        {
          value: 3,
          label: 'Privilege Against Self Incrimination'
        },
        {
          value: 4,
          label: 'Marriage Communication'
        },
        {
          value: 5,
          label: 'Spousal Privilege'
        },
        {
          value: 6,
          label: 'Law Enforcement'
        },
        {
          value: 7,
          label: 'Psycho Therapist Patient'
        },
        {
          value: 8,
          label: 'Parental And Filial'
        },
        {
          value: 9,
          label: 'Clay Person'
        }
      ]
    },
    {
      'PrivilegeLog.ReviewStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'In Process'
        },
        {
          value: 3,
          label: 'Reviewed'
        }
      ]
    },
    {
      'PrivilegeLog.Redaction': [
        {
          value: 1,
          label: 'No Redaction'
        },
        {
          value: 2,
          label: 'Redaction Without Explanation'
        },
        {
          value: 3,
          label: 'Redaction With Explanation'
        }
      ]
    },
    {
      'PrivilegeLog.AttorneyClientPrivilegeType': [
        {
          value: 1,
          label: 'An Opinion Of Law'
        },
        {
          value: 2,
          label: 'Legal Services'
        },
        {
          value: 3,
          label: 'Legal Proceeding Assistance'
        }
      ]
    },
    {
      'PrivilegeLogActor.ActorType': [
        {
          value: 1,
          label: 'Sender'
        },
        {
          value: 2,
          label: 'Recipient'
        },
        {
          value: 3,
          label: 'Copyeer'
        }
      ]
    },
    {
      'SatlegalTimer.TimerStatus': [
        {
          value: 1,
          label: 'Stop'
        },
        {
          value: 2,
          label: 'Running'
        },
        {
          value: 3,
          label: 'Pause'
        }
      ]
    },
    {
      'SatlegalTimeEntry.BillingStatus': [
        {
          value: 1,
          label: 'Billed'
        },
        {
          value: 2,
          label: 'Billable'
        },
        {
          value: 3,
          label: 'Non Billable'
        },
        {
          value: 4,
          label: 'Void'
        }
      ]
    },
    {
      'SatlegalCitation.UseBy': [
        {
          value: 1,
          label: 'Defendant'
        },
        {
          value: 2,
          label: 'Plaintiff'
        },
        {
          value: 3,
          label: 'Court'
        }
      ]
    },
    {
      'SatlegalCitation.Treatment': [
        {
          value: 1,
          label: 'Overruled'
        },
        {
          value: 2,
          label: 'Questioned'
        },
        {
          value: 3,
          label: 'Cautioned'
        },
        {
          value: 4,
          label: 'Distinguished'
        },
        {
          value: 5,
          label: 'Explained'
        },
        {
          value: 6,
          label: 'Followed'
        }
      ]
    },
    {
      'SatlegalCitation.Limitation': [
        {
          value: 1,
          label: 'Reversed'
        },
        {
          value: 2,
          label: 'Criticized'
        },
        {
          value: 3,
          label: 'Statutory Related'
        }
      ]
    },
    {
      'SatlegalCitation.ReviewStatus': [
        {
          value: 1,
          label: 'New'
        },
        {
          value: 2,
          label: 'In Process'
        },
        {
          value: 3,
          label: 'Done'
        }
      ]
    },
    {
      'ChatRoom.ChatRoomType': [
        {
          value: 1,
          label: 'One To One'
        },
        {
          value: 2,
          label: 'Group'
        }
      ]
    },
    {
      'ChatMessage.ChatMessageType': [
        {
          value: 1,
          label: 'Text'
        },
        {
          value: 2,
          label: 'Media'
        },
        {
          value: 3,
          label: 'Action'
        }
      ]
    },
    {
      'TimeEntry.Status': [
        {
          value: 1,
          label: 'Billed'
        },
        {
          value: 2,
          label: 'Billable'
        },
        {
          value: 3,
          label: 'Non Billable'
        },
        {
          value: 4,
          label: 'Void'
        },
        {
          value: 5,
          label: 'None'
        }
      ]
    },
    {
      'Board.MemberRole': [
        {
          value: 1,
          label: 'Owner'
        },
        {
          value: 2,
          label: 'Member'
        }
      ]
    },
    {
      'Card.MemberRole': [
        {
          value: 1,
          label: 'Owner'
        },
        {
          value: 2,
          label: 'Member'
        }
      ]
    },
    {
      'Card.Progress': [
        {
          value: 0,
          label: 'Zero'
        },
        {
          value: 10,
          label: 'Ten'
        },
        {
          value: 20,
          label: 'Twenty'
        },
        {
          value: 30,
          label: 'Thirty'
        },
        {
          value: 40,
          label: 'Forty'
        },
        {
          value: 50,
          label: 'Fifty'
        },
        {
          value: 60,
          label: 'Sixty'
        },
        {
          value: 70,
          label: 'Seventies'
        },
        {
          value: 80,
          label: 'Eighty'
        },
        {
          value: 90,
          label: 'Ninety'
        },
        {
          value: 100,
          label: 'Done'
        }
      ]
    },
    {
      'AnnouncementSubscriber.AnnouncementSubscriberRole': [
        {
          value: 1,
          label: 'Creator'
        },
        {
          value: 2,
          label: 'Member'
        }
      ]
    },
    {
      'NoteBookUser.MemberRole': [
        {
          value: 1,
          label: 'Owner'
        },
        {
          value: 2,
          label: 'Normal'
        }
      ]
    },
    {
      'MeetingMember.MemberRole': [
        {
          value: 1,
          label: 'Owner'
        },
        {
          value: 2,
          label: 'Manager'
        },
        {
          value: 3,
          label: 'Normal'
        }
      ]
    },
    {
      'MeetingMember.MemberStatus': [
        {
          value: 1,
          label: 'Going'
        },
        {
          value: 2,
          label: 'Not Going'
        },
        {
          value: 3,
          label: 'Unknown'
        }
      ]
    },
    {
      CountryChoices: [
        {
          value: 'AF',
          label: 'Afghanistan'
        },
        {
          value: 'AX',
          label: 'Åland Islands'
        },
        {
          value: 'AL',
          label: 'Albania'
        },
        {
          value: 'DZ',
          label: 'Algeria'
        },
        {
          value: 'AS',
          label: 'American Samoa'
        },
        {
          value: 'AD',
          label: 'Andorra'
        },
        {
          value: 'AO',
          label: 'Angola'
        },
        {
          value: 'AI',
          label: 'Anguilla'
        },
        {
          value: 'AQ',
          label: 'Antarctica'
        },
        {
          value: 'AG',
          label: 'Antigua and Barbuda'
        },
        {
          value: 'AR',
          label: 'Argentina'
        },
        {
          value: 'AM',
          label: 'Armenia'
        },
        {
          value: 'AW',
          label: 'Aruba'
        },
        {
          value: 'AU',
          label: 'Australia'
        },
        {
          value: 'AT',
          label: 'Austria'
        },
        {
          value: 'AZ',
          label: 'Azerbaijan'
        },
        {
          value: 'BS',
          label: 'Bahamas'
        },
        {
          value: 'BH',
          label: 'Bahrain'
        },
        {
          value: 'BD',
          label: 'Bangladesh'
        },
        {
          value: 'BB',
          label: 'Barbados'
        },
        {
          value: 'BY',
          label: 'Belarus'
        },
        {
          value: 'BE',
          label: 'Belgium'
        },
        {
          value: 'BZ',
          label: 'Belize'
        },
        {
          value: 'BJ',
          label: 'Benin'
        },
        {
          value: 'BM',
          label: 'Bermuda'
        },
        {
          value: 'BT',
          label: 'Bhutan'
        },
        {
          value: 'BO',
          label: 'Bolivia'
        },
        {
          value: 'BQ',
          label: 'Bonaire, Sint Eustatius and Saba'
        },
        {
          value: 'BA',
          label: 'Bosnia and Herzegovina'
        },
        {
          value: 'BW',
          label: 'Botswana'
        },
        {
          value: 'BV',
          label: 'Bouvet Island'
        },
        {
          value: 'BR',
          label: 'Brazil'
        },
        {
          value: 'IO',
          label: 'British Indian Ocean Territory'
        },
        {
          value: 'BN',
          label: 'Brunei'
        },
        {
          value: 'BG',
          label: 'Bulgaria'
        },
        {
          value: 'BF',
          label: 'Burkina Faso'
        },
        {
          value: 'BI',
          label: 'Burundi'
        },
        {
          value: 'CV',
          label: 'Cabo Verde'
        },
        {
          value: 'KH',
          label: 'Cambodia'
        },
        {
          value: 'CM',
          label: 'Cameroon'
        },
        {
          value: 'CA',
          label: 'Canada'
        },
        {
          value: 'KY',
          label: 'Cayman Islands'
        },
        {
          value: 'CF',
          label: 'Central African Republic'
        },
        {
          value: 'TD',
          label: 'Chad'
        },
        {
          value: 'CL',
          label: 'Chile'
        },
        {
          value: 'CN',
          label: 'China'
        },
        {
          value: 'CX',
          label: 'Christmas Island'
        },
        {
          value: 'CC',
          label: 'Cocos (Keeling) Islands'
        },
        {
          value: 'CO',
          label: 'Colombia'
        },
        {
          value: 'KM',
          label: 'Comoros'
        },
        {
          value: 'CG',
          label: 'Congo'
        },
        {
          value: 'CD',
          label: 'Congo (the Democratic Republic of the)'
        },
        {
          value: 'CK',
          label: 'Cook Islands'
        },
        {
          value: 'CR',
          label: 'Costa Rica'
        },
        {
          value: 'CI',
          label: "Côte d'Ivoire"
        },
        {
          value: 'HR',
          label: 'Croatia'
        },
        {
          value: 'CU',
          label: 'Cuba'
        },
        {
          value: 'CW',
          label: 'Curaçao'
        },
        {
          value: 'CY',
          label: 'Cyprus'
        },
        {
          value: 'CZ',
          label: 'Czechia'
        },
        {
          value: 'DK',
          label: 'Denmark'
        },
        {
          value: 'DJ',
          label: 'Djibouti'
        },
        {
          value: 'DM',
          label: 'Dominica'
        },
        {
          value: 'DO',
          label: 'Dominican Republic'
        },
        {
          value: 'EC',
          label: 'Ecuador'
        },
        {
          value: 'EG',
          label: 'Egypt'
        },
        {
          value: 'SV',
          label: 'El Salvador'
        },
        {
          value: 'GQ',
          label: 'Equatorial Guinea'
        },
        {
          value: 'ER',
          label: 'Eritrea'
        },
        {
          value: 'EE',
          label: 'Estonia'
        },
        {
          value: 'SZ',
          label: 'Eswatini'
        },
        {
          value: 'ET',
          label: 'Ethiopia'
        },
        {
          value: 'FK',
          label: 'Falkland Islands (Malvinas)'
        },
        {
          value: 'FO',
          label: 'Faroe Islands'
        },
        {
          value: 'FJ',
          label: 'Fiji'
        },
        {
          value: 'FI',
          label: 'Finland'
        },
        {
          value: 'FR',
          label: 'France'
        },
        {
          value: 'GF',
          label: 'French Guiana'
        },
        {
          value: 'PF',
          label: 'French Polynesia'
        },
        {
          value: 'TF',
          label: 'French Southern Territories'
        },
        {
          value: 'GA',
          label: 'Gabon'
        },
        {
          value: 'GM',
          label: 'Gambia'
        },
        {
          value: 'GE',
          label: 'Georgia'
        },
        {
          value: 'DE',
          label: 'Germany'
        },
        {
          value: 'GH',
          label: 'Ghana'
        },
        {
          value: 'GI',
          label: 'Gibraltar'
        },
        {
          value: 'GR',
          label: 'Greece'
        },
        {
          value: 'GL',
          label: 'Greenland'
        },
        {
          value: 'GD',
          label: 'Grenada'
        },
        {
          value: 'GP',
          label: 'Guadeloupe'
        },
        {
          value: 'GU',
          label: 'Guam'
        },
        {
          value: 'GT',
          label: 'Guatemala'
        },
        {
          value: 'GG',
          label: 'Guernsey'
        },
        {
          value: 'GN',
          label: 'Guinea'
        },
        {
          value: 'GW',
          label: 'Guinea-Bissau'
        },
        {
          value: 'GY',
          label: 'Guyana'
        },
        {
          value: 'HT',
          label: 'Haiti'
        },
        {
          value: 'HM',
          label: 'Heard Island and McDonald Islands'
        },
        {
          value: 'VA',
          label: 'Holy See'
        },
        {
          value: 'HN',
          label: 'Honduras'
        },
        {
          value: 'HK',
          label: 'Hong Kong'
        },
        {
          value: 'HU',
          label: 'Hungary'
        },
        {
          value: 'IS',
          label: 'Iceland'
        },
        {
          value: 'IN',
          label: 'India'
        },
        {
          value: 'ID',
          label: 'Indonesia'
        },
        {
          value: 'IR',
          label: 'Iran'
        },
        {
          value: 'IQ',
          label: 'Iraq'
        },
        {
          value: 'IE',
          label: 'Ireland'
        },
        {
          value: 'IM',
          label: 'Isle of Man'
        },
        {
          value: 'IL',
          label: 'Israel'
        },
        {
          value: 'IT',
          label: 'Italy'
        },
        {
          value: 'JM',
          label: 'Jamaica'
        },
        {
          value: 'JP',
          label: 'Japan'
        },
        {
          value: 'JE',
          label: 'Jersey'
        },
        {
          value: 'JO',
          label: 'Jordan'
        },
        {
          value: 'KZ',
          label: 'Kazakhstan'
        },
        {
          value: 'KE',
          label: 'Kenya'
        },
        {
          value: 'KI',
          label: 'Kiribati'
        },
        {
          value: 'KW',
          label: 'Kuwait'
        },
        {
          value: 'KG',
          label: 'Kyrgyzstan'
        },
        {
          value: 'LA',
          label: 'Laos'
        },
        {
          value: 'LV',
          label: 'Latvia'
        },
        {
          value: 'LB',
          label: 'Lebanon'
        },
        {
          value: 'LS',
          label: 'Lesotho'
        },
        {
          value: 'LR',
          label: 'Liberia'
        },
        {
          value: 'LY',
          label: 'Libya'
        },
        {
          value: 'LI',
          label: 'Liechtenstein'
        },
        {
          value: 'LT',
          label: 'Lithuania'
        },
        {
          value: 'LU',
          label: 'Luxembourg'
        },
        {
          value: 'MO',
          label: 'Macao'
        },
        {
          value: 'MG',
          label: 'Madagascar'
        },
        {
          value: 'MW',
          label: 'Malawi'
        },
        {
          value: 'MY',
          label: 'Malaysia'
        },
        {
          value: 'MV',
          label: 'Maldives'
        },
        {
          value: 'ML',
          label: 'Mali'
        },
        {
          value: 'MT',
          label: 'Malta'
        },
        {
          value: 'MH',
          label: 'Marshall Islands'
        },
        {
          value: 'MQ',
          label: 'Martinique'
        },
        {
          value: 'MR',
          label: 'Mauritania'
        },
        {
          value: 'MU',
          label: 'Mauritius'
        },
        {
          value: 'YT',
          label: 'Mayotte'
        },
        {
          value: 'MX',
          label: 'Mexico'
        },
        {
          value: 'FM',
          label: 'Micronesia (Federated States of)'
        },
        {
          value: 'MD',
          label: 'Moldova'
        },
        {
          value: 'MC',
          label: 'Monaco'
        },
        {
          value: 'MN',
          label: 'Mongolia'
        },
        {
          value: 'ME',
          label: 'Montenegro'
        },
        {
          value: 'MS',
          label: 'Montserrat'
        },
        {
          value: 'MA',
          label: 'Morocco'
        },
        {
          value: 'MZ',
          label: 'Mozambique'
        },
        {
          value: 'MM',
          label: 'Myanmar'
        },
        {
          value: 'NA',
          label: 'Namibia'
        },
        {
          value: 'NR',
          label: 'Nauru'
        },
        {
          value: 'NP',
          label: 'Nepal'
        },
        {
          value: 'NL',
          label: 'Netherlands'
        },
        {
          value: 'NC',
          label: 'New Caledonia'
        },
        {
          value: 'NZ',
          label: 'New Zealand'
        },
        {
          value: 'NI',
          label: 'Nicaragua'
        },
        {
          value: 'NE',
          label: 'Niger'
        },
        {
          value: 'NG',
          label: 'Nigeria'
        },
        {
          value: 'NU',
          label: 'Niue'
        },
        {
          value: 'NF',
          label: 'Norfolk Island'
        },
        {
          value: 'KP',
          label: 'North Korea'
        },
        {
          value: 'MK',
          label: 'North Macedonia'
        },
        {
          value: 'MP',
          label: 'Northern Mariana Islands'
        },
        {
          value: 'NO',
          label: 'Norway'
        },
        {
          value: 'OM',
          label: 'Oman'
        },
        {
          value: 'PK',
          label: 'Pakistan'
        },
        {
          value: 'PW',
          label: 'Palau'
        },
        {
          value: 'PS',
          label: 'Palestine, State of'
        },
        {
          value: 'PA',
          label: 'Panama'
        },
        {
          value: 'PG',
          label: 'Papua New Guinea'
        },
        {
          value: 'PY',
          label: 'Paraguay'
        },
        {
          value: 'PE',
          label: 'Peru'
        },
        {
          value: 'PH',
          label: 'Philippines'
        },
        {
          value: 'PN',
          label: 'Pitcairn'
        },
        {
          value: 'PL',
          label: 'Poland'
        },
        {
          value: 'PT',
          label: 'Portugal'
        },
        {
          value: 'PR',
          label: 'Puerto Rico'
        },
        {
          value: 'QA',
          label: 'Qatar'
        },
        {
          value: 'RE',
          label: 'Réunion'
        },
        {
          value: 'RO',
          label: 'Romania'
        },
        {
          value: 'RU',
          label: 'Russia'
        },
        {
          value: 'RW',
          label: 'Rwanda'
        },
        {
          value: 'BL',
          label: 'Saint Barthélemy'
        },
        {
          value: 'SH',
          label: 'Saint Helena, Ascension and Tristan da Cunha'
        },
        {
          value: 'KN',
          label: 'Saint Kitts and Nevis'
        },
        {
          value: 'LC',
          label: 'Saint Lucia'
        },
        {
          value: 'MF',
          label: 'Saint Martin (French part)'
        },
        {
          value: 'PM',
          label: 'Saint Pierre and Miquelon'
        },
        {
          value: 'VC',
          label: 'Saint Vincent and the Grenadines'
        },
        {
          value: 'WS',
          label: 'Samoa'
        },
        {
          value: 'SM',
          label: 'San Marino'
        },
        {
          value: 'ST',
          label: 'Sao Tome and Principe'
        },
        {
          value: 'SA',
          label: 'Saudi Arabia'
        },
        {
          value: 'SN',
          label: 'Senegal'
        },
        {
          value: 'RS',
          label: 'Serbia'
        },
        {
          value: 'SC',
          label: 'Seychelles'
        },
        {
          value: 'SL',
          label: 'Sierra Leone'
        },
        {
          value: 'SG',
          label: 'Singapore'
        },
        {
          value: 'SX',
          label: 'Sint Maarten (Dutch part)'
        },
        {
          value: 'SK',
          label: 'Slovakia'
        },
        {
          value: 'SI',
          label: 'Slovenia'
        },
        {
          value: 'SB',
          label: 'Solomon Islands'
        },
        {
          value: 'SO',
          label: 'Somalia'
        },
        {
          value: 'ZA',
          label: 'South Africa'
        },
        {
          value: 'GS',
          label: 'South Georgia and the South Sandwich Islands'
        },
        {
          value: 'KR',
          label: 'South Korea'
        },
        {
          value: 'SS',
          label: 'South Sudan'
        },
        {
          value: 'ES',
          label: 'Spain'
        },
        {
          value: 'LK',
          label: 'Sri Lanka'
        },
        {
          value: 'SD',
          label: 'Sudan'
        },
        {
          value: 'SR',
          label: 'Suriname'
        },
        {
          value: 'SJ',
          label: 'Svalbard and Jan Mayen'
        },
        {
          value: 'SE',
          label: 'Sweden'
        },
        {
          value: 'CH',
          label: 'Switzerland'
        },
        {
          value: 'SY',
          label: 'Syria'
        },
        {
          value: 'TW',
          label: 'Taiwan'
        },
        {
          value: 'TJ',
          label: 'Tajikistan'
        },
        {
          value: 'TZ',
          label: 'Tanzania'
        },
        {
          value: 'TH',
          label: 'Thailand'
        },
        {
          value: 'TL',
          label: 'Timor-Leste'
        },
        {
          value: 'TG',
          label: 'Togo'
        },
        {
          value: 'TK',
          label: 'Tokelau'
        },
        {
          value: 'TO',
          label: 'Tonga'
        },
        {
          value: 'TT',
          label: 'Trinidad and Tobago'
        },
        {
          value: 'TN',
          label: 'Tunisia'
        },
        {
          value: 'TR',
          label: 'Turkey'
        },
        {
          value: 'TM',
          label: 'Turkmenistan'
        },
        {
          value: 'TC',
          label: 'Turks and Caicos Islands'
        },
        {
          value: 'TV',
          label: 'Tuvalu'
        },
        {
          value: 'UG',
          label: 'Uganda'
        },
        {
          value: 'UA',
          label: 'Ukraine'
        },
        {
          value: 'AE',
          label: 'United Arab Emirates'
        },
        {
          value: 'GB',
          label: 'United Kingdom'
        },
        {
          value: 'UM',
          label: 'United States Minor Outlying Islands'
        },
        {
          value: 'US',
          label: 'United States of America'
        },
        {
          value: 'UY',
          label: 'Uruguay'
        },
        {
          value: 'UZ',
          label: 'Uzbekistan'
        },
        {
          value: 'VU',
          label: 'Vanuatu'
        },
        {
          value: 'VE',
          label: 'Venezuela'
        },
        {
          value: 'VN',
          label: 'Vietnam'
        },
        {
          value: 'VG',
          label: 'Virgin Islands (British)'
        },
        {
          value: 'VI',
          label: 'Virgin Islands (U.S.)'
        },
        {
          value: 'WF',
          label: 'Wallis and Futuna'
        },
        {
          value: 'EH',
          label: 'Western Sahara'
        },
        {
          value: 'YE',
          label: 'Yemen'
        },
        {
          value: 'ZM',
          label: 'Zambia'
        },
        {
          value: 'ZW',
          label: 'Zimbabwe'
        }
      ]
    },
    {
      USStateChoices: [
        {
          value: 'AL',
          label: 'Alabama'
        },
        {
          value: 'AK',
          label: 'Alaska'
        },
        {
          value: 'AS',
          label: 'American Samoa'
        },
        {
          value: 'AZ',
          label: 'Arizona'
        },
        {
          value: 'AR',
          label: 'Arkansas'
        },
        {
          value: 'AA',
          label: 'Armed Forces Americas'
        },
        {
          value: 'AE',
          label: 'Armed Forces Europe'
        },
        {
          value: 'AP',
          label: 'Armed Forces Pacific'
        },
        {
          value: 'CA',
          label: 'California'
        },
        {
          value: 'CO',
          label: 'Colorado'
        },
        {
          value: 'CT',
          label: 'Connecticut'
        },
        {
          value: 'DE',
          label: 'Delaware'
        },
        {
          value: 'DC',
          label: 'District of Columbia'
        },
        {
          value: 'FL',
          label: 'Florida'
        },
        {
          value: 'GA',
          label: 'Georgia'
        },
        {
          value: 'GU',
          label: 'Guam'
        },
        {
          value: 'HI',
          label: 'Hawaii'
        },
        {
          value: 'ID',
          label: 'Idaho'
        },
        {
          value: 'IL',
          label: 'Illinois'
        },
        {
          value: 'IN',
          label: 'Indiana'
        },
        {
          value: 'IA',
          label: 'Iowa'
        },
        {
          value: 'KS',
          label: 'Kansas'
        },
        {
          value: 'KY',
          label: 'Kentucky'
        },
        {
          value: 'LA',
          label: 'Louisiana'
        },
        {
          value: 'ME',
          label: 'Maine'
        },
        {
          value: 'MD',
          label: 'Maryland'
        },
        {
          value: 'MA',
          label: 'Massachusetts'
        },
        {
          value: 'MI',
          label: 'Michigan'
        },
        {
          value: 'MN',
          label: 'Minnesota'
        },
        {
          value: 'MS',
          label: 'Mississippi'
        },
        {
          value: 'MO',
          label: 'Missouri'
        },
        {
          value: 'MT',
          label: 'Montana'
        },
        {
          value: 'NE',
          label: 'Nebraska'
        },
        {
          value: 'NV',
          label: 'Nevada'
        },
        {
          value: 'NH',
          label: 'New Hampshire'
        },
        {
          value: 'NJ',
          label: 'New Jersey'
        },
        {
          value: 'NM',
          label: 'New Mexico'
        },
        {
          value: 'NY',
          label: 'New York'
        },
        {
          value: 'NC',
          label: 'North Carolina'
        },
        {
          value: 'ND',
          label: 'North Dakota'
        },
        {
          value: 'MP',
          label: 'Northern Mariana Islands'
        },
        {
          value: 'OH',
          label: 'Ohio'
        },
        {
          value: 'OK',
          label: 'Oklahoma'
        },
        {
          value: 'OR',
          label: 'Oregon'
        },
        {
          value: 'PA',
          label: 'Pennsylvania'
        },
        {
          value: 'PR',
          label: 'Puerto Rico'
        },
        {
          value: 'RI',
          label: 'Rhode Island'
        },
        {
          value: 'SC',
          label: 'South Carolina'
        },
        {
          value: 'SD',
          label: 'South Dakota'
        },
        {
          value: 'TN',
          label: 'Tennessee'
        },
        {
          value: 'TX',
          label: 'Texas'
        },
        {
          value: 'UT',
          label: 'Utah'
        },
        {
          value: 'VT',
          label: 'Vermont'
        },
        {
          value: 'VI',
          label: 'Virgin Islands'
        },
        {
          value: 'VA',
          label: 'Virginia'
        },
        {
          value: 'WA',
          label: 'Washington'
        },
        {
          value: 'WV',
          label: 'West Virginia'
        },
        {
          value: 'WI',
          label: 'Wisconsin'
        },
        {
          value: 'WY',
          label: 'Wyoming'
        }
      ]
    },
    {
      TimeZones: [
        {
          value: 'Africa/Abidjan',
          label: '(UTC+0000) Africa/Abidjan'
        },
        {
          value: 'Africa/Accra',
          label: '(UTC+0000) Africa/Accra'
        },
        {
          value: 'Africa/Addis_Ababa',
          label: '(UTC+0245) Africa/Addis_Ababa'
        },
        {
          value: 'Africa/Algiers',
          label: '(UTC+0000) Africa/Algiers'
        },
        {
          value: 'Africa/Asmara',
          label: '(UTC+0245) Africa/Asmara'
        },
        {
          value: 'Africa/Bamako',
          label: '(UTC+0000) Africa/Bamako'
        },
        {
          value: 'Africa/Bangui',
          label: '(UTC+0014) Africa/Bangui'
        },
        {
          value: 'Africa/Banjul',
          label: '(UTC+0000) Africa/Banjul'
        },
        {
          value: 'Africa/Bissau',
          label: '(UTC+0000) Africa/Bissau'
        },
        {
          value: 'Africa/Blantyre',
          label: '(UTC+0210) Africa/Blantyre'
        },
        {
          value: 'Africa/Brazzaville',
          label: '(UTC+0014) Africa/Brazzaville'
        },
        {
          value: 'Africa/Bujumbura',
          label: '(UTC+0210) Africa/Bujumbura'
        },
        {
          value: 'Africa/Cairo',
          label: '(UTC+0300) Africa/Cairo'
        },
        {
          value: 'Africa/Casablanca',
          label: '(UTC+0000) Africa/Casablanca'
        },
        {
          value: 'Africa/Ceuta',
          label: '(UTC+0200) Africa/Ceuta'
        },
        {
          value: 'Africa/Conakry',
          label: '(UTC+0000) Africa/Conakry'
        },
        {
          value: 'Africa/Dakar',
          label: '(UTC+0000) Africa/Dakar'
        },
        {
          value: 'Africa/Dar_es_Salaam',
          label: '(UTC+0245) Africa/Dar_es_Salaam'
        },
        {
          value: 'Africa/Djibouti',
          label: '(UTC+0245) Africa/Djibouti'
        },
        {
          value: 'Africa/Douala',
          label: '(UTC+0014) Africa/Douala'
        },
        {
          value: 'Africa/El_Aaiun',
          label: '(UTC+0000) Africa/El_Aaiun'
        },
        {
          value: 'Africa/Freetown',
          label: '(UTC+0000) Africa/Freetown'
        },
        {
          value: 'Africa/Gaborone',
          label: '(UTC+0210) Africa/Gaborone'
        },
        {
          value: 'Africa/Harare',
          label: '(UTC+0210) Africa/Harare'
        },
        {
          value: 'Africa/Johannesburg',
          label: '(UTC+0300) Africa/Johannesburg'
        },
        {
          value: 'Africa/Juba',
          label: '(UTC+0200) Africa/Juba'
        },
        {
          value: 'Africa/Kampala',
          label: '(UTC+0245) Africa/Kampala'
        },
        {
          value: 'Africa/Khartoum',
          label: '(UTC+0300) Africa/Khartoum'
        },
        {
          value: 'Africa/Kigali',
          label: '(UTC+0210) Africa/Kigali'
        },
        {
          value: 'Africa/Kinshasa',
          label: '(UTC+0014) Africa/Kinshasa'
        },
        {
          value: 'Africa/Lagos',
          label: '(UTC+0014) Africa/Lagos'
        },
        {
          value: 'Africa/Libreville',
          label: '(UTC+0014) Africa/Libreville'
        },
        {
          value: 'Africa/Lome',
          label: '(UTC+0000) Africa/Lome'
        },
        {
          value: 'Africa/Luanda',
          label: '(UTC+0014) Africa/Luanda'
        },
        {
          value: 'Africa/Lubumbashi',
          label: '(UTC+0210) Africa/Lubumbashi'
        },
        {
          value: 'Africa/Lusaka',
          label: '(UTC+0210) Africa/Lusaka'
        },
        {
          value: 'Africa/Malabo',
          label: '(UTC+0014) Africa/Malabo'
        },
        {
          value: 'Africa/Maputo',
          label: '(UTC+0210) Africa/Maputo'
        },
        {
          value: 'Africa/Maseru',
          label: '(UTC+0300) Africa/Maseru'
        },
        {
          value: 'Africa/Mbabane',
          label: '(UTC+0300) Africa/Mbabane'
        },
        {
          value: 'Africa/Mogadishu',
          label: '(UTC+0245) Africa/Mogadishu'
        },
        {
          value: 'Africa/Monrovia',
          label: '(UTC+0000) Africa/Monrovia'
        },
        {
          value: 'Africa/Nairobi',
          label: '(UTC+0245) Africa/Nairobi'
        },
        {
          value: 'Africa/Ndjamena',
          label: '(UTC+0200) Africa/Ndjamena'
        },
        {
          value: 'Africa/Niamey',
          label: '(UTC+0014) Africa/Niamey'
        },
        {
          value: 'Africa/Nouakchott',
          label: '(UTC+0000) Africa/Nouakchott'
        },
        {
          value: 'Africa/Ouagadougou',
          label: '(UTC+0000) Africa/Ouagadougou'
        },
        {
          value: 'Africa/Porto-Novo',
          label: '(UTC+0014) Africa/Porto-Novo'
        },
        {
          value: 'Africa/Sao_Tome',
          label: '(UTC+0000) Africa/Sao_Tome'
        },
        {
          value: 'Africa/Tripoli',
          label: '(UTC+0200) Africa/Tripoli'
        },
        {
          value: 'Africa/Tunis',
          label: '(UTC+0200) Africa/Tunis'
        },
        {
          value: 'Africa/Windhoek',
          label: '(UTC+0100) Africa/Windhoek'
        },
        {
          value: 'America/Adak',
          label: '(UTC-1000) America/Adak'
        },
        {
          value: 'America/Anchorage',
          label: '(UTC-0900) America/Anchorage'
        },
        {
          value: 'America/Anguilla',
          label: '(UTC-0400) America/Anguilla'
        },
        {
          value: 'America/Antigua',
          label: '(UTC-0400) America/Antigua'
        },
        {
          value: 'America/Araguaina',
          label: '(UTC-0300) America/Araguaina'
        },
        {
          value: 'America/Argentina/Buenos_Aires',
          label: '(UTC-0300) America/Argentina/Buenos_Aires'
        },
        {
          value: 'America/Argentina/Catamarca',
          label: '(UTC-0300) America/Argentina/Catamarca'
        },
        {
          value: 'America/Argentina/Cordoba',
          label: '(UTC-0300) America/Argentina/Cordoba'
        },
        {
          value: 'America/Argentina/Jujuy',
          label: '(UTC-0300) America/Argentina/Jujuy'
        },
        {
          value: 'America/Argentina/La_Rioja',
          label: '(UTC-0300) America/Argentina/La_Rioja'
        },
        {
          value: 'America/Argentina/Mendoza',
          label: '(UTC-0300) America/Argentina/Mendoza'
        },
        {
          value: 'America/Argentina/Rio_Gallegos',
          label: '(UTC-0300) America/Argentina/Rio_Gallegos'
        },
        {
          value: 'America/Argentina/Salta',
          label: '(UTC-0300) America/Argentina/Salta'
        },
        {
          value: 'America/Argentina/San_Juan',
          label: '(UTC-0300) America/Argentina/San_Juan'
        },
        {
          value: 'America/Argentina/San_Luis',
          label: '(UTC-0300) America/Argentina/San_Luis'
        },
        {
          value: 'America/Argentina/Tucuman',
          label: '(UTC-0300) America/Argentina/Tucuman'
        },
        {
          value: 'America/Argentina/Ushuaia',
          label: '(UTC-0300) America/Argentina/Ushuaia'
        },
        {
          value: 'America/Aruba',
          label: '(UTC-0400) America/Aruba'
        },
        {
          value: 'America/Asuncion',
          label: '(UTC-0400) America/Asuncion'
        },
        {
          value: 'America/Atikokan',
          label: '(UTC-0500) America/Atikokan'
        },
        {
          value: 'America/Bahia',
          label: '(UTC-0300) America/Bahia'
        },
        {
          value: 'America/Bahia_Banderas',
          label: '(UTC-0600) America/Bahia_Banderas'
        },
        {
          value: 'America/Barbados',
          label: '(UTC-0400) America/Barbados'
        },
        {
          value: 'America/Belem',
          label: '(UTC-0300) America/Belem'
        },
        {
          value: 'America/Belize',
          label: '(UTC-0600) America/Belize'
        },
        {
          value: 'America/Blanc-Sablon',
          label: '(UTC-0400) America/Blanc-Sablon'
        },
        {
          value: 'America/Boa_Vista',
          label: '(UTC-0400) America/Boa_Vista'
        },
        {
          value: 'America/Bogota',
          label: '(UTC-0500) America/Bogota'
        },
        {
          value: 'America/Boise',
          label: '(UTC-0700) America/Boise'
        },
        {
          value: 'America/Cambridge_Bay',
          label: '(UTC-0700) America/Cambridge_Bay'
        },
        {
          value: 'America/Campo_Grande',
          label: '(UTC-0400) America/Campo_Grande'
        },
        {
          value: 'America/Cancun',
          label: '(UTC-0500) America/Cancun'
        },
        {
          value: 'America/Caracas',
          label: '(UTC-0400) America/Caracas'
        },
        {
          value: 'America/Cayenne',
          label: '(UTC-0300) America/Cayenne'
        },
        {
          value: 'America/Cayman',
          label: '(UTC-0500) America/Cayman'
        },
        {
          value: 'America/Chicago',
          label: '(UTC-0600) America/Chicago'
        },
        {
          value: 'America/Chihuahua',
          label: '(UTC-0700) America/Chihuahua'
        },
        {
          value: 'America/Costa_Rica',
          label: '(UTC-0600) America/Costa_Rica'
        },
        {
          value: 'America/Creston',
          label: '(UTC-0700) America/Creston'
        },
        {
          value: 'America/Cuiaba',
          label: '(UTC-0400) America/Cuiaba'
        },
        {
          value: 'America/Curacao',
          label: '(UTC-0400) America/Curacao'
        },
        {
          value: 'America/Danmarkshavn',
          label: '(UTC+0000) America/Danmarkshavn'
        },
        {
          value: 'America/Dawson',
          label: '(UTC-0800) America/Dawson'
        },
        {
          value: 'America/Dawson_Creek',
          label: '(UTC-0700) America/Dawson_Creek'
        },
        {
          value: 'America/Denver',
          label: '(UTC-0700) America/Denver'
        },
        {
          value: 'America/Detroit',
          label: '(UTC-0500) America/Detroit'
        },
        {
          value: 'America/Dominica',
          label: '(UTC-0400) America/Dominica'
        },
        {
          value: 'America/Edmonton',
          label: '(UTC-0700) America/Edmonton'
        },
        {
          value: 'America/Eirunepe',
          label: '(UTC-0500) America/Eirunepe'
        },
        {
          value: 'America/El_Salvador',
          label: '(UTC-0600) America/El_Salvador'
        },
        {
          value: 'America/Fort_Nelson',
          label: '(UTC-0700) America/Fort_Nelson'
        },
        {
          value: 'America/Fortaleza',
          label: '(UTC-0300) America/Fortaleza'
        },
        {
          value: 'America/Glace_Bay',
          label: '(UTC-0400) America/Glace_Bay'
        },
        {
          value: 'America/Godthab',
          label: '(UTC-0300) America/Godthab'
        },
        {
          value: 'America/Goose_Bay',
          label: '(UTC-0400) America/Goose_Bay'
        },
        {
          value: 'America/Grand_Turk',
          label: '(UTC-0500) America/Grand_Turk'
        },
        {
          value: 'America/Grenada',
          label: '(UTC-0400) America/Grenada'
        },
        {
          value: 'America/Guadeloupe',
          label: '(UTC-0400) America/Guadeloupe'
        },
        {
          value: 'America/Guatemala',
          label: '(UTC-0600) America/Guatemala'
        },
        {
          value: 'America/Guayaquil',
          label: '(UTC-0500) America/Guayaquil'
        },
        {
          value: 'America/Guyana',
          label: '(UTC-0400) America/Guyana'
        },
        {
          value: 'America/Halifax',
          label: '(UTC-0400) America/Halifax'
        },
        {
          value: 'America/Havana',
          label: '(UTC-0500) America/Havana'
        },
        {
          value: 'America/Hermosillo',
          label: '(UTC-0700) America/Hermosillo'
        },
        {
          value: 'America/Indiana/Indianapolis',
          label: '(UTC-0500) America/Indiana/Indianapolis'
        },
        {
          value: 'America/Indiana/Knox',
          label: '(UTC-0600) America/Indiana/Knox'
        },
        {
          value: 'America/Indiana/Marengo',
          label: '(UTC-0500) America/Indiana/Marengo'
        },
        {
          value: 'America/Indiana/Petersburg',
          label: '(UTC-0500) America/Indiana/Petersburg'
        },
        {
          value: 'America/Indiana/Tell_City',
          label: '(UTC-0600) America/Indiana/Tell_City'
        },
        {
          value: 'America/Indiana/Vevay',
          label: '(UTC-0500) America/Indiana/Vevay'
        },
        {
          value: 'America/Indiana/Vincennes',
          label: '(UTC-0500) America/Indiana/Vincennes'
        },
        {
          value: 'America/Indiana/Winamac',
          label: '(UTC-0500) America/Indiana/Winamac'
        },
        {
          value: 'America/Inuvik',
          label: '(UTC-0700) America/Inuvik'
        },
        {
          value: 'America/Iqaluit',
          label: '(UTC-0500) America/Iqaluit'
        },
        {
          value: 'America/Jamaica',
          label: '(UTC-0500) America/Jamaica'
        },
        {
          value: 'America/Juneau',
          label: '(UTC-0900) America/Juneau'
        },
        {
          value: 'America/Kentucky/Louisville',
          label: '(UTC-0500) America/Kentucky/Louisville'
        },
        {
          value: 'America/Kentucky/Monticello',
          label: '(UTC-0500) America/Kentucky/Monticello'
        },
        {
          value: 'America/Kralendijk',
          label: '(UTC-0400) America/Kralendijk'
        },
        {
          value: 'America/La_Paz',
          label: '(UTC-0400) America/La_Paz'
        },
        {
          value: 'America/Lima',
          label: '(UTC-0500) America/Lima'
        },
        {
          value: 'America/Los_Angeles',
          label: '(UTC-0800) America/Los_Angeles'
        },
        {
          value: 'America/Lower_Princes',
          label: '(UTC-0400) America/Lower_Princes'
        },
        {
          value: 'America/Maceio',
          label: '(UTC-0300) America/Maceio'
        },
        {
          value: 'America/Managua',
          label: '(UTC-0600) America/Managua'
        },
        {
          value: 'America/Manaus',
          label: '(UTC-0400) America/Manaus'
        },
        {
          value: 'America/Marigot',
          label: '(UTC-0400) America/Marigot'
        },
        {
          value: 'America/Martinique',
          label: '(UTC-0400) America/Martinique'
        },
        {
          value: 'America/Matamoros',
          label: '(UTC-0600) America/Matamoros'
        },
        {
          value: 'America/Mazatlan',
          label: '(UTC-0700) America/Mazatlan'
        },
        {
          value: 'America/Menominee',
          label: '(UTC-0600) America/Menominee'
        },
        {
          value: 'America/Merida',
          label: '(UTC-0600) America/Merida'
        },
        {
          value: 'America/Metlakatla',
          label: '(UTC-0900) America/Metlakatla'
        },
        {
          value: 'America/Mexico_City',
          label: '(UTC-0600) America/Mexico_City'
        },
        {
          value: 'America/Miquelon',
          label: '(UTC-0300) America/Miquelon'
        },
        {
          value: 'America/Moncton',
          label: '(UTC-0400) America/Moncton'
        },
        {
          value: 'America/Monterrey',
          label: '(UTC-0600) America/Monterrey'
        },
        {
          value: 'America/Montevideo',
          label: '(UTC-0300) America/Montevideo'
        },
        {
          value: 'America/Montserrat',
          label: '(UTC-0400) America/Montserrat'
        },
        {
          value: 'America/Nassau',
          label: '(UTC-0500) America/Nassau'
        },
        {
          value: 'America/New_York',
          label: '(UTC-0500) America/New_York'
        },
        {
          value: 'America/Nipigon',
          label: '(UTC-0500) America/Nipigon'
        },
        {
          value: 'America/Nome',
          label: '(UTC-0900) America/Nome'
        },
        {
          value: 'America/Noronha',
          label: '(UTC-0200) America/Noronha'
        },
        {
          value: 'America/North_Dakota/Beulah',
          label: '(UTC-0600) America/North_Dakota/Beulah'
        },
        {
          value: 'America/North_Dakota/Center',
          label: '(UTC-0600) America/North_Dakota/Center'
        },
        {
          value: 'America/North_Dakota/New_Salem',
          label: '(UTC-0600) America/North_Dakota/New_Salem'
        },
        {
          value: 'America/Ojinaga',
          label: '(UTC-0700) America/Ojinaga'
        },
        {
          value: 'America/Panama',
          label: '(UTC-0500) America/Panama'
        },
        {
          value: 'America/Pangnirtung',
          label: '(UTC-0500) America/Pangnirtung'
        },
        {
          value: 'America/Paramaribo',
          label: '(UTC-0300) America/Paramaribo'
        },
        {
          value: 'America/Phoenix',
          label: '(UTC-0700) America/Phoenix'
        },
        {
          value: 'America/Port-au-Prince',
          label: '(UTC-0500) America/Port-au-Prince'
        },
        {
          value: 'America/Port_of_Spain',
          label: '(UTC-0400) America/Port_of_Spain'
        },
        {
          value: 'America/Porto_Velho',
          label: '(UTC-0400) America/Porto_Velho'
        },
        {
          value: 'America/Puerto_Rico',
          label: '(UTC-0400) America/Puerto_Rico'
        },
        {
          value: 'America/Punta_Arenas',
          label: '(UTC-0300) America/Punta_Arenas'
        },
        {
          value: 'America/Rainy_River',
          label: '(UTC-0600) America/Rainy_River'
        },
        {
          value: 'America/Rankin_Inlet',
          label: '(UTC-0600) America/Rankin_Inlet'
        },
        {
          value: 'America/Recife',
          label: '(UTC-0300) America/Recife'
        },
        {
          value: 'America/Regina',
          label: '(UTC-0600) America/Regina'
        },
        {
          value: 'America/Resolute',
          label: '(UTC-0600) America/Resolute'
        },
        {
          value: 'America/Rio_Branco',
          label: '(UTC-0500) America/Rio_Branco'
        },
        {
          value: 'America/Santarem',
          label: '(UTC-0300) America/Santarem'
        },
        {
          value: 'America/Santiago',
          label: '(UTC-0400) America/Santiago'
        },
        {
          value: 'America/Santo_Domingo',
          label: '(UTC-0400) America/Santo_Domingo'
        },
        {
          value: 'America/Sao_Paulo',
          label: '(UTC-0300) America/Sao_Paulo'
        },
        {
          value: 'America/Scoresbysund',
          label: '(UTC-0100) America/Scoresbysund'
        },
        {
          value: 'America/Sitka',
          label: '(UTC-0900) America/Sitka'
        },
        {
          value: 'America/St_Barthelemy',
          label: '(UTC-0400) America/St_Barthelemy'
        },
        {
          value: 'America/St_Johns',
          label: '(UTC-0330) America/St_Johns'
        },
        {
          value: 'America/St_Kitts',
          label: '(UTC-0400) America/St_Kitts'
        },
        {
          value: 'America/St_Lucia',
          label: '(UTC-0400) America/St_Lucia'
        },
        {
          value: 'America/St_Thomas',
          label: '(UTC-0400) America/St_Thomas'
        },
        {
          value: 'America/St_Vincent',
          label: '(UTC-0400) America/St_Vincent'
        },
        {
          value: 'America/Swift_Current',
          label: '(UTC-0600) America/Swift_Current'
        },
        {
          value: 'America/Tegucigalpa',
          label: '(UTC-0600) America/Tegucigalpa'
        },
        {
          value: 'America/Thule',
          label: '(UTC-0400) America/Thule'
        },
        {
          value: 'America/Thunder_Bay',
          label: '(UTC-0500) America/Thunder_Bay'
        },
        {
          value: 'America/Tijuana',
          label: '(UTC-0800) America/Tijuana'
        },
        {
          value: 'America/Toronto',
          label: '(UTC-0500) America/Toronto'
        },
        {
          value: 'America/Tortola',
          label: '(UTC-0400) America/Tortola'
        },
        {
          value: 'America/Vancouver',
          label: '(UTC-0800) America/Vancouver'
        },
        {
          value: 'America/Whitehorse',
          label: '(UTC-0800) America/Whitehorse'
        },
        {
          value: 'America/Winnipeg',
          label: '(UTC-0600) America/Winnipeg'
        },
        {
          value: 'America/Yakutat',
          label: '(UTC-0900) America/Yakutat'
        },
        {
          value: 'America/Yellowknife',
          label: '(UTC-0700) America/Yellowknife'
        },
        {
          value: 'Antarctica/Casey',
          label: '(UTC+0800) Antarctica/Casey'
        },
        {
          value: 'Antarctica/Davis',
          label: '(UTC+0700) Antarctica/Davis'
        },
        {
          value: 'Antarctica/DumontDUrville',
          label: '(UTC+1000) Antarctica/DumontDUrville'
        },
        {
          value: 'Antarctica/Macquarie',
          label: '(UTC+1100) Antarctica/Macquarie'
        },
        {
          value: 'Antarctica/Mawson',
          label: '(UTC+0500) Antarctica/Mawson'
        },
        {
          value: 'Antarctica/McMurdo',
          label: '(UTC+1300) Antarctica/McMurdo'
        },
        {
          value: 'Antarctica/Palmer',
          label: '(UTC-0300) Antarctica/Palmer'
        },
        {
          value: 'Antarctica/Rothera',
          label: '(UTC-0300) Antarctica/Rothera'
        },
        {
          value: 'Antarctica/Syowa',
          label: '(UTC+0300) Antarctica/Syowa'
        },
        {
          value: 'Antarctica/Troll',
          label: '(UTC+0000) Antarctica/Troll'
        },
        {
          value: 'Antarctica/Vostok',
          label: '(UTC+0600) Antarctica/Vostok'
        },
        {
          value: 'Arctic/Longyearbyen',
          label: '(UTC+0200) Arctic/Longyearbyen'
        },
        {
          value: 'Asia/Aden',
          label: '(UTC+0300) Asia/Aden'
        },
        {
          value: 'Asia/Almaty',
          label: '(UTC+0600) Asia/Almaty'
        },
        {
          value: 'Asia/Amman',
          label: '(UTC+0300) Asia/Amman'
        },
        {
          value: 'Asia/Anadyr',
          label: '(UTC+1200) Asia/Anadyr'
        },
        {
          value: 'Asia/Aqtau',
          label: '(UTC+0500) Asia/Aqtau'
        },
        {
          value: 'Asia/Aqtobe',
          label: '(UTC+0500) Asia/Aqtobe'
        },
        {
          value: 'Asia/Ashgabat',
          label: '(UTC+0500) Asia/Ashgabat'
        },
        {
          value: 'Asia/Atyrau',
          label: '(UTC+0500) Asia/Atyrau'
        },
        {
          value: 'Asia/Baghdad',
          label: '(UTC+0300) Asia/Baghdad'
        },
        {
          value: 'Asia/Bahrain',
          label: '(UTC+0300) Asia/Bahrain'
        },
        {
          value: 'Asia/Baku',
          label: '(UTC+0400) Asia/Baku'
        },
        {
          value: 'Asia/Bangkok',
          label: '(UTC+0700) Asia/Bangkok'
        },
        {
          value: 'Asia/Barnaul',
          label: '(UTC+0700) Asia/Barnaul'
        },
        {
          value: 'Asia/Beirut',
          label: '(UTC+0300) Asia/Beirut'
        },
        {
          value: 'Asia/Bishkek',
          label: '(UTC+0600) Asia/Bishkek'
        },
        {
          value: 'Asia/Brunei',
          label: '(UTC+0800) Asia/Brunei'
        },
        {
          value: 'Asia/Chita',
          label: '(UTC+0900) Asia/Chita'
        },
        {
          value: 'Asia/Choibalsan',
          label: '(UTC+0800) Asia/Choibalsan'
        },
        {
          value: 'Asia/Colombo',
          label: '(UTC+0530) Asia/Colombo'
        },
        {
          value: 'Asia/Damascus',
          label: '(UTC+0300) Asia/Damascus'
        },
        {
          value: 'Asia/Dhaka',
          label: '(UTC+0600) Asia/Dhaka'
        },
        {
          value: 'Asia/Dili',
          label: '(UTC+0900) Asia/Dili'
        },
        {
          value: 'Asia/Dubai',
          label: '(UTC+0400) Asia/Dubai'
        },
        {
          value: 'Asia/Dushanbe',
          label: '(UTC+0500) Asia/Dushanbe'
        },
        {
          value: 'Asia/Famagusta',
          label: '(UTC+0300) Asia/Famagusta'
        },
        {
          value: 'Asia/Gaza',
          label: '(UTC+0300) Asia/Gaza'
        },
        {
          value: 'Asia/Hebron',
          label: '(UTC+0300) Asia/Hebron'
        },
        {
          value: 'Asia/Ho_Chi_Minh',
          label: '(UTC+0700) Asia/Ho_Chi_Minh'
        },
        {
          value: 'Asia/Hong_Kong',
          label: '(UTC+0900) Asia/Hong_Kong'
        },
        {
          value: 'Asia/Hovd',
          label: '(UTC+0700) Asia/Hovd'
        },
        {
          value: 'Asia/Irkutsk',
          label: '(UTC+0800) Asia/Irkutsk'
        },
        {
          value: 'Asia/Jakarta',
          label: '(UTC+0730) Asia/Jakarta'
        },
        {
          value: 'Asia/Jayapura',
          label: '(UTC+0930) Asia/Jayapura'
        },
        {
          value: 'Asia/Jerusalem',
          label: '(UTC+0300) Asia/Jerusalem'
        },
        {
          value: 'Asia/Kabul',
          label: '(UTC+0430) Asia/Kabul'
        },
        {
          value: 'Asia/Kamchatka',
          label: '(UTC+1200) Asia/Kamchatka'
        },
        {
          value: 'Asia/Karachi',
          label: '(UTC+0600) Asia/Karachi'
        },
        {
          value: 'Asia/Kathmandu',
          label: '(UTC+0545) Asia/Kathmandu'
        },
        {
          value: 'Asia/Khandyga',
          label: '(UTC+0900) Asia/Khandyga'
        },
        {
          value: 'Asia/Kolkata',
          label: '(UTC+0630) Asia/Kolkata'
        },
        {
          value: 'Asia/Krasnoyarsk',
          label: '(UTC+0700) Asia/Krasnoyarsk'
        },
        {
          value: 'Asia/Kuala_Lumpur',
          label: '(UTC+0800) Asia/Kuala_Lumpur'
        },
        {
          value: 'Asia/Kuching',
          label: '(UTC+0800) Asia/Kuching'
        },
        {
          value: 'Asia/Kuwait',
          label: '(UTC+0300) Asia/Kuwait'
        },
        {
          value: 'Asia/Macau',
          label: '(UTC+0900) Asia/Macau'
        },
        {
          value: 'Asia/Magadan',
          label: '(UTC+1100) Asia/Magadan'
        },
        {
          value: 'Asia/Makassar',
          label: '(UTC+0900) Asia/Makassar'
        },
        {
          value: 'Asia/Manila',
          label: '(UTC+0900) Asia/Manila'
        },
        {
          value: 'Asia/Muscat',
          label: '(UTC+0400) Asia/Muscat'
        },
        {
          value: 'Asia/Nicosia',
          label: '(UTC+0300) Asia/Nicosia'
        },
        {
          value: 'Asia/Novokuznetsk',
          label: '(UTC+0700) Asia/Novokuznetsk'
        },
        {
          value: 'Asia/Novosibirsk',
          label: '(UTC+0700) Asia/Novosibirsk'
        },
        {
          value: 'Asia/Omsk',
          label: '(UTC+0600) Asia/Omsk'
        },
        {
          value: 'Asia/Oral',
          label: '(UTC+0500) Asia/Oral'
        },
        {
          value: 'Asia/Phnom_Penh',
          label: '(UTC+0700) Asia/Phnom_Penh'
        },
        {
          value: 'Asia/Pontianak',
          label: '(UTC+0800) Asia/Pontianak'
        },
        {
          value: 'Asia/Pyongyang',
          label: '(UTC+0830) Asia/Pyongyang'
        },
        {
          value: 'Asia/Qatar',
          label: '(UTC+0300) Asia/Qatar'
        },
        {
          value: 'Asia/Qostanay',
          label: '(UTC+0600) Asia/Qostanay'
        },
        {
          value: 'Asia/Qyzylorda',
          label: '(UTC+0500) Asia/Qyzylorda'
        },
        {
          value: 'Asia/Riyadh',
          label: '(UTC+0300) Asia/Riyadh'
        },
        {
          value: 'Asia/Sakhalin',
          label: '(UTC+1100) Asia/Sakhalin'
        },
        {
          value: 'Asia/Samarkand',
          label: '(UTC+0500) Asia/Samarkand'
        },
        {
          value: 'Asia/Seoul',
          label: '(UTC+1000) Asia/Seoul'
        },
        {
          value: 'Asia/Shanghai',
          label: '(UTC+0900) Asia/Shanghai'
        },
        {
          value: 'Asia/Singapore',
          label: '(UTC+0800) Asia/Singapore'
        },
        {
          value: 'Asia/Srednekolymsk',
          label: '(UTC+1100) Asia/Srednekolymsk'
        },
        {
          value: 'Asia/Taipei',
          label: '(UTC+0900) Asia/Taipei'
        },
        {
          value: 'Asia/Tashkent',
          label: '(UTC+0500) Asia/Tashkent'
        },
        {
          value: 'Asia/Tbilisi',
          label: '(UTC+0400) Asia/Tbilisi'
        },
        {
          value: 'Asia/Tehran',
          label: '(UTC+0430) Asia/Tehran'
        },
        {
          value: 'Asia/Thimphu',
          label: '(UTC+0600) Asia/Thimphu'
        },
        {
          value: 'Asia/Tokyo',
          label: '(UTC+1000) Asia/Tokyo'
        },
        {
          value: 'Asia/Tomsk',
          label: '(UTC+0700) Asia/Tomsk'
        },
        {
          value: 'Asia/Ulaanbaatar',
          label: '(UTC+0800) Asia/Ulaanbaatar'
        },
        {
          value: 'Asia/Urumqi',
          label: '(UTC+0600) Asia/Urumqi'
        },
        {
          value: 'Asia/Ust-Nera',
          label: '(UTC+1000) Asia/Ust-Nera'
        },
        {
          value: 'Asia/Vientiane',
          label: '(UTC+0700) Asia/Vientiane'
        },
        {
          value: 'Asia/Vladivostok',
          label: '(UTC+1000) Asia/Vladivostok'
        },
        {
          value: 'Asia/Yakutsk',
          label: '(UTC+0900) Asia/Yakutsk'
        },
        {
          value: 'Asia/Yangon',
          label: '(UTC+0630) Asia/Yangon'
        },
        {
          value: 'Asia/Yekaterinburg',
          label: '(UTC+0500) Asia/Yekaterinburg'
        },
        {
          value: 'Asia/Yerevan',
          label: '(UTC+0400) Asia/Yerevan'
        },
        {
          value: 'Atlantic/Azores',
          label: '(UTC-0100) Atlantic/Azores'
        },
        {
          value: 'Atlantic/Bermuda',
          label: '(UTC-0400) Atlantic/Bermuda'
        },
        {
          value: 'Atlantic/Canary',
          label: '(UTC+0000) Atlantic/Canary'
        },
        {
          value: 'Atlantic/Cape_Verde',
          label: '(UTC-0100) Atlantic/Cape_Verde'
        },
        {
          value: 'Atlantic/Faroe',
          label: '(UTC+0000) Atlantic/Faroe'
        },
        {
          value: 'Atlantic/Madeira',
          label: '(UTC+0000) Atlantic/Madeira'
        },
        {
          value: 'Atlantic/Reykjavik',
          label: '(UTC+0000) Atlantic/Reykjavik'
        },
        {
          value: 'Atlantic/South_Georgia',
          label: '(UTC-0200) Atlantic/South_Georgia'
        },
        {
          value: 'Atlantic/St_Helena',
          label: '(UTC+0000) Atlantic/St_Helena'
        },
        {
          value: 'Atlantic/Stanley',
          label: '(UTC-0300) Atlantic/Stanley'
        },
        {
          value: 'Australia/Adelaide',
          label: '(UTC+1030) Australia/Adelaide'
        },
        {
          value: 'Australia/Brisbane',
          label: '(UTC+1100) Australia/Brisbane'
        },
        {
          value: 'Australia/Broken_Hill',
          label: '(UTC+1030) Australia/Broken_Hill'
        },
        {
          value: 'Australia/Currie',
          label: '(UTC+1100) Australia/Currie'
        },
        {
          value: 'Australia/Darwin',
          label: '(UTC+1030) Australia/Darwin'
        },
        {
          value: 'Australia/Eucla',
          label: '(UTC+0845) Australia/Eucla'
        },
        {
          value: 'Australia/Hobart',
          label: '(UTC+1100) Australia/Hobart'
        },
        {
          value: 'Australia/Lindeman',
          label: '(UTC+1100) Australia/Lindeman'
        },
        {
          value: 'Australia/Lord_Howe',
          label: '(UTC+1100) Australia/Lord_Howe'
        },
        {
          value: 'Australia/Melbourne',
          label: '(UTC+1100) Australia/Melbourne'
        },
        {
          value: 'Australia/Perth',
          label: '(UTC+0900) Australia/Perth'
        },
        {
          value: 'Australia/Sydney',
          label: '(UTC+1100) Australia/Sydney'
        },
        {
          value: 'Canada/Atlantic',
          label: '(UTC-0400) Canada/Atlantic'
        },
        {
          value: 'Canada/Central',
          label: '(UTC-0600) Canada/Central'
        },
        {
          value: 'Canada/Eastern',
          label: '(UTC-0500) Canada/Eastern'
        },
        {
          value: 'Canada/Mountain',
          label: '(UTC-0700) Canada/Mountain'
        },
        {
          value: 'Canada/Newfoundland',
          label: '(UTC-0330) Canada/Newfoundland'
        },
        {
          value: 'Canada/Pacific',
          label: '(UTC-0800) Canada/Pacific'
        },
        {
          value: 'Europe/Amsterdam',
          label: '(UTC+0200) Europe/Amsterdam'
        },
        {
          value: 'Europe/Andorra',
          label: '(UTC+0200) Europe/Andorra'
        },
        {
          value: 'Europe/Astrakhan',
          label: '(UTC+0400) Europe/Astrakhan'
        },
        {
          value: 'Europe/Athens',
          label: '(UTC+0300) Europe/Athens'
        },
        {
          value: 'Europe/Belgrade',
          label: '(UTC+0200) Europe/Belgrade'
        },
        {
          value: 'Europe/Berlin',
          label: '(UTC+0200) Europe/Berlin'
        },
        {
          value: 'Europe/Bratislava',
          label: '(UTC+0200) Europe/Bratislava'
        },
        {
          value: 'Europe/Brussels',
          label: '(UTC+0200) Europe/Brussels'
        },
        {
          value: 'Europe/Bucharest',
          label: '(UTC+0300) Europe/Bucharest'
        },
        {
          value: 'Europe/Budapest',
          label: '(UTC+0200) Europe/Budapest'
        },
        {
          value: 'Europe/Busingen',
          label: '(UTC+0200) Europe/Busingen'
        },
        {
          value: 'Europe/Chisinau',
          label: '(UTC+0300) Europe/Chisinau'
        },
        {
          value: 'Europe/Copenhagen',
          label: '(UTC+0200) Europe/Copenhagen'
        },
        {
          value: 'Europe/Dublin',
          label: '(UTC+0000) Europe/Dublin'
        },
        {
          value: 'Europe/Gibraltar',
          label: '(UTC+0200) Europe/Gibraltar'
        },
        {
          value: 'Europe/Guernsey',
          label: '(UTC+0000) Europe/Guernsey'
        },
        {
          value: 'Europe/Helsinki',
          label: '(UTC+0300) Europe/Helsinki'
        },
        {
          value: 'Europe/Isle_of_Man',
          label: '(UTC+0000) Europe/Isle_of_Man'
        },
        {
          value: 'Europe/Istanbul',
          label: '(UTC+0300) Europe/Istanbul'
        },
        {
          value: 'Europe/Jersey',
          label: '(UTC+0000) Europe/Jersey'
        },
        {
          value: 'Europe/Kaliningrad',
          label: '(UTC+0300) Europe/Kaliningrad'
        },
        {
          value: 'Europe/Kiev',
          label: '(UTC+0300) Europe/Kiev'
        },
        {
          value: 'Europe/Kirov',
          label: '(UTC+0300) Europe/Kirov'
        },
        {
          value: 'Europe/Lisbon',
          label: '(UTC+0000) Europe/Lisbon'
        },
        {
          value: 'Europe/Ljubljana',
          label: '(UTC+0200) Europe/Ljubljana'
        },
        {
          value: 'Europe/London',
          label: '(UTC+0000) Europe/London'
        },
        {
          value: 'Europe/Luxembourg',
          label: '(UTC+0200) Europe/Luxembourg'
        },
        {
          value: 'Europe/Madrid',
          label: '(UTC+0200) Europe/Madrid'
        },
        {
          value: 'Europe/Malta',
          label: '(UTC+0200) Europe/Malta'
        },
        {
          value: 'Europe/Mariehamn',
          label: '(UTC+0300) Europe/Mariehamn'
        },
        {
          value: 'Europe/Minsk',
          label: '(UTC+0300) Europe/Minsk'
        },
        {
          value: 'Europe/Monaco',
          label: '(UTC+0200) Europe/Monaco'
        },
        {
          value: 'Europe/Moscow',
          label: '(UTC+0400) Europe/Moscow'
        },
        {
          value: 'Europe/Oslo',
          label: '(UTC+0200) Europe/Oslo'
        },
        {
          value: 'Europe/Paris',
          label: '(UTC+0200) Europe/Paris'
        },
        {
          value: 'Europe/Podgorica',
          label: '(UTC+0200) Europe/Podgorica'
        },
        {
          value: 'Europe/Prague',
          label: '(UTC+0200) Europe/Prague'
        },
        {
          value: 'Europe/Riga',
          label: '(UTC+0300) Europe/Riga'
        },
        {
          value: 'Europe/Rome',
          label: '(UTC+0200) Europe/Rome'
        },
        {
          value: 'Europe/Samara',
          label: '(UTC+0400) Europe/Samara'
        },
        {
          value: 'Europe/San_Marino',
          label: '(UTC+0200) Europe/San_Marino'
        },
        {
          value: 'Europe/Sarajevo',
          label: '(UTC+0200) Europe/Sarajevo'
        },
        {
          value: 'Europe/Saratov',
          label: '(UTC+0400) Europe/Saratov'
        },
        {
          value: 'Europe/Simferopol',
          label: '(UTC+0400) Europe/Simferopol'
        },
        {
          value: 'Europe/Skopje',
          label: '(UTC+0200) Europe/Skopje'
        },
        {
          value: 'Europe/Sofia',
          label: '(UTC+0300) Europe/Sofia'
        },
        {
          value: 'Europe/Stockholm',
          label: '(UTC+0200) Europe/Stockholm'
        },
        {
          value: 'Europe/Tallinn',
          label: '(UTC+0300) Europe/Tallinn'
        },
        {
          value: 'Europe/Tirane',
          label: '(UTC+0200) Europe/Tirane'
        },
        {
          value: 'Europe/Ulyanovsk',
          label: '(UTC+0400) Europe/Ulyanovsk'
        },
        {
          value: 'Europe/Uzhgorod',
          label: '(UTC+0300) Europe/Uzhgorod'
        },
        {
          value: 'Europe/Vaduz',
          label: '(UTC+0200) Europe/Vaduz'
        },
        {
          value: 'Europe/Vatican',
          label: '(UTC+0200) Europe/Vatican'
        },
        {
          value: 'Europe/Vienna',
          label: '(UTC+0200) Europe/Vienna'
        },
        {
          value: 'Europe/Vilnius',
          label: '(UTC+0300) Europe/Vilnius'
        },
        {
          value: 'Europe/Volgograd',
          label: '(UTC+0400) Europe/Volgograd'
        },
        {
          value: 'Europe/Warsaw',
          label: '(UTC+0200) Europe/Warsaw'
        },
        {
          value: 'Europe/Zagreb',
          label: '(UTC+0200) Europe/Zagreb'
        },
        {
          value: 'Europe/Zaporozhye',
          label: '(UTC+0300) Europe/Zaporozhye'
        },
        {
          value: 'Europe/Zurich',
          label: '(UTC+0200) Europe/Zurich'
        },
        {
          value: 'GMT',
          label: '(UTC+0000) GMT'
        },
        {
          value: 'Indian/Antananarivo',
          label: '(UTC+0245) Indian/Antananarivo'
        },
        {
          value: 'Indian/Chagos',
          label: '(UTC+0600) Indian/Chagos'
        },
        {
          value: 'Indian/Christmas',
          label: '(UTC+0700) Indian/Christmas'
        },
        {
          value: 'Indian/Cocos',
          label: '(UTC+0630) Indian/Cocos'
        },
        {
          value: 'Indian/Comoro',
          label: '(UTC+0245) Indian/Comoro'
        },
        {
          value: 'Indian/Kerguelen',
          label: '(UTC+0500) Indian/Kerguelen'
        },
        {
          value: 'Indian/Mahe',
          label: '(UTC+0400) Indian/Mahe'
        },
        {
          value: 'Indian/Maldives',
          label: '(UTC+0500) Indian/Maldives'
        },
        {
          value: 'Indian/Mauritius',
          label: '(UTC+0400) Indian/Mauritius'
        },
        {
          value: 'Indian/Mayotte',
          label: '(UTC+0245) Indian/Mayotte'
        },
        {
          value: 'Indian/Reunion',
          label: '(UTC+0400) Indian/Reunion'
        },
        {
          value: 'Pacific/Apia',
          label: '(UTC+1400) Pacific/Apia'
        },
        {
          value: 'Pacific/Auckland',
          label: '(UTC+1300) Pacific/Auckland'
        },
        {
          value: 'Pacific/Bougainville',
          label: '(UTC+1100) Pacific/Bougainville'
        },
        {
          value: 'Pacific/Chatham',
          label: '(UTC+1345) Pacific/Chatham'
        },
        {
          value: 'Pacific/Chuuk',
          label: '(UTC+1000) Pacific/Chuuk'
        },
        {
          value: 'Pacific/Easter',
          label: '(UTC-0600) Pacific/Easter'
        },
        {
          value: 'Pacific/Efate',
          label: '(UTC+1100) Pacific/Efate'
        },
        {
          value: 'Pacific/Enderbury',
          label: '(UTC+1300) Pacific/Enderbury'
        },
        {
          value: 'Pacific/Fakaofo',
          label: '(UTC+1300) Pacific/Fakaofo'
        },
        {
          value: 'Pacific/Fiji',
          label: '(UTC+1300) Pacific/Fiji'
        },
        {
          value: 'Pacific/Funafuti',
          label: '(UTC+1200) Pacific/Funafuti'
        },
        {
          value: 'Pacific/Galapagos',
          label: '(UTC-0600) Pacific/Galapagos'
        },
        {
          value: 'Pacific/Gambier',
          label: '(UTC-0900) Pacific/Gambier'
        },
        {
          value: 'Pacific/Guadalcanal',
          label: '(UTC+1100) Pacific/Guadalcanal'
        },
        {
          value: 'Pacific/Guam',
          label: '(UTC+1000) Pacific/Guam'
        },
        {
          value: 'Pacific/Honolulu',
          label: '(UTC-1000) Pacific/Honolulu'
        },
        {
          value: 'Pacific/Kiritimati',
          label: '(UTC+1400) Pacific/Kiritimati'
        },
        {
          value: 'Pacific/Kosrae',
          label: '(UTC+1100) Pacific/Kosrae'
        },
        {
          value: 'Pacific/Kwajalein',
          label: '(UTC+1200) Pacific/Kwajalein'
        },
        {
          value: 'Pacific/Majuro',
          label: '(UTC+1200) Pacific/Majuro'
        },
        {
          value: 'Pacific/Marquesas',
          label: '(UTC-0930) Pacific/Marquesas'
        },
        {
          value: 'Pacific/Midway',
          label: '(UTC-1100) Pacific/Midway'
        },
        {
          value: 'Pacific/Nauru',
          label: '(UTC+1200) Pacific/Nauru'
        },
        {
          value: 'Pacific/Niue',
          label: '(UTC-1100) Pacific/Niue'
        },
        {
          value: 'Pacific/Norfolk',
          label: '(UTC+1200) Pacific/Norfolk'
        },
        {
          value: 'Pacific/Noumea',
          label: '(UTC+1100) Pacific/Noumea'
        },
        {
          value: 'Pacific/Pago_Pago',
          label: '(UTC-1100) Pacific/Pago_Pago'
        },
        {
          value: 'Pacific/Palau',
          label: '(UTC+0900) Pacific/Palau'
        },
        {
          value: 'Pacific/Pitcairn',
          label: '(UTC-0800) Pacific/Pitcairn'
        },
        {
          value: 'Pacific/Pohnpei',
          label: '(UTC+1100) Pacific/Pohnpei'
        },
        {
          value: 'Pacific/Port_Moresby',
          label: '(UTC+1000) Pacific/Port_Moresby'
        },
        {
          value: 'Pacific/Rarotonga',
          label: '(UTC-1000) Pacific/Rarotonga'
        },
        {
          value: 'Pacific/Saipan',
          label: '(UTC+1000) Pacific/Saipan'
        },
        {
          value: 'Pacific/Tahiti',
          label: '(UTC-1000) Pacific/Tahiti'
        },
        {
          value: 'Pacific/Tarawa',
          label: '(UTC+1200) Pacific/Tarawa'
        },
        {
          value: 'Pacific/Tongatapu',
          label: '(UTC+1300) Pacific/Tongatapu'
        },
        {
          value: 'Pacific/Wake',
          label: '(UTC+1200) Pacific/Wake'
        },
        {
          value: 'Pacific/Wallis',
          label: '(UTC+1200) Pacific/Wallis'
        },
        {
          value: 'US/Alaska',
          label: '(UTC-0900) US/Alaska'
        },
        {
          value: 'US/Arizona',
          label: '(UTC-0700) US/Arizona'
        },
        {
          value: 'US/Central',
          label: '(UTC-0600) US/Central'
        },
        {
          value: 'US/Eastern',
          label: '(UTC-0500) US/Eastern'
        },
        {
          value: 'US/Hawaii',
          label: '(UTC-1000) US/Hawaii'
        },
        {
          value: 'US/Mountain',
          label: '(UTC-0700) US/Mountain'
        },
        {
          value: 'US/Pacific',
          label: '(UTC-0800) US/Pacific'
        },
        {
          value: 'UTC',
          label: '(UTC+0000) UTC'
        }
      ]
    },
    {
      'Attribute.ToModel': [
        {
          value: 'matters.matter',
          label: 'Matter'
        },
        {
          value: 'characters.character',
          label: 'Character'
        },
        {
          value: 'expenses.expense',
          label: 'Expense'
        },
        {
          value: 'card.card',
          label: 'Card'
        }
      ],
      'Attribute.Type': [
        {
          value: 'ActivityCode',
          label: 'ActivityCode'
        },
        {
          value: 'Attachment',
          label: 'Attachment'
        },
        {
          value: 'Checkbox',
          label: 'Checkbox'
        },
        {
          value: 'Checklist',
          label: 'Checklist'
        },
        {
          value: 'Currency',
          label: 'Currency'
        },
        {
          value: 'Date',
          label: 'Date'
        },
        {
          value: 'DateTime',
          label: 'DateTime'
        },
        {
          value: 'Decimal',
          label: 'Decimal'
        },
        {
          value: 'Dropdown',
          label: 'Dropdown'
        },
        {
          value: 'Email',
          label: 'Email'
        },
        {
          value: 'ExpenseCode',
          label: 'ExpenseCode'
        },
        {
          value: 'Image',
          label: 'Image'
        },
        {
          value: 'Integer',
          label: 'Integer'
        },
        {
          value: 'Labels',
          label: 'Labels'
        },
        {
          value: 'Link',
          label: 'Link'
        },
        {
          value: 'LitigationCode',
          label: 'LitigationCode'
        },
        {
          value: 'Member',
          label: 'Member'
        },
        {
          value: 'Phone',
          label: 'Phone'
        },
        {
          value: 'Progress',
          label: 'Progress'
        },
        {
          value: 'Text',
          label: 'Text'
        }
      ]
    }
  ],
  system: {
    max_upload_size: 10485760,
    page_size: 20,
    bookmarkable_models: [
      {
        value: 34,
        label: 'Matter'
      },
      {
        value: 313,
        label: 'MatterDocketEntry'
      },
      {
        value: 119,
        label: 'Character'
      },
      {
        value: 147,
        label: 'RequestSet'
      },
      {
        value: 172,
        label: 'Deposition'
      },
      {
        value: 264,
        label: 'Expense'
      },
      {
        value: 310,
        label: 'SatlegalMeeting'
      },
      {
        value: 316,
        label: 'PrivilegeLog'
      },
      {
        value: 16,
        label: 'Client'
      },
      {
        value: 82,
        label: 'Fact'
      },
      {
        value: 92,
        label: 'Evidence'
      },
      {
        value: 115,
        label: 'Testimony'
      },
      {
        value: 151,
        label: 'RequestItem'
      },
      {
        value: 153,
        label: 'RequestSetDefinition'
      },
      {
        value: 173,
        label: 'DepositionRequestForProdDocs'
      },
      {
        value: 177,
        label: 'DepositionKeyPleading'
      },
      {
        value: 183,
        label: 'DepositionExhibit'
      },
      {
        value: 185,
        label: 'DepositionAffidavitStatement'
      },
      {
        value: 188,
        label: 'WrittenArticle'
      },
      {
        value: 190,
        label: 'PriorExperience'
      },
      {
        value: 191,
        label: 'PriorEmployment'
      },
      {
        value: 192,
        label: 'GivenDeposition'
      },
      {
        value: 193,
        label: 'DepositionInfoAndDocsExpert'
      },
      {
        value: 194,
        label: 'DepositionAuthoritative'
      },
      {
        value: 195,
        label: 'Subpoena'
      },
      {
        value: 199,
        label: 'SubpoenaRequest'
      },
      {
        value: 202,
        label: 'Risk'
      },
      {
        value: 272,
        label: 'CharacterHistory'
      },
      {
        value: 274,
        label: 'MatterFactVersion'
      },
      {
        value: 277,
        label: 'DepositionProceeding'
      },
      {
        value: 292,
        label: 'DepositionCorrespondence'
      },
      {
        value: 293,
        label: 'DepositionPublishedLiterature'
      },
      {
        value: 298,
        label: 'DepositionDaubert'
      },
      {
        value: 301,
        label: 'DepositionDraft'
      },
      {
        value: 306,
        label: 'RequestDocument'
      },
      {
        value: 321,
        label: 'RiskAction'
      },
      {
        value: 323,
        label: 'ClientAddressBook'
      },
      {
        value: 325,
        label: 'SubpoenaDefinitionAndInstruction'
      },
      {
        value: 326,
        label: 'SatlegalCitation'
      },
      {
        value: 328,
        label: 'LegalIssue'
      }
    ],
    relatable_model: [
      {
        value: 1,
        label: 'Card'
      },
      {
        value: 264,
        label: 'Expense'
      },
      {
        value: 119,
        label: 'Character'
      },
      {
        value: 92,
        label: 'Evidence'
      },
      {
        value: 172,
        label: 'Deposition'
      },
      {
        value: 183,
        label: 'DepositionExhibit'
      },
      {
        value: 277,
        label: 'DepositionProceeding'
      },
      {
        value: 82,
        label: 'Fact'
      },
      {
        value: 147,
        label: 'RequestSet'
      },
      {
        value: 151,
        label: 'RequestItem'
      },
      {
        value: 202,
        label: 'Risk'
      },
      {
        value: 321,
        label: 'RiskAction'
      },
      {
        value: 316,
        label: 'PrivilegeLog'
      },
      {
        value: 326,
        label: 'SatlegalCitation'
      },
      {
        value: 328,
        label: 'LegalIssue'
      },
      {
        value: 115,
        label: 'Testimony'
      },
      {
        value: 313,
        label: 'MatterDocketEntry'
      },
      {
        value: 248,
        label: 'Meeting'
      },
      {
        value: 305,
        label: 'RequestElement'
      }
    ]
  },
  activity_types: {
    Workspace: {
      ADDED_MEMBERS: 'added members',
      REMOVED_MEMBER: 'removed member',
      UPDATED_MEMBER_ROLE: 'updated member role'
    },
    Project: {
      ADDED_MEMBERS: 'added members',
      REMOVED_MEMBER: 'removed member',
      UPDATED_MEMBER_ROLE: 'updated member role',
      CREATED_PROJECT: 'created project'
    },
    Board: {
      ADDED_MEMBERS: 'added members',
      REMOVED_MEMBER: 'removed member',
      UPDATED_MEMBER_ROLE: 'updated member role'
    },
    Card: {
      ADDED_MEMBERS: 'added members',
      REMOVED_MEMBER: 'removed member',
      UPDATED_MEMBER_ROLE: 'updated member role',
      CREATED_CARD: 'created card',
      UPDATED_CARD: 'updated card',
      ATTACHED_FILE: 'attached file',
      DELETED_FILE: 'deleted file',
      COMMENTED: 'commented',
      UPDATED_COMMENT: 'updated comment',
      CREATED_CHECKLIST: 'created checklist',
      UPDATED_CHECKLIST: 'updated checklist',
      DELETED_CHECKLIST: 'deleted checklist',
      MARKED_COMPLETE_CHECKLIST_ITEM: 'marked complete checklist item',
      MARKED_INCOMPLETE_CHECKLIST_ITEM: 'marked incomplete checklist item'
    }
  }
}

export const getChoicesConfigByName = (model) => {
  try {
    return appConfigsMatters.choices.find(
      (choice) => Object.keys(choice)[0] === model
    )[model]
  } catch (e) {
    return []
  }
}

import { v4 as uuid } from 'uuid'
import faker from 'faker'
const cards = [
  {
    pk: uuid(),
    name: faker.name.jobTitle(),
    description: faker.name.jobDescriptor(),
    attachments: faker.name.jobDescriptor(),
    checklist: [],
    notes: [],
    comments: [],
    activities: [],
    assigned: [],
    start_date: '',
    end_date: '',
    labels: [],
    estimate_time: '',
    progress: 85
  }
]

async function getDataHelpDesk(req) {
  if (req.type === 'all_tickets') {
    return {
      ['all_tickets']: {
        results: dataHelpDesk,
        totals: dataHelpDesk.length
      }
    };
  } else if (req.type && req.type !== 'all_tickets') {
    let response = dataHelpDesk.filter(x => x[req.type] === req.value)
    return {
      [req.type]: {
        id: 1,
        results: response,
        totals: response.length
      }
    };
  }
}

async function updateTickets(req) {
  return req;
}

async function removeTickets(req) {
  return req;
}

async function createTickets(req) {
  return {
    ...req,
    id: Math.random(),
    received_date: new Date().toISOString(),
    ticket_id: 10000,
    members: [],
    assigneeByMe: true,
    deadline: new Date().toISOString()
  };
}

export default {
  getDataHelpDesk,
  updateTickets,
  removeTickets,
  createTickets
}

const dataHelpDesk = [
  {
    id: 1,
    name: "Tickets 1",
    received_date: new Date().toISOString(),
    ticket_id: 1996,
    priority: 1,
    urgency: 1,
    category: 1,
    status: 1,
    members: [6, 3],
    client_name: "Client singapore",
    assigneeByMe: true,
    order: 1,
    total_attachments: 2,
    deadline: new Date().toISOString()
  },
  {
    id: 2,
    name: "Tickets 2",
    received_date: new Date().toISOString(),
    ticket_id: 1992,
    priority: 5,
    urgency: 2,
    category: 4,
    status: 2,
    members: [7, 3],
    client_name: "Client India",
    order: 2,
    total_attachments: 2,
    deadline: new Date().toISOString()
  },
  {
    id: 3,
    name: "Tickets 3",
    received_date: new Date().toISOString(),
    ticket_id: 1993,
    priority: 4,
    urgency: 3,
    category: 1,
    status: 3,
    members: [6, 7, 3],
    client_name: "Client Korea",
    assigneeByMe: true,
    order: 3,
    total_attachments: 2,
    deadline: new Date().toISOString()
  },
  {
    id: 4,
    name: "Tickets 4",
    received_date: new Date().toISOString(),
    ticket_id: 1991,
    priority: 2,
    urgency: 4,
    category: 2,
    status: 2,
    members: [3,],
    client_name: "Client Japan",
    order: 4,
    total_attachments: 2,
    deadline: new Date().toISOString()
  },
  {
    id: 5,
    name: "Tickets 5",
    received_date: new Date().toISOString(),
    ticket_id: 1994,
    priority: 3,
    urgency: 5,
    category: 3, status: 1,
    members: [7, 6],
    client_name: "Client US",
    assigneeByMe: true,
    order: 5,
    total_attachments: 2,
    deadline: new Date().toISOString()
  }
]

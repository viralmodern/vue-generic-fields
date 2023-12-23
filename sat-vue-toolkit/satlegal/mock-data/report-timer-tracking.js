export const dataTimerTrackingDaily = {
  totals: 100,
  list: [
    {
      id: 1,
      projectName: "Project A",
      monday: "03:23",
      tuesday: "04:02",
      wednesday: "00:00",
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
      total: "07:25"
    },
    {
      id: 2,
      projectName: "EAM App Redesign",
      monday: "02:25",
      tuesday: "01:24",
      wednesday: "00:00",
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
      total: "03:49"
    },
    {
      id: 3,
      projectName: "Project D",
      monday: "04:00",
      tuesday: "01:24",
      wednesday: "00:00",
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
      total: "05:24"
    },
    {
      id: 4,
      projectName: "Protfolio Website",
      monday: "00:00",
      tuesday: "00:00",
      wednesday: "03:55",
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
      total: "03:55"
    },
    {
      id: 5,
      projectName: "Project K",
      monday: "01:50",
      tuesday: "02:05",
      wednesday: "00:00",
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
      total: "03:55"
    },
    {
      id: 6,
      projectName: "Project Z",
      monday: "00:00",
      tuesday: "04:05",
      wednesday: "05:55",
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
      total: "10:00"
    }
  ]
};

export const dataUsers = [
  {
    id: 1,
    name: "Admin"
  },
  {
    id: 2,
    name: "Owner"
  },
  {
    id: 3,
    name: "User"
  },
  {
    id: 4,
    name: "Member"
  }
];

export const dataBoardOrTaskName = [
  {
    id: 1,
    name: "task 1"
  },
  {
    id: 2,
    name: "task 2"
  },
  {
    id: 3,
    name: "task 3"
  },
  {
    id: 4,
    name: "task 4"
  }
];

export const dataListDate = [
  {
    id: 1,
    date: new Date(),
    list: [
      {
        id: 11,
        name: "Scott Marsh",
        hours: 10,
        minute: 30,
        text: "Milestone completed",
        type: {
          text: "None",
          color: "orange"
        },
        avatar:
          "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/11698694_698865856925862_8347425172458758406_n.jpg?_nc_cat=110&_nc_oc=AQnbjkOUfQgU3PWzpBcaaDKzuxgDVHKbxtTUwga9o79T6nRL1d9vB_tZBmGkz7HEPKo&_nc_ht=scontent.fdad2-1.fna&oh=f75de573d0b2dcb8e80c979ef4f6c4c2&oe=5D26CBDD"
      },
      {
        id: 12,
        name: "Kamron Neal",
        hours: 9,
        minute: 30,
        text: "Thi first phase has been completed",
        type: {
          text: "Billed",
          color: "primary"
        },
        avatar:
          "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/299020_325028950946422_322316910_n.jpg?_nc_cat=109&_nc_oc=AQkrzqnvzGP4FvNn_osThxDywzV6DxPvj34tN44fAGqXkkAfA1PYab9Decav1S1Mqt8&_nc_ht=scontent.fdad2-1.fna&oh=dcd18a681078c64c5e5ae2ead0f7c309&oe=5D245AF7"
      }
    ],
    totalHours: 19,
    totalMinute: 0
  },
  {
    id: 2,
    date: new Date().setDate(new Date().getDate() - 1),
    list: [
      {
        id: 11,
        name: "Scott Marsh",
        hours: 20,
        minute: 10,
        text: "Milestone completed",
        type: {
          text: "Void",
          color: "success"
        },
        avatar:
          "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/11698694_698865856925862_8347425172458758406_n.jpg?_nc_cat=110&_nc_oc=AQnbjkOUfQgU3PWzpBcaaDKzuxgDVHKbxtTUwga9o79T6nRL1d9vB_tZBmGkz7HEPKo&_nc_ht=scontent.fdad2-1.fna&oh=f75de573d0b2dcb8e80c979ef4f6c4c2&oe=5D26CBDD"
      },
      {
        id: 12,
        name: "Kamron Neal",
        hours: 9,
        minute: 7,
        text: "Thi first phase has been completed",
        type: {
          text: "Billed",
          color: "primary"
        },
        avatar:
          "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/299020_325028950946422_322316910_n.jpg?_nc_cat=109&_nc_oc=AQkrzqnvzGP4FvNn_osThxDywzV6DxPvj34tN44fAGqXkkAfA1PYab9Decav1S1Mqt8&_nc_ht=scontent.fdad2-1.fna&oh=dcd18a681078c64c5e5ae2ead0f7c309&oe=5D245AF7"
      }
    ],
    totalHours: 29,
    totalMinute: 17
  },
  {
    id: 3,
    date: new Date().setDate(new Date().getDate() - 2),
    list: [
      {
        id: 11,
        name: "Scott Marsh",
        hours: 20,
        minute: 10,
        text: "Milestone completed",
        type: {
          text: "Void",
          color: "success"
        },
        avatar:
          "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/11698694_698865856925862_8347425172458758406_n.jpg?_nc_cat=110&_nc_oc=AQnbjkOUfQgU3PWzpBcaaDKzuxgDVHKbxtTUwga9o79T6nRL1d9vB_tZBmGkz7HEPKo&_nc_ht=scontent.fdad2-1.fna&oh=f75de573d0b2dcb8e80c979ef4f6c4c2&oe=5D26CBDD"
      },
      {
        id: 12,
        name: "Kamron Neal",
        hours: 19,
        minute: 10,
        text: "Thi first phase has been completed",
        type: {
          text: "None",
          color: "orange"
        },
        avatar:
          "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/299020_325028950946422_322316910_n.jpg?_nc_cat=109&_nc_oc=AQkrzqnvzGP4FvNn_osThxDywzV6DxPvj34tN44fAGqXkkAfA1PYab9Decav1S1Mqt8&_nc_ht=scontent.fdad2-1.fna&oh=dcd18a681078c64c5e5ae2ead0f7c309&oe=5D245AF7"
      }
    ],
    totalHours: 39,
    totalMinute: 20
  }
];

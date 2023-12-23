<template>
  <div style="width:100%;height:100%">
    <div id="app" v-if="!destroy">
      <gantt-elastic
        :tasks="tasks"
        :options="options"
        :dynamic-style="dynamicStyle"
      >
        <!--        <gantt-header slot="header"></gantt-header>-->
        <!--        <gantt-footer slot="footer"></gantt-footer>-->
        <div>lorem</div>
      </gantt-elastic>
    </div>
  </div>
</template>

<script>
import faker from 'faker'
import dayjs from 'dayjs'
// just helper to get current dates
function getDate(hours) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()
  const timeStamp = new Date(
    currentYear,
    currentMonth,
    currentDay,
    0,
    0,
    0
  ).getTime()
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime()
}

let tasks = [
  {
    id: 1,
    label: faker.name.findName(),
    summary_percent: Math.floor(Math.random() * 100),
    summary_total: faker.random.number(),
    start: getDate(-24 * 1),
    duration: 5 * 24 * 60 * 60 * 1000,
    progress: 85,
    type: 'project'
    //collapsed: true,
  },
  {
    id: 2,
    label: 'With great power comes great responsibility',
    // label: faker.name.findName(),
    summary_percent: Math.floor(Math.random() * 100),
    summary_total: faker.random.number(),
    parentId: 1,
    start: getDate(-24 * 1),
    duration: 1 * 24 * 60 * 60 * 1000,
    progress: 50,
    type: 'milestone',
    collapsed: true,
    style: {
      /*base: {
          fill: '#1EBC61',
          stroke: '#0EAC51'
        },*/
      /*'tree-row-bar': {
          fill: '#1EBC61',
          stroke: '#0EAC51'
        },
        'tree-row-bar-polygon': {
          stroke: '#0EAC51'
        }*/
    }
  },
  // npm i vue-gantt-schedule-timeline-calendar
  {
    id: 3,
    label: 'Courage is being scared to death, but saddling up anyway.',
    // label: faker.name.findName(),
    summary_percent: Math.floor(Math.random() * 100),
    summary_total: faker.random.number(),
    parentId: 2,
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60 * 1000,
    progress: 100,
    type: 'task'
  },
  {
    id: 4,
    label: 'Put that toy AWAY!',
    // label: faker.name.findName(),
    summary_percent: Math.floor(Math.random() * 100),
    summary_total: faker.random.number(),
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    progress: 50,
    type: 'task',
    dependentOn: [3]
  }
]
let options = {
  maxRows: 100,
  maxHeight: 300,
  title: {
    label: 'Your project title as html (link or whatever...)',
    html: false
  },
  row: {
    height: 24
  },
  calendar: {
    hour: {
      display: false
    }
  },
  chart: {
    progress: {
      bar: false
    },
    expander: {
      display: true
    }
  },
  taskList: {
    expander: {
      straight: false
    },
    columns: [
      {
        id: 1,
        label: 'ID',
        value: 'id',
        width: 40
      },
      {
        id: 2,
        label: 'TaskBoard',
        value: 'label',
        width: 200,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            console.log('description clicked!\n' + data.label)
          }
        }
      },
      {
        id: 3,
        label: 'Project/Completion Percentage',
        value: 'summary_percent',
        width: 130,
        html: true
      },
      {
        id: 3,
        label: 'Total',
        // value: task => dayjs(task.start).format('YYYY-MM-DD'),
        // value: task => task,
        value: 'summary_total',
        width: 78
      }
    ]
  }
  /*locale:{
      name: 'pl', // name String
      weekdays: 'Poniedziałek_Wtorek_Środa_Czwartek_Piątek_Sobota_Niedziela'.split('_'), // weekdays Array
      weekdaysShort: 'Pon_Wto_Śro_Czw_Pią_Sob_Nie'.split('_'), // OPTIONAL, short weekdays Array, use first three letters if not provided
      weekdaysMin: 'Pn_Wt_Śr_Cz_Pt_So_Ni'.split('_'), // OPTIONAL, min weekdays Array, use first two letters if not provided
      months: 'Styczeń_Luty_Marzec_Kwiecień_Maj_Czerwiec_Lipiec_Sierpień_Wrzesień_Październik_Listopad_Grudzień'.split('_'), // months Array
      monthsShort: 'Sty_Lut_Mar_Kwi_Maj_Cze_Lip_Sie_Wrz_Paź_Lis_Gru'.split('_'), // OPTIONAL, short months Array, use first three letters if not provided
      ordinal: n => `${n}`, // ordinal Function (number) => return number + output
      relativeTime: { // relative time format strings, keep %s %d as the same
        future: 'za %s', // e.g. in 2 hours, %s been replaced with 2hours
        past: '%s temu',
        s: 'kilka sekund',
        m: 'minutę',
        mm: '%d minut',
        h: 'godzinę',
        hh: '%d godzin', // e.g. 2 hours, %d been replaced with 2
        d: 'dzień',
        dd: '%d dni',
        M: 'miesiąc',
        MM: '%d miesięcy',
        y: 'rok',
        yy: '%d lat'
      }
   }*/
}

import GanttHeader from 'gantt-elastic-header'
import GanttElastic from 'gantt-elastic'

export default {
  name: 'GanttGridTaskBoard',
  components: {
    GanttElastic,
    'gantt-header': GanttHeader,
    'gantt-footer': {
      template: `<span>this is a footer</span>`
    }
  },
  data() {
    return {
      tasks: tasks.map((task) => Object.assign({}, task)),
      options,
      dynamicStyle: {
        'task-list-header-label': {
          'font-weight': 'bold'
        }
      },
      destroy: false
    }
  }
}
</script>

<style scoped>
[class^='gantt-elastic'],
[class*=' gantt-elastic'] {
  white-space: nowrap;
}
</style>

<template>
  <v-row no-gutters>
    <TimeLine :timeline="dataTimelinePreview" />
  </v-row>
</template>

<script>
import TimeLine from "../ht_components/calendar/timeline/TimeLine";
export default {
  components: {
    TimeLine
  },
  data() {
    return {
      dataTimelinePreview: {
        "2018-12-31": [
          {
            event: {
              id: 1891,
              name: "Team Building 46",
              color: "#E91E63"
            },
            time: {
              from: "2019-04-22T19:43:00.090Z",
              to: "2019-04-22T21:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 3",
              color: "#9C27B0"
            },
            time: {
              from: "2019-04-22T19:00:00.090Z",
              to: "2019-04-22T08:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 33",
              color: "#673AB7"
            },
            time: {
              from: "2019-04-22T07:13:00.090Z",
              to: "2019-04-22T09:50:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 1",
              color: "#3F51B5"
            },
            time: {
              from: "2019-04-22T10:00:27.090Z",
              to: "2019-04-22T13:44:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 4",
              color: "#2196F3"
            },
            time: {
              from: "2019-04-22T04:23:00.358Z",
              to: "2019-04-22T10:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 7",
              color: "#03A9F4"
            },
            time: {
              from: "2019-04-22T05:00:00.358Z",
              to: "2019-04-22T09:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 9",
              color: "#009688"
            },
            time: {
              from: "2019-04-22T06:00:00.358Z",
              to: "2019-04-22T13:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          }
        ],
        "2019-01-01": [
          {
            event: {
              id: 1891,
              name: "Team Building 45",
              color: "#F44336"
            },
            time: {
              from: "2019-04-22T19:23:00.090Z",
              to: "2019-04-22T02:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 33",
              color: "#673AB7"
            },
            time: {
              from: "2019-04-22T07:13:00.090Z",
              to: "2019-04-22T09:50:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 1",
              color: "#3F51B5"
            },
            time: {
              from: "2019-04-22T10:00:27.090Z",
              to: "2019-04-22T13:44:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 4",
              color: "#2196F3"
            },
            time: {
              from: "2019-04-22T04:23:00.358Z",
              to: "2019-04-22T10:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 7",
              color: "#03A9F4"
            },
            time: {
              from: "2019-04-22T05:00:00.358Z",
              to: "2019-04-22T09:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 9",
              color: "#009688"
            },
            time: {
              from: "2019-04-22T06:00:00.358Z",
              to: "2019-04-22T13:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          }
        ],
        "2019-01-02": [
          {
            event: {
              id: 1891,
              name: "Team Building 45",
              color: "#F44336"
            },
            time: {
              from: "2019-04-22T19:23:00.090Z",
              to: "2019-04-22T02:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 46",
              color: "#E91E63"
            },
            time: {
              from: "2019-04-22T19:43:00.090Z",
              to: "2019-04-22T21:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 3",
              color: "#9C27B0"
            },
            time: {
              from: "2019-04-22T19:00:00.090Z",
              to: "2019-04-22T08:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 33",
              color: "#673AB7"
            },
            time: {
              from: "2019-04-22T07:13:00.090Z",
              to: "2019-04-22T09:50:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 1",
              color: "#3F51B5"
            },
            time: {
              from: "2019-04-22T10:00:27.090Z",
              to: "2019-04-22T13:44:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 4",
              color: "#2196F3"
            },
            time: {
              from: "2019-04-22T04:23:00.358Z",
              to: "2019-04-22T10:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 7",
              color: "#03A9F4"
            },
            time: {
              from: "2019-04-22T05:00:00.358Z",
              to: "2019-04-22T09:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 9",
              color: "#009688"
            },
            time: {
              from: "2019-04-22T06:00:00.358Z",
              to: "2019-04-22T13:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          }
        ],
        "2019-01-03": [
          {
            event: {
              id: 1891,
              name: "Team Building 45",
              color: "#F44336"
            },
            time: {
              from: "2019-04-22T19:23:00.090Z",
              to: "2019-04-22T02:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 46",
              color: "#E91E63"
            },
            time: {
              from: "2019-04-22T19:43:00.090Z",
              to: "2019-04-22T21:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 3",
              color: "#9C27B0"
            },
            time: {
              from: "2019-04-22T19:00:00.090Z",
              to: "2019-04-22T08:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 33",
              color: "#673AB7"
            },
            time: {
              from: "2019-04-22T07:13:00.090Z",
              to: "2019-04-22T09:50:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 1",
              color: "#3F51B5"
            },
            time: {
              from: "2019-04-22T10:00:27.090Z",
              to: "2019-04-22T13:44:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 4",
              color: "#2196F3"
            },
            time: {
              from: "2019-04-22T04:23:00.358Z",
              to: "2019-04-22T10:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 7",
              color: "#03A9F4"
            },
            time: {
              from: "2019-04-22T05:00:00.358Z",
              to: "2019-04-22T09:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 9",
              color: "#009688"
            },
            time: {
              from: "2019-04-22T06:00:00.358Z",
              to: "2019-04-22T13:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          }
        ],
        "2019-01-04": [
          {
            event: {
              id: 1891,
              name: "Team Building 45",
              color: "#F44336"
            },
            time: {
              from: "2019-04-22T19:23:00.090Z",
              to: "2019-04-22T02:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 46",
              color: "#E91E63"
            },
            time: {
              from: "2019-04-22T19:43:00.090Z",
              to: "2019-04-22T21:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 3",
              color: "#9C27B0"
            },
            time: {
              from: "2019-04-22T19:00:00.090Z",
              to: "2019-04-22T08:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 33",
              color: "#673AB7"
            },
            time: {
              from: "2019-04-22T07:13:00.090Z",
              to: "2019-04-22T09:50:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 1",
              color: "#3F51B5"
            },
            time: {
              from: "2019-04-22T10:00:27.090Z",
              to: "2019-04-22T13:44:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 4",
              color: "#2196F3"
            },
            time: {
              from: "2019-04-22T04:23:00.358Z",
              to: "2019-04-22T10:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 7",
              color: "#03A9F4"
            },
            time: {
              from: "2019-04-22T05:00:00.358Z",
              to: "2019-04-22T09:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 9",
              color: "#009688"
            },
            time: {
              from: "2019-04-22T06:00:00.358Z",
              to: "2019-04-22T13:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          }
        ],
        "2019-01-05": [
          {
            event: {
              id: 1891,
              name: "Team Building 45",
              color: "#F44336"
            },
            time: {
              from: "2019-04-22T19:23:00.090Z",
              to: "2019-04-22T02:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 46",
              color: "#E91E63"
            },
            time: {
              from: "2019-04-22T19:43:00.090Z",
              to: "2019-04-22T21:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 3",
              color: "#9C27B0"
            },
            time: {
              from: "2019-04-22T19:00:00.090Z",
              to: "2019-04-22T08:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 33",
              color: "#673AB7"
            },
            time: {
              from: "2019-04-22T07:13:00.090Z",
              to: "2019-04-22T09:50:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 1",
              color: "#3F51B5"
            },
            time: {
              from: "2019-04-22T10:00:27.090Z",
              to: "2019-04-22T13:44:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 4",
              color: "#2196F3"
            },
            time: {
              from: "2019-04-22T04:23:00.358Z",
              to: "2019-04-22T10:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 7",
              color: "#03A9F4"
            },
            time: {
              from: "2019-04-22T05:00:00.358Z",
              to: "2019-04-22T09:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 9",
              color: "#009688"
            },
            time: {
              from: "2019-04-22T06:00:00.358Z",
              to: "2019-04-22T13:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          }
        ],
        "2019-01-06": [
          {
            event: {
              id: 1891,
              name: "Team Building 45",
              color: "#F44336"
            },
            time: {
              from: "2019-04-22T19:23:00.090Z",
              to: "2019-04-22T02:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 46",
              color: "#E91E63"
            },
            time: {
              from: "2019-04-22T19:43:00.090Z",
              to: "2019-04-22T21:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 3",
              color: "#9C27B0"
            },
            time: {
              from: "2019-04-22T19:00:00.090Z",
              to: "2019-04-22T08:30:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 33",
              color: "#673AB7"
            },
            time: {
              from: "2019-04-22T07:13:00.090Z",
              to: "2019-04-22T09:50:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 1",
              color: "#3F51B5"
            },
            time: {
              from: "2019-04-22T10:00:27.090Z",
              to: "2019-04-22T13:44:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 4",
              color: "#2196F3"
            },
            time: {
              from: "2019-04-22T04:23:00.358Z",
              to: "2019-04-22T10:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 7",
              color: "#03A9F4"
            },
            time: {
              from: "2019-04-22T05:00:00.358Z",
              to: "2019-04-22T09:00:00.358Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          },
          {
            event: {
              id: 1891,
              name: "Team Building 9",
              color: "#009688"
            },
            time: {
              from: "2019-04-22T06:00:00.358Z",
              to: "2019-04-22T13:56:27.090Z"
            },
            place: {
              id: 2761,
              shortName: "MTG 1",
              name: "Meeting room 1"
            }
          }
        ]
      }
    };
  }
};
</script>

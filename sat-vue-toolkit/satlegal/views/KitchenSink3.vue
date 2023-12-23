<template>
  <v-row no-gutters>
    <v-col class="my-5" cols="12">
      <h1>Charater list</h1>
      <CharacterList :items="characters" />
    </v-col>
    <v-col cols="12" class="my-5">
      <h1>Steps list</h1>
      <ListSteps :items="steps">
        <template slot="MilestoneContent" slot-scope="props">
          <ContentStep :title="props.title" :content="props.content" />
        </template>
      </ListSteps>
    </v-col>
    <v-col cols="12" class="my-5">
      <v-card style="width: 80%" class="pa-3">
        <TimeEntriesHeatmap
          :values="timeEntriesHeatmap"
          end-date="2019-02-20"
        />
      </v-card>
    </v-col>
    <v-col cols="12" class="my-5">
      <StepIntakeView />
    </v-col>
    <v-col cols="3">
      <v-card class="pa-3">
        <MatterLeftMenu />
      </v-card>
    </v-col>
    <v-col xs3 class="mx-5">
      <cols="3"/>
    </v-col>
  </v-row>
</template>
<script>
import CharacterList from "../ht_components/list/CharacterList";
import ListSteps from "../ht_components/steps/ListSteps";
import StepIntakeView from "../ht_components/cards/StepIntakeView";
import TimeEntriesHeatmap from "../ht_components/heatmap/TimeEntriesHeatmap";
import ContentStep from "../ht_components/cards/ContentStep";
import MatterLeftMenu from "../ht_components/left-menus/MatterLeftMenu";

export default {
  data() {
    return {
      document: {
        id: Math.random(),
        name: "Client Name",
        deadline: "2019-03-10T03:21:33.634Z",
        total: 92,
        progressList: [
          {
            id: Math.random(),
            progress: 20,
            color: "#3f51b5"
          },
          {
            id: Math.random(),
            progress: 10,
            color: "#f44336"
          },
          {
            id: Math.random(),
            progress: 30,
            color: "#9c27b0"
          },
          {
            id: Math.random(),
            progress: 5,
            color: "#4caf50"
          }
        ]
      },
      characters: [
        {
          id: 1,
          name: "character 1",
          color: "#9C27B0",
          items: [
            {
              id: 1,
              title: "Lauch New Template",
              content:
                "when as unknows printer took a galley of type when as unknows printer took a galley of type ",
              type: {
                id: 1,
                name: "type 1",
                color: "#C0CA33"
              }
            },
            {
              id: 2,
              title: "Lauch New Template 2",
              content:
                "when as unknows printer took a galley of type when as unknows printer took a galley of type "
            }
          ]
        },
        {
          id: 2,
          name: "character 2",
          color: "#8BC34A",
          items: [
            {
              id: 1,
              title: "Lauch New Template",
              content:
                "when as unknows printer took a galley of type when as unknows printer took a galley of type "
            },
            {
              id: 2,
              title: "Lauch New Template 2",
              content:
                "when as unknows printer took a galley of type when as unknows printer took a galley of type ",
              type: {
                id: 1,
                name: "type 1",
                color: "#FF9800"
              }
            }
          ]
        },
        {
          id: 3,
          name: "character 3",
          color: "#009688",
          items: [
            {
              id: 1,
              title: "Lauch New Template",
              content:
                "when as unknows printer took a galley of type when as unknows printer took a galley of type "
            },
            {
              id: 2,
              title: "Lauch New Template 2",
              content:
                "when as unknows printer took a galley of type when as unknows printer took a galley of type ",
              type: {
                id: 1,
                name: "type 1",
                color: "#607D8B"
              }
            }
          ]
        },
        {
          id: 4,
          name: "character 4",
          color: "#03A9F4",
          items: [
            {
              id: 1,
              title: "Lauch New Template",
              content:
                "when as unknows printer took a galley of type when as unknows printer took a galley of type "
            },
            {
              id: 2,
              title: "Lauch New Template 2",
              content:
                "when as unknows printer took a galley of type when as unknows printer took a galley of type "
            }
          ]
        }
      ],
      steps: [
        {
          id: 1,
          name: "Procedure 1",
          status: true,
          target: {
            title: "Complete Procedure 1",
            content:
              "You can mark the storge as complete .<br>The problem will emit anytime (demo).<br>You can open it anytime"
          }
        },
        {
          id: 2,
          name: "Procedure 2",
          status: true,
          target: {
            title: "Complete  Procedure 2",
            content:
              "You can mark the storge as complete .<br>The problem will emit anytime (demo).<br>You can open it anytime"
          }
        },
        {
          id: 3,
          name: "Procedure 3",
          status: false,
          target: {
            title: "Complete  Procedure 3",
            content:
              "You can mark the storge as complete .<br>The problem will emit anytime (demo).<br>You can open it anytime"
          }
        },
        {
          id: 4,
          name: "Procedure 4",
          status: false,
          target: {
            title: "Complete  Procedure 4",
            content:
              "You can mark the storge as complete .<br>The problem will emit anytime (demo).<br>You can open it anytime"
          }
        },
        {
          id: 5,
          name: "Procedure 5",
          status: false,
          target: {
            title: "Complete  Procedure 5",
            content:
              "You can mark the storge as complete .<br>The problem will emit anytime (demo).<br>You can open it anytime"
          }
        }
      ],
      timeEntriesHeatmap: [
        {
          date: "2018-9-17",
          count: 6,
          colorRange: "#AD1457"
        },
        {
          date: "2018-9-20",
          count: 6
        },
        {
          date: "2018-9-21",
          count: 1
        },
        {
          date: "2019-1-21",
          count: 10
        },
        {
          date: "2019-1-26",
          count: 100
        },
        {
          date: "2019-1-27",
          count: 70
        },
        {
          date: "2019-1-28",
          count: 100
        }
      ]
    };
  },
  components: {
    CharacterList,
    ListSteps,
    StepIntakeView,
    TimeEntriesHeatmap,
    ContentStep,
    MatterLeftMenu
  }
};
</script>

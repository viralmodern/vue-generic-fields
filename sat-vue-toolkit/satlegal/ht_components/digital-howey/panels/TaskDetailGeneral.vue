<template>
  <v-card>
    <v-row no-gutters class="pa-2">
      <v-col cols="12" class="pa-2">
        <v-row no-gutters>
          <v-col sm="4">
            <v-select
              :value="(dataTaskDetail.stage || {}).id"
              :items="stages"
              label="Status Work"
              item-text="name"
              item-value="id"
              class="pa-1"
              return-object
              @change="$emit('update', { stages: { id: $event } })"
            ></v-select>
          </v-col>
          <v-col sm="4">
            <v-select
              :value="dataTaskDetail.progress"
              :items="listProgress"
              label="Completion schedule"
              item-text="name"
              item-value="id"
              class="pa-1"
              return-object
              @change="$emit('update', { progress: $event })"
            ></v-select>
          </v-col>
          <v-col sm="4">
            <v-text-field
              ref="inputField"
              mask="####"
              :value="dataTaskDetail.estimation"
              class="pa-1"
              label="Estimate"
              @change="$emit('update', { estimation: $event })"
            >
              <template slot="append">hr(s)</template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-2">
        <v-row no-gutters>
          <div class="mr-2">
            <ProjectAvatar
              :sizeImage="50"
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2yHWPB-viJo0ebA-3Sxrf9ubaKi7lcgTBu3IPZqumYBW5azK "
            />
          </div>
          <v-col>
            <v-row no-gutters class="align-center">
              <router-link to class="text-caption">Matter</router-link>
              <span class="px-2">/</span>
              <router-link to class="text-caption">MK236</router-link>
            </v-row>
            <v-col cols="12">
              <v-text-field
                :value="dataTaskDetail.cardName"
                :rules="[v => !!v || 'Title is required']"
                label="Title"
                required
                class="mr-1"
                @change="$emit('update', { cardName: $event })"
              ></v-text-field>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-2">
        <NotebookEditor
          placeholder="Type your note here..."
          :item="dataTaskDetail.description"
          @change="$emit('update', { description: $event })"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ProjectAvatar from "../../avatars/ProjectAvatar";
import NotebookEditor from "../../editor/NotebookEditor";
export default {
  components: {
    NotebookEditor,
    ProjectAvatar
  },
  props: {
    dataTaskDetail: Object,
    stages: Array
  },
  data() {
    return {
      listProgress: [
        {
          id: 20,
          name: "Completed 20%"
        },
        {
          id: 40,
          name: "Completed 40%"
        },
        {
          id: 60,
          name: "Completed 60%"
        },
        {
          id: 80,
          name: "Completed 80%"
        },
        {
          id: 100,
          name: "Completed 100%"
        }
      ]
    };
  }
};
</script>

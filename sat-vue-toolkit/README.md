### Use guide slickgrid
###### Packages install:
- `@riophae/vue-treeselect `
- `axios`
- `faker`
- `quilljs`
- `quill-comment`
- `quill-emoji`
- `quill-mention`
- `markdown-it`
- `markdown-it-task-lists`
- `moment`
- `semantic-ui-button`
- `semantic-ui-comment`
- `semantic-ui-statistic`
- `semantic-ui-table`
- `timeago.js`
- `tributejs`
- `uuid`
- `interactjs`
- `interactjs`
- `print-js`
- ###### `11/06/2020`
- `highlight.js`
- `vue-filepond`
- `filepond`
- `filepond-plugin-file-encode`
- `filepond-plugin-file-validate-type`
- `filepond-plugin-image-crop`
- `filepond-plugin-image-exif-orientation`
- `filepond-plugin-image-preview`
- `filepond-plugin-image-resize`
- `filepond-plugin-image-transform`
- ###### `12/06/2020`
- `dedent`
- `highlight.js`
- `vue-quill-editor`
- ###### `16/07/2020`
- `fuse.js`
- `vue-event-manager`

- ##### install packages
- ``yarn add @riophae/vue-treeselect axios faker quilljs quill-comment quill-emoji quill-mention markdown-it markdown-it-task-lists moment semantic-ui-button semantic-ui-comment semantic-ui-statistic semantic-ui-table timeago.js tributejs uuid print-js interactjs vue-filepond filepond 
filepond-plugin-file-encode filepond-plugin-file-validate-type filepond-plugin-image-crop filepond-plugin-image-exif-orientation filepond-plugin-image-preview filepond-plugin-image-resize filepond-plugin-image-transform
 dedent highlight.js vue-quill-editor fuse.js vue-event-manager`` 

###### Integrate Slickgrid into Vue App

##### `With nuxtjs`
- Create `~/plugins/global.js`
```javascript
import Vue from 'vue'
import axios from 'axios'
import bus from '@/sat-vue-toolkit/plugins/bus'
import api from '@/sat-vue-toolkit/plugins/api'
const eventBus = new Vue()
Vue.use(bus, { eventBus })
Vue.use(api, { axios })
````
- In App layout `~/layouts/app.vue`
```javascript
<template>
<v-app>
  <PortalAttributeActions/>
</v-app>
</template>
<script>
import PortalAttributeActions from "@/sat-vue-toolkit/components/slick-grid/PortalAttributeActions";
...
</script>
...
 components: {
            PortalAttributeActions,
}

```
 ##### `Without nuxtjs`
 - In main app file `~/src/main.js`
 ```javascript
import store from '@/store'
...
import axios from 'axios'
import api from "@/src/sat-vue-toolkit/plugins/api";
import bus from "@/src/sat-vue-toolkit/plugins/bus";
const eventBus = new Vue()
Vue.use(api, { axios })
Vue.use(bus, { eventBus })
store.$api = axios
```

 ##### `Upgrade vuetify`: `v2.3.0`
 - https://github.com/vuetifyjs/vuetify/releases/v2.3.0#user-content-upgrade-guide




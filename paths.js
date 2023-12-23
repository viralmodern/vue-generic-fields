export default [
  // todo: facts & fact version caf paths
  {
    path: '/project/:projectId',
    name: 'Detail',
    component: 'sat-vue-toolkit/satlegal/views/projects/Detail',
    chunkName: 'sat-vue-toolkit/satlegal/views/projects/Detail',
  },
  {
    name: 'facts',
    path: '/project/:projectId/facts/:listType?/:groupType?',
    component: 'sat-vue-toolkit/satlegal/views/CAF/Fact/Facts',
    chunkName: 'sat-vue-toolkit/satlegal/views/CAF/Fact/Facts',
  },
  {
    name: 'factDetail',
    path: '/project/:projectId/facts/:listType?/:groupType?/detail/:factId',
    component: 'sat-vue-toolkit/satlegal/views/research/HomeFactDetail',
    chunkName: 'sat-vue-toolkit/satlegal/views/research/HomeFactDetail',
  },

  // todo: characters caf paths
  {
    path: '/project/:projectId/character',
    component: 'sat-vue-toolkit/satlegal/views/research/Character',
    chunkName: 'sat-vue-toolkit/satlegal/views/research/Character',
    name: 'CharacterLayout',
    meta: {
      layoutType: 'project-detail',
    },
  },
  {
    name: 'character-related',
    path: '/project/:projectId/character/character-related',
    component:
      'sat-vue-toolkit/satlegal/views/CAF/Character/HomeCharacterRelated',
    chunkName:
      'sat-vue-toolkit/satlegal/views/CAF/Character/HomeCharacterRelated',
  },
  {
    name: 'character',
    path: '/project/:projectId/character/',
    component: 'sat-vue-toolkit/satlegal/views/CAF/Character/ListCharacter',
    chunkName: 'sat-vue-toolkit/satlegal/views/CAF/Character/ListCharacter',
  },
  {
    name: 'characterRelationship',
    path: '/project/:projectId/character/relationship',
    component: 'sat-vue-toolkit/satlegal/ht_components/list/RelationShipMap',
    chunkName: 'sat-vue-toolkit/satlegal/ht_components/list/RelationShipMap',
  },

  {
    name: 'characterDetail',
    path: '/project/:projectId/character/:characterId',
    redirect: {
      name: 'about',
    },
    component: 'sat-vue-toolkit/satlegal/views/research/CharacterDetail',
    chunkName: 'sat-vue-toolkit/satlegal/views/research/CharacterDetail',
    meta: {
      layoutType: 'project-detail',
    },
  },

  {
    name: 'about',
    path: '/project/:projectId/character/:characterId/about',
    component: 'sat-vue-toolkit/satlegal/views/research/detail-character/About',
    chunkName: 'sat-vue-toolkit/satlegal/views/research/detail-character/About',
  },
  {
    name: 'activity',
    path: '/project/:projectId/character/:characterId/activity/:listType?',
    component:
      'sat-vue-toolkit/satlegal/views/research/detail-character/Activity',
    chunkName:
      'sat-vue-toolkit/satlegal/views/research/detail-character/Activity',
  },
  {
    name: 'goals',
    path: '/project/:projectId/character/:characterId/goals',
    component:
      'sat-vue-toolkit/satlegal/views/research/detail-character/GoalsCharacter',
    chunkName:
      'sat-vue-toolkit/satlegal/views/research/detail-character/GoalsCharacter',
  },
  {
    name: 'notes',
    path: '/project/:projectId/character/:characterId/notes',
    component:
      'sat-vue-toolkit/satlegal/views/research/detail-character/NotesCharacter',
    chunkName:
      'sat-vue-toolkit/satlegal/views/research/detail-character/NotesCharacter',
  },
  {
    name: 'documents',
    path: '/project/:projectId/character/:characterId/documents',
    component:
      'sat-vue-toolkit/satlegal/views/research/detail-character/DocumentCharacter',
    chunkName:
      'sat-vue-toolkit/satlegal/views/research/detail-character/DocumentCharacter',
  },
  {
    name: 'credibility',
    path: '/project/:projectId/character/:characterId/credibility',
    component:
      'sat-vue-toolkit/satlegal/views/research/detail-character/CredibilitiesCharacter',
    chunkName:
      'sat-vue-toolkit/satlegal/views/research/detail-character/CredibilitiesCharacter',
  },
  {
    name: 'mapping',
    path: '/project/:projectId/character/:characterId/mapping',
    component:
      'sat-vue-toolkit/satlegal/views/research/detail-character/Mapping',
    chunkName:
      'sat-vue-toolkit/satlegal/views/research/detail-character/Mapping',
  },
  {
    name: 'ui',
    path: '/ui',
    component: 'sat-vue-toolkit/components/UI',
    chunkName: 'sat-vue-toolkit/components/UI',
  },
]

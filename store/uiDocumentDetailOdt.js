import {
  DOCUMENT_PANELS,
  DOCUMENT_VIEWS,
} from '@/features/odt/helpers/odt.json'
import md5 from 'md5'
export function generatorField(options = {}, rootPath) {
  let field = {},
    name = options['name']
  field['name'] = options['name']
  field['label'] = options['label']
  field['text'] = options['text'] || options['label']
  field['icon'] = options['icon']
  field['path'] = `${options['path']}`
  field['rootPath'] = rootPath
  field['color'] = options['color']
  field['hide'] = options['hide']
  if (options['children']) {
    let children = options['children']
    field['children'] = []
    field['children'] = Object.keys(children).map((child) =>
      generatorField(options['children'][child], rootPath)
    )
  }
  field['uuidField'] = md5(name)
  return field
}
const types = {
  loading: 'loading',
  complete: 'complete',
  initInterface: 'initInterface',
  orderViews: 'orderViews',
  orderPanels: 'orderPanels',
  setView: 'setView',
  setPanels: 'setPanels',
}
const titleView = 'View Modes'
const namesView = {
  [DOCUMENT_VIEWS.TEXT.name]:
    'odt-tracking-all-dockets-docket-entry-document-document-text',
  [DOCUMENT_VIEWS.PDF.name]:
    'odt-tracking-all-dockets-docket-entry-document-document-pdf',
  [DOCUMENT_VIEWS.ATTENTION.name]:
    'odt-tracking-all-dockets-docket-entry-document-document-rake',
  [DOCUMENT_VIEWS.ANNOTATION.name]:
    'odt-tracking-all-dockets-docket-entry-document-document-annotation',
  [DOCUMENT_VIEWS.NER.name]:
    'odt-tracking-all-dockets-docket-entry-document-document-ner',
  [DOCUMENT_VIEWS.NAME_ENTITY_RECOGNITION.name]:
    'odt-tracking-all-dockets-docket-entry-document-document-ner-name-entity-recognition',
  [DOCUMENT_VIEWS.LEGAL_RECOGNITION.name]:
    'odt-tracking-all-dockets-docket-entry-document-document-ner-legal-recognition',
  [DOCUMENT_VIEWS.CONFERENCE_RESOLUTION.name]:
    'odt-tracking-all-dockets-docket-entry-document-document-ner-conference-resolution',
}
const namesPanel = {
  [DOCUMENT_PANELS.HIGHLIGHT_SEARCH_VIEW
    .name]: `odt-tracking-all-dockets-docket-entry-document-document-search`,
}
function getViewByRouteName(routeName) {
  switch (routeName) {
    case namesView.TEXT:
      return DOCUMENT_VIEWS.TEXT.name
    case namesView.PDF:
      return DOCUMENT_VIEWS.PDF.name
    case namesView.ATTENTION:
      return DOCUMENT_VIEWS.ATTENTION.name
    case namesView.ANNOTATION:
      return DOCUMENT_VIEWS.ANNOTATION.name
    case namesView.NER:
      return DOCUMENT_VIEWS.NER.name
    case namesView.NAME_ENTITY_RECOGNITION:
      return DOCUMENT_VIEWS.NAME_ENTITY_RECOGNITION.name
    case namesView.LEGAL_RECOGNITION:
      return DOCUMENT_VIEWS.LEGAL_RECOGNITION.name
    case namesView.CONFERENCE_RESOLUTION:
      return DOCUMENT_VIEWS.CONFERENCE_RESOLUTION.name
    default:
      return false
  }
}
function getPanelByRouteName(routeName) {
  switch (routeName) {
    case namesPanel.HIGHLIGHT_SEARCH_VIEW:
      return DOCUMENT_PANELS.HIGHLIGHT_SEARCH_VIEW.name
    default:
      return false
  }
}
export const state = () => {
  return {
    loading: false,
    panels: [
      DOCUMENT_PANELS.ENTITIES,
      DOCUMENT_PANELS.DOCUMENT_VIEW,
      DOCUMENT_PANELS.HIGHLIGHT_SEARCH_VIEW,
      DOCUMENT_PANELS.EXTRACTIONS,
      DOCUMENT_PANELS.TABLE_OF_AUTHORITY,
      DOCUMENT_PANELS.SUMMARY,
      DOCUMENT_PANELS.FACT_TABLE,
    ],
    views: [
      DOCUMENT_VIEWS.TEXT,
      DOCUMENT_VIEWS.PDF,
      DOCUMENT_VIEWS.ATTENTION,
      DOCUMENT_VIEWS.NAME_ENTITY_RECOGNITION,
      DOCUMENT_VIEWS.LEGAL_RECOGNITION,
      DOCUMENT_VIEWS.CONFERENCE_RESOLUTION,
      DOCUMENT_VIEWS.ANNOTATION,
    ],
  }
}
export const getters = {
  loading: (state) => state.loading,
  panels: (state) => state.panels,
  views: (state) => state.views,
  titleView: (state) => {
    try {
      let activeView = state.views.filter((v) => !v.hide)[0]
      return (
        (activeView &&
          `<span>${titleView}: <strong>${activeView.label}</strong></span>`) ||
        titleView
      )
    } catch (e) {
      return titleView
    }
  },
}

export const actions = {
  [types.initInterface](
    { commit, state, getters },
    { rootPath, routeName = false } = {}
  ) {
    rootPath = rootPath || ''
    let views = state.views.map((v) => generatorField(v, rootPath))
    let panels = state.panels.map((p) => generatorField(p, rootPath))
    commit(types.orderViews, views)
    commit(types.orderPanels, panels)
    if (routeName) {
      // todo: set view active current view
      let nameView = getViewByRouteName(routeName)
      if (nameView) {
        commit(types.setView, nameView)
      }
      // todo: set view active current panel
      let namePanel = getPanelByRouteName(routeName)
      if (namePanel) {
        commit(types.setPanels, [namePanel])
      }
    }
    return Promise.resolve(true)
  },
}

export const mutations = {
  [types.loading](state) {
    state.loading = true
  },
  [types.complete](state) {
    state.loading = false
  },
  [types.orderViews](state, views) {
    state.views = views
  },
  [types.orderPanels](state, panels) {
    state.panels = panels
  },
  [types.setView](state, nameView) {
    try {
      let views = state.views
      views = views.map((v) => {
        let t = { ...v }
        if (t['name'] === nameView) {
          t['hide'] = false
        } else {
          t['hide'] = true
        }
        return t
      })
      state.views = views
    } catch (e) {
      console.log(e.message)
    }
  },
  [types.setPanels](state, _panels = []) {
    let panels = state.panels
    panels = panels.map((panel) => {
      let t = { ...panel }
      if (_panels.includes(t['name'])) {
        t['hide'] = false
      }
      return t
    })
    state.panels = panels
  },
}

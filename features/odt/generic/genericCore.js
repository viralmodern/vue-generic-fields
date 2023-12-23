import TreeModel from 'tree-model'
import faker from 'faker'
import { v4 as uuid } from 'uuid'
import values from 'lodash/values'
export const EVENTS_NAME = {
  ADD_PAGE: 'ADD_PAGE',
  DELETE_PAGE: 'DELETE_PAGE',
  UPDATE_PAGE: 'UPDATE_PAGE',
  SELECTED_PAGE: 'SELECTED_PAGE',
  CREATE_SUB: 'CREATE_SUB',
  DELETE_SUB: 'DELETE_SUB',
  UPDATE_SUB: 'UPDATE_SUB',
  CHANGE_SUB: 'CHANGE_SUB',
}

const LABEL_ROOT = `Pages`
const ID_ROOT = `root`
const LABEL_SUB_FROZEN = 'General'

export class SubGeneric {
  constructor(options = {}) {
    this.id = options.id || uuid()
    this.name = options.name || faker.name.findName()
    this.fields = options.fields || []
    this.pageId = options.pageId || null
    this.isFrozen = Boolean(options.isFrozen)
  }
}
const GenericPage = {
  data() {
    return {
      pages: [],
      selectedPageId: null,
      subs: {},
      fields: {},
      selectedSubId: null,
    }
  },
  mounted() {
    this.$events.on(EVENTS_NAME.ADD_PAGE, this.addPage)
    this.$events.on(EVENTS_NAME.DELETE_PAGE, this.deletePage)
    this.$events.on(EVENTS_NAME.UPDATE_PAGE, this.updatePage)
    this.$events.on(EVENTS_NAME.SELECTED_PAGE, this.selectedPage)
    this.$events.on(EVENTS_NAME.CREATE_SUB, this.onCreateSub)
    this.$events.on(EVENTS_NAME.DELETE_SUB, this.deleteSub)
    this.$events.on(EVENTS_NAME.CHANGE_SUB, this.onSelectedSub)
    this.$events.on(EVENTS_NAME.UPDATE_SUB, this.onUpdateSub)
  },
  computed: {
    getNavigatePagesSelected() {
      let { selectedPageId } = this
      if (!selectedPageId) return false
      let pathSelection = this.parseTree()
      let nodeSelection = pathSelection.first(function (node) {
        return node.model.id === selectedPageId
      })

      if (!nodeSelection) return false
      return [...nodeSelection.getPath()].map((n) => n.model)
    },
    currentPageSelected() {
      let { getNavigatePagesSelected } = this
      if (getNavigatePagesSelected) {
        return getNavigatePagesSelected[getNavigatePagesSelected.length - 1]
      }
      return false
    },
    subsOfPageSelected() {
      let { currentPageSelected, subs, selectedSubId } = this
      if (currentPageSelected) {
        let pageIdSelected = currentPageSelected.id
        let arrSubs = [...values({ ...subs })]

        let subsSelected = arrSubs.filter(
          (sub) => sub.pageId === pageIdSelected
        )
        let reduceSubsSelected = subsSelected.map((sub) => ({
          ...sub,
          active: sub.id === selectedSubId,
        }))

        return [...reduceSubsSelected]
      }
      return []
    },
    subFrozenSelected() {
      let { subsOfPageSelected } = this
      return subsOfPageSelected.filter((sub) => sub.isFrozen)[0]
    },
    subSelected() {
      let { subs, selectedSubId } = this
      let sub = subs[selectedSubId]
      if (!sub) return false
      return {
        ...sub,
      }
    },
  },
  methods: {
    parseTree() {
      let tree = new TreeModel()
      let { pages } = this
      let rootItem = {
        id: ID_ROOT,
        name: LABEL_ROOT,
        children: [...pages],
      }
      return tree.parse(rootItem)
    },
    addPage(evt, options = {}) {
      console.log(arguments)
      return new Promise((resolve, reject) => {
        let { row = {} } = options
        let nodeId = this.selectedPageId
        console.log(`NODE_ID_${nodeId}`)
        let rooTreeModel = this.parseTree()
        let children = []
        let id = uuid()
        let name = row.name || faker.name.findName()
        let tree = new TreeModel()
        let newNode = tree.parse({ id, name, children: [] })
        if (nodeId) {
          let nodeWillAdd = rooTreeModel.first(
            { strategy: 'breadth' },
            function (node) {
              return node.model.id === nodeId
            }
          )
          if (nodeWillAdd) {
            nodeWillAdd.addChild(newNode)
            console.log(nodeWillAdd, rooTreeModel)
          }
          children = [...rooTreeModel.model.children]
        } else {
          rooTreeModel.addChild(newNode)
          console.log(rooTreeModel, newNode)
          children = [...rooTreeModel.model.children]
        }
        this.pages = [...children]
        // todo: set active selectedPageId
        this.setPageActive(id)
        // todo: create general sub of child node
        let subId = uuid()
        let optionsNewGeneralSub = {
          isFrozen: true,
          name: LABEL_SUB_FROZEN,
          pageId: id,
          id: subId,
        }
        let newSub = new SubGeneric(optionsNewGeneralSub)
        this.addSub(newSub)
        // todo: set active selectedSubId
        this.setSubActive(subId)
        resolve(children)
      })
    },
    deletePage(evt, nodeId) {
      return new Promise((resolve, reject) => {
        if (!window.confirm(`Want to delete page?`)) return resolve(1)
        let rooTreeModel = this.parseTree()
        let nodeDrop = rooTreeModel.first({ strategy: 'breadth' }, (node) => {
          return node.model.id === nodeId
        })
        console.error(nodeDrop)
        if (nodeDrop) {
          nodeDrop.drop()
          let children = [...rooTreeModel.model.children]
          this.pages = [...children]
          resolve(children)
        }
      })
    },
    updatePage(evt, options) {
      return
      let rooTreeModel = this.parseTree()
      let nodeId = this.selectedPageId
      let nodeSelected = rooTreeModel.first({ strategy: 'breadth' }, (node) => {
        return node.model.id === nodeId
      })
      if (nodeSelected) {
        let cloneNode = nodeSelected
        let nodeIndex = nodeSelected.getIndex()
        let model = { ...nodeSelected.model, ...options }
        cloneNode.model = { ...model }
        nodeSelected.drop()
        rooTreeModel.addChildAtIndex(cloneNode, nodeIndex)
        let children = [...rooTreeModel.model.children]
        this.pages = [...children]
      }
    },
    selectedPage(evt, pageId) {
      return new Promise((resolve, reject) => {
        console.log(`XXX_${pageId}`)
        // todo set active page
        this.setPageActive(pageId)
        // todo set active sub fo general sub
        this.$nextTick(() => {
          let { subFrozenSelected } = this
          if (subFrozenSelected) {
            this.setSubActive(subFrozenSelected.id)
          }
        })
        resolve(true)
      })
    },
    onCreateSub(evt, options = {}) {
      // {pageId}
      return new Promise((resolve, reject) => {
        // todo: add new sub
        console.error('CREATE_SUB', options)
        let { row, group } = options
        let { currentPageSelected } = this
        if (currentPageSelected) {
          let pageId = currentPageSelected.id
          let newSub = new SubGeneric({ ...row, pageId })
          this.addSub(newSub)
          // todo: set active for new sub
          this.setSubActive(newSub.id)
        }
        if (!options.pageId) return resolve(false)
        resolve(1)
      })
    },
    addSub(sub) {
      let { subs } = this
      this.subs = {
        ...subs,
        [sub.id]: { ...sub },
      }
    },
    deleteSub(evt) {
      return new Promise((resolve, reject) => {
        let { subs, subSelected, subFrozenSelected } = this
        if (!subSelected) return resolve(1)
        // todo Delete selected sub
        let subName = subSelected['name']
        let subId = subSelected['id']
        if (!window.confirm(`Want to delete sub ${subName}?`)) return resolve(1)
        let cloneSubs = { ...subs }
        delete cloneSubs[subId]
        this.subs = { ...cloneSubs }
        // todo set active sub fo general sub
        if (subFrozenSelected) {
          this.setSubActive(subFrozenSelected.id)
        }
        resolve(1)
      })
    },
    updateSub(subId, options) {
      let { subs } = this
      let sub = { ...subs[subId], ...options }
      let newSubs = {
        ...subs,
        [subId]: { ...sub },
      }
      console.error('ETC', newSubs)
      this.subs = {
        ...newSubs,
      }
    },
    onSelectedSub(evt, subId) {
      return new Promise((resolve, reject) => {
        this.setSubActive(subId)
        resolve(1)
      })
    },
    onUpdateSub(evt, { options }) {
      let { selectedSubId } = this
      this.updateSub(selectedSubId, options)
    },
    setSubActive(subId) {
      this.selectedSubId = subId
      this.setRouteActive()
    },
    setPageActive(pageId) {
      this.selectedPageId = pageId
      this.setRouteActive()
    },
    setRouteActive() {
      let {
        selectedSubId,
        selectedPageId,
        $route: { query },
      } = this
      this.$router.replace({
        query: { ...query, p: `p${selectedPageId}-s${selectedSubId}` },
      })
    },
  },
  render() {
    return this.$scopedSlots.default({
      pages: this.pages,
      selections: this.getNavigatePagesSelected,
      selectionPageId: this.selectedPageId,
      currentPageSelected: this.currentPageSelected,
      subs: this.subs,
      subsOfPageSelected: this.subsOfPageSelected,
      subSelected: this.subSelected,
    })
  },
}
export default GenericPage

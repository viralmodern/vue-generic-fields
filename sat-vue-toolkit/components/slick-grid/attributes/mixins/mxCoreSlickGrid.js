import {
  ATTRIBUTE_FIELDS,
  getCardLayout,
  getIconAttribute,
  getTitleAttribute,
  getCellLayout,
  getClassCell,
  getModelLayout, COUNT_LABEL_DATA
} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
import { getTextContent } from "~/sat-vue-toolkit/functions/text"

export default {
  computed: {
    mainTextContent() {
      let {reduceRow, mainCellId, primaryAttribute = {}} = this
      let textContent = getTextContent(reduceRow, primaryAttribute)
      return textContent || COUNT_LABEL_DATA.countLabelSingular.capitalize()
      return reduceRow[mainCellId] || COUNT_LABEL_DATA.countLabelSingular.capitalize()
    },
    actionsRow() {
      return [
        {
          text: "Delete",
          func: this.deleteRow
        }
      ]
    },
    reduceRow() {
      let {item, val} = this // todo: if slick grid as item or attribute panel detail use val
      if(typeof val === "object" && Boolean(Object.keys(val).length)) return val
      if(typeof item === "object" && Boolean(Object.keys(item).length)) return item
      return {}
    }
  },
  methods: {
    updateBookmark ({ bookmarked }) {
      if (bookmarked || bookmarked === null) {
        let r = { ...this.reduceRow }
        r["bookmarked_pk"] = bookmarked
        let label = Boolean(bookmarked) ? `Row Bookmarked` : `Row UnBookmarked`
        this.emitContentRow(r, label)

      }
    },
    updatePinned ({ pinned } = {}) {
      let r = { ...this.reduceRow }
      r["pinned"] = pinned
      // this.val = r
      let label = pinned ? `Row Pinned` : `Row Unpinned`
      this.emitContentRow(r, label)
    },
    updateReport ({ total_reports, reported_object }) {
      let r = { ...this.reduceRow }
      r["total_reports"] = total_reports
      r["reported_object"] = reported_object
      this.emitContentRow(r, 'Row')
    },
    async deleteRow() {
      let {countLabelSingular, mainTextContent, reduceRow, mainCellId} = this
      let suffix = mainTextContent && `${countLabelSingular} ${mainTextContent}` || countLabelSingular
      if (!window.confirm(`Are you sure to delete ${suffix}?`)) return;
      // todo: is Offline

      // todo: is Online
      await this.$api.delete(this.endPoint)
      this.$eventHub.$emit('busDeletedRow', { ...reduceRow }, this.groupByItem)
    },
    emitContentRow(row, attributeLabel) {
      this.$eventHub.$emit("alert-curd", { type: "success", text: `${attributeLabel} has been updated` })
      this.$emit("updated", { row, group: this.group })
      if (this.busEventUpdateRow) {
        // todo emit event bus for slick grid || list outside
        // this.$eventHub.$emit(this.busEventUpdateRow, row, this.group)
      }
      this.val = row
    },
    async updateContent ({ val, fieldData, bookmarked }, attribute) {
      let attributeName = attribute["name"],
        isFileAttachment = attribute["isFileAttachment"],
        endPoint = this.getEndPoint(attribute)
      // let attributeLabel = $$labelByName(attributeName)
      let attributeLabel = attribute['label']
      let r

      if (fieldData) {
        r = { ...this.reduceRow }
        r[attributeName] = fieldData
        this.emitContentRow(r, attributeLabel)
      } else {
        let formData = new FormData()
        let jsonData = {}
        let condition = [null, undefined, "", " "]
        // formData.append(attributeName, val)
        if (typeof val !== "object") {
          if (!condition.includes(val)) {
            formData.append(attributeName, val)
            jsonData[attributeName] = val
          }
        } else if (isFileAttachment) {
          // todo check type file upload
          let attachments = val
          if (Array.isArray(attachments)) {
            // todo multiple files
            for (let i = 0; i < attachments.length; i++) {
              if (!condition.includes(val)) {
                formData.append(attributeName, attachments[i])
                jsonData[attributeName] = attachments[i]
              }
            }
          } else {
            // todo single files
            if (!condition.includes(val)) {
              formData.append(attributeName, attachments)
              jsonData[attributeName] = attachments
            }
          }

        } else {
          if (!condition.includes(val)) {
            if (Array.isArray(val)) {
              if(val.length > 0) {
                formData.append(attributeName, JSON.stringify(val))
                jsonData[attributeName] = val
              }else {
                formData.append(attributeName, JSON.stringify(val))
                jsonData[attributeName] = val
              }

            } else if (typeof val === "object" && Object.keys(val).length > 0) {
              formData.append(attributeName, JSON.stringify(val))
              jsonData[attributeName] = val
            }
          }
        }
        try {
          let post = isFileAttachment ? formData : jsonData
          let {isOffline} = this
          // todo: is Offline
          if(isOffline) {
            r = {...this.reduceRow, ...post}
            this.emitContentRow(r, attributeLabel)
            return false
          }
          // todo: is Online
          let res = await this.$api.patch(endPoint, post)
          r = {...this.reduceRow, ...res["data"] } // // response server dismiss field
          this.emitContentRow(r, attributeLabel)
        } catch (e) {
          this.$emit('errored')
        }finally {

        }
      }


    },
    getEndPoint (attribute) {
      let attributeType = attribute["type"],
        attributeName = attribute["name"],
        innerScope = attribute["innerScope"]
      let isAttachment = attributeType === ATTRIBUTE_FIELDS.ATTACHMENT.TYPE
      let isAssignMember = attributeType === ATTRIBUTE_FIELDS.ASSIGN_MEMBER.TYPE
      let isComments = attributeType === ATTRIBUTE_FIELDS.COMMENTS.TYPE
      let isNotes = attributeType === ATTRIBUTE_FIELDS.NOTE.TYPE
      if (isAttachment && !innerScope) {
        return `${this.endPoint}${attributeName}/`
      }
      if (isAssignMember && !innerScope) {
        return `${this.endPoint}members/`
      }
      if (isNotes && !innerScope) {
        return `${this.endPoint}notes/`
      }

      if (isComments) {
        return `${this.endPoint}null/comments/`
      }
      return this.endPoint
    }
  },
  filters: {
    getCardLayout,
    getIconAttribute,
    getTitleAttribute,
    getCellLayout,
    getClassCell,
    getModelLayout

  }
}

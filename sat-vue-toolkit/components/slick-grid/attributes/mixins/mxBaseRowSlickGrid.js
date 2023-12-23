import {Vote, Report, Bookmark, PinnedEntry} from "@/sat-vue-toolkit/components"
import FaviconThumbnail from "@/sat-vue-toolkit/components/FaviconThumbnail.vue"
import LinkTooltipCell from "@/sat-vue-toolkit/components/LinkTooltipCell.vue"
import baseRowProps from "~/sat-vue-toolkit/components/slick-grid/configs/props/baseRowProps"
export default {
  components: {
    Vote, Report, Bookmark, PinnedEntry, FaviconThumbnail, LinkTooltipCell
  },
  props: {
    ...baseRowProps
  },
}

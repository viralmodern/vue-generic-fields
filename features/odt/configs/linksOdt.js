import md5 from 'md5'
window.md5 = md5
let parentPath = `/odt`
const MODE = 'd'
export const LINKS_ODT = [
  {
    text: 'All Opinions',
    icon: 'mdi-clock',
    to: `${parentPath}/opinions`,
    order: 0,
    hide: true,
  },

  {
    text: 'All Dockets',
    icon: 'mdi-numeric',
    to: `${parentPath}/${MODE}/${1}/dockets`,
    order: 1,
    hide: true,
  },
  {
    text: 'All Bankruptcy Feeds',
    icon: 'mdi-rss',
    to: `${parentPath}/bankruptcy-feeds`,
    order: 2,
    hide: true,
  },
  {
    text: 'Regulations',
    icon: 'mdi-link-variant',
    to: `/odt/regulation`,
    order: 3,
    hide: true,
  },
  {
    text: 'United States Code',
    icon: 'mdi-link-variant',
    to: `/odt/united-states-code`,
    order: 4,
    hide: true,
  },
  {
    text: 'Trackers',
    icon: 'mdi-link-variant',
    to: `/odt/admin/trackers`,
    order: 5,
    hide: true,
  },
  {
    text: 'Deposition',
    icon: 'mdi-link-variant',
    to: `/odt/deposition`,
    order: 6,
    hide: true,
  },
  {
    text: 'Bookmarked',
    icon: 'mdi-star',
    to: `${parentPath}/bookmarked`,
    order: 7,
    children: [
      {
        text: 'Opinions',
        icon: 'mdi-bookmark',
        to: `${parentPath}/bookmarked/opinions`,
        hide: true,
      },
      {
        text: 'Dockets',
        icon: 'mdi-bookmark',
        to: `${parentPath}/bookmarked/dockets`,
      },
      {
        text: 'Dockets Entries',
        icon: 'mdi-bookmark',
        to: `${parentPath}/bookmarked/dockets-entries`,
      },
    ],
  },
  {
    text: 'Recent Visit',
    icon: 'mdi-history',
    to: `${parentPath}/recent-visit`,
    order: 8,
    hide: true,
  },
  {
    text: 'Characters',
    icon: 'mdi-link-variant',
    to: `${parentPath}/search-character`,
    order: 9,
    hide: true,
  },
  {
    text: 'Search History',
    icon: 'mdi-magnify',
    order: 10,
    to: `${parentPath}/search-history`,
    hide: true,
  },
]

export const LAYOUT_OPINION_DETAIL = [
  {
    text: 'Content',
    id: md5('layout-opinion-detail-content'),
    hint: 'CONTENT',
    order: 0,
  },
  {
    text: 'Right Panel',
    icon: 'mdi-clock',
    id: md5('layout-opinion-right-panel'),
    hint: 'PANEL',
    order: 1,
  },
]

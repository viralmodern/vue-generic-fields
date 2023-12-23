import { get, post, sleep } from './base';
import workspaceApi from './workspace-member'
// import list from '../mock-data/announcement';
async function filter(filterRequest) {
   await sleep();
  const result = await get('/api/announcements/', {
    params: {
      page: filterRequest.pageIndex
    }
  })
  const members = await workspaceApi.getDataMembers()
  return {
    totals: result.count,
    list: result.results.map(x => {
      const member = (
        members.find(r => r.user.pk === x.creator) || {
          user: {
            name: '',
            avatar: null
          }
        }
      ).user
      return {
        id: x.id,
        user: {
          name: member.name,
          avatar: member.avatar
            ? {
                imageUrl: member.avatar
              }
            : null
        },
        createdDate: x.created,
        content: x.content ? x.content.replace(/\n/g, '<br/>') : ''
      }
    })
  }
}
async function createAnnouncement(data) {
  const result = await post(`api/announcements/`, { content: data })
  const members = await workspaceApi.getDataMembers()
  const member = (
    members.find(r => r.user.pk === result.creator) || {
      user: {
        name: '',
        avatar: null
      }
    }
  ).user
  return {
    id: result.id,
    user: {
      name: member.name,
      avatar: member.avatar
        ? {
            imageUrl: member.avatar
          }
        : null
    },
    createdDate: result.created,
    content: result.content ? result.content.replace(/\n/g, '<br/>') : ''
  }
}
export default { filter, createAnnouncement};

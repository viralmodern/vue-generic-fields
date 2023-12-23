export class Matter {
  constructor(data) {
    if (!data) {
      this.members = []
      return
    }
    this.totalTypeShow = 3
    this.totalClienShow = 2

    // console.log('Matter',data)
    let c = { ...data }
    this.matterID = c.id || c.pk
    this.pk = c.pk
    this.name = c.name || 'N/A'
    this.color = c.color || '#000000'
    this.clients = c.clients || []
    this.intro = c.intro
    this.jurisdiction = c.jurisdiction || {}
    this.claims = c.claims
    this.complaints = c.complaints
    this.members = c.members || [] // []string
    this.types = c.types || [] // []string
    this.jury_demand = !!c.jury_demand
    this.activate = !!c.activate
    this.bookmark = !!c.bookmarked
    this.type = c.type || 'public'
    this.docket_number = c.docket_number || ''

    this.archive = c.archive
    this.priority = c.priority // 1,2,3,4,5
    this.risk_level = c.risk_level || 6 // 1,2,3,4,5
    // this.risk_level = 2 // 1,2,3,4,5
    this.date_filled = c.date_filled
    this.start_date = c.start_date
    this.est_time = c.est_time
    this.next_courts = c.next_courts || []
    this.creator = c.creator
    this.time_tracked = c.time_tracked || []

    this.judge = c.judge || []

    this.stage = c.stage || null

    this.path = this.getPath()

    // todo action tracking
    this.canUpdate = false
    this.hasCreator = this.hasProps(this.creator)
    this.hasMember = !this.emptyProp(this.members)
    this.hasClient = !this.emptyProp(this.clients)
    this.hasCharacter = !this.emptyProp(this.judge)

    this.riskLevel = this.levelTitle(this.risk_level)
    this.priorityLevel = this.levelTitle(this.priority)
    this.priorityColor = this.levelColor(this.priority)
    this.riskColor = this.levelColor(this.risk_level)

    this.moreType = this.moreItems(this.types, this.totalTypeShow)
    this.moreClient = this.moreItems(this.clients, this.totalClienShow)

    this.colorBookmark = this.getColorBookMark()
    this.labelBookmark = this.bookmark ? 'Un Bookmark' : 'Bookmark'
    // court
    this.courtID = this.getCourt()

    // Jurisdiction Title
    this.jurisdictionTitle = this.getJurisdictionTitle()
  }

  fuzzyKeys() {
    return {
      name: this.name,
    }
  }

  suggestionLabel() {
    return this.name || this.matterID || ''
  }
  hasProps(prop) {
    return !!prop
  }
  emptyProp(prop) {
    return Array.isArray(prop) && prop.length <= 0
  }
  // members

  isMember(userID) {
    return this.members.indexOf(userID) !== -1
  }
  removeMember(user) {
    const ID = (user || {}).id || user
    this.members = this.members.filter((m) => m !== ID)
  }

  isPublic() {
    try {
      return this.type === 'public'
    } catch {
      return false
    }
  }
  isBookMarked() {}
  isNotifications() {
    try {
      return this.notification === true
    } catch (e) {
      return false
    }
  }
  isValid() {
    return !this.deletedAt && !this.archivedAt
  }
  // format date

  // single select N/A, very low, low, normal, high, very high
  levelTitle(level) {
    switch (level) {
      case 1:
        return 'Very Low'
      case 2:
        return 'Low'
      case 3:
        return 'Normal'
      case 4:
        return 'High'
      case 5:
        return 'Very High'
      default:
        return 'N/A'
    }
  }
  levelColor(level) {
    switch (level) {
      case 1:
        return '#37474f'
      case 2:
        return '#5e72e4'
      case 3:
        return '#ffbb33'
      case 4:
        return '#ff9f1a'
      case 5:
        return '#f5365c'
      default:
        return '#000000'
    }
  }

  timeTracking() {
    let t = [
      {
        id: 12,
        time: '1d',
        date: '12-02-2019',
      },
      {
        id: 13,
        time: '12:12 am',
        time_end: '14:12 pm',
      },
    ]
  }
  // Group by theo Court District, Priority, Matter Type, Risk Level, Matter Stage, Client, Active, Jury Demand
  // group by: ['court', 'priority', 'types', 'risk_level', 'matter_stage', 'client', 'active', 'jury_demand']

  isAssigned(userID) {
    return (
      this.members.length > 0 &&
      userID !== this.creator &&
      this.members.find((m) => m.user === userID && m.role === 1)
    )
  }
  isManaged(userID) {
    return (
      this.members.length > 0 &&
      userID === this.creator &&
      this.members.filter((m) => m.user === this.creator && m.role === 1)
    )
  }

  moreItems(items, total) {
    return items.length - total > 0 ? items.length - total : null
  }

  getColorBookMark() {
    return this.bookmark ? 'rgb(255, 159, 26)' : 'default'
  }

  getCourt() {
    if (this.jurisdiction) return this.jurisdiction['id']
    return ''
  }
  getPath() {
    return '/matters/' + this.matterID
  }
  getJurisdictionTitle() {
    if (this.jurisdiction) return this.jurisdiction['full_name']
    return 'No Jurisdiction'
  }
}

export class GroupBy {
  constructor(gr) {
    if (!gr)
      gr = { groupByID: 0, name: 'Low', color: '', group_type: 'priority' }
    this.groupByID = gr.ID || null
    this.name = gr.name || null
    this.color = gr.color || null
    this.groupType = gr.group_type || 'priority'
  }
  getColor() {}
}

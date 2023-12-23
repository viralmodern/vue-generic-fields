import _ from 'lodash'

export const SESSION = {
  TOKEN: 'token',
  SUBDOMAINS: 'subdomains',
  SECTIONS: 'SECTIONS',
  OPEN_SIDEBAR: 'OPEN_SIDEBAR',
  HIDE_SIDEBAR: 'HIDE_SIDEBAR',
  GROUP_BY: 'GROUP_BY',
  GROUP_ID: 'GROUP_ID',
  ALL_CAF: 'ALL_CAF',
  UI: {
    leftSidebarWidth: 'leftSidebarWidth',
    leftSidebarCollapsed: 'leftSidebarCollapsed',
  },
  DARK_THEME: 'DARK_THEME',
  OPINION_ACTIVE: 'OPINION_ACTIVE',
  APP_CONFIGS: 'APP_CONFIGS',
  PINNED: 'PINNED',
}
export const SETTINGS = {
  CAF_TYPE_DEFAULT: 'default',
  CAF_ACTIVATE: 'activate',
  CAF_FEATURED: 'featured',
  CAF_DEMO: 'demo',
}
export const setSESSION = (session_name, data) => {
  // eslint-disable-next-line no-undef
  let storage = typeof data === 'object' ? JSON.stringify(data) : data
  return localStorage.setItem(session_name, storage)
}

export const getSESSION = (session_name) => {
  // eslint-disable-next-line no-undef
  const value = localStorage.getItem(session_name)
  try {
    // eslint-disable-next-line no-undef
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export const removeSESSION = (session_name, remove_all = false) => {
  const removeAll = () => {
    localStorage.clear()
  }
  const removeItems = () => {
    for (let i = 0; i < session_name.length; i++) {
      localStorage.removeItem(session_name[i])
    }
  }
  // todo: remove all session
  if (remove_all) {
    return removeAll()
  }
  // todo: remove items session
  if (Array.isArray(session_name)) {
    return removeItems()
  }
  // todo: remove string name
  return localStorage.removeItem(session_name)
}

export const setSubdomains = (subdomain) => {
  let subdomains = JSON.parse(getSESSION('subdomains') || '[]')
  subdomains = subdomains.filter((item) => item !== subdomain)
  subdomains.push(subdomain)
  setSESSION('subdomains', JSON.stringify(subdomains))
}

export const getRecentDomain = () => {
  let subdomains = JSON.parse(getSESSION('subdomains') || '[]')
  return subdomains.pop()
}

export const getFormData = (data) => {
  const formData = new FormData()
  _.keys(data).forEach(function (key) {
    let value = data[key]
    if (value === null) {
      value = ''
    }
    if (typeof value === 'object' && key !== 'avatar') {
      _.keys(value).forEach(function (key2) {
        let value2 = value[key2]
        if (value2 === null) {
          value2 = ''
        }
        formData.append(key + '.' + key2, value2)
      })
    } else if (key === 'avatar') {
      if (value != null && typeof value !== 'string') {
        formData.append(key, value)
      }
    } else {
      formData.append(key, value)
    }
  })
  return formData
}

export function redirectToLoginPage(redirect, route) {
  console.error('redirectToLoginPage', route)
  return redirect({
    path: '/auth/login',
    query: { redirect: route.fullPath },
  })
}

export const getLabelByValue = ({ val, list }) => {
  try {
    return list.find((l) => l.value === val)
  } catch (e) {
    return null
  }
}

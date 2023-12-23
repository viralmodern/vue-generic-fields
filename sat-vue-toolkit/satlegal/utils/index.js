import _ from 'lodash';
import moment from "moment";

export const getAppDomain = () => {
  let appDomain = process.env.VUE_APP_DOMAIN
  if (!location.hostname.endsWith(appDomain)) {
    return location.hostname;
  }
  return appDomain;
}

export const getSubdomain = hostname => {
  // TODO: from htactive, hardcode for testing on preview deploy link
  if (location.hostname.endsWith(".netlify.com")) return "sat-byz";
  // Will remove on production server
  // end hard code
  return hostname.replace(getAppDomain(), "").split(".")[0];
};

export const isValidSubdomain = subdomain => {
  return !!subdomain && subdomain.indexOf(".") === -1;
};

export const getMainURL = () => {
  return location.origin.replace(`${getSubdomain(location.hostname)}.`, "");
};

export const getSubdomainURL = subdomain => {
  return `${location.protocol}//${subdomain}.${location.host}`;
};

export const SESSION = {
  TOKEN: 'token',
  SUBDOMAINS: 'subdomains'
}
export let setSESSION = (session_name, data) => {
  let storage = typeof data === 'object' ? JSON.stringify(data) : data
  return localStorage.setItem(session_name, storage)
};
window.setSESSION = setSESSION;
window.SESSION = SESSION;
window.getSESSION = getSESSION;

export const $$STORE_PREFIX = 'ht_store/' // ht_store

export let getSESSION = (session_name) => {
  let value = localStorage.getItem(session_name);
  try {
    return JSON.parse(localStorage.getItem(session_name));
  } catch (error) {
    return value;
  }
};

export let removeSESSION = (session_name, remove_all = false) => {
  let removeAll = () => {
    for (let k in SESSION) {
      localStorage.removeItem(SESSION[k]);
    }
  };
  let removeItems = () => {
    for (let i = 0; i < session_name.length; i++) {
      localStorage.removeItem(session_name[i]);
    }
  };
  // todo: remove all session
  if (remove_all) return removeAll();
  // todo: remove items session
  if (Array.isArray(session_name)) return removeItems();
  // todo: remove string name
  return localStorage.removeItem(session_name);
};


export let getFormData = (data) => {
  let formData = new FormData();
  _.keys(data).forEach(function (key) {
    let value = data[key];
    if (value === null) {
      value = '';
    }
    if (typeof value === "object" && key !== "avatar") {
      _.keys(value).forEach(function (key2) {
        let value2 = value[key2];
        if (value2 === null) {
          value2 = '';
        }
        formData.append(key + '.' + key2, value2);
      })
    } else {
      if (key === 'avatar') {
        if (value != null && (typeof value !== "string")) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, value);
      }
    }

  });
  return formData;
};

export const getFormData2 = (data, arraySkip = [null, undefined, '']) => {
  const formData = new FormData();
  for (const key in data) {
    if (arraySkip.includes(data[key])) {
      formData.append(`${key}`, data[key]);
      continue;
    } else if (Array.isArray(data[key])) {
      data[key].forEach((x) => {
        formData.append(`${key}`, x);
      });
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

export function dynamicFormParser(form) {
  let value = {};
  for (let index = 0; index < form.length; index++) {
    const element = form[index];
    value[element.config.label] = element.value
  }
  return value;
}


function uniq(array) {
  return array.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);
}

export function formatQuery(query) {
  const data = JSON.parse(JSON.stringify(query));
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key] = uniq(data[key]).join();
    }
  }
  return data;
}


export function getLoadingSlickTable(data, status) {
  let loading = {};
  if (data && data.length) {
    data.forEach(x => {
      loading[x] = status
    })
  } else {
    loading['all'] = status;
  }
  return loading;
}


export function arrayMove(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

export function formatDateTime(date, time = "00:00") {
  const momentDate = moment(date);
  const [h, m] = time.split(":");
  momentDate.set({h, m});
  return momentDate.toISOString();

}

export function cloneData(data) {
  return _.clone(data);
}

export function formatDate(value, format = "YYYY-MM-DD") {
  return moment(value).format(format);
}

export function checkIsAfter(date) {
  return moment().isAfter(date);
}

export function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}

const checkNull = (x) => [0, "", null, undefined].includes(x);

export const getFieldArrayNullAble = data => {
  if (checkNull(data)) {
    return undefined;
  } else {
    const filter = data.filter(x => x !== 0);
    return filter.length ? filter : undefined;
  }
};
export const getFieldNullAble = value => checkNull(value) ? undefined : value;
export const getFieldObjectNullAble = value => checkNull(value.id) ? undefined : value.id;
export const getFieldArrayObjectNullAble = data => data.filter(x => x.id !== 0).map(x => x.id);

export function autoFillListIdGroup() {
  let ids = [];
  if (this.groupBy.field === "all") {
    ids = ["all"];
  } else if (Array.isArray(this[this.groupBy.field])) {
    if (this[this.groupBy.field].some(x => typeof x === "object")) {
      ids = this[this.groupBy.field].map(x => (x.id || x.pk));
    } else {
      ids = this[this.groupBy.field];
    }
  } else {
    if (typeof this[this.groupBy.field] === "object") {
      ids = [this[this.groupBy.field].id];
    } else {
      ids = [this[this.groupBy.field]];
    }
  }
  return ids;
}

export function mergeDataLabel(data, listLabel) {
  let listLabelClone = [...listLabel];
  data.forEach(s => {
    if (!listLabelClone.some(s1 => s1.pk === s.pk)) {
      listLabelClone.push({...s, color: "#" + s.color})
    }
  })
  return listLabelClone;
}

export function removeObjectDuplicate(data, key) {
  return _.uniqBy(data, key); //remove duplicates
}

export function cloneDeep(data) {
  return _.cloneDeep(data);
}

export const defaultDataActionComment = {
  loading: false,
  loadingAdd: false,
  loadingUpdate: false,
  isShowFeedback: false,
  isCallApi: false,
  isEdit: false,
  page: 0,
}

export const defaultDataActionCommentFeedback = {
  loading: false,
  loadingAdd: false,
  loadingUpdate: false,
  isCallApi: false,
  isEdit: false,
}

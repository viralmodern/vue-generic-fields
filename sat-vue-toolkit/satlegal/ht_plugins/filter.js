import Vue from "vue";
import moment from "moment";

Vue.filter("formatDate", (date, format = "MM DD YYYY") => {
  if (!date) return "";
  return moment(date).format(format);
});
export function formatDate (date, format = "MM DD YYYY") {
  if (!date) return "";
  return moment(date).format(format);
}

Vue.filter("fullName", profile => {
  if (!profile) return "";
  return `${profile.firstName} ${profile.lastName}`;
});
export function fullName (profile) {
  if (!profile) return "";
  return `${profile.firstName} ${profile.lastName}`;
}

Vue.filter("getYear", date => {
  if (!date) return "";
  const year = parseInt(moment(date).format("YYYY"));
  return year === new Date().getFullYear() ? "Now" : year;
});
export function getYear (date) {
  if (!date) return "";
  const year = parseInt(moment(date).format("YYYY"));
  return year === new Date().getFullYear() ? "Now" : year;
}
Vue.filter("formatShortDate", day => {
  if (!day) return;
  if (typeof day === "string") {
    return moment(day).format("MMM Do YY");
  }
  return moment(day).format("MMM Do YY");
});
export function formatShortDate (day) {
  if (!day) return;
  if (typeof day === "string") {
    return moment(day).format("MMM Do YY");
  }
  return moment(day).format("MMM Do YY");
}

Vue.filter("formatShortDateTime", (day, format = 'MMM Do YY HH:mm:ss') => {
  if (!day) return;
  if (typeof day === "string") {
    return moment(day).format(format);
  }
  return moment(day).format(format);
});
export function formatShortDateTime (day, format = 'MMM Do YY HH:mm:ss') {
  if (!day) return;
  if (typeof day === "string") {
    return moment(day).format(format);
  }
  return moment(day).format(format);
}

Vue.filter("formatFullDateWithWeekDay", day => {
  if (!day) return;
  if (typeof day === "string") {
    return moment(day).format("dddd, MMM DD, YYYY");
  }
  return moment(day).format("dddd, MMM DD, YYYY");
});

Vue.filter("formatMMMDD", day => {
  if (typeof day === "string") {
    return moment(day).format("MMM DD");
  }
  return moment(day).format("MMM DD");
});

Vue.filter("formatDMY", day => {
  if (typeof day === "string") {
    return moment(day).format("DD MMM, YYYY");
  }
  return moment(day).format("DD MMM, YYYY");
});

Vue.filter("formatMY", day => {
  if (typeof day === "string") {
    return moment(day).format("MMMM YYYY");
  }
  return moment(day).format("MMMMM YYYY");
});

Vue.filter("formatMMDDYYYY", day => {
  if (typeof day === "string") {
    return moment(day).format("MM/DD/YYYY");
  }
  return moment(day).format("MM/DD/YYYY");
});

Vue.filter("formatYYYYMMDD", day => {
  if (typeof day === "string") {
    return moment(day).format("YYYY-MM-DD");
  }
  return moment(day).format("YYYY-MM-DD");
});

export const formatMMDDYYYYHHMM = day => {
  if (typeof day === "string") {
    return moment(day).format("MM/DD/YYYY HH:mm:ss");
  }
  return moment(day).format("MM/DD/YYYY HH:mm:ss");
};



export const formatTimeHHmm = day => {
  if (typeof day === "string") {
    return moment(day).format("HH:mm");
  }
  return moment(day).format("HH:mm");
};

export const richTextToHtml = richText => {
  if (!richText) return richText;
  richText = richText.replace(/ /g, "&nbsp;");
  return richText.replace(/\n/g, "<br/>");
};

export const fromSecondsToDays =  duration => {
  return Math.ceil(duration ? duration / 86400 : "");
};

export const formatCurrency = number => {
  if (number === "null" || number === undefined) return "";
  const result = (+number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return result;
};



export const capitalize = value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const numberCeil = value => {
  if (!value) return 0;
  return Math.ceil(value);
}


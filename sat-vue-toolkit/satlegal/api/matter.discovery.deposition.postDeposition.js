export function getDataStatistics() {
  return [
    {
      name: "Question",
      type: "line",
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230]
    },
    {
      name: "Question has Answer",
      type: "line",
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90]
    },
    {
      name: "Key Testimony",
      type: "line",
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410, 320, 332, 301, 334, 390]
    },
    {
      name: "Followup",
      type: "line",
      areaStyle: { normal: {} },
      data: [320, 332, 301, 334, 390, 330, 320, 820, 932, 901, 934, 1290]
    },
    {
      name: "Question Alert",
      type: "line",
      areaStyle: { normal: {} },
      data: [820, 932, 901, 934, 1290, 1330, 1320, 120, 132, 101, 134, 90]
    }
  ]
}

export default {
  getDataStatistics
}

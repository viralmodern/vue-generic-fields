export function $$setVisualDataSunburst (data) {
  return {
    visualMap: {
      type: "continuous",
      min: 0,
      max: 10,
      inRange: {
        color: ["#2D5F73", "#538EA6", "#F2D1B3", "#F2B8A2", "#F28C8C"]
      }
    },
    series: {
      type: "sunburst",
      data: data,
      radius: [0, "90%"],
      label: {
        rotate: "radial"
      }
    }
  }
}

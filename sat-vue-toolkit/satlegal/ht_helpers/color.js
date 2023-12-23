export const convertColor = val => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  val = val.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
  return result
    ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )},0.2)`
    : null;
};

export const colorHLS = range => {
  const min = 30;
  const max = 55;
  const center = (max - min) / 100;
  const l = center * range + min;
  return `hsla(259, 54%, ${l}%, 1)`;
};

export const listColors = [
  "#F44336",
  "#FF5722",
  "#FFC107",
  "#66BB6A",
  "#4CAF50",
  "#FFFF33",
  "#795548",
  "#009688"
]


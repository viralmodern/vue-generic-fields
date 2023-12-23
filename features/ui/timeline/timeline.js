import * as d3 from 'd3'

// https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js
const height = 238.5
const width = 600
const margin = 25
const data = [
  {
    date: new Date([2016, 5, 15]),
    description:
      'An earthquake destroys the city of Kameiros on the island of Rhodes and the Colossus of Rhodes.',
    lang: 'en',
    granularity: 'year',
    index: 0,
  },
  {
    date: new Date([2016, 9, 12]),
    description:
      'Substantial parts of the city of Sikyon are destroyed by an earthquake.',
    lang: 'en',
    granularity: 'year',
    index: 1,
  },
]
export function createTimeline(domElement) {
  let x = d3
    .scaleTime()
    .range([0, width])
    .domain([d3.min(data, (d) => d.date), Date.now()])
  let xAxis = d3.axisBottom().scale(x)
  let svg = d3
    .select(domElement)
    .append('svg')
    .attr('viewBox', [0, -margin, width, height + margin * 2])
    .attr('width', width)
    .attr('height', height)
    .call(xAxis)
    .node()
}

function domainZoom() {
  let pinX = false, //"left" OR "right",
    pinY = false, //"top" OR "bottom",
    squishableX = true,
    squishableY = true,
    axis = [],
    axisX,
    axisY,
    extentX = [-Infinity, Infinity],
    extentY = [-Infinity, Infinity],
    cageX = [-Infinity, Infinity],
    cageY = [-Infinity, Infinity],
    scaleExtentX = [0, Infinity],
    scaleExtentY = [0, Infinity],
    scaleX = d3.scaleLinear(), //scale0X.copy(),
    scaleY = d3.scaleLinear(), //scale0Y.copy(),
    scale0X = scaleX.copy(), //d3.scaleLinear(),
    scale0Y = scaleX.copy(), //d3.scaleLinear(),
    transform = d3.zoomIdentity,
    d3Zoom,
    links = [],
    debug,
    _transform = d3.zoomIdentity

  function ui(context) {
    const domain0X = scale0X.domain(),
      span0X = +diff(domain0X),
      left0 = +domain0X[0],
      right0 = +domain0X[1],
      rangeSpan0X = diff(scale0X.range()),
      domain0Y = scale0Y.domain(),
      span0Y = +diff(domain0Y),
      top0 = +domain0Y[0],
      bottom0 = +domain0Y[1],
      rangeSpan0Y = diff(scale0Y.range())

    d3Zoom = d3
      .zoom()
      .constrain(constraint)
      .translateExtent([
        [scale0X(extentX[0]), scale0Y(extentY[0])],
        [scale0X(extentX[1]), scale0Y(extentY[1])],
      ])
      .scaleExtent([
        Math.min(scaleExtentX[0] / span0X, scaleExtentY[0] / span0Y),
        Math.max(scaleExtentX[1] / span0X, scaleExtentY[1] / span0Y),
      ])
      .on(
        'zoom',
        zoomed
      )(context)

    function constraint(transform, extentRange, translateExtentRange) {
      return transform
    }

    function linkit() {
      for (const [dim, ax] of axis) {
        if (dim === 'x') {
          console.error('AX', axis)
          ax.scale(scaleX)(context)
        } else if (dim === 'y') {
          ax.scale(scaleY)(context)
        }
      }
      links.forEach((fn) => fn(context, scaleX, scaleY))
    }

    function zoomed(e) {
      const transform = e.transform //d3.version[0] < 6 ? d3.event.transform : e.transform;

      const transformX = pinX ? squishItX(transform) : transform
      scaleX.domain(scale0X.range().map((d) => range2domain0X(d, transformX)))

      const transformY = pinY ? squishItY(transform) : transform
      scaleY.domain(scale0Y.range().map((d) => range2domain0Y(d, transformY)))

      _transform = transform
      linkit()
    }

    function range2domain0X(d, transform1) {
      return scale0X.invert(transform1.invertX(d))
    }

    function range2domain0Y(d, transform1) {
      return scale0Y.invert(transform1.invertY(d))
    }

    function squishItX(newTransform) {
      let pivotX = newTransform.x
      if (_transform.k === newTransform.k && squishableX) {
        if (pinX === 'left') {
          pivotX = -scale0X(left0) * transform.k
        } else if (pinX === 'right') {
          pivotX = rangeSpan0X - scale0X(right0) * transform.k //
        }

        const rangeSpan = rangeSpan0X * newTransform.k
        const dx = newTransform.x - pivotX
        if (pinX === 'left') {
          newTransform.k *= 1 + dx / rangeSpan0X
        } else if (pinX === 'right') {
          newTransform.k *= 1 - dx / rangeSpan0X
        }
      }

      if (pinX === 'left') {
        pivotX = -scale0X(left0) * newTransform.k
      } else if (pinX === 'right') {
        pivotX = rangeSpan0X - scale0X(right0) * newTransform.k //
      }
      newTransform.x = pivotX

      if (newTransform.k < scaleExtentX[0] / span0X) {
        newTransform.k = scaleExtentX[0] / span0X
      }
      if (newTransform.k > scaleExtentX[1] / span0X) {
        newTransform.k = scaleExtentX[1] / span0X
      }

      return newTransform
    }

    function squishItY(newTransform) {
      let pivotY = newTransform.y
      if (_transform.k === newTransform.k && squishableY) {
        if (pinY === 'top') {
          pivotY = -scale0Y(left0) * transform.k
        } else if (pinY === 'bottom') {
          pivotY = rangeSpan0Y - scale0Y(right0) * transform.k //
        }

        const rangeSpan = rangeSpan0Y * newTransform.k
        const dy = newTransform.y - pivotY
        if (pinX === 'top') {
          newTransform.k *= 1 + dy / rangeSpan0Y
        } else if (pinX === 'bottom') {
          newTransform.k *= 1 - dy / rangeSpan0Y
        }
      }

      if (pinY === 'top') {
        pivotY = -scale0Y(top0) * newTransform.k
      } else if (pinY === 'bottom') {
        pivotY = rangeSpan0Y - scale0Y(bottom0) * newTransform.k //
      }
      newTransform.y = pivotY

      if (newTransform.k < scaleExtentY[0] / span0Y) {
        newTransform.k = scaleExtentY[0] / span0Y
      }

      if (newTransform.k > scaleExtentY[1] / span0Y) {
        newTransform.k = scaleExtentY[1] / span0Y
      }

      return newTransform
    }
    //trigger linked updates callback on creation
    linkit()
  }

  ui.x = function (_) {
    return arguments.length ? ((scaleX = _), (scale0X = _.copy()), ui) : scaleX
  }

  ui.y = function (_) {
    return arguments.length ? ((scaleY = _), (scale0Y = _.copy()), ui) : scaleY
  }

  ui.x0 = function (_) {
    return scale0X
  }

  ui.y0 = function (_) {
    return scale0Y
  }

  ui.extentX = function (_) {
    return arguments.length ? ((extentX = _), ui) : extentX
  }

  ui.extentY = function (_) {
    return arguments.length ? ((extentY = _), ui) : extentY
  }

  ui.scaleExtentX = function (_) {
    return arguments.length ? ((scaleExtentX = _), ui) : scaleExtentX
  }

  ui.scaleExtentY = function (_) {
    return arguments.length ? ((scaleExtentY = _), ui) : scaleExtentY
  }

  ui.axisX = function (_) {
    return arguments.length ? (axis.push(['x', _]), ui) : axisX
  }

  ui.axisY = function (_) {
    return arguments.length ? (axis.push(['y', _]), ui) : axisY
  }

  ui.cageX = function (_) {
    return arguments.length ? ((cageX = _), ui) : cageX
  }

  ui.cageY = function (_) {
    return arguments.length ? ((cageY = _), ui) : cageY
  }

  ui.link = function (_) {
    return arguments.length ? (links.push(_), ui) : links[0]
  }

  ui.links = function (_) {
    return arguments.length ? ((links = _), ui) : links
  }

  ui.pinX = function (_) {
    return arguments.length ? ((pinX = _), ui) : pinX
  }

  ui.pinY = function (_) {
    return arguments.length ? ((pinY = _), ui) : pinY
  }

  ui.squishableX = function (_) {
    return arguments.length ? ((squishableX = _), ui) : squishableX
  }

  ui.squishableY = function (_) {
    return arguments.length ? ((squishableY = _), ui) : squishableY
  }

  ui.transform = function (_) {
    return arguments.length ? ((_transform = _), ui) : _transform
  }

  ui.debug = function (_) {
    return arguments.length ? ((debug = _), ui) : debug
  }

  return ui
}
function diff(arr) {
  return (arr) => arr.reduce((a, b) => b - a)
}
function timeline(orient = 'Top', scale = d3.scaleTime()) {
  const charAspectRatio = 1.5,
    translateX = (shift) => `translate(${shift},0)`,
    translateR = (shift) => `rotate(90)translate(0,-12)`,
    translateL = (shift) => `rotate(-90)translate(0,-12)`

  let anchor = [0, 0],
    format = formatLibrary.none,
    fontPx = 18,
    MF = defaultMF,
    tag = 'timeline' + orient,
    clipID = 'clip-' + tag,
    transform =
      orient === 'Top' || orient === 'Bottom'
        ? translateX
        : orient === 'Right'
        ? translateR
        : translateL

  function axis(context) {
    scale.domain().map((a) => (typeof a == 'number' ? new Date(a) : a))

    let selection = context.selection ? context.selection() : context,
      timeline = selection.selectAll('.' + tag).data([null]),
      clipEnter = selection
        .selectAll('#' + clipID)
        .data([null])
        .enter(),
      d3Axis

    const range = scale.range(),
      domain = scale.domain(),
      pd = diff(range) / diff(domain) // pixels per ms;
    format = selectFormatByCD(MF, (pd / fontPx) * charAspectRatio)
    const shift = (scale(+domain[0] + format.span) - scale(+domain[0])) / 2
    const farLeft = +scale.domain()[0] - format.span //format.interval.offset(+scale.domain()[0], -1);
    const rangeStep = scale.range()[0] - scale(farLeft)

    timeline
      .join((enter) => enter.insert('g').attr('class', tag))
      .attr(
        'transform',
        orient === 'Top' || orient == 'Bottom'
          ? `translate(${anchor[0]},${anchor[1]})`
          : `translate(${anchor[0]},${anchor[1]})`
      )

      .attr('clip-path', `url(#${clipID})`)
      .style('font-size', fontPx + 'px')
      .call(
        d3['axis' + orient](
          scale
            .copy()
            .domain([farLeft, scale.domain()[1]])
            .range([scale(farLeft), scale.range()[1]])
        )
          .ticks(format.interval)
          .tickFormat(format.label)
      )
      .call((g) =>
        g
          .selectAll('text')
          .attr(
            'transform',
            transform(Math.min(rangeStep / 2, diff(scale.range()) / 2))
          )
      )
      .call((g) => {
        if (orient === 'Top') {
          g.select('path').attr(
            'd',
            `M0.5,-6V0.5H${diff(scale.range()) - 1}V-6`
          )
        } else if (orient === 'Bottom') {
          g.select('path').attr('d', `M0.5,6V0.5H${diff(scale.range()) - 1}V6`)
        } else if (orient === 'Right') {
          g.select('path').attr('d', `M6,0.5H0.5V${diff(scale.range()) - 1}H6`)
        } else if (orient === 'Left') {
          g.select('path').attr(
            'd',
            `M-6,0.5H0.5V${diff(scale.range()) - 1}H-6`
          )
        }
      })

    clipEnter
      .append('clipPath')
      .attr('id', clipID)
      .append('rect')
      .attr('x', orient === 'Top' || orient === 'Bottom' ? anchor[0] : -1e4)
      .attr('y', orient === 'Left' || orient === 'Right' ? anchor[1] : -1e4)
      .attr(
        'width',
        orient == 'Top' || orient == 'Bottom' ? diff(scale.range()) : 2e4
      )
      .attr(
        'height',
        orient == 'Left' || orient == 'Right' ? diff(scale.range()) : 2e4
      )
  }

  axis.scale = function (_) {
    return arguments.length ? ((scale = _), axis) : scale
  }

  axis.orient = function (_) {
    return arguments.length ? ((orient = _), axis) : orient
  }

  axis.anchor = function (_) {
    return arguments.length ? ((anchor = _), axis) : anchor
  }

  axis.format = function (_) {
    return arguments.length ? ((format = _), axis) : format
  }

  axis.fontPx = function (_) {
    return arguments.length ? ((fontPx = _), axis) : fontPx
  }

  axis.MF = function (_) {
    return arguments.length ? ((MF = _), axis) : MF
  }

  axis.tag = function (_) {
    return arguments.length ? ((tag = _), axis) : tag
  }

  return axis
}
function formatLibrary() {
  let me = {
    none: {
      interval: d3.timeYear.every(1e5), // d3 time interval
      label: () => '', // Formatting function, eg. d3.timeFormat()
      characters: 0, // Maximum characters that the label will required
    },
    decaSecond: {
      interval: d3.timeMillisecond.every(100),
      label: (t) =>
        d3.timeFormat('%S.')(t) + d3.timeFormat('%L')(t).slice(0, 1),
      characters: 4,
    },
    shortSecond: {
      interval: d3.timeSecond.every(1),
      label: (t) => d3.timeFormat('%Ss')(t),
      characters: 3,
    },
    secondly: {
      interval: d3.timeSecond.every(1),
      label: d3.timeFormat('%H:%M:%S'),
      characters: 8,
    },
    fiveSecondly: {
      interval: d3.timeSecond.every(5),
      label: d3.timeFormat('%H:%M:%S'),
      characters: 8,
    },
    tenSecondly: {
      interval: d3.timeSecond.every(10),
      label: d3.timeFormat('%H:%M:%S'),
      characters: 8,
    },
    quarterMinutely: {
      interval: d3.timeSecond.every(15),
      label: d3.timeFormat('%H:%M:%S'),
      characters: 8,
    },
    halfMinutely: {
      interval: d3.timeSecond.every(30),
      label: d3.timeFormat('%H:%M:%S'),
      characters: 8,
    },
    minutely: {
      interval: d3.timeMinute.every(1),
      label: d3.timeFormat('%H:%M'),
      characters: 5,
    },
    fiveMinutely: {
      interval: d3.timeMinute.every(5),
      label: d3.timeFormat('%H:%M'),
      characters: 5,
    },
    quarterHourly: {
      //21:15
      interval: d3.timeMinute.every(15),
      label: d3.timeFormat('%H:%M'),
      characters: 5,
    },
    hourly: {
      interval: d3.timeHour.every(1),
      label: d3.timeFormat('%H:00'),
      characters: 5,
    },
    fourHourly: {
      interval: d3.timeHour.every(4),
      label: d3.timeFormat('%H:00'),
      characters: 5,
    },
    quarterDaily: {
      interval: d3.timeHour.every(6),
      label: d3.timeFormat('%I%p'),
      characters: 4,
    },
    fullDate: {
      interval: d3.timeDay.every(1),
      label: d3.timeFormat('%e %B'),
      characters: 12,
    },
    weekDay: {
      interval: d3.timeDay.every(1),
      label: d3.timeFormat('%A'),
      characters: 9,
    },
    shortDate: {
      interval: d3.timeDay.every(1),
      label: d3.timeFormat('%e %b'),
      characters: 6,
    },
    dayInYear: {
      interval: d3.timeDay.every(1),
      label: d3.timeFormat('D%j'),
      characters: 4,
    },
    shortWeekDay: {
      interval: d3.timeDay.every(1),
      label: d3.timeFormat('%a'),
      characters: 3,
    },
    weekDayLetter: {
      interval: d3.timeDay.every(1),
      label: (d) => d3.timeFormat('%a')(d)[0],
      characters: 1.2, //weird right?
    },
    weekInYear: {
      interval: d3.timeWeek.every(1),
      label: d3.timeFormat('Week %V'),
      characters: 7,
    },
    shortWeekDate: {
      interval: d3.timeWeek.every(1),
      label: d3.timeFormat('%e %b'),
      characters: 6,
    },
    fullMonth: {
      interval: d3.timeMonth.every(1),
      label: d3.timeFormat('%B'),
      characters: 9,
    },
    shortMonth: {
      interval: d3.timeMonth.every(1),
      label: d3.timeFormat('%b'),
      characters: 3,
    },
    monthLetter: {
      interval: d3.timeMonth.every(1),
      label: (d) => d3.timeFormat('%b')(d)[0],
      characters: 1.2,
    },
    season: {
      interval: timeSeason,
      label: (e) =>
        ['Spring', 'Summer', 'Fall', 'Winter'][(e.getMonth() - 2) / 3],
      characters: 6,
    },
    fullYear: {
      interval: d3.timeYear.every(1),
      label: d3.timeFormat('%Y'),
      characters: 4,
    },
    shortYear: {
      interval: d3.timeYear.every(1),
      label: d3.timeFormat("'%y"),
      characters: 3,
    },
    biYear: {
      //2022
      interval: d3.timeYear.every(2),
      label: d3.timeFormat('%Y'),
      characters: 4,
    },
    semiDecade: {
      //2025
      interval: d3.timeYear.every(5),
      label: d3.timeFormat('%Y'),
      characters: 4,
    },
    decade: {
      //2030s
      interval: d3.timeYear.every(1e1),
      label: d3.timeFormat('%Ys'),
      characters: 5,
    },
    biDecade: {
      //2040
      interval: d3.timeYear.every(2e1),
      label: d3.timeFormat('%Y'),
      characters: 4,
    },
    semiCentury: {
      //2050
      interval: d3.timeYear.every(5e1),
      label: d3.timeFormat('%Y'),
      characters: 4,
    },
    century: {
      //2100
      interval: d3.timeYear.every(1e2),
      label: d3.timeFormat('%Y'),
      characters: 4,
    },
    centuryCE: {
      //2100CE
      interval: d3.timeYear.every(1e2),
      label: (d) =>
        Math.abs(Math.floor(d.getYear() + 1900)) +
        (d.getYear() > -1900 ? 'CE' : d.getYear() < -1900 ? 'BCE' : ''),
      characters: 7,
    },
    biCentury: {
      //2200CE
      interval: d3.timeYear.every(2e2),
      label: (d) =>
        Math.abs(Math.floor(d.getYear() + 1900)) +
        (d.getYear() > -1900 ? 'CE' : d.getYear() < -1900 ? 'BCE' : ''),
      characters: 7,
    },
    semiMillenium: {
      //2500CE
      interval: d3.timeYear.every(5e2),
      label: (d) =>
        Math.abs(Math.floor(d.getYear() + 1900)) +
        (d.getYear() > -1900 ? 'CE' : d.getYear() < -1900 ? 'BCE' : ''),
      characters: 7,
    },
    milleniumYA: {
      //3 kYA
      interval: d3.timeYear.every(1e3),
      label: (d) =>
        Math.abs(Math.floor((d.getYear() + 1900) / 1e3)) +
        (d.getYear() >= -1900 ? ' k' : ' kYA'),
      characters: 5,
    },
    millenium: {
      //3k
      interval: d3.timeYear.every(1e3),
      label: (d) => Math.floor((d.getYear() + 1900) / 1e3) + 'k',
      characters: 4,
    },
    biMillenium: {
      //4k
      interval: d3.timeYear.every(2e3),
      label: (d) => Math.floor((d.getYear() + 1900) / 1e3) + 'k',
      characters: 4,
    },
    semiDecMil: {
      //5k
      interval: d3.timeYear.every(5e3),
      label: (d) => Math.floor((d.getYear() + 1900) / 1e3) + 'k',
      characters: 4,
    },
    decMil: {
      //10k
      interval: d3.timeYear.every(1e4),
      label: (d) => Math.floor((d.getYear() + 1900) / 1e3) + 'k',
      characters: 4,
    },
    biDecMil: {
      //20k
      interval: d3.timeYear.every(2e4),
      label: (d) => Math.floor((d.getYear() + 1900) / 1e3) + 'k',
      characters: 4,
    },
    semiCentMil: {
      //50k
      interval: d3.timeYear.every(5e4),
      label: (d) => Math.floor((d.getYear() + 1900) / 1e3) + 'k',
      characters: 4,
    },
    centMil: {
      //"100k
      interval: d3.timeYear.every(1e5),
      label: (d) => Math.floor((d.getYear() + 1900) / 1e3) + 'k',
      characters: 4,
    },
    biCentMil: {
      //200k
      interval: d3.timeYear.every(2e5),
      label: (d) => Math.floor((d.getYear() + 1900) / 1e3) + 'k',
      characters: 4,
    },
  }

  //CALCULATED VALUES
  function calcSpan(f) {
    const t0 = f.interval(Date.now())
    return f.interval.offset(t0, 1) - t0
  }

  function calcCD(f) {
    return f.characters / f.span
  }

  function example(f) {
    return f.label(f.interval(new Date(Date.now())))
  }

  Object.keys(me).forEach((k) => {
    me[k].span = calcSpan(me[k])
    me[k].cd = calcCD(me[k])
    me[k].example = example(me[k])
  })

  return me
}
function timeSeason() {
  d3.timeInterval(
    //https://github.com/d3/d3-time#timeInterval
    function (date) {
      //floor function
      var newM = (Math.floor(((date.getMonth() + 1) % 12) / 3) * 3 + 11) % 12
      if (newM > date.getMonth()) {
        date.setYear(date.getFullYear() - 1)
      }
      date.setMonth(newM)
      date.setDate(1)
      date.setHours(0, 0, 0, 0)
    },
    function (date, step) {
      //step function
      date.setMonth(date.getMonth() + step * 3)
    },
    function (start, end) {
      //count function
      return (
        (end.getFullYear() - start.getFullYear()) * 4 +
        (end.getMonth() - start.getMonth()) / 3
      )
    },
    function (date) {
      //field function
      return (Math.floor(((date.getMonth() + 1) % 12) / 3) * 3 + 11) % 12
    }
  )
}
function timelineTop(scale, MF) {
  return timeline('Top', scale, MF)
}
function grouping(tag = 'grouping') {
  let i = 0,
    children = {},
    properties = {}

  function root(context) {
    const selection = context.selection ? context.selection() : context,
      group = selection
        .selectAll('.' + tag)
        .data([null])
        .join('g')
        .attr('class', tag)
        .selectAll('g .partition')
        .data(Object.keys(children))
        .join('g')
        .attr('class', (d) => 'partition ' + d)
        .each(function (d) {
          d3.select(this).call((g, varargin) => children[d](g, varargin))
        })
    return group
  }

  root.tag = function (_) {
    return arguments.length ? ((tag = _), root) : tag
  }

  root.children = function (_) {
    return arguments.length ? ((children = _), root) : children
  }

  root.child = function (name, _) {
    return arguments.length > 1 ? ((children[name] = _), root) : children[name]
  }

  root.method = function (method, setter) {
    this[method] = function (_) {
      if (typeof setter === 'function' && typeof _ !== 'undefined') {
        setter(children, _)
      }
      return arguments.length
        ? ((properties[method] = _), root)
        : properties[method]
    }
    return root
  }

  root.remove = function (_) {
    return (context) => {
      const selection = context.selection ? context.selection() : context,
        group = selection.selectAll('.' + tag)
      return arguments.length
        ? group.select('g .partition .' + _).remove()
        : group.remove()
    }
  }

  return root
}

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
        return typeof obj
      }
    : function (obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      }

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  } else {
    return Array.from(arr)
  }
}

/*******************************************************************************
 <Highlight /> Component
 *******************************************************************************/

var getHighlightConditionalClasses = function getHighlightConditionalClasses(
  conditions
) {
  var labelPosition = conditions.labelPosition,
    label = conditions.label,
    color = conditions.color,
    isClickable = conditions.isClickable,
    selectedId = conditions.selectedId,
    isClicking = conditions.isClicking,
    id = conditions.id,
    activeDepths = conditions.activeDepths,
    deepestIndex = conditions.deepestIndex,
    activeIds = conditions.activeIds,
    children = conditions.children

  return (
    'highlight\n    ' +
    (labelPosition ? labelPosition : label ? 'bottom' : '') +
    '\n    ' +
    (color ? color : 'blue') +
    '\n    ' +
    (isClickable ? 'clickable' : '') +
    '\n    ' +
    (selectedId && selectedId === id ? 'selected' : '') +
    '\n    ' +
    (isClicking && activeDepths.ids[deepestIndex] === id
      ? 'clicking active'
      : '') +
    '\n    ' +
    (!isClicking && activeIds && activeIds.includes(id) ? 'active' : '') +
    '\n    ' +
    (typeof children === 'string' && children.length < 8 ? 'short-text' : '')
  )
}

var Highlight = function Highlight(props) {
  var activeDepths = props.activeDepths,
    activeIds = props.activeIds,
    children = props.children,
    color = props.color,
    depth = props.depth,
    id = props.id,
    isClickable = props.isClickable,
    isClicking = props.isClicking,
    label = props.label,
    labelPosition = props.labelPosition,
    onClick = props.onClick,
    onMouseDown = props.onMouseDown,
    onMouseOver = props.onMouseOver,
    onMouseOut = props.onMouseOut,
    onMouseUp = props.onMouseUp,
    selectedId = props.selectedId,
    secondaryLabel = props.secondaryLabel,
    tooltip = props.tooltip

  var deepestIndex = activeDepths
    ? activeDepths.depths.indexOf(
        Math.max.apply(Math, _toConsumableArray(activeDepths.depths))
      )
    : null
  var conditionalClasses = getHighlightConditionalClasses({
    labelPosition: labelPosition,
    label: label,
    color: color,
    isClickable: isClickable,
    selectedId: selectedId,
    isClicking: isClicking,
    id: id,
    activeDepths: activeDepths,
    deepestIndex: deepestIndex,
    activeIds: activeIds,
    children: children,
  })

  var labelTemplate = React.createElement(
    'span',
    { className: 'highlight__label' },
    React.createElement('strong', null, label),
    secondaryLabel
      ? React.createElement(
          'span',
          { className: 'highlight__label__secondary-label' },
          secondaryLabel
        )
      : null
  )

  return React.createElement(
    'span',
    {
      className: conditionalClasses,
      'data-label': label,
      'data-id': id,
      'data-depth': depth,
      onClick: onClick
        ? function () {
            onClick(id)
          }
        : null,
      onMouseDown: onMouseDown
        ? function () {
            onMouseDown(id, depth)
          }
        : null,
      onMouseOver: onMouseOver
        ? function () {
            onMouseOver(id)
          }
        : null,
      onMouseOut: onMouseOut
        ? function () {
            onMouseOut(id)
          }
        : null,
      onMouseUp: onMouseUp
        ? function () {
            onMouseUp(id)
          }
        : null,
    },
    labelPosition === 'left' || labelPosition === 'top' ? labelTemplate : null,
    children
      ? React.createElement(
          'span',
          { className: 'highlight__content' },
          children
        )
      : null,
    (label || label !== null) &&
      labelPosition !== 'left' &&
      labelPosition !== 'top'
      ? labelTemplate
      : null,
    tooltip
      ? React.createElement(
          'span',
          { className: 'highlight__tooltip' },
          tooltip
        )
      : null
  )
}

/*******************************************************************************
 <HighlightContainer /> Component

 This is a Wrapper for <Highlight /> that sets
 container CSS classes that get inherited.
 *******************************************************************************/

var HighlightContainer = (function (_React$Component) {
  _inherits(HighlightContainer, _React$Component)

  function HighlightContainer() {
    _classCallCheck(this, HighlightContainer)

    return _possibleConstructorReturn(
      this,
      (
        HighlightContainer.__proto__ ||
        Object.getPrototypeOf(HighlightContainer)
      ).apply(this, arguments)
    )
  }

  _createClass(HighlightContainer, [
    {
      key: 'render',
      value: function render() {
        var _props = this.props,
          children = _props.children,
          isClicking = _props.isClicking,
          layout = _props.layout,
          className = _props.className

        var containerClasses =
          'passage\n      model__content__summary\n      highlight-container\n      ' +
          (layout ? 'highlight-container--' + layout : '') +
          '\n      ' +
          (isClicking ? 'clicking' : '') +
          '\n      ' +
          (className || '')

        return React.createElement(
          'div',
          { className: containerClasses },
          children
        )
      },
    },
  ])

  return HighlightContainer
})(React.Component)

var highlightColors = [
  'blue',
  'green',
  'pink',
  'orange',
  'purple',
  'teal',
  'tan',
  'red',
  'cobalt',
  'brown',
  'slate',
  'fuchsia',
  'gray',
]

/**
 * Matches an index with a color. If index is greater than number of colors, cycle through colors.
 * @param {number} index
 */
var getHighlightColor = function getHighlightColor(index) {
  if (index <= highlightColors.length) {
    return highlightColors[index]
  } else {
    return highlightColors[
      index -
        highlightColors.length * Math.floor(index / highlightColors.length)
    ]
  }
}

/**
 * Helper function for transforming response data into a tree object.
 *
 * @param {string[]} tokens a list of strings of each of the tokens (words or punctuation) present
 * @param {{ labelString: number[][] } | number[][][]} clusters a collection of arrays that specify spans to be clustered in the original list of tokens
 */
var transformToTree = function transformToTree(tokens, clusters) {
  // Span tree data transform code courtesy of Michael S.
  function contains(span, index) {
    return index >= span[0] && index <= span[1]
  }

  var insideClusters = [
    {
      cluster: -1,
      contents: [],
      end: -1,
    },
  ]

  tokens.forEach(function (token, i) {
    // Find all the new clusters we are entering at the current index
    var newClusters = []
    Object.keys(clusters).forEach(function (key, j) {
      var cluster = clusters[key]
      // Make sure we're not already in this cluster
      if (
        !insideClusters
          .map(function (c) {
            return c.cluster
          })
          .includes(key)
      ) {
        cluster.forEach(function (span) {
          if (contains(span, i)) {
            newClusters.push({ end: span[1], cluster: key, clusterIndex: j })
          }
        })
      }
    })

    // Enter each new cluster, starting with the leftmost
    newClusters
      .sort(function (a, b) {
        return b.end - a.end
      })
      .forEach(function (newCluster) {
        // Descend into the new cluster
        insideClusters.push({
          cluster: newCluster.cluster,
          contents: [],
          end: newCluster.end,
          clusterIndex: newCluster.clusterIndex,
        })
      })

    // Add the current token into the current cluster
    insideClusters[insideClusters.length - 1].contents.push(token)

    // Exit each cluster we're at the end of
    while (
      insideClusters.length > 0 &&
      insideClusters[insideClusters.length - 1].end === i
    ) {
      var topCluster = insideClusters.pop()
      insideClusters[insideClusters.length - 1].contents.push(topCluster)
    }
  })

  return insideClusters[0].contents
}

/**
 * Not meant to be used outside of the Nested Highlight.
 */
var InnerHighlight = function InnerHighlight(props) {
  var activeDepths = props.activeDepths,
    activeIds = props.activeIds,
    data = props.data,
    depth = props.depth,
    isClickable = props.isClickable,
    isClicking = props.isClicking,
    labelPosition = props.labelPosition,
    onMouseDown = props.onMouseDown,
    onMouseOut = props.onMouseOut,
    onMouseOver = props.onMouseOver,
    onMouseUp = props.onMouseUp,
    selectedId = props.selectedId,
    highlightColor = props.highlightColor,
    tokenSeparator = props.tokenSeparator

  var lenData = data.length
  return data.map(function (token, idx) {
    return (typeof token === 'undefined' ? 'undefined' : _typeof(token)) ===
      'object' && !React.isValidElement(token)
      ? React.createElement(
          Highlight,
          {
            activeDepths: activeDepths,
            activeIds: activeIds,
            color:
              (typeof highlightColor === 'function'
                ? highlightColor(token)
                : highlightColor) || getHighlightColor(token.clusterIndex),
            depth: depth,
            id: token.cluster,
            isClickable: isClickable,
            isClicking: isClicking,
            key: idx,
            label: token.cluster,
            labelPosition: labelPosition,
            onMouseDown: onMouseDown,
            onMouseOut: onMouseOut,
            onMouseOver: onMouseOver,
            onMouseUp: onMouseUp,
            selectedId: selectedId,
          },
          React.createElement(InnerHighlight, {
            activeDepths: activeDepths,
            activeIds: activeIds,
            data: token.contents,
            depth: depth + 1,
            isClickable: isClickable,
            isClicking: isClicking,
            labelPosition: labelPosition,
            onMouseDown: onMouseDown,
            onMouseOut: onMouseOut,
            onMouseOver: onMouseOver,
            onMouseUp: onMouseUp,
            selectedId: selectedId,
          })
        )
      : React.createElement(
          'span',
          { key: idx },
          token,
          idx === lenData - 1
            ? null
            : tokenSeparator ||
                React.createElement(React.Fragment, null, '\xA0')
        )
  })
}

/**
 * A function that recursively handles rendering spans of text to highlight.
 * Use in conjunction withHighlightClickHandling if isClickable is true.
 * @param {
 *  activeDepths?: { ids: string[], depths: number[]}
 *  activeIds?: string[]
 *  clusters: number[][][] | { [id: string]: number[][] }
 *  isClickable?: boolean
 *  isClicking?: boolean
 *  labelPosition: "top" | "left" | "right" | "bottom"
 *  onMouseDown?: (id: string, depth: number) => void
 *  onMouseOut?: (id: string) => void
 *  onMouseOver?: (id: string) => void
 *  onMouseUp?: (id: string) => void
 *  selectedId?: string
 *  tokens: string[],
 *  highlightColor?: string|(token: object) => string;
 *  tokenSeparator?: string;
 * } props
 */
var NestedHighlight = function NestedHighlight(props) {
  var activeDepths = props.activeDepths,
    activeIds = props.activeIds,
    clusters = props.clusters,
    isClickable = props.isClickable,
    isClicking = props.isClicking,
    labelPosition = props.labelPosition,
    onMouseDown = props.onMouseDown,
    onMouseOut = props.onMouseOut,
    onMouseOver = props.onMouseOver,
    onMouseUp = props.onMouseUp,
    selectedId = props.selectedId,
    tokens = props.tokens,
    highlightColor = props.highlightColor,
    tokenSeparator = props.tokenSeparator

  var data = transformToTree(tokens, clusters)
  return React.createElement(
    HighlightContainer,
    null,
    React.createElement(InnerHighlight, {
      activeDepths: activeDepths,
      activeIds: activeIds,
      data: data,
      depth: 0,
      isClickable: isClickable,
      isClicking: isClicking,
      labelPosition: labelPosition,
      onMouseDown: onMouseDown,
      onMouseOut: onMouseOut,
      onMouseOver: onMouseOver,
      onMouseUp: onMouseUp,
      selectedId: selectedId,
      highlightColor: highlightColor,
      tokenSeparator: tokenSeparator,
    })
  )
}

/**
 * An HOC that handles highlight click handling state and passes through
 * any given props.
 *
 * @param {React.Component} WrappedComponent Any component that requires highlight click handling
 */
var withHighlightClickHandling = function withHighlightClickHandling(
  WrappedComponent
) {
  return (function (_React$Component2) {
    _inherits(_withHighlightClickHandling, _React$Component2)

    function _withHighlightClickHandling() {
      var _ref

      var _temp, _this2, _ret

      _classCallCheck(this, _withHighlightClickHandling)

      for (
        var _len = arguments.length, args = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      return (
        (_ret =
          ((_temp =
            ((_this2 = _possibleConstructorReturn(
              this,
              (_ref =
                _withHighlightClickHandling.__proto__ ||
                Object.getPrototypeOf(_withHighlightClickHandling)).call.apply(
                _ref,
                [this].concat(args)
              )
            )),
            _this2)),
          (_this2.state = {
            selectedCluster: -1,
            activeIds: [],
            activeDepths: { ids: [], depths: [] },
            selectedId: null,
            isClicking: false,
          }),
          (_this2.handleHighlightMouseDown = function (id, depth) {
            var depthTable = _this2.state.activeDepths
            depthTable.ids.push(id)
            depthTable.depths.push(depth)

            _this2.setState({
              activeIds: [id],
              activeDepths: depthTable,
              isClicking: true,
            })
          }),
          (_this2.handleHighlightMouseUp = function (id) {
            var depthTable = _this2.state.activeDepths
            var deepestIndex = depthTable.depths.indexOf(
              Math.max.apply(Math, _toConsumableArray(depthTable.depths))
            )

            _this2.setState(function (prevState) {
              return {
                selectedId:
                  prevState.selectedId === depthTable.ids[deepestIndex]
                    ? null
                    : depthTable.ids[deepestIndex],
                isClicking: false,
                activeDepths: { ids: [], depths: [] },
                activeIds: [].concat(_toConsumableArray(prevState.activeIds), [
                  id,
                ]),
              }
            })
          }),
          (_this2.handleHighlightMouseOver = function (id) {
            _this2.setState(function (prevState) {
              return {
                activeIds: [].concat(_toConsumableArray(prevState.activeIds), [
                  id,
                ]),
              }
            })
          }),
          (_this2.handleHighlightMouseOut = function () {
            _this2.setState(function (prevState) {
              return {
                activeIds: prevState.activeIds.filter(function (i) {
                  return i === _this2.state.selectedId
                }),
              }
            })
          }),
          _temp)),
        _possibleConstructorReturn(_this2, _ret)
      )
    }

    _createClass(_withHighlightClickHandling, [
      {
        key: 'render',
        value: function render() {
          var _state = this.state,
            activeIds = _state.activeIds,
            activeDepths = _state.activeDepths,
            isClicking = _state.isClicking,
            selectedId = _state.selectedId

          return React.createElement(
            WrappedComponent,
            Object.assign(
              {
                activeDepths: activeDepths,
                activeIds: activeIds,
                isClicking: isClicking,
                onMouseDown: this.handleHighlightMouseDown,
                onMouseOut: this.handleHighlightMouseOut,
                onMouseOver: this.handleHighlightMouseOver,
                onMouseUp: this.handleHighlightMouseUp,
                selectedId: selectedId,
              },
              this.props
            )
          )
        },
      },
    ])

    return _withHighlightClickHandling
  })(React.Component)
}

var Output = withHighlightClickHandling(function (props) {
  var responseData = props.responseData,
    activeIds = props.activeIds,
    activeDepths = props.activeDepths,
    isClicking = props.isClicking,
    selectedId = props.selectedId,
    onMouseDown = props.onMouseDown,
    onMouseOut = props.onMouseOut,
    onMouseOver = props.onMouseOver,
    onMouseUp = props.onMouseUp
  var document = responseData.document,
    clusters = responseData.clusters

  return React.createElement(
    'div',
    { className: 'model__content answer' },
    React.createElement(NestedHighlight, {
      activeDepths: activeDepths,
      activeIds: activeIds,
      clusters: clusters,
      tokens: document,
      isClickable: true,
      isClicking: isClicking,
      labelPosition: 'left',
      onMouseDown: onMouseDown,
      onMouseOut: onMouseOut,
      onMouseOver: onMouseOver,
      onMouseUp: onMouseUp,
      selectedId: selectedId,
    })
  )
})

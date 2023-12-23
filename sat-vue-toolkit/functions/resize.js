export function $$resizeElement ($el, minWidth, maxWidth, toggleElement) {
  try {
    minWidth = minWidth || 50
    maxWidth = maxWidth || 420
    function closeContent () {
      // icon
      document.querySelector('.toggle-panel-right-icon').classList.remove('mdi-chevron-double-right')
      document.querySelector('.toggle-panel-right-icon').classList.add('mdi-chevron-double-left')
      // box content
      document.querySelector('.toggle-panel-box').classList.add('toggle-panel-box--close')
    }
    function openContent () {
      // icon
      document.querySelector('.toggle-panel-right-icon').classList.remove('mdi-chevron-double-left')
      document.querySelector('.toggle-panel-right-icon').classList.add('mdi-chevron-double-right')
      // box content
      document.querySelector('.toggle-panel-box').classList.remove('toggle-panel-box--close')
    }

    if(toggleElement) {
      toggleElement.removeEventListener('click', function () {})
      toggleElement.addEventListener('click', function () {
        if(document.querySelector('.toggle-panel-box').classList.contains('toggle-panel-box--close')) {
          $el.style.width = `${maxWidth}px`
          openContent()
        }else {
          $el.style.width = `${minWidth}px`
          closeContent()
        }
      })
    }
    let interactJs = require("interactjs")
    const interactEl = interactJs($el)
      .resizable({
        edges: {
          left: true,
          right: true,
        },
        restrictSize: {
          min: {
            width: minWidth
          },
          max: {
            width: maxWidth
          }
        },
        inertia: {
          resistance: 30,
          minSpeed: 200,
          endSpeed: 100
        }
      }).on("resizemove", (event) => {
      const { currentTarget, rect: {width} } = event
      const newWidth = `${width}px`
      currentTarget.style.width = newWidth // card-resize
      if(width <= minWidth) {
        closeContent()
      }else{
        openContent()
      }
      // toggleElement
    })
      .on("resizeend", (event) => {

      })
    return interactEl
  } catch (e) {
    console.error("RESIZEABLE_FUNC", e.message)
    return false
  }
}

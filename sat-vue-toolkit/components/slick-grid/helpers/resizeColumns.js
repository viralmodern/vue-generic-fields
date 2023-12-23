import interactjs from "interactjs"

export function $$initInteract ($el) {
  interactjs(".table-view-header-value", {
    context: $el
  }).resizable({
    allowFrom: ".resize-handle",
    edges: {
      left: !0,
      right: !0
    },
    restrictEdges: {
      outer: "parent",
      endOnly: !0
    },
    restrictSize: {
      min: {
        width: 50
      }
    },
    inertia: !0
  }).on("resizemove", (function (e) {
    let cls = e.target.dataset.column
    let css = `.${cls} {width: ${e.rect.width}px !important`
    let styleElement = document.getElementById(`stylesheet_${cls}`)
    if (styleElement) {
      styleElement.innerHTML = css
    } else {
      let
        head = document.head || document.getElementsByTagName("head")[0],
        style = document.createElement("style")
      head.appendChild(style)
      style.type = "text/css"
      style.id = `stylesheet_${cls}`
      style.appendChild(document.createTextNode(css))
    }
  })).on("resizeend", (function (e) {
    /*
    let n = e.target,
      i = n.dataset.id,
      r = n.clientWidth + 1
    a = t.fieldsConfig.map((function (t) {
      return t.name === i && (t.width = r), t
    }));
     t.updateAttributeSettings(a)
    */
  }))
}

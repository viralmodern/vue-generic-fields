export function $createTooltip (ele, menu, evt) {
  // const ele = document.getElementById(elmTarget);
  // const menu = document.getElementById(elmMenu);

  // ele.addEventListener('contextmenu', function(e) {
  evt.preventDefault()
  const rect = ele.getBoundingClientRect()
  const x = rect.left
  // const x = evt.clientX - rect.left;
  const y = rect.top + rect.height
  // const y = evt.clientY - rect.top;
  // Set the position for menu
  menu.style.top = `${y}px`
  menu.style.left = `${x}px`
  // Show the menu
  menu.classList.add("activeMenu")
  document.addEventListener("mouseover", function (e) {
    documentClickHandler(e)
  })
  // });

  // Hide the menu when clicking outside of it
  const documentClickHandler = function (e) {
    const isClickedOutside = !menu.contains(e.target)
    if (isClickedOutside) {
      menu.classList.remove("activeMenu")
      document.removeEventListener("mouseover", documentClickHandler)
    }
  }
  evt.stopPropagation()
}

export function $createMenuPortal (ele, menu, evt) {
  // ele.addEventListener('contextmenu', function(e) {
  evt.preventDefault()
  let $doc = document
  // Check when menu has been shown
  let b = window.getComputedStyle(menu, null)

  if (b.display !== "none") {
    menu.style.display = "none"
    // return false
  } else {
    menu.style.display = "none"
    const rect = ele.getBoundingClientRect()
    const x = rect.left
    // const x = evt.clientX - rect.left;
    const y = rect.top + rect.height
    // const y = evt.clientY - rect.top;
    // Set the position for menu
    // console.error("RECT", rect, menu)

    menu.style.top = `${y}px`
    menu.style.left = `${x}px`
    // Show the menu
    menu.classList.add("activeMenu")
    menu.style.display = "block"
    $doc.addEventListener("click", function (e) {
      documentClickHandler(e)
    })
    // });
    // Hide the menu when clicking outside of it
    const documentClickHandler = function (e) {
      const isClickedOutside = !menu.contains(e.target)
      const targetEvtClose = menu.querySelector('[evt-close]')
      const isClickedCloseContext = targetEvtClose && targetEvtClose.contains(e.target)
      if (isClickedOutside || isClickedCloseContext) { // todo: if click outside menu or click close menu with link
        menu.classList.remove("activeMenu")
        $doc.removeEventListener("click", documentClickHandler)
        menu.style.display = "none"
        // $doc = null
      }
    }
  }

  evt.stopPropagation()
}


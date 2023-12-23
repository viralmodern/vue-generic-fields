import differ from "deep-diff"
import createLogger from "vuex/dist/logger"


const myLogger = () => {
  const dictionary = {
    E: {
      color: "#2196F3",
      text: "CHANGED:"
    },
    N: {
      color: "#4CAF50",
      text: "ADDED:"
    },
    D: {
      color: "#F44336",
      text: "DELETED:"
    },
    A: {
      color: "#2196F3",
      text: "ARRAY:"
    }
  }

  const style = (kind) => {
    return `color: ${dictionary[kind].color}; font-weight: bold`
  }

  const format = (v) => {
    if (typeof v === "string" || v instanceof String) {
      v = `'${v}'`
    }
    return v
  }

  const render = (diff) => {
    let { kind, path, lhs, rhs, index, item } = diff
    lhs = format(lhs)
    rhs = format(rhs)

    switch (kind) {
      case "E":
        return `${path.join(".")} ${lhs} → ${rhs}`
      case "N":
        return `${path.join(".")} ${rhs}`
      case "D":
        return `${path.join(".")}`
      case "A":
        return [`${path.join(".")}[${index}]`, item]
      default:
        return null
    }
  }

  let myConsole = Object.assign({}, console)
  let prevState, nextState

  myConsole.log = function () {
    if (arguments[0] === "%c prev state") {
      prevState = arguments[2]
    } else if (arguments[0] === "%c next state") {
      nextState = arguments[2]
    }
    return console.log.apply(this, arguments)
  }

  myConsole.groupEnd = function () {
    const diff = differ(prevState, nextState)
    if (diff) {
      diff.forEach((elem) => {
        const { kind } = elem
        const output = render(elem)
        console.log(`%c ${dictionary[kind].text}`, style(kind), output)
      })
    } else {
      console.log("—— no diff ——")
    }

    return console.groupEnd.apply(this, arguments)
  }

  return createLogger({
    logger: myConsole
  })
}

export const plugins = process.env.NODE_ENV !== "production"
  ? [myLogger()]
  : []


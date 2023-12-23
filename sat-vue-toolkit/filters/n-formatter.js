function nFormatter(num) {
    try {
        return Intl.NumberFormat('en-US', {notation: "compact", compactDisplay: "short"}).format(num);
    } catch (e) {
        return num
    }
}

export {nFormatter}
export default nFormatter

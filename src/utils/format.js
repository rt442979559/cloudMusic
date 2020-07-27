export function formatTime(time) {
    time = time | 0
    const m = ((time / 60) | 0)
    const s = (time % 60)
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}

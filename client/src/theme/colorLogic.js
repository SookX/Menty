const hexToRgb = (color = "#fff") => {
    let colors = ["0x", "0x", "0x"]

    let i = 1, curr = 0
    while(curr < 3) {
        colors[curr] += color[i++]
        if(color.length == 7) colors[curr] += color[i++]
        colors[curr] = Number(colors[curr]) / 255
        curr++
    }

    return colors
}

const findMinMax = (red = 0, green = 0, blue = 0) => {
    return [ Math.min(red, green, blue), Math.max(red, green, blue) ]
}

const findSaturation = (min = 0, max = 0, luminace = 0) => {
    if(min == max) return 0
    else if(luminace <= 0.5) return (max - min) / (max + min)
    else return (max - min) / (2 - max - min)
}

const findHue = (red = 0, green = 0, blue = 0, min = 0, max = 0, saturation = 0) => {
    let hue
    if(saturation == 0) hue = 0
    else if(max == red) hue = (green - blue) / (max - min)
    else if(max == green) hue = 2 + (blue - red) / (max - min)
    else hue = 4 + (red - green) / (max - min)
    return hue * 60
}

const hexToHsl = (color = "#fff") => {
    const [ red, green, blue ] = hexToRgb(color)
    const [ min, max ] = findMinMax(red, green, blue)

    const luminace = (min + max) / 2
    const saturation = findSaturation(min, max, luminace)
    const hue = findHue(red, green, blue, min, max, saturation)

    return [hue, saturation, luminace]
}

const adjustColor = (color = "#fff", amount) => {
    const [h, s, l] = hexToHsl(color)
    return `hsl(${Math.floor(h)}, ${Math.floor(s * 100)}%, ${Math.floor((l + (amount / 100)) * 100)})`
}

export const lighten = (color = "#fff", amount) => { return adjustColor(color, amount) }
export const darken = (color = "#fff", amount) => { return adjustColor(color, -amount) }
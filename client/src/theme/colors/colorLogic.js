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
    return `hsl(${Math.floor(h)}, ${Math.floor(s * 100)}%, ${Math.floor((l + (amount / 100)) * 100)}%)`
}

const lighten = (color = "#fff", amount) => { return adjustColor(color, amount) }
const darken = (color = "#fff", amount) => { return adjustColor(color, -amount) }

const primary = "#452D55"
const secondary = "#463813"
const tertiary = "#f8d9a0"
const text = "#211E24"

const Palette = {
    primary: {
        main: primary,
        tint1: lighten(primary, 10),
        tint2: lighten(primary, 20),
        tint3: lighten(primary, 30),
        tint4: lighten(primary, 40),
        tint5: lighten(primary, 50),
        tint6: lighten(primary, 60),
        tint7: lighten(primary, 65),
        tint8: lighten(primary, 70),
    },
    secondary: {
        main: secondary,
        tint1: lighten(secondary, 10),
        tint2: lighten(secondary, 20),
        tint3: lighten(secondary, 30),
        tint4: lighten(secondary, 40),
        tint5: lighten(secondary, 50),
        tint6: lighten(secondary, 60),
        tint7: lighten(secondary, 70),
    },
    tertiary: {
        main: tertiary,
        tint1: lighten(tertiary, 10),
        tint2: lighten(tertiary, 16),
        tint3: lighten(tertiary, 20),
        tint4: lighten(tertiary, 40),
        shade1: darken(tertiary, 10),
        shade2: darken(tertiary, 20),
        shade3: darken(tertiary, 30),
        contrastText: "#fff"
    },
    text: {
        main: text,
        tint1: lighten(text, 10),
        tint2: lighten(text, 20),
        tint3: lighten(text, 30),
        tint4: lighten(text, 40),
        tint5: lighten(text, 50),
        tint6: lighten(text, 60),
        tint7: lighten(text, 70),
    }
} 

export default Palette
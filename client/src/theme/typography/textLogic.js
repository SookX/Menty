const headingStyle = {
    fontFamily: ["Raleway", 'sans-serif'].join(","),
    fontWeight: 'bold'
}

const Text = {
    allVariants: {
        fontFamily: ["Nunito", 'sans-serif'].join(",")
    },
    h1: {
            ...headingStyle,
            fontSize: "64px"
    },
    h2: headingStyle,
    h3: headingStyle,
    h4: headingStyle,
    h5: headingStyle
}

export default Text
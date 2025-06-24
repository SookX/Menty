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
    h2: {
        ...headingStyle,
        fontSize: "56px"
    },
    h3: {
        ...headingStyle,
        fontSize: "48px"
    },
    h4: headingStyle,
    h5: headingStyle,
    Link: {
        fontFamily: ["Nunito", 'sans-serif'].join(","),
        textDecoration: "none",
        cursor: "pointer"
    }
}

export default Text
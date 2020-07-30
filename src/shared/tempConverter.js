const kTOc = (temp) => {
    return Math.round(temp - 273.15)
}

const kTOF = (temp) => {
    return Math.round((temp * 9) / 5 - 459.67)
}

export { kTOc, kTOF }

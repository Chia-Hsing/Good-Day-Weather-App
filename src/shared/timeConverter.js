import moment from 'moment-timezone'

const timeFormat = (timestamp, timezone, formatType) => {
    const date = new Date(timestamp * 1000)
    return moment(date).tz(timezone).format(formatType)
}

export default timeFormat

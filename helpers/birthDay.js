import moment from 'moment'

/**
 * 
 * @param {strign} birth_date date string in ISO format
 */
const nDaysTill = (birth_date) => {
    let now = moment().startOf('day')
    let birth = moment(birth_date)

    console.log(birth)

    birth.year(now.year())
    let diff = birth.diff(now,'days')

    if (diff < 0) {
        birth.year(now.year()+1)
        diff = birth.diff(now,'days')
    }

    return diff
}

export default nDaysTill
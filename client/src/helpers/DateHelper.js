
const dateNow = () => {
    return new Date();
}

const year = () => {
    return dateNow().getFullYear();
}

const month = () => {
    let m = dateNow().getMonth();
    m += 1;
    if (m < 9) {
        m = `0${m}`
    }
    return m;
}

export const periodNow = () => {
    return `${year()}-${month()}`
}
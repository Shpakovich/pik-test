const TIME = {
    'утро': [6, 7, 8, 9, 10, 11],
    'день': [12, 13, 14, 15, 16, 17],
    'вечер': [18, 19, 20, 21, 22, 23],
    'ночь': [0, 1, 2, 3, 4, 5]
}
function getCurrentTimesOfDay() {
    const currentHours = new Date().getHours();
    let timesOfDay;

    for (const key in TIME) {
        // @ts-ignore
        if (TIME[key].includes(currentHours)) {
            // @ts-ignore
            timesOfDay = key;
        }
    }
    return timesOfDay;
}

export default getCurrentTimesOfDay;
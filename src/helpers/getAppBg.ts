export function getAppBg () {
    const DAY_BACKGROUND = 'https://0.pik.ru.cdn.pik-service.ru/undefined/2021/08/03/dji_0093.rev00_wj16guVhKoupGK8K.jpg';
    const NIGHT_BACKGROUND = 'https://0.pik.ru.cdn.pik-service.ru/undefined/2020/07/21/dsc06845_481909dfb262bfdcb554e38bd110c38f_eZGKKhSFQDqht6yz.jpg';
    const hours = new Date().getHours();
    return hours > 17 || hours < 6 ? NIGHT_BACKGROUND : DAY_BACKGROUND;
}
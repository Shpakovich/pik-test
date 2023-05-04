const base_url = "https://strapi.pik.ru/front-tests";
export function sendForm (data: any) {
    return fetch(base_url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    })
}
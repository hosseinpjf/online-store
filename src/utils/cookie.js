const setCookie = tokens => {
    document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=${1 * 24 * 60 * 60}`;
    document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}`;
}

const getCookie = cookieName => {
    return document.cookie.split(';').find(cookie => cookie.trim().split('=')[0] === cookieName)?.split('=')[1];
}

const deleteCookie = cookieName => {
    document.cookie = `${cookieName}=; path=/; max-age=0`;
}

export { setCookie, getCookie, deleteCookie }
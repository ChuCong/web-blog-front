import Cookies from 'js-cookie'

const TOKEN_ADMIN = "tokenAdmin"
const TOKEN = "token"
const USER_NAME = "user_name"
const USER_AVATAR = "user_avatar"
const CODE = "code"
const EMAIL = "email"

export const saveData = (key, value) => {
    Cookies.set(key, value, {expires: 60 * 60 * 24});
};
export const getData = key => {
    return Cookies.get(key);
};

export const destroyData = key => {
    Cookies.remove(key);
};

export const getToken = () => {

    return Cookies.get(TOKEN);
};

export const saveToken = token => {
    Cookies.remove(TOKEN);
    Cookies.set(TOKEN, token, {expires: 60 * 60 * 24});
};

export const destroyToken = () => {
    Cookies.remove(TOKEN);
};
export const getTokenAdmin = () => {

    return Cookies.get(TOKEN_ADMIN);
};

export const saveTokenAdmin = token => {
    Cookies.remove(TOKEN_ADMIN);
    Cookies.set(TOKEN_ADMIN, token, {expires: 60 * 60 * 24});
};

export const destroyTokenAmin = () => {
    Cookies.remove(TOKEN_ADMIN);
};

export const getUser = () => {
    return Cookies.get(USER_NAME);
};

export const saveUser = userName => {
    return Cookies.set(USER_NAME, userName,{expires: 60 * 60 * 24});
};

export const destroyUser = () => {
    Cookies.remove(USER_NAME);
}

export const saveUserAvatar = avatar => {
    return Cookies.set(USER_AVATAR, avatar,{expires: 60 * 60 * 24});
}

export const getUserAvatar = () => {
    return Cookies.get(USER_AVATAR, null)
}
export const destroyUserAvatar = () => {
    Cookies.remove(USER_AVATAR);
}
export const getAffiliateCode = () => {

    return Cookies.get(CODE);
};

export const saveAffiliateCode = code => {
    Cookies.remove(CODE);
    Cookies.set(CODE, code, {expires: 60 * 60 * 24});
};

export const destroyAffiliateCode = () => {
    Cookies.remove(CODE);
};


export const getEmail = () => {
    return Cookies.get(EMAIL);
};

export const saveEmail = email => {
    Cookies.remove(EMAIL);
    Cookies.set(EMAIL, email);
};

export const destroyEmail = () => {
    Cookies.remove(EMAIL);
};



export default {
    destroyData,
    getToken,
    saveToken,
    destroyToken,
    getUser,
    saveUser,
    destroyUser,
    saveUserAvatar,
    getUserAvatar,
    getData,
    saveData,
    saveAffiliateCode,
    destroyAffiliateCode,
    getAffiliateCode,
    destroyTokenAmin,
    saveTokenAdmin,
    getTokenAdmin,
    getEmail,
    saveEmail,
    destroyEmail,
    destroyUserAvatar
};

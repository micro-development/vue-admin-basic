const baseUrl = '/account'

export const updatePassword = (data, opts) => {
    return {
        method: 'patch',
        url: `${baseUrl}/user/passwd`,
        data,
        opts
    }
}

export const getUserInfo = (data, opts) => {
    return {
        method: 'get',
        url: `${baseUrl}/user/info`,
        data,
        opts
    }
}

export const getProfile = (data, opts) => {
    return {
        method: 'get',
        url: `${baseUrl}/profile`,
        data,
        opts
    }
}

export const setProfile = (data, opts) => {
    return {
        method: 'patch',
        url: `${baseUrl}/profile`,
        data,
        opts
    }
}

export const login = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/login`,
        data,
        opts
    }
}

export const register = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/register`,
        data,
        opts
    }
}

export const sendMobileCodeByRegister = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/sendMobileCodeByRegister`,
        data,
        opts
    }
}

export const sendMobileCodeByBind = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/sendMobileCodeByBind`,
        data,
        opts
    }
}

export const sendEmailCodeByRegister = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/sendEmailCodeByRegister`,
        data,
        opts
    }
}

export const sendEmailCodeByBind = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/sendEmailCodeByBind`,
        data,
        opts
    }
}

export const bindUserName = (data, opts) => {
    return {
        method: 'patch',
        url: `${baseUrl}/user/userName`,
        data,
        opts
    }
}

export const bindEmail = (data, opts) => {
    return {
        method: 'patch',
        url: `${baseUrl}/user/email`,
        data,
        opts
    }
}

export const bindMobile = (data, opts) => {
    return {
        method: 'patch',
        url: `${baseUrl}/user/mobile`,
        data,
        opts
    }
}

export const bindWechatConnect = (data, opts) => {
    return {
        method: 'patch',
        url: `${baseUrl}/bind/wechatConnect`,
        data,
        opts
    }
}

export const bindTencentConnect = (data, opts) => {
    return {
        method: 'patch',
        url: `${baseUrl}/bind/tencentConnect`,
        data,
        opts
    }
}

export const unBindWechatConnect = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/unBind/wechatConnect`,
        data,
        opts
    }
}

export const unBindTencentConnect = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/unBind/tencentConnect`,
        data,
        opts
    }
}

export const bindList = (data, opts) => {
    return {
        method: 'get',
        url: `${baseUrl}/bind/list`,
        data,
        opts
    }
}

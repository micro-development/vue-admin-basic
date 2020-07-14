const baseUrl = '/account'

export const list = (data, opts) => {
    return {
        method: 'get',
        url: `${baseUrl}/authApp/list`,
        data,
        opts
    }
}

export const detail = (data, opts) => {
    return {
        method: 'get',
        url: `${baseUrl}/authApp/${data.uuid}`,
        data: {},
        opts
    }
}

export const getSecret = (data, opts) => {
    const uuid = data.uuid
    delete data.uuid
    return {
        method: 'post',
        url: `${baseUrl}/authApp/${uuid}/getSecretInfo`,
        data,
        opts
    }
}

export const remove = (data, opts) => {
    return {
        method: 'delete',
        url: `${baseUrl}/authApp/${data.uuid}`,
        data: {},
        opts
    }
}

export const update = (data, opts) => {
    const uuid = data.uuid
    delete data.uuid
    return {
        method: 'patch',
        url: `${baseUrl}/authApp/${uuid}`,
        data,
        opts
    }
}

export const add = (data, opts) => {
    return {
        method: 'post',
        url: `${baseUrl}/authApp`,
        data,
        opts
    }
}

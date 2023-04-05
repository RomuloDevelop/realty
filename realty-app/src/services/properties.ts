import { get } from "../utils/api"

export interface Pagination {
    skip: number
    limit: number
}

export const properties = ({skip, limit}: Pagination) => {
    return get({
        url: '/properties',
        params: {skip, limit}
    })
}

export const searchProperties = ({skip, limit}: {skip: number, limit: number}) => {
    return get({
        url: '/properties/search',
        params: {skip, limit}
    })
}
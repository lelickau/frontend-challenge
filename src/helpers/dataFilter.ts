import {ICat} from 'types/ICat'

export const dataFilter = (data: ICat[]) => {
    return data.map(item => {
        return {
            url: item.url,
            id: item.id,
            favorite: false,
        }
    })
}
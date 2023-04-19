import {
  Property,
  PropertyCategory,
  PropertyImage,
  PropertyType,
} from '@prisma/client'
import { get, post, put } from '../utils/api'

export interface IProperty extends Property {
  propertyImages: PropertyImage[]
}

export const getProperties = async (params: Paginator) => {
  const { data } = await get<IProperty[]>({
    url: '/properties',
    params,
  })

  return data
}

export const getPropertyTypes = async () => {
  const { data } = await get<PropertyType[]>({
    url: '/properties/types',
  })

  return data
}

export const getPropertyCategories = async () => {
  const { data } = await get<PropertyCategory[]>({
    url: '/properties/categories',
  })

  return data
}

// export const getGeolocation = async (
//   address: string
// ): Promise<{ lat: string; lon: string }> => {
//   const { data } = await get({
//     url: `https://nominatim.openstreetmap.org/search?q=${address}&format=json`,
//     customApi: true,
//   })

//   const { lat, lon } = data[0]
//   return { lat, lon }
// }

export const createProperty = async (body: FormData) => {
  return post({
    url: '/properties',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body,
  })
}

export const updateProperty = async (id: string, body: FormData) => {
  body.append('id', id)

  return put({
    url: '/properties',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body,
  })
}

export const searchProperties = ({
  skip,
  limit,
}: {
  skip: number
  limit: number
}) => {
  return get({
    url: '/properties/search',
    params: { skip, limit },
  })
}

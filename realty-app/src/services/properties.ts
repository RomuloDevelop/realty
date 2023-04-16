import {
  Property,
  PropertyCategory,
  PropertyImage,
  PropertyType,
} from '@prisma/client'
import { get, post } from '../utils/api'

export interface IProperty extends Property {
  propertyImages: PropertyImage[]
}

export const getProperties = async ({
  page,
  perPage,
}: Paginator): Promise<IProperty[]> => {
  const { data } = await get({
    url: '/properties',
    params: { page, perPage },
  })

  return data
}

export const getPropertyTypes = async (): Promise<PropertyType[]> => {
  const { data } = await get({
    url: '/properties/types',
  })

  return data
}

export const getPropertyCategories = async (): Promise<PropertyCategory[]> => {
  const { data } = await get({
    url: '/properties/categories',
  })

  return data
}

export const getGeolocation = async (
  address: string
): Promise<{ lat: string; lon: string }> => {
  const { data } = await get({
    url: `https://nominatim.openstreetmap.org/search?q=${address}&format=json`,
    customApi: true,
  })

  const { lat, lon } = data[0]
  return { lat, lon }
}

export const createProperty = async (body: FormData) => {
  return post({
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

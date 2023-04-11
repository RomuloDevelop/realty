import { Property, PropertyImage } from '@prisma/client'
import { get } from '../utils/api'

export interface PropertyType extends Property {
  propertyImages: PropertyImage[]
}

export const getProperties = async ({
  page,
  perPage,
}: Paginator): Promise<PropertyType[]> => {
  const { data } = await get({
    url: '/properties',
    params: { page, perPage },
  })

  return data
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

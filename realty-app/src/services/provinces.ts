import { City, County, Neighbourhood, Province } from '@prisma/client'
import { get } from '../utils/api'

export const getProvinces = async (): Promise<Province[]> => {
  const { data } = await get({
    url: '/provinces',
  })

  return data
}

export const getCounties = async (params: {
  name: string
  abbreviation: string
}): Promise<County[]> => {
  const { data } = await get({
    url: 'provinces/counties',
    params,
  })

  return data
}

export const getCities = async (params: {
  name: string
  countyFips: string
}): Promise<City[]> => {
  const { data } = await get({
    url: 'provinces/cities',
    params,
  })

  return data
}

export const getNeighborhoods = async (params: {
  name: string
  cityId: number
}): Promise<Neighbourhood[]> => {
  const { data } = await get({
    url: 'provinces/neighbourhoods',
    params,
  })

  return data
}

import { City, County, Neighbourhood, Province } from '../types'
import { get } from '../utils/api'

export const getProvinces = async () => {
  const { data } = await get<Province[]>({
    url: '/provinces',
  })

  return data
}

export const getCounties = async (params: {
  name: string
  abbreviation: string
}) => {
  const { data } = await get<County[]>({
    url: 'provinces/counties',
    params,
  })

  return data
}

export const getCities = async (params: {
  name: string
  countyFips: string
}) => {
  const { data } = await get<City[]>({
    url: 'provinces/cities',
    params,
  })

  return data
}

export const getNeighborhoods = async (params: {
  name: string
  cityId: number
}) => {
  const { data } = await get<Neighbourhood[]>({
    url: 'provinces/neighbourhoods',
    params,
  })

  return data
}

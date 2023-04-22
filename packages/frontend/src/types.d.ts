interface Error {
  statusCode: number
  message: string
  data?: {
    code: string
    meta: any
  }
}

interface Paginator {
  page: number
  perPage: number
  orderBy?: string
}

/**
 * Model User
 *
 */
export type User = {
  id: number
  email: string
  first_name: string
  last_name: string | null
  password: string | null
  address: string
  phone: string
  roleId: number
}

/**
 * Model UserRole
 *
 */
export type UserRole = {
  id: number
  description: string
}

/**
 * Model Property
 *
 */
export type Property = {
  id: number
  agentId: number | null
  title: string
  description: string
  area: number
  floors: number
  price: number
  latitude: number
  longitude: number
  address: string
  mis_number: number
  zipCode: number
  baths: number
  bedrooms: number
  propertyTypeId: number
  propertyCategoryId: number
  countyFipscode: string
  provinceAbbreviation: string
  cityId: number
  neighbourhoodId: number | null
  createdAt: Date
}

/**
 * Model PropertyType
 *
 */
export type PropertyType = {
  id: number
  description: string
}

/**
 * Model PropertyCategory
 *
 */
export type PropertyCategory = {
  id: number
  parentId: number | null
  description: string
}

/**
 * Model PropertyImage
 *
 */
export type PropertyImage = {
  id: number
  propertyId: number
  name: string
  url: string
}

/**
 * Model Province
 *
 */
export type Province = {
  id: number
  name: string
  abbreviation: string
}

/**
 * Model County
 *
 */
export type County = {
  id: number
  name: string
  fipscode: string
  stateAbbreviation: string
}

/**
 * Model City
 *
 */
export type City = {
  id: number
  name: string
  countyFips: string
  stateAbbreviation: string
}

/**
 * Model Neighbourhood
 *
 */
export type Neighbourhood = {
  id: number
  name: string
  cityId: number
  countyFips: string
  stateAbbreviation: string
}

/**
 * Model Appointment
 *
 */
export type Appointment = {
  id: number
  clientId: number
  agentId: number
  propertyId: number
  date: Date
  comment: string
  email: string | null
  phone: string | null
  createdAt: Date
}

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

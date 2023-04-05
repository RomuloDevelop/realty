import axios from 'axios'

interface Params {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete'
  body?: any
  params?: Record<string, any>
  headers?: any
}

const TIMEOUT_FETCH = 180000

let API_URL = process.env.API_URL

const api = async (
  { url, headers, method, body, params }: Params
) => {
  if (url[0] === '/') {
    url = url.slice(1)
  }

  const defaultHeaders: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const token = localStorage.get('TOKEN')

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`
  }

  const controller = new AbortController()

  const axiosParameters = {
    url: `${API_URL}/${url}`,
    method: method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    timeout: TIMEOUT_FETCH,
    signal: controller.signal,
    data: body,
    params,
  }
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
      /* end Crashlytics*/
    }
  )

  return new Promise(function (resolve, reject) {
    axios(axiosParameters)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error.response.data)
      })
  })
}

const get = (
  { url, headers, params }: Params
): Promise<any> => {
  return api({ url, headers, method: 'get', params })
}

const post = (
  { url, headers, body, params }: Params
): Promise<any> => {
  return api({ url, headers, method: 'post', body, params })
}

const put = (
  { url, headers, body, params }: Params,
): Promise<any> => {
  return api({ url, headers, method: 'put', body, params })
}
const remove = (
  { url, headers, body, params }: Params
): Promise<any> => {
  return api({ url, headers, method: 'delete', body, params })
}

const formData = (
  { url, body, headers = {}, method, params }: Params
): Promise<any> => {
  return api(
    {
      url,
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
      method,
      params,
    }
  )
}

export { post, get, put, formData, remove }
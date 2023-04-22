import { yupResolver } from '@hookform/resolvers/yup'
import { City, County, Neighbourhood } from '../../../types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { InferType } from 'yup'
import {
  createProperty,
  getCities,
  getCounties,
  getNeighborhoods,
  getPropertyCategories,
  getPropertyTypes,
  getProvinces,
  updateProperty,
} from '../../../services'
import getLatLngFromCoords from '../../../utils/helpers/getLatLngFromCoords'
import Schema from './schema'

const useCreateProperty = () => {
  const { id } = useParams<{ id: string }>()
  const [counties, setCounties] = useState<County[]>([])
  const [cities, setCities] = useState<City[] | null>(null)
  const [neighborhoods, setNeighborhoods] = useState<Neighbourhood[] | null>(
    null
  )
  const marker = useRef<google.maps.Marker | null>(null)
  const map = useRef<google.maps.Map | null>(null)

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<InferType<typeof Schema>>({
    resolver: yupResolver(Schema),
    mode: 'onSubmit',
  })

  const province = watch('province')
  const county = watch('county')
  const city = watch('city')
  const coordinates = watch('coordinates')

  const { data = [], isLoading: isLoadingData } = useQuery(
    ['select-data'],
    () =>
      Promise.all([getPropertyCategories(), getPropertyTypes(), getProvinces()])
  )

  const { mutate: sendForm, isLoading: isLoadingCreate } = useMutation(
    (body: FormData) => (id ? updateProperty(id, body) : createProperty(body)),
    {
      onError: (error) => {
        console.error(error)
      },
    }
  )

  const { mutate: fetchCounties, isLoading: isLoadingCounties } = useMutation(
    (name: string) =>
      getCounties({
        name,
        abbreviation: province,
      }),
    {
      onSuccess: (data) => {
        setCounties(data)
      },
    }
  )

  const { mutate: fetchCities, isLoading: isLoadingCities } = useMutation(
    (name: string) =>
      getCities({
        name,
        countyFips: county,
      }),
    {
      onSuccess: (data) => {
        setCities(data)
      },
    }
  )

  const { mutate: fetchNeighborhoods, isLoading: isLoadingNeighborhoods } =
    useMutation(
      (name: string) =>
        getNeighborhoods({
          name,
          cityId: city,
        }),
      {
        onSuccess: (data) => {
          setNeighborhoods(data)
        },
      }
    )

  const [categories, types, provinces] = data

  const searchCounties = useCallback(
    (text: string) => {
      if (text.length > 1) fetchCounties(text)
    },
    [fetchCounties]
  )

  const searchCity = useCallback(
    (text: string) => {
      if (text.length > 1) fetchCities(text)
    },
    [fetchCities]
  )

  const searchNeighborhood = useCallback(
    (text: string) => {
      if (text.length > 1) fetchNeighborhoods(text)
    },
    [fetchNeighborhoods]
  )

  const getMapLocation = useCallback(async () => {
    const noErrors = await trigger('coordinates', {
      shouldFocus: true,
    })

    if (!noErrors || !marker.current || !coordinates) return

    const { latitude, longitude } = getLatLngFromCoords(coordinates)

    marker.current.setPosition({
      lat: parseFloat(latitude as any),
      lng: parseFloat(longitude as any),
    })

    const positions = marker.current.getPosition()
    if (positions) {
      map.current?.setCenter(positions)
      map.current?.setZoom(12)
    }
  }, [coordinates, trigger])

  const onLoadMap = useCallback(
    (newMap: google.maps.Map | null) => {
      map.current = newMap

      if (!map.current) return

      let infoWindow = new google.maps.InfoWindow({
        content: 'Click the map to get Lat/Lng!',
        position: {
          lat: -3.745,
          lng: -38.523,
        },
      })

      infoWindow.open(map.current)

      marker.current = new google.maps.Marker({
        position: {
          lat: -3.745,
          lng: -38.523,
        },
        map: map.current,
      })

      // Configure the click listener.
      map.current.addListener('click', (mapsMouseEvent: any) => {
        // Close the current InfoWindow.
        infoWindow.close()

        if (marker.current) {
          marker.current.setPosition(mapsMouseEvent.latLng)

          const positions = marker.current.getPosition()
          if (positions) {
            map.current?.setCenter(positions)
            map.current?.setZoom(12)
          }
        }

        const coordinates = `${mapsMouseEvent.latLng.lat()}, ${mapsMouseEvent.latLng.lng()}`
        setValue('coordinates', coordinates)
      })
    },
    [setValue]
  )

  const send = useCallback(() => {
    const {
      title,
      description,
      area,
      floors,
      price,
      coordinates,
      address,
      mis_number,
      zipCode,
      baths,
      bedrooms,
      neighborhood,
      county,
      province,
      type,
      category,
      files,
    } = getValues()

    const { latitude, longitude } = getLatLngFromCoords(coordinates)
    const bodyFormData = new FormData()

    bodyFormData.append('title', title)
    bodyFormData.append('description', description)
    bodyFormData.append('area', area.toString())
    bodyFormData.append('floors', floors.toString())
    bodyFormData.append('price', price.toString())
    bodyFormData.append('latitude', latitude.toString())
    bodyFormData.append('longitude', longitude.toString())
    bodyFormData.append('address', address)
    bodyFormData.append('mis_number', mis_number.toString())
    bodyFormData.append('zipCode', zipCode)
    bodyFormData.append('baths', baths.toString())
    bodyFormData.append('bedrooms', bedrooms.toString())
    bodyFormData.append('propertyTypeId', type.toString())
    bodyFormData.append('propertyCategoryId', category.toString())
    bodyFormData.append('countyFipscode', county)
    bodyFormData.append('provinceAbbreviation', province)
    bodyFormData.append('cityId', city.toString())
    bodyFormData.append('neighbourhoodId', neighborhood?.toString() || '')

    if (files) {
      Object.keys(files).forEach((key: string) => {
        const image = files[parseInt(key)]
        console.log(image)

        bodyFormData.append(
          'images',
          new Blob([image], { type: image.type }),
          image.name
        )
      })

      console.log(bodyFormData.values())

      sendForm(bodyFormData)
    }
  }, [city, getValues, sendForm])

  useEffect(() => {
    setValue('county', '')
    setCounties([])
  }, [province, setValue])

  useEffect(() => {
    setValue('city', 0)
    setCities([])
  }, [county, setValue])

  useEffect(() => {
    setValue('neighborhood', 0)
    setNeighborhoods([])
  }, [city, setValue])

  return {
    handleSubmit,
    send,
    control,
    register,
    errors,
    isLoadingData,
    isLoadingCounties,
    isLoadingCities,
    isLoadingNeighborhoods,
    categories,
    types,
    provinces,
    counties,
    cities,
    neighborhoods,
    searchCounties,
    searchCity,
    searchNeighborhood,
    province,
    county,
    city,
    getMapLocation,
    onLoadMap,
    coordinates,
    isLoadingCreate,
  }
}

export default useCreateProperty

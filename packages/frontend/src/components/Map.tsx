import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

type Props = {
  onLoad: (map: google.maps.Map | null) => void
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

const Map = ({ onLoad }: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY as string,
  })

  const map = useRef<google.maps.Map | null>()

  const onLoadMap = useCallback(
    (newMap: google.maps.Map) => {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center)
      newMap.fitBounds(bounds)
      onLoad(newMap)
      map.current = newMap
    },
    [onLoad]
  )

  const onUnmount = useCallback(() => {
    map.current = null
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoadMap}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default Map

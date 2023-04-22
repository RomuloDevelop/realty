export default function getLatLngFromCoords(coordinates: string) {
  const [latitude, longitude] = coordinates.split(',')
  return {
    latitude: parseFloat(latitude.trim()),
    longitude: parseFloat(longitude.trim()),
  }
}

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import Axios from 'axios'
// import 'leaflet/dist/leaflet.css';

import {
  useQuery,
} from '@tanstack/react-query'

function App() {

  const { isPending, error, data } = useQuery({
    queryKey: ['iss'],
    queryFn: ({ signal }) =>
      Axios.get('iss', {
        signal,
      }),
    refetchInterval: 1000,
  })

  if (isPending) return 'Loading...';


  if (error) return 'An error has occurred: ' + error.message;

  const position: LatLngExpression = [data.data.latitude, data.data.longitude]

  console.log(data.data);

  // const position: LatLngExpression = [51.505, -0.09]

  return (

    <MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{ height: 536 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>

  )
}

export default App

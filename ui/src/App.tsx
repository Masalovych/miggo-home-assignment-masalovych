import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import Axios from 'axios'

import queryClient from './queryClient.ts'

import './App.css'

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
    refetchInterval: 10000,
  })

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const {latitude, longitude, timestamp } = data.data;
  
  const position: LatLngExpression = [latitude, longitude]


  console.log(data.data);

  function handleClick() {
    queryClient.invalidateQueries({ queryKey: ['iss'] });
  }

  return (
    <div>
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
        <button
          title="Refresh"
          onClick={handleClick}
        >
          Refresh
        </button>
        <div className="time-container">
          <div><b>Time:</b> {new Date(timestamp * 1000).toISOString()}</div>
          <div><b>Latitude:</b> {latitude}</div>
          <div><b>Longitude:</b> {longitude}</div>
        </div>
      </div>

      <MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{ height: 536 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default App
